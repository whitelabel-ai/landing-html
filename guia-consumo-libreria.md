# Guía de Consumo de white-library (Chat + Chatwoot)

Esta guía explica cómo integrar la librería `white-library` en un proyecto consumidor, configurar el componente de chat, seleccionar el tipo de agente, y habilitar la integración con Chatwoot modo API.

Versión publicada: `white-library@1.0.3`.

## Instalación

```bash
npm install white-library
```

## Importación y Render del Chat

```tsx
import React from 'react';
import { Chat } from 'white-library';

export default function MyChat() {
  return (
    <Chat
      agentType="staticAgent"
      agentConfig={{ agentUrl: 'https://tu-agente.com/webhook' }}
      className="max-w-2xl mx-auto"
      style={{ height: '600px' }}
      messageVariant="contained"
    />
  );
}
```

## Props del Componente Chat

- `agentType?: 'staticAgent' | 'custom' | 'useChat' | 'chatwoot' | undefined`
- `agentConfig?: AgentConfig` según el agente seleccionado (ver secciones siguientes).
- `className?: string` y `style?: React.CSSProperties` para layout.
- `componentsStyles?: Partial<ComponentsStyles>` permite ajustar clases CSS por subcomponente:
  - `header`, `conversation`, `conversationContent`, `emptyState`, `scrollButton`, `message`, `messageContent`, `response`, `promptInput`, `textarea`, `submitButton`, `speechButton`.
- `messageVariant?: 'contained' | 'flat'` variante visual de burbujas.
- `unstyled?: boolean` si deseas render sin estilos base de la librería.

## Tipos de Agente y Configuración

### 1) staticAgent

- `StaticAgentConfig`: `{ agentUrl: string }`
- Uso típico: el mensaje del usuario se envía a `agentUrl` (POST JSON o multipart) junto a `sessionId` gestionado automáticamente por la librería; las respuestas se agregan al store de conversación.

Ejemplo:
```tsx
<Chat agentType="staticAgent" agentConfig={{ agentUrl: 'https://tu-agente.com/webhook' }} />
```

### 2) custom

- `CustomAgentConfig`:
  - `onSendMessage: (message: string) => Promise<void>`
  - `onSendAudio?: (audioBase64: string) => Promise<void>`
  - `messages: Message[]` (controlado por el proyecto)
  - `isLoading: boolean`
  - `status?: ChatStatus`

Ejemplo mínimo:
```tsx
const myConfig = {
  onSendMessage: async (text: string) => {
    // Tu envío: API, WebSocket, etc.
  },
  messages: [],
  isLoading: false,
};
<Chat agentType="custom" agentConfig={myConfig} />
```

### 3) useChat (ai-sdk)

- No requiere `agentConfig` específico; usa el hook `useChat` del paquete `ai`.
- El componente `Chat` conectará con el estado y envío del `useChat` por defecto.

Ejemplo:
```tsx
<Chat agentType="useChat" />
```

### 4) chatwoot (modo API)

Soportado actualmente: `mode: 'api'` (Application API a través de proxy backend). El modo `public` (Client APIs + WebSocket) no está implementado en esta versión.

- `ChatwootAgentConfig`:
  - `mode: 'api'`
  - `accountId: number`
  - `inboxId: number`
  - `contactId: number`
  - `proxyBaseUrl: string`

Flujo:
1. La librería crea o carga `conversationId` (persistido en `localStorage`).
2. Enviar mensaje: POST al proxy backend → Chatwoot con `{ content, message_type: 'incoming' }`.
3. Recepción: el backend debe manejar webhooks de Chatwoot y (opcionalmente) reenviar al frontend vía SSE/WebSocket; el frontend añade al store de conversación.

Ejemplo de integración frontend:
```tsx
<Chat
  agentType="chatwoot"
  agentConfig={{
    mode: 'api',
    accountId: 2,
    inboxId: 6,
    contactId: 123, // contacto existente
    proxyBaseUrl: 'https://mi-backend.com',
  }}
  className="max-w-3xl mx-auto"
  style={{ height: '600px' }}
/>
```

Endpoints esperados en el backend (proxy):

```http
POST {proxyBaseUrl}/chatwoot/conversations
Body: { accountId, inboxId, contactId, status: 'open' }
→ 200 { conversationId }

POST {proxyBaseUrl}/chatwoot/conversations/{conversationId}/messages
Body: { accountId, content, message_type: 'incoming' }
→ 200 { id, content, ... } (opcional)
```

