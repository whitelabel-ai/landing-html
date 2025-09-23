"use client";

export default function Hero() {
  return (
    <section className="dgm-hero-top pt-20">
      <div className="dgm-hero-ptb black-bg fix z-index-1 p-relative pb-120">
        <div
          className="dgm-hero-bg"
          data-background="/assets/img/home-03/hero/hero-bg-shape.png"
          style={{ backgroundImage: "url('/assets/img/home-03/hero/hero-bg-shape.png')" }}
          aria-hidden
        />

        <div className="dgm-hero-rotate-text" aria-hidden>
          <span>Consultoría + Desarrollo Ágil</span>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
              <div className="dgm-hero-content mb-120">
                <span className="dgm-hero-subtitle tp_fade_anim" data-delay=".3">
                  🔥 Validamos, construimos y automatizamos.
                </span>
                <h4 className="dgm-hero-title tp_fade_anim" data-delay=".5">
                  Consultoría
                  <br />
                  Desarrollo Ágil
                </h4>
                <div className="tp_fade_anim" data-delay=".7">
                  <a
                    className="tp-btn-black-square"
                    href="https://wa.me/573112530069?text=Hola%20Quisiera%20saber%20m%C3%A1s%20sobre%20las%20automatizaciones"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <span className="text-1">Hablemos</span>
                      <span className="text-2">Hablemos</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="dgm-hero-funfact-wrap row g-3 g-sm-4">
                <div className="col-6 col-sm-4">
                  <div className="dgm-hero-funfact tp_fade_anim mb-40" data-delay=".7" data-fade-from="top" data-ease="bounce">
                    <span><i data-purecounter-duration="1" data-purecounter-end="98" className="purecounter">0</i>%</span>
                    <p>Clientes satisfechos que vuelven</p>
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="dgm-hero-funfact tp_fade_anim mb-40" data-delay=".9" data-fade-from="top" data-ease="bounce">
                    <span><i data-purecounter-duration="1" data-purecounter-end="125" className="purecounter">0</i>+</span>
                    <p>MVPs y proyectos<br /> entregados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="dgm-hero-thumb anim-zoomin-wrap">
                <img src="/assets/img/home-03/hero/bg.png" alt="Fondo hero" />
                <div className="dgm-hero-text-box" data-background="/assets/img/home-03/hero/hero-text-shape.png" style={{ backgroundImage: "url('/assets/img/home-03/hero/hero-text-shape.png')" }}>
                  <img src="/assets/img/home-03/hero/hi-shape.png" alt="Hola" />
                  <p>Construimos tu idea y automatizamos lo repetitivo.</p>
                </div>
                <a
                  className="dgm-hero-arrow"
                  href="https://wa.me/573112530069?text=Hola%20Quisiera%20saber%20m%C3%A1s%20sobre%20las%20automatizaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ir a WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10h16M12 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}