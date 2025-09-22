"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;
    let observer;

    async function init() {
      try {
        const res = await fetch("/index-raw.html");
        const text = await res.text();
        const match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyInner = match ? match[1] : text;

        // Sanitizar: eliminar cualquier <script> embebido en el HTML importado
        const tpl = document.createElement("template");
        tpl.innerHTML = bodyInner;
        tpl.content.querySelectorAll("script").forEach((s) => s.remove());
        // Eliminar preloader/loader del fragmento antes de inyectar (amplio)
        const overlaySelectors = [
          "#preloader",
          "#loading",
          ".preloader",
          "[class*='preload']",
          "[id*='preload']",
          "[class*='loader']",
          "[id*='loader']",
        ];
        tpl.content.querySelectorAll(overlaySelectors.join(",")).forEach((el) => el.remove());
        const cleanBody =
          tpl.innerHTML ||
          Array.from(tpl.content.childNodes)
            .map((n) => n.outerHTML || n.textContent || "")
            .join("");

        if (!cancelled) setHtml(cleanBody);

        // Esperar al repintado para asegurar que el DOM esté insertado
        await new Promise((r) => requestAnimationFrame(() => r()));

        // Salvaguarda: forzar ocultar/eliminar preloader/loader si quedaron en el DOM
        document.body.classList.remove("loading");
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        document.body.style.visibility = "visible";
        document.body.style.opacity = "1";

        document.querySelectorAll(overlaySelectors.join(",")).forEach((el) => el.remove());

        // MutationObserver para eliminar cualquier overlay reinsertado por scripts
        observer = new MutationObserver((mutations) => {
          let removedSomething = false;
          mutations.forEach(() => {
            document.querySelectorAll(overlaySelectors.join(",")).forEach((el) => {
              el.remove();
              removedSomething = true;
            });
          });
          if (removedSomething) {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
            document.body.style.visibility = "visible";
            document.body.style.opacity = "1";
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Ajustar destino del/los formulario(s)
        const forms = Array.from(document.querySelectorAll("form"));
        forms.forEach((f) => {
          const action = (f.getAttribute("action") || "").trim();
          if (action === "#" || action === "") {
            f.setAttribute("action", "/api/contact");
            if (!f.getAttribute("method")) f.setAttribute("method", "POST");
          }
        });

        // Cargar scripts externos en el mismo orden que el HTML original (omitir main.js por diagnóstico)
        const scripts = [
          { src: "/assets/js/vendor/jquery.js" },
          { src: "/assets/js/bootstrap-bundle.js" },
          { src: "/assets/js/swiper-bundle.js" },
          { src: "/assets/js/plugin.js" },
          { src: "/assets/js/three.js" },
          { src: "/assets/js/slick.js" },
          { src: "/assets/js/scroll-magic.js" },
          { src: "/assets/js/hover-effect.umd.js" },
          { src: "/assets/js/magnific-popup.js" },
          { src: "/assets/js/parallax-slider.js" },
          { src: "/assets/js/nice-select.js" },
          { src: "/assets/js/purecounter.js" },
          { src: "/assets/js/isotope-pkgd.js" },
          { src: "/assets/js/imagesloaded-pkgd.js" },
          { src: "/assets/js/ajax-form.js" },
          { src: "/assets/js/Observer.min.js" },
          { src: "/assets/js/splitting.min.js" },
          { src: "/assets/js/webgl.js" },
          { src: "/assets/js/parallax-scroll.js" },
          { src: "/assets/js/atropos.js" },
          { src: "/assets/js/slider-active.js" },
          { src: "/assets/js/main.js" }, // reactivado
          { src: "/assets/js/tp-cursor.js" },
          { src: "/assets/js/portfolio-slider-1.js" },
          { src: "/assets/js/distortion-img.js", type: "module" },
          { src: "/assets/js/skew-slider/index.js", type: "module" },
          { src: "/assets/js/img-revel/index.js", type: "module" },
        ];

        for (const { src, type } of scripts) {
          await loadScript(src, type);
        }

        // Segunda salvaguarda tardía (por si algún plugin reintrodujo overlay en init)
        setTimeout(() => {
          document.body.classList.remove("loading");
          document.documentElement.style.overflow = "auto";
          document.body.style.overflow = "auto";
          document.body.style.visibility = "visible";
          document.body.style.opacity = "1";
          document.querySelectorAll(overlaySelectors.join(",")).forEach((el) => el.remove());
        }, 300);
      } catch (e) {
        console.error("Error cargando landing:", e);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function loadScript(src, type) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    if (type) s.type = type;
    s.async = false; // preservar orden
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.body.appendChild(s);
  });
}