Responsabilidades del backend:
- Firmar las llamadas a Chatwoot con `api_access_token` (no exponer en el cliente).
- Manejar webhooks de Chatwoot (mensajes salientes del agente) y reenviarlos al frontend (SSE/WebSocket) o permitir `polling`.
- Enviar al frontend un evento con el texto de respuesta y, en el cliente, añadirlo al store de conversación.

## Store de Conversación (persistencia)

- `useChatConversationStore` (Zustand):
  - `initializeSession()` gestiona `sessionId` y carga mensajes de `localStorage`.
  - `addMessage(message: Message | LegacyMessage)` agrega y persiste.
  - `clearSession()` reinicia la sesión del chat.
  - Persistencia en `localStorage` clave `chat-session` con expiración.

Modelo de mensaje:
```ts
type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: { type: 'text' | 'audio' | 'data' | 'file'; text?: string; audio?: string }[];
  createdAt?: string;
  content?: string;
  mimetype?: 'text' | 'audio';
}
```

Helpers:
- `createTextMessage(content: string, role?: 'user'|'assistant'|'system')`
- `createAudioMessage(audioBase64: string, role?: 'user'|'assistant'|'system')`

## Stores de Agente (avanzado)

- `useStaticAgentStore`:
  - Gestiona `sessionId`, expiración y envío a `agentUrl`.
- `useChatwootAgentStore`:
  - Propiedades de configuración para modo `api`.
  - `initializeSession()` y `createConversation()` → proxy backend.
  - `sendTextMessage(content)` envía mensajes como `incoming`.
  - Persistencia `conversationId` en `localStorage` (`chatwootConversation`).

Exportados desde la librería:
```ts
import { useChatConversationStore, useStaticAgentStore, useChatwootAgentStore } from 'white-library';
```

## Estilos y Personalización

- `componentsStyles`: puedes inyectar clases CSS Tailwind/propias en cada subcomponente del chat.
- `messageVariant`: `'contained'` ofrece burbujas con fondo; `'flat'` texto simple.
- `unstyled`: si deseas renderizar sin estilos por defecto.
- El proyecto puede incluir sus hojas de estilo y Tailwind v4; asegúrate de configurar PostCSS con `@tailwindcss/postcss`.

## Integración con Chatwoot (backend ejemplo pseudo-code)

```ts
// Express pseudo-code
app.post('/chatwoot/conversations', async (req, res) => {
  const { accountId, inboxId, contactId, status } = req.body;
  // Llama a Chatwoot Application API con api_access_token
  // Devuelve conversationId
  res.json({ conversationId: '12345' });
});

app.post('/chatwoot/conversations/:conversationId/messages', async (req, res) => {
  const { accountId, content } = req.body;
  const { conversationId } = req.params;
  // Llama a Chatwoot: crear mensaje incoming
  res.json({ id: 'm1', content }); // opcionalmente eco
});

// Webhook de Chatwoot (message_created)
app.post('/webhooks/chatwoot', (req, res) => {
  const event = req.body; // normaliza y reenvía al frontend vía SSE/WebSocket
  res.sendStatus(200);
});
```

## Buenas Prácticas y Seguridad

- No expongas `api_access_token` en el frontend.
- Limita orígenes (CORS) y valida parámetros en el proxy.
- Persistencia: el cliente gestiona su `sessionId` (staticAgent) y `conversationId` (chatwoot api).

## Solución de Problemas (Tailwind v4)

- En `postcss.config.js` usa `@tailwindcss/postcss`:
  ```js
  export default { plugins: { '@tailwindcss/postcss': {}, autoprefixer: {} } }
  ```
- Evita configurar `tailwindcss` como plugin de PostCSS vía Vite directamente; usa el archivo de PostCSS.

## Checklist de Integración

- Instalar `white-library@1.0.3`.
- Elegir `agentType` y preparar `agentConfig`.
- Para Chatwoot (modo API): preparar el proxy backend con los endpoints indicados.
- Conectar recepción de mensajes (webhooks → SSE/WebSocket) y añadir al store de conversación.
- Ajustar estilos con `componentsStyles`, `className`, `style`.

---

Con esta guía, tu proyecto puede consumir la librería `white-library`, renderizar el chat y conectar con Chatwoot de forma segura y tipada usando el modo API.