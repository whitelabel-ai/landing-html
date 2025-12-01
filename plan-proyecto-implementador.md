# Plan de acción: Integración Chatwoot en el proyecto implementador

Este documento guía a quien consume la librería (white-library) para integrar Chatwoot como backend de conversaciones. Está estrictamente basado en documentación oficial de Chatwoot y separa responsabilidades entre frontend y backend.

## Decidir el modo de integración

- `mode: 'api'` (Application API + webhook):
  - Requiere `api_access_token` en el servidor y configurar un **Callback URL** (webhook) al crear el inbox de tipo API [4].
  - Ventajas: control y seguridad total en servidor; adecuado para integraciones robustas.
- `mode: 'public'` (Client APIs):
  - Usa `inbox_identifier` en el cliente, crea/recupera `contact` y `conversation` vía `public/api/v1` y recibe eventos vía WebSocket con `pubsub_token` [2][3][1].
  - Ventajas: no necesita backend para enviar/recibir; útil para prototipos o frontends puros con restricciones.

## Prerrequisitos en Chatwoot

1. Crear Inbox de tipo API: Settings → Inboxes → “Add Inbox” → API; definir **Callback URL** (webhook) [4].
2. Obtener `api_access_token` (Profile → Access Token) para Application APIs [4].
3. Identificar `inbox_identifier` si se usará `mode: 'public'` [4].

## Backend (solo `mode: 'api'`)

- Proxy de Application API (firmado con `api_access_token`):
  - Crear conversación: `POST /api/v1/accounts/{accountId}/conversations` con `source_id`, `inbox_id`, `status` [1].
  - Enviar mensaje: `POST /api/v1/accounts/{accountId}/conversations/{conversationId}/messages` con `{ content, message_type: 'incoming' }` [4].
  - Exponer endpoints internos para el frontend, por ejemplo:
    - `POST {proxyBaseUrl}/chatwoot/conversations` → `{ conversationId }`.
    - `POST {proxyBaseUrl}/chatwoot/conversations/{conversationId}/messages` → `{ id, content }`.
- Webhook `message_created` (Callback URL):
  - Recibir POST de Chatwoot y validar `event === 'message_created'` [4].
  - Reenviar al frontend mediante **SSE/WebSocket** o, como alternativa, exponer un endpoint GET para polling.
  - Payload de ejemplo incluye `content`, `sender`, `conversation`, `message_type` [4].
- Seguridad:
  - Nunca exponer `api_access_token` al cliente.
  - Restringir CORS, validar orígenes y sanitizar payloads.
  - Loggear mínimos; evitar tokens/IDs sensibles.

### Ejemplo mínimo de webhook (Node/Next.js)

```ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("chatwoot webhook alive", { status: 200 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (payload?.event !== "message_created") {
      return new Response("ignored", { status: 200 });
    }
    // TODO: reenviar a cliente (SSE/WebSocket)
    return new Response("ok", { status: 200 });
  } catch (err) {
    return new Response("bad request", { status: 400 });
  }
}
```

## Frontend con la librería (ambos modos)

- Configurar el Chat con `agentType='chatwoot'` y `agentConfig` según el modo:
  - `api`: `{ mode: 'api', proxyBaseUrl, accountId?, onIncomingMessage? }`.
  - `public`: `{ mode: 'public', publicApiBaseUrl, inboxIdentifier, websocketUrl }`.
- Persistencia y sesión:
  - La librería guardará `conversationId` (y en `public`, `sourceId` + `pubsubToken`) en `localStorage` para mantener una conversación por navegador hasta reset.
  - El proyecto puede ofrecer un botón “Reset” que borre la sesión local y reinicie el flujo.
- Recepción de mensajes:
  - `api`: suscribirse al canal del backend (SSE/WS) y pasar los mensajes recibidos al callback `onIncomingMessage` para que la librería los normalice y muestre.
  - `public`: la librería/cliente se suscribe directamente a `RoomChannel` con `pubsub_token` [1].

## Flujo `mode: 'public'` (Client APIs)

1. Crear/asegurar contacto: `POST /public/api/v1/inboxes/{inbox_identifier}/contacts` → obtiene `source_id` y `pubsub_token` [2].
2. Crear conversación: `POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{source_id}/conversations` → `conversationId` [1].
3. Enviar mensaje: `POST /public/api/v1/inboxes/{inbox_identifier}/contacts/{source_id}/conversations/{conversationId}/messages` con `{ content }`.
4. Suscripción WebSocket: conectar a `ws://{host}/cable` y suscribirse a `RoomChannel` con `pubsub_token` (documentado en la guía) [1].

## Flujo `mode: 'api'` (Application API)

1. Backend obtiene/crea contacto y su `source_id` (API de contactos) [4].
2. Backend crea conversación con `source_id` e `inbox_id` y devuelve `conversationId` al frontend [1].
3. Frontend envía mensajes al backend → backend los firma y envía a Chatwoot (`message_type: 'incoming'`) [4].
4. Backend recibe mensajes del agente vía webhook y los reenvía al frontend.

## Despliegue y operativa

- CORS y dominios permitidos: configurar en backend y, si aplica, en la instalación de Chatwoot.
- Variables de entorno: `CHATWOOT_API_URL`, `CHATWOOT_ACCOUNT_ID`, `API_ACCESS_TOKEN`, `INBOX_IDENTIFIER`, `PUBLIC_API_BASE_URL`.
- Observabilidad: logs estructurados en webhook y proxy; métricas básicas de éxito/error.
- Rate limiting: proteger endpoints internos frente a abuso.

## Pruebas

- Unit: validación de `agentConfig` por modo; normalización de mensajes entrantes.
- Integración: flujo completo de crear contacto/conversación y enviar/recibir mensajes.
- E2E: reconexión WebSocket (`public`) y entrega vía webhook (`api`).

## Referencias

- [1] Create New Conversation (Application API): https://developers.chatwoot.com/api-reference/conversations/create-new-conversation
- [2] Create a contact (Client APIs/Public): https://developers.chatwoot.com/api-reference/contacts-api/create-a-contact
- [3] Get a contact (Client APIs/Public): https://developers.chatwoot.com/api-reference/contacts-api/get-a-contact
- [4] User Guide – API Channel Inbox & Webhooks: https://www.chatwoot.com/hc/user-guide/articles/1677839703-how-to-create-an-api-channel-inbox
- [5] Get messages (Application API): https://developers.chatwoot.com/api-reference/messages/get-messages

Con este plan, el proyecto implementador tiene una ruta sólida para integrar Chatwoot, tanto en modalidad sin backend (`public`) como con backend y seguridad reforzada (`api`).