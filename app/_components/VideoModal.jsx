"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function VideoModal({ open, onClose, videoUrl }) {
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) {
      lastActiveRef.current = document.activeElement;
      document.addEventListener("keydown", onKeyDown);
      // focus close btn when opened
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      // restore focus
      if (lastActiveRef.current && lastActiveRef.current.focus) {
        lastActiveRef.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="video-modal-overlay" role="dialog" aria-modal="true" aria-label="Video">
      <div className="video-modal-backdrop" onClick={onClose} />
      <div className="video-modal-content" role="document">
        <button
          ref={closeBtnRef}
          type="button"
          className="video-modal-close"
          aria-label="Cerrar video"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="video-modal-frame-wrap">
          <iframe
            className="video-modal-frame"
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      <style jsx>{`
        .video-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
        }
        .video-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
        }
        .video-modal-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #111;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          padding: 20px;
          width: min(90vw, 900px);
        }
        .video-modal-frame-wrap { position: relative; padding-top: 56.25%; }
        .video-modal-frame { position: absolute; inset: 0; width: 100%; height: 100%; border-radius: 8px; }
        .video-modal-close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #222;
          color: #fff;
          border: none;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          cursor: pointer;
        }
        .video-modal-close:hover { background: #333; }
      `}</style>
    </div>,
    document.body
  );
}