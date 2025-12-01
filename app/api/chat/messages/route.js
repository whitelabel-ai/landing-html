export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("chatwoot messages proxy alive", { status: 200 });
}

export async function POST(request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      return new Response(JSON.stringify({ error: true, message: "Missing NEXT_PUBLIC_API_URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Leer body del cliente: conversation_id y content dinámicos
    const input = await request.json().catch(() => ({}));
    const conversationId = input?.conversation_id;
    const content = input?.content;
    const messageType = input?.message_type || "incoming";

    if (!conversationId || isNaN(Number(conversationId))) {
      return new Response(JSON.stringify({ error: true, message: "conversation_id inválido o ausente" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: true, message: "content inválido o ausente" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = `${baseUrl.replace(/\/+$/, "")}/api/v1/accounts/2/conversations/${encodeURIComponent(
      String(conversationId)
    )}/messages`;

    const body = {
      content: content,
      message_type: messageType,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Si existe token de API, incluirlo (recomendado por Chatwoot)
    const token = process.env.NEXT_PUBLIC_CHATWOOT_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CHATWOOT_API_TOKEN;
    if (token) {
      headers["api_access_token"] = token; // Alternativa posible: Authorization: `Bearer ${token}`
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { raw: text };
    }

    if (!res.ok) {
      return new Response(JSON.stringify({ error: true, status: res.status, data }), {
        status: res.status || 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[chatwoot:messages] error", err);
    return new Response(JSON.stringify({ error: true, message: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}