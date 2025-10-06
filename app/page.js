"use client";

import { useState } from "react";
import BackToTop from "./components/BackToTop";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Offcanvas from "./components/Offcanvas";
import BodyOverlay from "./components/BodyOverlay";
import Hero from "./components/Hero";
import About from "./components/About";
import Steps from "./components/Steps";
import Brand from "./components/Brand";
import Project from "./components/Project";
// import Team from "./components/Team";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import AnimationsProvider from "./components/AnimationsProvider";
import ContactForm from "./components/ContactForm";

export default function Page() {
  // eliminado: const [html, setHtml] = useState("");
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  // useEffect removido: se elimina inyección de HTML crudo y carga dinámica de scripts externos.

  return (
    <>
      <Preloader enabled={true} timeout={0} />
      {/* Animations provider to handle tp_fade_anim elements */}
      {/**/}
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <AnimationsProvider />
      <Header
        onOpenOffcanvas={() => setOffcanvasOpen(true)}
        navItems={[]}
      />
      <Offcanvas
        open={offcanvasOpen}
        onClose={() => setOffcanvasOpen(false)}
        navItems={[]}
      />
      <BodyOverlay open={offcanvasOpen} onClick={() => setOffcanvasOpen(false)} />
      <Hero />
      <About />
      <Steps />
      <Brand />
      {/* <Project /> */}
      {/* <Team /> */}
      {/* <Testimonial /> */}
      {/* Mount React contact form (replaces ajax-form.js) */}
      {/* <ContactForm /> */}
      {/* removed raw HTML injection */}
      <Footer />
      <BackToTop threshold={200} smooth={true} />
    </>
  );
}

// eliminado: función loadScript ya no es necesaria
