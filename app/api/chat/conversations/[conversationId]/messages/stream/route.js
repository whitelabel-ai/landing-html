export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, context) {
  try {
    const params = await context.params;
    const conversationId = Number(params?.conversationId);
    if (!conversationId) {
      return new Response("Missing conversationId", { status: 400 });
    }

    const eventsMod = await import("@/lib/events.js");
    const events = eventsMod.default;
    const channel = `message:${conversationId}`;

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    const write = async (payload) => {
      try {
        const data = typeof payload === "string" ? payload : JSON.stringify(payload);
        await writer.write(new TextEncoder().encode(`data: ${data}\n\n`));
      } catch (_) {}
    };

    // Send initial comment to establish stream
    await write("connected");

    const handler = (msg) => write(msg);
    events.on(channel, handler);

    // Close on client disconnect
    const abort = request.signal;
    abort.addEventListener("abort", () => {
      try {
        events.off(channel, handler);
        writer.close();
      } catch (_) {}
    });

    return new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[chat:messages:stream] error", err);
    return new Response("error", { status: 500 });
  }
}