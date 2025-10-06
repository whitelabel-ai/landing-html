"use client";

import { ChatPage, defaultChatTheme } from "white-library";

export default function Chat({
  theme = defaultChatTheme,
  config: configProp,
  className,
  style,
  height,
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
      headerTitle: "Vale IA",
      inputPlaceholder: "Escribe tu mensaje...",
    },
  };
  const config = { ...defaults, ...(configProp || {}) };

  // Tema calculado: alineado con la paleta y estilo del sitio
  const containerHeight = height ? `${height}px` : "560px";

  const overrides = {
    ...defaultChatTheme,
    container: {
      width: "100%",
      height: containerHeight,
      backgroundColor: "#121212",
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
        backgroundColor: "#46dbbc",
        textColor: "#E6FF8D",
        borderRadius: "1rem 1rem 0.25rem 1rem",
        padding: "0.75rem 1rem",
        borderColor: "#174B46",
        borderWidth: "1px",
      },
      assistant: {
        backgroundColor: "#46dbbc",
        textColor: "#ffffff",
        borderRadius: "1rem 1rem 1rem 0.25rem",
        padding: "0.75rem 1rem",
        borderColor: "#334155",
        borderWidth: "1px",
      },
    },
    input: {
      backgroundColor: "#1D1D1F",
      borderColor: "#1D1D1F",
      borderRadius: "0.5rem",
      textColor: "#ffffff",
      placeholder: defaults.texts.inputPlaceholder,
      // focusBorderColor: "#FF5722",
    },
  };
  const computedTheme = deepMerge(theme || defaultChatTheme, overrides);

  return (
    <div
      className={`dgm-chat-wrap${className ? " " + className : ""}`}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        background: "#0b0b0b",
        boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
        overflow: "hidden",
        height: containerHeight,
        width: "100%",
        ...style,
      }}
    >
      <ChatPage theme={computedTheme} config={config} />
    </div>
  );
}