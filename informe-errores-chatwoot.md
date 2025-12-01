# Informe de Errores y Soluciones Propuestas para la Integración de white-library + Chatwoot

Este documento resume los errores encontrados durante la integración del chat con `white-library@1.0.3` en el proyecto (Next.js 15 + React 18.3.1), explica sus posibles causas y propone soluciones prácticas. El objetivo es que este informe sirva para diagnosticar si los problemas son del lado de la librería o de la implementación en nuestro proyecto.

## Resumen Ejecutivo

- Se resolvieron conflictos de dependencias e incompatibilidades SSR que impedían que el chat cargara.
- Se corrigieron colisiones de identificadores y rutas mal configuradas que producían 404 y bucles de render.
- Actualmente el cliente carga y el componente de chat se renderiza, pero la creación de conversación con Chatwoot devuelve `400` por configuración incompleta de `source_id` (contacto no vinculado al inbox).
- La parte visual del chat es básica y necesita ajustes de estilos; esto se puede mejorar con `componentsStyles`, `messageVariant` y/o `unstyled`.

---

## Entorno y Dependencias

### Error
- `npm install` falló inicialmente por conflicto de peer dependencies:
  - `white-library@1.0.3` requiere `react@18.0.0`
  - Proyecto tiene `react@18.3.1` y `react-dom@18.3.1`

### Causa Probable
- La librería declara una versión estricta de peer deps que no contempla React 18.3.x.

### Solución Aplicada
- Instalación con `--legacy-peer-deps` para permitir las versiones actuales del proyecto.

### Recomendación
- Preferir una de estas opciones:
  - Solicitar a la librería ampliar el rango de peer deps a `^18.0.0` (incluye 18.3.x).
  - Fijar el proyecto a `react@18.0.x` si se requiere estrictamente.
  - Mantener `--legacy-peer-deps` como workaround, aceptando el riesgo de incompatibilidades menores.

---

## SSR y Renderizado del Componente

### Errores Observados
- `ReferenceError: document is not defined` al renderizar el chat (SSR).
- `Maximum update depth exceeded` por bucles de estado/configuración.

### Causas Probables
- El paquete `white-library` toca el DOM (usa `document`) y no es seguro de ejecutar en SSR.
- `agentConfig` se recreaba en cada render, provocando reconfiguraciones infinitas dentro de la librería.

### Soluciones Aplicadas
- Marcamos `Chat.jsx` como cliente: `"use client"`.
- Importación dinámica del componente `Chat` de la librería con `ssr: false`:
  - `const WhiteChatDyn = dynamic(() => import('white-library').then(m => m.Chat), { ssr: false });`
- Importación dinámica del propio `Chat` en `Hero.jsx` con `ssr: false`, para asegurar cadena cliente-only.
- Memoizamos `agentConfig` con `useMemo(...)`.

### Recomendaciones
- Mantener el chat encapsulado bajo componentes cliente y/o importaciones dinámicas sin SSR.
- Evitar efectos o estados que actualicen configuración en cada render; usar `useMemo` y props estables.

---

## Colisiones de Identificadores y Módulos

### Error Observado
- `ModuleParseError`: Identificador `Chat` declarado dos veces (importado `Chat` y exportado `function Chat()`).

### Causa Probable
- Componentes o funciones locales comparten el mismo nombre del componente importado de la librería.

### Solución Aplicada
- Uso de importación dinámica con nombre distinto (`WhiteChatDyn`) y mantener `export default function Chat()` como wrapper.
- Eliminamos cualquier alias residual que reintrodujera la colisión.

### Recomendación
- Evitar nombrar el componente local igual al importado, o usar siempre import dinámico con alias distinto.

---

## Rutas API y 404

### Errores Observados
- `POST /api/chatwoot/conversations 404` al inicio.
- `POST /api/chat/chatwoot/chatwoot/conversations 404`: ruta duplicada `chatwoot`.

### Causas Probables
- `proxyBaseUrl` configurado incorrectamente, causando la construcción duplicada de rutas (`/chatwoot/chatwoot/...`).
- El backend devolvía 404 por flujo de error genérico en la llamada a Chatwoot (sin manejo claro).

### Soluciones Aplicadas
- Establecer `proxyBaseUrl = '/api/chat'` en el cliente. La librería concatena `'/chatwoot/...'` automáticamente.
- Añadimos endpoints en Next.js:
  - `POST /api/chat/chatwoot/conversations` → crear conversación.
  - `POST /api/chat/chatwoot/conversations/:conversationId/messages` → enviar mensaje.
  - `GET /api/chat/conversations/:conversationId/messages?accountId=...` → listado de mensajes (polling).
