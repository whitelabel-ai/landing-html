"use client";

import { useEffect, useState } from "react";

const scrollToTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    window.scrollTo(0, 0);
  }
};

export default function BackToTop({ threshold = 200 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > threshold;
      setVisible(show);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll)
    };
  }, []);

  return (
    <div
      className={`back-to-top-wrapper ${visible ? "back-to-top-btn-show" : ""}`}
      style={{
        position: "fixed",
        right: 80,
        bottom: visible ? 50 : 0,
        zIndex: 99,
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "opacity 0.3s ease, bottom 0.3s ease",
      }}
    >
      <button
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
};
