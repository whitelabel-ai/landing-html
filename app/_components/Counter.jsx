"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ start = 0, end = 100, duration = 2000, delay = 0, format, className, suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(start);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const startTs = performance.now() + delay;
          const diff = end - start;
          const step = (ts) => {
            if (ts < startTs) {
              rafId = requestAnimationFrame(step);
              return;
            }
            const t = Math.min(1, (ts - startTs) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(start + diff * eased));
            if (t < 1) rafId = requestAnimationFrame(step);
          };
          rafId = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });

    io.observe(el);
    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [start, end, duration, delay]);

  const displayed = typeof format === "function" ? format(value) : value.toString();

  return (
    <span ref={ref} className={className}>{displayed}{suffix}</span>
  );
}