"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatPage, defaultChatTheme } from "white-library";

// Importación estática para evitar chunks separados y posibles dobles runtimes

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleEscape = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mounted, close]);

  const chatConfig = {
    agentUrl: "/api/chat",
    texts: {
      headerTitle: "Mi Asistente",
      inputPlaceholder: "Escribe tu mensaje...",
    },
  };

  if (!mounted) return null;

  return (
    <>
      <button onClick={toggle} style={{
          position: "fixed",
          right: 20,
          bottom: 50,
          height: 48,
          width: 48,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          cursor: "pointer",
          zIndex: 100,
        }}>
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 130,
            width: 360,
            height: 480,
            background: "#0b0b0b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
            overflow: "hidden",
            zIndex: 101,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={close}>✕</button>
          <div style={{ flex: 1 }}>
            <ChatPage theme={defaultChatTheme} config={chatConfig} />
          </div>
        </div>
      )}
    </>
  );
}