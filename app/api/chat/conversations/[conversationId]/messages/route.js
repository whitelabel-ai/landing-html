export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CHATWOOT_API_TOKEN;

async function fetchJSON(url, init) {
  const res = await fetch(url, init);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Chatwoot API error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function GET(request, context) {
  try {
    if (!BASE_URL || !API_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_CHATWOOT_API_TOKEN" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const { searchParams } = new URL(request.url);
    const accountId = Number(searchParams.get("accountId") || process.env.NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID);
    const params = await context.params;
    const conversationId = Number(params?.conversationId);
    if (!conversationId || !accountId) {
      return new Response(JSON.stringify({ error: "Missing conversationId or accountId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const url = `${BASE_URL.replace(/\/+$/, "")}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;
    const list = await fetchJSON(url, { headers: { "api_access_token": API_TOKEN } });
    return new Response(JSON.stringify(list || []), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[chat:messages:list] error", err);
    return new Response(JSON.stringify({ error: "Failed to fetch messages" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request, context) {
  try {
    if (!BASE_URL || !API_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_CHATWOOT_API_TOKEN" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { searchParams } = new URL(request.url);
    const accountId = Number(searchParams.get("accountId") || process.env.NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID);
    const params = await context.params;
    const conversationId = Number(params?.conversationId);
    const bodyInput = await request.json().catch(() => ({}));
    const content = bodyInput?.content;
    const messageType = bodyInput?.message_type || "incoming";

    if (!conversationId || !accountId) {
      return new Response(JSON.stringify({ error: "Missing conversationId or accountId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Invalid content" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = `${BASE_URL.replace(/\/+$/, "")}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;
    const payload = { content, message_type: messageType };
    const created = await fetchJSON(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api_access_token": API_TOKEN },
      body: JSON.stringify(payload),
    });

    // Emitir evento para clientes SSE (opcional)
    try {
      const eventsMod = await import("@/lib/events.js");
      const events = eventsMod.default;
      const channel = `message:${conversationId}`;
      events.emit(channel, created);
    } catch (_) {}

    return new Response(JSON.stringify(created || {}), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[chat:messages:create] error", err);
    return new Response(JSON.stringify({ error: "Failed to create message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}