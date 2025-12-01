"use client";

import { useChatConversationStore, useChatwootAgentStore } from "white-library";
import React, { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
const WhiteChatDyn = dynamic(() => import("white-library").then((m) => m.Chat), { ssr: false });

export default function Chat({ className, style, height, useDefaultTheme = false }) {
  // util: deep merge para no perder claves del tema por defecto
  const defaults = {
    texts: {
      headerTitle: "Vale IA",
      inputPlaceholder: "Escribe tu mensaje...",
    },
  };

  // Tema calculado: alineado con la paleta y estilo del sitio
  const containerHeight = height ? `${height}px` : "560px";

  // estilos visuales del contenedor externo (la librería gestiona sus propios estilos internos)

  // Clases Tailwind forzadas para neutralizar overrides globales y fijar orientación/colores
  const chatStyles = {
    // header: "flex items-center justify-between bg-yellow-500 text-black border-b border-yellow-600",
    // conversation: "flex flex-col flex-1 min-h-0 gap-3 p-4 bg-neutral-900 text-neutral-100 overflow-y-auto",
    // conversationContent: "flex flex-col gap-3 space-y-3",
    emptyState: "text-neutral-100",
    // scrollButton: "bg-neutral-800 text-white rounded-md px-2 py-1 shadow",
    // message: "self-end text-white",
    messageContent: "bg-white",
    // response: "self-start max-w-[85%] px-4 py-3 bg-neutral-700 text-white border border-neutral-700 rounded-t-lg rounded-br-lg",
    // promptInput: "sticky bottom-0 z-10 flex items-center gap-3 p-3 bg-neutral-900 border-t border-neutral-800",
    textarea: "flex-1 h-14 bg-white text-dark placeholder:text-white",
    submitButton: "bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-3 shadow-sm",
    speechButton: "bg-neutral-700 hover:bg-neutral-600 text-white rounded-md px-3 py-3",
  };

  const pollRef = useRef({ running: false, conversationId: null, timerId: null });
  const lastUserSentAtRef = useRef(0);
  const lastAssistantReceivedAtRef = useRef(0);

  // Configuración del agente Chatwoot (modo API) según guía
  const accountId = Number(process.env.NEXT_PUBLIC_CHATWOOT_ACCOUNT_ID || 0);
  const inboxId = Number(process.env.NEXT_PUBLIC_CHATWOOT_INBOX_ID || 0);
  const contactId = Number(process.env.NEXT_PUBLIC_CHATWOOT_CONTACT_ID || 0);
  const proxyBaseUrl = "/api/chat"; // rutas locales del proxy

  // Config API disponible si se requiere más adelante

  // Polling básico de mensajes salientes del agente y volcado al store
  const addMessage = useChatConversationStore((s) => s.addMessage);
  const addMessageRef = useRef(addMessage);
  const initializeSession = useChatConversationStore((s) => s.initializeSession);
  const messages = useChatConversationStore((s) => s.messages || []);
  const seenIdsRef = useRef(new Set());
  const creatingRef = useRef(false);
  const convStore = useChatwootAgentStore ? useChatwootAgentStore() : null;
  const log = (...args) => { try { console.log("[ChatFlow]", ...args); } catch (_) {} };

  // Helpers de normalización: message_type y created_at
  const isOutgoing = (type) => type === 1 || type === "outgoing";
  const isIncoming = (type) => type === 0 || type === "incoming";
  const toISO = (createdAt) => {
    try {
      if (!createdAt) return new Date().toISOString();
      if (typeof createdAt === "number") {
        const millis = createdAt < 1e12 ? createdAt * 1000 : createdAt;
        return new Date(millis).toISOString();
      }
      if (typeof createdAt === "string") {
        const d = new Date(createdAt);
        if (!isNaN(d.getTime())) return d.toISOString();
      }
      return new Date().toISOString();
    } catch (_) {
      return new Date().toISOString();
    }
  };
  const toMillis = (createdAt) => {
    try {
      if (!createdAt) return Date.now();
      if (typeof createdAt === "number") return createdAt < 1e12 ? createdAt * 1000 : createdAt;
      if (typeof createdAt === "string") {
        const d = new Date(createdAt);
        if (!isNaN(d.getTime())) return d.getTime();
      }
      return Date.now();
    } catch (_) { return Date.now(); }
  };
  // Extraer array de mensajes desde diferentes formas de respuesta
  const coerceList = (raw) => {
    try {
      if (Array.isArray(raw)) return raw;
      if (!raw || typeof raw !== "object") return [];
      const candidates = raw.payload || raw.messages || raw.data || raw.result || raw.list;
      return Array.isArray(candidates) ? candidates : [];
    } catch (_) {
      return [];
    }
  };

  // Inicializar sesión del chat (persistencia y estructura del store)
  useEffect(() => {
    try { initializeSession && initializeSession(); log("init: session initialized"); } catch (_) { log("init: session init error"); }
  }, [initializeSession]);

  // Mantener referencia fresca de addMessage para evitar cierres obsoletos
  useEffect(() => {
    addMessageRef.current = addMessage;
  }, [addMessage]);

  // Crear conversación si no existe y sincronizar historial; si existe, sincronizar de inmediato
  useEffect(() => {
    const syncHistory = async (conversationId) => {
      try {
        const resHist = await fetch(`${proxyBaseUrl}/conversations/${conversationId}/messages`);
        if (!resHist.ok) { log("history:init: fetch failed", resHist.status); return; }
        const raw = await resHist.json().catch(() => []);
        const list = coerceList(raw);
        // Orden cronológico ascendente
        list.sort((a, b) => toMillis(a?.created_at) - toMillis(b?.created_at));
        for (const m of list) {
          const id = String(m?.id ?? "");
          const type = m?.message_type;
          const content = m?.content || "";
          if (!id) continue;
          if (!isOutgoing(type)) continue;
          if (!seenIdsRef.current.has(id)) {
            seenIdsRef.current.add(id);
            addMessageRef.current({ id, role: "assistant", parts: [{ type: "text", text: content }], content, createdAt: toISO(m?.created_at) });
          }
        }
        log("history:init: synced", { count: list.length });
      } catch (_) {}
    };

    const ensureConversation = async () => {
      const existing = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("chatwootConversation") || "null")
        : null;
      if (existing?.conversationId) {
        if ((Array.isArray(messages) && messages.length > 0)) {
          return;
        }
        await syncHistory(existing.conversationId);
        return;
      }
      if (creatingRef.current) return;
      creatingRef.current = true;
      try {
        const res = await fetch(`/api/chat/conversations`, { method: "POST" });
        if (!res.ok) { log("init: failed to create conversation", res.status); return; }
        const data = await res.json().catch(() => ({}));
        const conversationId = data?.id || data?.conversationId;
        if (conversationId) {
          localStorage.setItem("chatwootConversation", JSON.stringify({ conversationId }));
          await syncHistory(conversationId);
        }
      } catch (_) {} finally { creatingRef.current = false; }
    };
    ensureConversation();
  }, []);

  // SSE deshabilitado: nos enfocamos en polling sólo después de enviar

  // Fallback de polling: consulta periódica tras un envío para captar respuestas
  const stopPoll = () => {
    try {
      if (pollRef.current.timerId) clearTimeout(pollRef.current.timerId);
    } catch (_) {}
    pollRef.current.running = false;
    pollRef.current.timerId = null;
  };

  const startPoll = (conversationId) => {
    if (pollRef.current.running && pollRef.current.conversationId === conversationId) {
      log("poll: already running", conversationId);
      return;
    }
    let attempts = 0;
    const QUIET_MS = 4000;
    pollRef.current.running = true;
    pollRef.current.conversationId = conversationId;
    const run = async () => {
      if (!pollRef.current.running || pollRef.current.conversationId !== conversationId) return;
      attempts += 1;
      log("poll: attempt", attempts);
      let added = false;
      try {
        const res = await fetch(`${proxyBaseUrl}/conversations/${conversationId}/messages`);
        if (res.ok) {
          const raw = await res.json().catch(() => []);
          const list = coerceList(raw);
          // Orden cronológico ascendente y filtrar sólo respuestas nuevas del assistant
          list.sort((a, b) => toMillis(a?.created_at) - toMillis(b?.created_at));
          log("poll: fetched", { count: Array.isArray(list) ? list.length : 0 });
          if (Array.isArray(list)) {
            for (const m of list) {
              const id = String(m?.id ?? "");
              const type = m?.message_type;
              const content = m?.content || "";
              const createdMs = toMillis(m?.created_at);
              if (id && isOutgoing(type) && !seenIdsRef.current.has(id) && createdMs >= (lastUserSentAtRef.current || 0)) {
                seenIdsRef.current.add(id);
                log("poll: adding assistant", { id, contentLen: content?.length || 0 });
                addMessageRef.current({
                  id,
                  role: "assistant",
                  parts: [{ type: "text", text: content }],
                  content,
                  createdAt: toISO(m?.created_at),
                });
                lastAssistantReceivedAtRef.current = Date.now();
                log("poll: added", { id });
                added = true;
              } else if (!id) {
                log("poll: skip no id", m);
              } else if (!isOutgoing(type)) {
                log("poll: skip non-outgoing", { id, type });
              } else if (seenIdsRef.current.has(id)) {
                log("poll: skip duplicate", { id });
              } else if (createdMs < (lastUserSentAtRef.current || 0)) {
                log("poll: skip older than last user", { id });
              }
            }
          }
        } else {
          log("poll: fetch failed", res.status);
        }
      } catch (_) {}
      const now = Date.now();
      const quietEnough = lastAssistantReceivedAtRef.current > 0 && (now - lastAssistantReceivedAtRef.current) >= QUIET_MS;
      if (!added && quietEnough) {
        pollRef.current.running = false;
        if (pollRef.current.timerId) {
          try { clearTimeout(pollRef.current.timerId); } catch (_) {}
          pollRef.current.timerId = null;
        }
        log("poll: stopped after quiet period", { attempts, quietMs: now - lastAssistantReceivedAtRef.current });
        return;
      }
      if (attempts < 45) { // ~90s total máximo
        pollRef.current.timerId = setTimeout(run, 2000);
      } else {
        pollRef.current.running = false;
        pollRef.current.timerId = null;
        log("poll: stopped max attempts");
      }
    };
    run();
  };

  // Limpiar polling al desmontar
  useEffect(() => {
    return () => {
      try {
        if (pollRef.current.timerId) clearTimeout(pollRef.current.timerId);
        pollRef.current.running = false;
        pollRef.current.timerId = null;
      } catch (_) {}
    };
  }, []);

  // Suscripción SSE para recibir respuestas del assistant en tiempo real (robusta)
  useEffect(() => {
    let sse;
    let retryTimer = null;
    const connect = () => {
      try {
        const existing = typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("chatwootConversation") || "null")
          : null;
        const conversationId = existing?.conversationId;
        if (!conversationId) {
          retryTimer = setTimeout(connect, 1000);
          return;
        }
        sse = new EventSource(`/api/chat/conversations/${conversationId}/messages/stream`);
        sse.onmessage = (evt) => {
          try {
            const data = evt?.data;
            if (!data || data === "connected") return;
            const msg = JSON.parse(data);
            const id = String(msg?.id ?? "");
            const type = msg?.message_type;
            const content = msg?.content || "";
            const createdMs = toMillis(msg?.created_at);
            if (!id || !isOutgoing(type)) return;
            if (seenIdsRef.current.has(id)) return;
            if (createdMs < (lastUserSentAtRef.current || 0)) return;
            seenIdsRef.current.add(id);
            addMessageRef.current({
              id,
              role: "assistant",
              parts: [{ type: "text", text: content }],
              content,
              createdAt: toISO(msg?.created_at),
            });
            lastAssistantReceivedAtRef.current = Date.now();
          } catch (_) {}
        };
        sse.onerror = () => {
          try { sse.close(); } catch (_) {}
          retryTimer = setTimeout(connect, 2000);
        };
      } catch (_) {
        retryTimer = setTimeout(connect, 2000);
      }
    };
    connect();
    return () => {
      try { if (sse) sse.close(); } catch (_) {}
      if (retryTimer) {
        try { clearTimeout(retryTimer); } catch (_) {}
        retryTimer = null;
      }
    };
  }, []);

  return (
    <div
      className={`dgm-chat-wrap${className ? " " + className : ""}`}
      style={{
        borderRadius: 12,
        background: "#0b0b0b",
        boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
        overflow: "hidden",
        height: containerHeight,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <WhiteChatDyn
        agentType="custom"
        agentConfig={{
          onSendMessage: async (text) => {
            const conversationId =
              (convStore && convStore.conversationId) ||
              (typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("chatwootConversation") || "null")?.conversationId
                : null);
            if (!conversationId) return;
            // Añadir primero el mensaje del usuario al store para feedback inmediato
            const id = `${Date.now()}`;
            addMessage({ id, role: "user", parts: [{ type: "text", text }], content: text, createdAt: new Date().toISOString() });
            lastUserSentAtRef.current = Date.now();
            lastAssistantReceivedAtRef.current = 0;
            stopPoll();
            log("send: user message added", { id });
            try {
              await fetch(`${proxyBaseUrl}/conversations/${conversationId}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text, message_type: "incoming" }),
              });
              // Iniciar polling corto para capturar respuesta si el webhook/SSE no llega
              startPoll(conversationId);
              log("send: posted to server, polling started", conversationId);
            } catch (_) {}
          },
          messages: useMemo(() => {
            try {
              const arr = Array.isArray(messages) ? [...messages] : [];
              const uniq = [];
              const seen = new Set();
              for (const m of arr) {
                const id = String(m?.id ?? "");
                if (!id) continue;
                if (seen.has(id)) continue;
                seen.add(id);
                uniq.push(m);
              }
              uniq.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
              return uniq;
            } catch (_) { return messages; }
          }, [messages]),
          isLoading: false,
        }}
        // className={className}
        style={{ height: containerHeight }}
        // messageVariant="contained"
        componentsStyles={useDefaultTheme ? undefined : chatStyles}
      />
    </div>
  );
}