- Ajustamos el manejo de errores:
  - Cuando no se encuentra `source_id` vía `contactable_inboxes`, retornamos `400` con explicación (antes el comportamiento era confuso y terminaba en 404).

### Recomendación
- Validar que `proxyBaseUrl` NUNCA incluya `/chatwoot`. La librería lo agrega.
- En desarrollo, loggear respuestas de Chatwoot con más detalle para distinguir `4xx` por datos faltantes vs `404` reales del framework.

---

## Integración Chatwoot: `source_id` y Webhooks

### Error Actual
- `POST /api/chat/chatwoot/conversations 400`:
  - Mensaje: falta `source_id` para el contacto y el inbox proporcionados.

### Causa Probable
- El contacto (`contactId`) no está vinculado al inbox API (`inboxId`) en Chatwoot, por lo que el endpoint `contactable_inboxes` no devuelve `source_id`.

### Solución de Contingencia Aplicada
- Se añadió un fallback: si existe `NEXT_PUBLIC_CHATWOOT_SOURCE_ID` en `.env.local`, el proxy usará ese `source_id` aunque `contactable_inboxes` no lo devuelva.

### Soluciones Propuestas (definitivas)
- Vincular el contacto con el inbox en Chatwoot (UI):
  - Settings → Inboxes (API) → asegurar que el contacto aparezca en “Contactable inboxes” o crear el contacto desde el canal API.
- O bien definir `NEXT_PUBLIC_CHATWOOT_SOURCE_ID` con un `source_id` válido para ese inbox/contacto.
- Verificar `accountId`, `inboxId`, `contactId` y `API_ACCESS_TOKEN`:
  - `accountId` debe ser el de la instalación.
  - `inboxId` debe referirse al inbox de tipo API.
  - `API_ACCESS_TOKEN` (Application token) solo en servidor.

### Recepción de Mensajes
- Se habilitó polling a `GET /api/chat/conversations/:conversationId/messages` para mensajes salientes (`outgoing`), agregándolos al store.
- Recomendado: implementar SSE/WebSocket en el backend y conectar `onIncomingMessage` en el frontend para respuestas en tiempo real.

---

## Importaciones de Librería y Helpers

### Error Observado
- `Attempted import error: 'createTextMessage' is not exported from 'white-library'`.

### Causa Probable
- La documentación menciona helpers (p. ej. `createTextMessage`), pero la versión publicada no los exporta desde el entrypoint utilizado.

### Solución Aplicada
- En lugar de importar el helper, se construyen objetos de mensaje manualmente:
  - `{ id, role: 'assistant', parts: [{ type: 'text', text: content }], content, createdAt }`.

### Recomendación
- Confirmar con la librería el entrypoint correcto para helpers o actualizar a una versión que los exporte.
- Mantener la construcción manual si la librería no provee los helpers.

---

## Estilos y Apariencia del Chat

### Situación
- El chat se ve “horrible” en la UI actual; estilos por defecto no combinan con la estética del sitio.

### Causas
- Uso de estilos base de la librería sin personalización.
- Contenedor externo con estilos mínimos; la librería gestiona estilos internos, pero pueden requerir ajuste.

### Opciones de Mejora
- Usar `componentsStyles` para inyectar clases por subcomponente:
  - `header`, `conversation`, `message`, `promptInput`, `submitButton`, etc.
- Ajustar `messageVariant="flat"` o `contained"` según la estética.
- Usar `unstyled={true}` y aplicar nuestros estilos CSS íntegramente.
- Envolver `Chat` con un contenedor con estilos consistentes (bordes, sombras, background) y asegurar `style={{ height: ... }}` correcto.

---

## Variables de Entorno Requeridas

Asegurar `.env.local` con:
- `NEXT_PUBLIC_API_URL` → base de Chatwoot (`https://tu-chatwoot.com`).
- `NEXT_PUBLIC_CHATWOOT_API_TOKEN` o `NEXT_PUBLIC_CHATWOOT_API_ACCESS_TOKEN` → token de Application API (servidor).
- `NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID` → ID de cuenta.
- `NEXT_PUBLIC_CHATWOOT_INBOX_ID` → ID del inbox tipo API.
- `NEXT_PUBLIC_CHATWOOT_CONTACT_ID` → ID del contacto existente.
- Opcional si no está vinculado el contacto al inbox:
  - `NEXT_PUBLIC_CHATWOOT_SOURCE_ID` → `source_id` válido para ese contacto/inbox.

