"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Pie de página legal">
      <div className="container container-1230">
        <div className="footer-inner">
          <nav className="footer-legal" aria-label="Enlaces legales">
            <ul className="footer-links">
              <li>
                <Link href="/politicas-de-privacidad">Políticas de Privacidad</Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
              </li>
              <li>
                <Link href="/eliminacion-de-datos">Eliminación de Datos</Link>
              </li>
            </ul>
          </nav>
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Whitelabel SAS</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .site-footer {
          background: #111;
          color: #bbb;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 24px 0;
        }
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .footer-links {
          display: flex;
          gap: 18px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer-links a { color: #ddd; text-decoration: none; font-weight: 500; }
        .footer-links a:hover { color: #fff; }
        .footer-copy { font-size: 14px; color: #888; }
        @media (max-width: 767px) {
          .footer-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}