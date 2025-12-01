export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("chatwoot webhook alive", { status: 200 });
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (payload?.event !== "message_created") {
      return new Response("ignored", { status: 200 });
    }

    const { id, content, sender, conversation, message_type, created_at } = payload;
    const conversationId = conversation?.id;
    console.log("[chatwoot:webhook] message_created", {
      id,
      content,
      type: message_type,
      createdAt: created_at,
      senderId: sender?.id,
      conversationId,
    });

    // Emitir sólo mensajes salientes del agente para consumo del cliente
    try {
      const eventsMod = await import("../../../../lib/events.js");
      const events = eventsMod.default;
      if (conversationId && message_type === "outgoing") {
        events.emit(`message:${conversationId}` , {
          id,
          content,
          message_type,
          created_at,
          sender,
          conversation,
        });
      }
    } catch (e) {
      console.error("[chatwoot:webhook] emitter error", e);
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("[chatwoot:webhook] error", err);
    return new Response("bad request", { status: 400 });
  }
}