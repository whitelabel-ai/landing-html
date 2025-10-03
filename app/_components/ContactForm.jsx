"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Request failed");
      const text = await res.text();
      setStatus({ type: "success", message: text || "Gracias, hemos recibido tu mensaje." });
      form.reset();
    } catch (err) {
      setStatus({ type: "error", message: "Oops! Ocurrió un error y no pudimos enviar tu mensaje." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="tp-contact-us-form-ptb pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">
            <div className="tp-contact-us-wrap">
              <h3 className="tp-contact-us-title mb-30">Ponte en contacto</h3>
              <form id="contact-form" onSubmit={onSubmit} aria-describedby="contact-status" noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="tp-contact-form-input mb-20">
                      <label htmlFor="name">Nombre</label>
                      <input type="text" id="name" name="name" placeholder="Tu nombre" required autoComplete="name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-contact-form-input mb-20">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" required autoComplete="email" />
                    </div>
                  </div>
                </div>
                <div className="tp-contact-form-input mb-25">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" name="message" placeholder="Cuéntanos sobre tu proyecto" rows={5} required />
                </div>
                <div className="tp-contact-form-btn">
                  <button type="submit" className="tp-btn-yellow-green" disabled={loading}>
                    <span>
                      <span className="text-1">{loading ? "Enviando..." : "Enviar"}</span>
                      <span className="text-2">{loading ? "Enviando..." : "Enviar"}</span>
                    </span>
                  </button>
                </div>
                <div id="contact-status" aria-live="polite" className="mt-20">
                  {status.type === "success" && <p role="status" style={{ color: "#32d74b" }}>{status.message}</p>}
                  {status.type === "error" && <p role="alert" style={{ color: "#ff453a" }}>{status.message}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}