"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChatPage, defaultChatTheme } from "white-library";

/**
 * Chat
 * - Renderiza el chat como sección o como burbuja fija según `variant`.
 * - variant: "section" | "bubble" (por defecto "bubble").
 */
export default function Chat({
  variant = "bubble",
  theme = defaultChatTheme,
  config: configProp,
  className,
  style,
  buttonPosition = { right: 20, bottom: 50 },
  openByDefault = false,
  onOpenChange,
}) {
  // util: deep merge para no perder claves del tema por defecto
  const deepMerge = (base, override) => {
    if (!override) return base;
    const result = Array.isArray(base) ? [...base] : { ...base };
    for (const key of Object.keys(override)) {
      const oVal = override[key];
      const bVal = result[key];
      if (oVal && typeof oVal === "object" && !Array.isArray(oVal)) {
        result[key] = deepMerge(bVal || {}, oVal);
      } else {
        result[key] = oVal;
      }
    }
    return result;
  };
  const defaults = {
    agentUrl: "/api/chat",
    texts: {
      headerTitle: "Mi Asistente",
      inputPlaceholder: "Escribe tu mensaje...",
    },
  };
  const config = { ...defaults, ...(configProp || {}) };

  // Tema calculado: alineado con la paleta y estilo del sitio
  const containerHeight = variant === "section" ? "85vh" : "460px";

  const overrides = {
    container: {
      width: "100%",
      height: containerHeight,
      backgroundColor: "#0b0b0b",
    },
    header: {
      showTitle: true,
      title: defaults.texts.headerTitle,
      showIcon: false,
      backgroundColor: "#46dbbc",
      padding: "1rem",
      borderRadius: "0.5rem",
      titleColor: "#ffffff",
      titleFontSize: "1.125rem",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: "1px",
    },
    // Sin configuración de border = sin bordes por defecto
    bubbles: {
      user: {
        backgroundColor: "#17312F",
        textColor: "#C1ED00",
        borderRadius: "1rem 1rem 0.25rem 1rem",
        padding: "0.75rem 1rem",
      },
      assistant: {
        backgroundColor: "#0b0b0b",
        textColor: "#ffffff",
        borderRadius: "1rem 1rem 1rem 0.25rem",
        padding: "0.75rem 1rem",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: "1px",
      },
    },
    input: {
      backgroundColor: "#1D1D1F",
      borderColor: "#1D1D1F",
      borderRadius: "0.5rem",
      textColor: "#ffffff",
      placeholder: defaults.texts.inputPlaceholder,
      focusBorderColor: "#FF5722",
    },
  };
  const computedTheme = deepMerge(theme || defaultChatTheme, overrides);

  // Modo burbuja: manejo de apertura/cierre y accesibilidad
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(openByDefault);
  const lastActiveRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mounted, close]);

  useEffect(() => {
    if (!mounted) return;
    onOpenChange?.(open);
    if (open) {
      lastActiveRef.current = document.activeElement;
    } else if (lastActiveRef.current && lastActiveRef.current.focus) {
      try { lastActiveRef.current.focus(); } catch (_) {}
    }
  }, [open, onOpenChange, mounted]);

  if (variant === "section") {
    return (
      <section className={`dgm-chat-area pt-120 pb-120${className ? " " + className : ""}`} style={style}>
        <div className="container container-1230">
          <div className="row">
            <div className="col-12">
              <div
                className="dgm-chat-wrap"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  background: "#0b0b0b",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
                  overflow: "hidden",
                  height: containerHeight,
                  maxWidth: 700,
                  margin: "0 auto",
                }}
              >
                <ChatPage theme={computedTheme} config={config} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // variant === "bubble"
  if (!mounted) return null;

  const panelBottom = (buttonPosition?.bottom || 50) + 80;
  const right = buttonPosition?.right ?? 20;
  const bottom = buttonPosition?.bottom ?? 50;

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Abrir chat"
        style={{
          position: "fixed",
          right,
          bottom,
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
        }}
      >
        💬
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat"
          style={{
            position: "fixed",
            right,
            bottom: panelBottom,
            width: 320,
            height: 460,
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
          <button onClick={close} aria-label="Cerrar chat" style={{ alignSelf: "flex-end", padding: 8 }}>✕</button>
          <div style={{ flex: 1 }}>
            <ChatPage theme={computedTheme} config={config} />
          </div>
        </div>
      )}
    </>
  );
}