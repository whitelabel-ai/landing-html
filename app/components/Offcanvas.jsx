"use client";

export default function Offcanvas({ open, onClose, navItems = [] }) {
  return (
    <div className={`tp-offcanvas-area ${open ? "opened" : ""}`} id="offcanvas-menu" aria-hidden={!open}>
      <div className="tp-offcanvas-wrapper offcanvas-black-bg" role="dialog" aria-modal={open}>
        <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
          <div className="tp-offcanvas-logo">
            <a href="/" aria-label="Inicio">
              <img className="logo-1" data-width="120" src="/assets/img/logo/logo-black.png" alt="Logo" />
              <img className="logo-2" data-width="120" src="/assets/img/logo/logo-white.png" alt="Logo" />
            </a>
          </div>
          <div className="tp-offcanvas-close">
            <button className="tp-offcanvas-close-btn" aria-label="Cerrar menú" onClick={onClose}>
              <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="tp-offcanvas-main">
          <div className="tp-offcanvas-content d-none d-xl-block">
            <h3 className="tp-offcanvas-title">Hello There!</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
          </div>
          <div className="tp-offcanvas-menu d-xl-none">
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={onClose}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="tp-offcanvas-contact">
            <h3 className="tp-offcanvas-title sm">Information</h3>
            <ul>
              <li><a href="tel:1245654">+ 4 20 7700 1007</a></li>
              <li><a href="mailto:hello@diego.com">hello@diego.com</a></li>
              <li><a href="#">Avenue de Roma 158b, Lisboa</a></li>
            </ul>
          </div>
          <div className="tp-offcanvas-social">
            <h3 className="tp-offcanvas-title sm">Follow Us</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter / X</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}