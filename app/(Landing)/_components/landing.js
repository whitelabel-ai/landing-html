'use client';

import { useState } from "react";

import BackToTop from "../../_components/BackToTop";
import Preloader from "../../_components/Preloader";
import Offcanvas from "../../_components/Offcanvas";
import BodyOverlay from "../../_components/BodyOverlay";
import Hero from "../../_components/Hero";
import About from "../../_components/About";
import Steps from "../../_components/Steps";
import Brand from "../../_components/Brand";
import Chat from "../../_components/Chat";
import AnimationsProvider from "../../_components/AnimationsProvider";

export const Landing = () => {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  return (
    <>
      <Preloader enabled timeout={0} />
      <AnimationsProvider />
      <Offcanvas
        open={offcanvasOpen}
        onClose={() => setOffcanvasOpen(false)}
        navItems={[]}
      />
      <BodyOverlay open={offcanvasOpen} onClick={() => setOffcanvasOpen(false)} />
      <Hero />
      <Chat variant="section" />
      <About />
      <Steps />
      <Brand />
      {/* <Project /> */}
      {/* <Team /> */}
      {/* <Testimonial /> */}
      {/* Mount React contact form (replaces ajax-form.js) */}
      {/* <ContactForm /> */}

      <BackToTop threshold={200} />
    </>
  );
};
