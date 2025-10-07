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

    const { id, content, sender, conversation } = payload;
    console.log("[chatwoot:webhook] message_created", {
      id,
      content,
      senderId: sender?.id,
      conversationId: conversation?.id,
    });

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("[chatwoot:webhook] error", err);
    return new Response("bad request", { status: 400 });
  }
}