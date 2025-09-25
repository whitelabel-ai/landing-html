"use client";

import { useEffect, useRef } from "react";

export default function Header({ navItems = [], onOpenOffcanvas }) {
  const stickyRef = useRef(null);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    // Replicar sticky behavior: add/remove .header-sticky y manejar clases de logo
    const onScroll = () => {
      const add = window.scrollY > 10;
      el.classList.toggle("header-sticky", add);
      const isDarkSticky = el.classList.contains("sticky-black-bg");
      const isWhiteSticky = el.classList.contains("sticky-white-bg");
      if (isDarkSticky || isWhiteSticky) {
        // El template alterna logos vía CSS según .header-sticky + esquema
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      {/* header area start */}
      <div
        id="header-sticky"
        ref={stickyRef}
        className="tp-header-area tp-header-ptb tp-header-blur sticky-black-bg header-transparent tp-header-3-style"
      >
        <div className="container container-1750">
          <div className="row align-items-center">
            <div className="col-xl-1 col-lg-5 col-5">
              <a href="/" className="tp-header-logo" aria-label="Inicio">
                {/* Preserve template logo classes for CSS behavior */}
                <img data-width="120" className="logo-white" src="/assets/img/logo/logo-dark.png" alt="Logo" />
                <img data-width="120" className="logo-black d-none" src="/assets/img/logo/logo-dark.png" alt="Logo" />
              </a>
            </div>
            <div className="col-xl-11 col-lg-7 col-7">
              <div className="tp-header-box d-flex align-items-center justify-content-end justify-content-xl-between">
                <div className="tp-header-menu tp-header-dropdown dropdown-black-bg d-none d-xl-flex">
                  <nav className="tp-mobile-menu-active" aria-label="Primary">
                    <ul>
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <a href={item.href}>{item.label}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="tp-header-btn d-none d-md-flex">
                  <a
                    className="tp-btn-yellow-green green-solid"
                    href="https://wa.me/573112530069?text=Hola%20Quisiera%20saber%20m%C3%A1s%20sobre%20las%20automatizaciones"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Icono original del template */}
                    <i>
                      <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 2.5C16 1.675 15.325 1 14.5 1H2.5C1.675 1 1 1.675 1 2.5M16 2.5V11.5C16 12.325 15.325 13 14.5 13H2.5C1.675 13 1 12.325 1 11.5V2.5M16 2.5L8.5 7.75L1 2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </i>
                    <span>
                      <span className="text-1">Hablemos</span>
                      <span className="text-2">Hablemos</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header area end */}
    </header>
  );
}