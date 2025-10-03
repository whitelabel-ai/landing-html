"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import VideoModal from "./VideoModal";

const testimonials = [
  {
    text: "“The team's commitment to clear communication and transparency has been incredibly reassuring.”",
    author: "Michael Scott",
    role: "CEO, Dunder Mifflin",
    img: "t-user-1.png",
  },
  {
    text: "“Our projects are managed swiftly and effectively — truly a top-tier development service.”",
    author: "Pam Beesly",
    role: "Office Administrator, DM",
    img: "t-user-2.png",
  },
  {
    text: "“The design outcomes have consistently exceeded our expectations. Highly recommended.”",
    author: "Jim Halpert",
    role: "Sales, DM",
    img: "t-user-3.png",
  },
];

export default function Testimonial() {
  const [open, setOpen] = useState(false);
  const slides = testimonials.map((t, i) => (
    <SwiperSlide key={`testimonial-${i}`}>
      <div className="dgm-testimonial-item">
        <div className="dgm-testimonial-text">
          <p>{t.text}</p>
        </div>
        <div className="dgm-testimonial-author d-flex align-items-center">
          <div className="dgm-testimonial-author-thumb">
            <img src={`/assets/img/home-03/team/team-${i + 1}.jpg`} alt={t.author} />
          </div>
          <div className="dgm-testimonial-author-content">
            <h4>{t.author}</h4>
            <span>{t.role}</span>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ));
  return (
    <section className="dgm-testimonial-area pt-120 pb-120">
      <div className="container container-1330">
        <div className="row">
          <div className="col-xl-6">
            <div className="dgm-testimonial-video p-relative">
              <img src="/assets/img/home-03/testimonial/test-bg.jpg" alt="" />
              <button type="button" className="popup-video dgm-testimonial-video-btn" aria-label="Reproducir video" onClick={() => setOpen(true)}>
                <svg width="56" height="64" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M56 32L0 64V0L56 32Z" fill="currentcolor" />
                </svg>
              </button>
            </div>
            <div className="dgm-testimonial-nav">
              <button className="dgm-testimonial-btn dgm-testimonial-prev">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1L1 11M1 11V1M1 11H11" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="dgm-testimonial-btn dgm-testimonial-next">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dgm-testimonial-content-wrap">
              <Swiper modules={[Navigation]} navigation={{ prevEl: ".dgm-testimonial-prev", nextEl: ".dgm-testimonial-next" }} className="dgm-testimonial-active" slidesPerView={1} spaceBetween={30} loop>
                {slides}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} videoUrl="https://www.youtube.com/embed/CxXU3Valg5o?autoplay=1" />
    </section>
  );
}