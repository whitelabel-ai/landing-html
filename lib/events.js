import { EventEmitter } from "events";

// Singleton EventEmitter para difundir mensajes entrantes por conversación
// Uso: events.emit(`message:${conversationId}`, payload)
// Suscripción SSE: events.on(`message:${conversationId}`, handler)
const events = global.__chatwootEvents || new EventEmitter();
if (!global.__chatwootEvents) {
  global.__chatwootEvents = events;
}

export default events;