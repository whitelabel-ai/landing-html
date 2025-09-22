"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * BackToTop
 * - Muestra el botón cuando se hace scroll más allá de un umbral.
 * - Usa las clases del template: .back-to-top-wrapper, .back-to-top-btn, .back-to-top-btn-show.
 * - Elimina el markup duplicado del template (ya lo filtramos en app/page.js).
 */
export default function BackToTop({ threshold = 200, smooth = true }) {
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    const show = window.scrollY > threshold;
    setVisible(show);
  }, [threshold]);

  useEffect(() => {
    // Inicial: evaluar visibilidad al montar
    onScroll();
    // Listener de scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, [smooth]);

  return (
    <div className={`back-to-top-wrapper${visible ? " back-to-top-btn-show" : ""}`}> 
      <button
        id="back_to_top"
        type="button"
        className="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        {/* Icono simple compatible con los estilos del template */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 4l-7 7h4v7h6v-7h4l-7-7z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}