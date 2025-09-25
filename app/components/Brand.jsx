"use client";

export default function Brand() {
  const items = [
    "Creatividad",
    "Apps",
    "Desarrollo",
    "Optimizacion",
    "Investigacion",
    "Validacion",
    "MVP",
  ];

  return (
    <section className="tp-brand-area pt-160 pb-200" data-bg-color="#1A1B1E">
      {/* fila superior */}
      <div className="tp-brand-wrapper green-regular-bg z-index-1">
        <div className="swiper-container tp-brand-active fix">
          <div className="swiper-wrapper slide-transtion">
            {items.map((text, idx) => (
              <div className="swiper-slide" key={`brand-top-${idx}`}>
                <div className="tp-brand-item">
                  <span className="tp-brand-title">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* fila inferior inversa */}
      <div className="tp-brand-wrapper tp-brand-style-2 black-bg-6">
        <div className="swiper-container tp-brand-active fix" dir="rtl">
          <div className="swiper-wrapper slide-transtion">
            {items.map((text, idx) => (
              <div className="swiper-slide" key={`brand-bottom-${idx}`}>
                <div className="tp-brand-item">
                  <span className="tp-brand-title">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}