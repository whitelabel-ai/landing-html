"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

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

  // Duplicar items para asegurar que el wrapper siempre esté lleno y el scroll sea continuo
  const itemsLong = [...items, ...items, ...items, ...items];

  return (
    <section className="tp-brand-area pt-160 pb-200" data-bg-color="#1A1B1E">
      {/* fila superior */}
      <div className="tp-brand-wrapper green-regular-bg z-index-1">
        <Swiper
          modules={[Autoplay, FreeMode]}
          className="tp-brand-active"
          slidesPerView="auto"
          spaceBetween={30}
          speed={5000}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          freeMode={{ enabled: true, momentum: false }}
          centeredSlides={false}
          loopAdditionalSlides={20}
        >
          {itemsLong.map((text, idx) => (
            <SwiperSlide key={`brand-top-${idx}`}>
              <div className="tp-brand-item">
                <span className="tp-brand-title">{text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* fila inferior inversa */}
      <div className="tp-brand-wrapper tp-brand-style-2 black-bg-6">
        <Swiper
          modules={[Autoplay, FreeMode]}
          className="tp-brand-active"
          dir="rtl"
          slidesPerView="auto"
          spaceBetween={30}
          speed={5000}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          freeMode={{ enabled: true, momentum: false }}
          centeredSlides={false}
          loopAdditionalSlides={20}
        >
          {itemsLong.map((text, idx) => (
            <SwiperSlide key={`brand-bottom-${idx}`}>
              <div className="tp-brand-item">
                <span className="tp-brand-title">{text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}