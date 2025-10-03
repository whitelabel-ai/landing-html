"use client";

import { useEffect, useState } from "react";

/**
 * Preloader controlado por estado
 * - Respeta las clases del template (#preloader, .preloader).
 * - Muestra mientras el documento está cargando y oculta al completar.
 * - Limpia listeners y asegura overflow/visibilidad correctos.
 */
export default function Preloader({ enabled = true, timeout = 0 }) {
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      document.body.classList.remove("loading");
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";
      return;
    }

    const onReady = () => {
      const finish = () => setLoading(false);
      if (timeout && timeout > 0) {
        setTimeout(finish, timeout);
      } else {
        finish();
      }
    };

    // Si el documento ya está cargado, ocultar inmediatamente
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", onReady);
    };
  }, [enabled, timeout]);

  useEffect(() => {
    if (!loading) {
      // Al ocultar preloader, garantizar estilos adecuados
      document.body.classList.remove("loading");
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.visibility = "visible";
      document.body.style.opacity = "1";
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div id="preloader" aria-live="polite" aria-busy={true}>
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}