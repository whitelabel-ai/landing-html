"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * BackToTop
 * - Muestra el botón cuando se hace scroll más allá de un umbral.
 * - Usa las clases del template: .back-to-top-wrapper, .back-to-top-btn, .back-to-top-btn-show.
 * - Elimina el markup duplicado del template (ya lo filtramos en app/page.js).
 */
export default function BackToTop({ threshold = 200, smooth = true }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const onScroll = useCallback(() => {
    const show = window.scrollY > threshold;
    setVisible(show);
  }, [threshold]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Inicial: evaluar visibilidad al montar
    onScroll();
    // Listener de scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Eliminar duplicados del template si algún script los reinyecta
  useEffect(() => {
    const current = wrapperRef.current;
    if (!current) return;
    document.querySelectorAll(".back-to-top-wrapper").forEach((el) => {
      if (el !== current) {
        try {
          el.remove();
        } catch (_) {}
      }
    });
  }, []);

  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, [smooth]);

  const content = (
    <div
      ref={wrapperRef}
      className={`back-to-top-wrapper${visible ? " back-to-top-btn-show" : ""}`}
      style={{
        position: "fixed",
        right: 80, // antes 20, dejamos espacio para el ChatBubble a la derecha
        bottom: visible ? 50 : 0,
        zIndex: 99,
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "opacity 0.3s ease, bottom 0.3s ease",
      }}
    >
      <button
        id="back_to_top"
        type="button"
        className="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        {/* Icono del template (chevron up) */}
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M11 6L6 1L1 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );

  return mounted ? createPortal(content, document.body) : null;
}