Reiniciar el servidor tras cambios de `.env.local`.

---

## Endpoints Implementados (Proxy)

- `POST /api/chat/chatwoot/conversations`
  - Body: `{ accountId, inboxId, contactId, status?: 'open' }`
  - Devuelve: `{ conversationId }` o `400` si falta `source_id`.

- `POST /api/chat/chatwoot/conversations/:conversationId/messages`
  - Body: `{ accountId, content, message_type: 'incoming' }`
  - Devuelve: mensaje creado (opcional, según Chatwoot).

- `GET /api/chat/conversations/:conversationId/messages?accountId=...`
  - Devuelve: lista de mensajes; el cliente filtra `message_type === 'outgoing'` y agrega al store.

---

## Verificación Rápida

- Probar proxy vivo:
  - `GET /api/chat/chatwoot/conversations` → “proxy alive”.
- Crear conversación:
  - Si `source_id` es válido (vinculado o por `NEXT_PUBLIC_CHATWOOT_SOURCE_ID`), debe devolver `200` con `{ conversationId }`.
  - Si no, devuelve `400` con mensaje: “source_id not found…”.
- Enviar mensaje:
  - Requiere `conversationId`: `POST /api/chat/chatwoot/conversations/{id}/messages` con `{ accountId, content, message_type: 'incoming' }`.
- Polling de respuestas:
  - `GET /api/chat/conversations/{id}/messages?accountId={...}`; el cliente agrega `outgoing` al store.

---

## Errores que se Pueden Ignorar

- `GET /@vite/client 404`: típico de Next y no afecta funcionalidad en este setup.
- Mensajes “Compiled /_not-found”: normales durante build/rutas.

---

## Recomendaciones Finales

- Validar la configuración de Chatwoot (contacto vinculado al inbox API) para obtener `source_id` automáticamente.
- Si no es posible vincular todavía, usar `NEXT_PUBLIC_CHATWOOT_SOURCE_ID` como fallback mientras se estabiliza el flujo.
- Mantener el chat bajo importaciones dinámicas `ssr: false` para evitar errores de SSR/DOM.
- Personalizar estilos con `componentsStyles`, `messageVariant` y considerar `unstyled` para un control total.
- Si la recepción con polling no es suficiente, implementar SSE/WebSocket en el backend y conectar `onIncomingMessage` en el frontend.

---

## Posible Origen de los Problemas

- Del lado de la librería:
  - Exportaciones no alineadas con la guía (p. ej. `createTextMessage`).
  - Comportamiento que asume entorno cliente (necessidad de `document`) y puede fallar en SSR.
  - Rutas esperadas rígidas que requieren una `proxyBaseUrl` muy específica.

- Del lado del proyecto:
  - Configuración inicial de `proxyBaseUrl` equivocada (ruta duplicada).
  - Falta de vinculación `contactId` ↔ `inboxId` en Chatwoot, causando ausencia de `source_id`.
  - Dependencias React/Next relativamente nuevas (18.3.x / 15.x) que exigen client-only en librerías no SSR-safe.

En conjunto, hubo errores de ambos lados. Ya se resolvieron los de SSR/rutas y quedan los de configuración Chatwoot (`source_id`) y la estética del chat.

---

## Apéndice: Ejemplos de prueba (curl)

- Crear conversación:
```
curl -X POST http://localhost:3000/api/chat/chatwoot/conversations \
  -H "Content-Type: application/json" \
  -d '{"accountId": 2, "inboxId": 6, "contactId": 123, "status": "open"}'
```

- Enviar mensaje:
```
curl -X POST http://localhost:3000/api/chat/chatwoot/conversations/CONV_ID/messages \
  -H "Content-Type: application/json" \
  -d '{"accountId": 2, "content": "Hola", "message_type": "incoming"}'
```

- Listar mensajes (polling):
```
curl "http://localhost:3000/api/chat/conversations/CONV_ID/messages?accountId=2"
```

---

Si deseas, puedo ajustar los estilos del chat para que se vea acorde a tu branding y crear el endpoint SSE para respuestas en tiempo real. También puedo ayudarte a verificar los IDs y `source_id` en Chatwoot para cerrar el flujo end-to-end.