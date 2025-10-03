"use client";

export default function BodyOverlay({ open, onClick }) {
  return (
    <div
      className={`body-overlay ${open ? "opened" : ""}`}
      role="button"
      aria-hidden={!open}
      aria-label="Cerrar overlay"
      tabIndex={open ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
        if (e.key === "Escape") onClick?.();
      }}
    />
  );
}