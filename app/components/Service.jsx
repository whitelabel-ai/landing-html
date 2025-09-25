import React from "react";

export default function Service() {
  const services = [
    { title: "Web Development", desc: "Robust, scalable web apps built with modern stacks." },
    { title: "Mobile Apps", desc: "Native and cross-platform solutions for iOS and Android." },
    { title: "UI/UX Design", desc: "User-centered design systems and interfaces." },
    { title: "Product Strategy", desc: "Roadmapping, validation and go-to-market guidance." },
    { title: "Cloud & DevOps", desc: "Reliable infrastructure, CI/CD and automation." },
    { title: "Consulting", desc: "Expert advice tailored to your business needs." },
  ];

  return (
    <section className="dgm-service-area">
      <div className="container">
        <div className="row mb-40">
          <div className="col-12">
            <h2 className="section-title">Services</h2>
          </div>
        </div>

        <div className="row g-4">
          {services.map((s, i) => (
            <div className="col-sm-6 col-lg-4" key={`service-${i}`}>
              <div className="dgm-service-item h-100 p-3">
                <h4 className="dgm-service-title">{s.title}</h4>
                <p className="dgm-service-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}