"use client";

import { useEffect } from "react";

// Global animation provider that mimics tp_fade_anim behavior using IntersectionObserver
export default function AnimationsProvider() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".tp_fade_anim"));

    const getOffset = (el) => {
      const v = el.getAttribute("data-fade-offset");
      const n = v ? parseFloat(v) : 40;
      return isNaN(n) ? 40 : n;
    };
    const getDirection = (el) => (el.getAttribute("data-fade-from") || "bottom").toLowerCase();
    const getDelay = (el) => {
      const v = el.getAttribute("data-delay");
      const ms = v ? parseFloat(v) * 1000 : 0; // HTML uses seconds like ".3"
      return isNaN(ms) ? 0 : ms;
    };
    const getDuration = (el) => {
      const v = el.getAttribute("data-duration");
      const ms = v ? parseFloat(v) * 1000 : 700;
      return isNaN(ms) ? 700 : ms;
    };
    const getEase = (el) => {
      const e = (el.getAttribute("data-ease") || "power2.out").toLowerCase();
      if (e.includes("bounce")) return "cubic-bezier(0.34, 1.56, 0.64, 1)"; // approx bounce-out
      if (e.includes("circ") && e.includes("out")) return "cubic-bezier(0, 0.55, 0.45, 1)";
      if (e.includes("power2") && e.includes("out")) return "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      return "ease-out";
    };

    // Initialize elements off-screen
    elements.forEach((el) => {
      const offset = getOffset(el);
      const dir = getDirection(el);
      const x = dir === "left" ? -offset : dir === "right" ? offset : 0;
      const y = dir === "top" ? -offset : dir === "bottom" ? offset : 0;
      el.style.opacity = "0";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            const delay = getDelay(el);
            const duration = getDuration(el);
            const ease = getEase(el);
            el.style.transition = `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translate3d(0, 0, 0)";
            io.unobserve(el); // play once
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.35 }
    );

    elements.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      // Clean inline styles only for performance if needed
      // elements.forEach((el) => { el.style.willChange = ""; });
    };
  }, []);

  return null;
}