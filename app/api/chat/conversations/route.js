export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("chatwoot conversations proxy alive", { status: 200 });
}

export async function POST() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const ACCOUNT_ID = Number(process.env.NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID);
    const INBOX_ID = Number(process.env.NEXT_PUBLIC_CHATWOOT_INBOX_ID);
    const CONTACT_ID = Number(process.env.NEXT_PUBLIC_CHATWOOT_CONTACT_ID);
    const API_TOKEN = process.env.NEXT_PUBLIC_CHATWOOT_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CHATWOOT_API_TOKEN;

    if (!BASE_URL || !ACCOUNT_ID || !INBOX_ID || !CONTACT_ID) {
      return new Response("Missing Chatwoot env configuration", { status: 500 });
    }

    const url = `${BASE_URL.replace(/\/+$/, "")}/api/v1/accounts/${ACCOUNT_ID}/conversations`;

    const body = {
      inbox_id: INBOX_ID,
      contact_id: CONTACT_ID,
      status: "open",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN ? { "api_access_token": API_TOKEN } : {}),
      },
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
      console.log(res);
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
    console.error("[chatwoot:conversations] error", err);
    return new Response(JSON.stringify({ error: true, message: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}