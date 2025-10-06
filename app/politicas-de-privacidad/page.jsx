"use client";

import Link from "next/link";

export default function PoliticasDePrivacidadPage() {
  return (
    <section className="legal-area pt-120 pb-120" aria-labelledby="legal-title">
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <header className="mb-30">
              <span className="tp-section-subtitle subtitle-black mb-15">Legal</span>
              <h2 id="legal-title" className="tp-section-title-grotesk">Política de Privacidad — Whitelabel SAS</h2>
              <p className="legal-intro mt-15">Última actualización: 01/10/2021</p>
              <ul className="legal-list">
                <li><strong>Titular:</strong> Whitelabel SAS</li>
                <li><strong>Correo de contacto:</strong> <a href="mailto:legal@whitelabel.lat">legal@whitelabel.lat</a></li>
              </ul>
            </header>

            <article className="legal-content">
              <h3 className="legal-subtitle">1. Introducción</h3>
              <p>
                Whitelabel SAS, sociedad legalmente constituida en Colombia, se dedica al desarrollo de soluciones de automatización e inteligencia artificial para procesos empresariales. Esta Política describe cómo recolectamos, usamos, almacenamos y protegemos los datos personales obtenidos a través de nuestra plataforma Whitelabel, en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, y estándares internacionales como el Reglamento General de Protección de Datos (GDPR).
              </p>
              <p>El uso de nuestros servicios implica la aceptación expresa de esta Política. Si no está de acuerdo, debe abstenerse de usar la plataforma.</p>

              <h3 className="legal-subtitle">2. Responsable y Encargado del Tratamiento</h3>
              <ul className="legal-list">
                <li><strong>Responsable del Tratamiento:</strong> Whitelabel SAS</li>
                <li><strong>NIT:</strong> 901086196-2</li>
                <li><strong>Dirección:</strong> Cra 20 N° 6-65, Girardot, Cundinamarca, Colombia</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:legal@whitelabel.lat">legal@whitelabel.lat</a></li>
                <li><strong>Teléfono:</strong> +57 311 253 0069</li>
              </ul>
              <p><strong>Whitelabel actúa como:</strong></p>
              <ul className="legal-list">
                <li><strong>Responsable del tratamiento</strong> respecto a los datos de sus propios clientes y usuarios registrados directamente.</li>
                <li><strong>Encargado del tratamiento</strong> respecto a los datos que los clientes recopilan de sus usuarios finales a través de la plataforma.</li>
              </ul>

              <h3 className="legal-subtitle">3. Datos que Recopilamos</h3>
              <p>Whitelabel puede recopilar las siguientes categorías de datos personales:</p>
              <ul className="legal-list">
                <li><strong>Datos de identificación:</strong> nombres, apellidos, número de identificación, razón social, NIT, correo electrónico, teléfono, dirección.</li>
                <li><strong>Datos de uso del servicio:</strong> registros de acceso, IP, geolocalización aproximada, navegador, dispositivo, cookies, logs del sistema.</li>
                <li><strong>Datos operativos:</strong> mensajes, grabaciones, prompts, transcripciones y resultados de interacciones con agentes automatizados.</li>
                <li><strong>Datos de facturación:</strong> información de pagos, historial de créditos, plan adquirido y consumos.</li>
              </ul>
              <p>No recolectamos datos sensibles salvo que sean estrictamente necesarios para la prestación del servicio y siempre con consentimiento explícito.</p>

              <h3 className="legal-subtitle">4. Finalidades del Tratamiento</h3>
              <p>Los datos personales se utilizan exclusivamente para las siguientes finalidades legítimas:</p>
              <ul className="legal-list">
                <li><strong>Prestación del servicio:</strong> habilitar y mantener el funcionamiento técnico de la plataforma.</li>
                <li><strong>Mejora y soporte:</strong> diagnosticar fallas, analizar métricas de rendimiento y ofrecer soporte técnico.</li>
                <li><strong>Cumplimiento legal y contractual:</strong> emitir facturas, gestionar pagos y cumplir obligaciones tributarias o regulatorias.</li>
                <li><strong>Comunicaciones operativas y comerciales:</strong> enviar notificaciones de servicio, actualizaciones o información relevante sobre nuevos productos.</li>
                <li><strong>Seguridad y auditoría:</strong> monitorear accesos, prevenir fraudes y proteger la integridad de la información.</li>
                <li><strong>Entrenamiento contextual de IA:</strong> mejorar la precisión de respuestas dentro del contexto del cliente, sin reutilizar datos para otros fines (ni entrenamiento global de modelos).</li>
              </ul>

              <h3 className="legal-subtitle">5. Relación con los Usuarios Finales</h3>
              <p>
                En los casos en que los clientes utilicen la plataforma Whitelabel para procesar datos de sus usuarios finales, éstos serán responsables de obtener los consentimientos correspondientes y cumplir con las obligaciones informativas de ley.
              </p>
              <p>
                Whitelabel SAS, como encargado del tratamiento, sólo procesará dichos datos bajo las instrucciones del cliente y con fines técnicos o de prestación del servicio.
              </p>

              <h3 className="legal-subtitle">6. Conservación y Eliminación de Datos</h3>
              <p>
                Los datos personales se conservarán únicamente durante el tiempo necesario para cumplir con las finalidades descritas. Al finalizar la relación contractual, los datos serán conservados por un máximo de <strong>90 días</strong>. Posteriormente, serán eliminados o anonimizados de manera segura, salvo que la ley exija su conservación por un período mayor.
              </p>
              <p>Whitelabel podrá conservar datos anonimizados con fines estadísticos o de mejora continua, sin posibilidad de identificación del titular.</p>

              <h3 className="legal-subtitle">7. Transferencia y Transmisión Internacional de Datos</h3>
              <p>
                Whitelabel puede alojar o procesar datos en infraestructuras ubicadas fuera de Colombia, incluyendo servicios en <strong>AWS</strong>, <strong>Google Cloud</strong>, <strong>Vercel</strong>, <strong>Netlify</strong> y <strong>OpenAI</strong>.
              </p>
              <p>
                Estas transferencias se realizan bajo cláusulas contractuales que garantizan un nivel adecuado de protección, conforme al artículo 26 de la Ley 1581 de 2012 y al artículo 44 del GDPR.
              </p>

              <h3 className="legal-subtitle">8. Cookies y Tecnologías de Seguimiento</h3>
              <p>La plataforma utiliza cookies para:</p>
              <ul className="legal-list">
                <li>Recordar preferencias de usuario.</li>
                <li>Analizar métricas de uso y rendimiento.</li>
                <li>Mantener sesiones seguras.</li>
              </ul>
              <p>
                Los usuarios pueden gestionar o bloquear las cookies desde la configuración de su navegador. Sin embargo, su desactivación puede limitar la funcionalidad del servicio.
              </p>

              <h3 className="legal-subtitle">9. Derechos de los Titulares</h3>
              <p>
                Los titulares de datos personales pueden ejercer los derechos <strong>ARCO</strong> (Acceso, Rectificación, Cancelación y Oposición), junto con los derechos de <strong>portabilidad</strong> y <strong>revocatoria del consentimiento</strong>, en cualquier momento.
              </p>
              <p>Las solicitudes deberán enviarse a:</p>
              <p>📧 <a href="mailto:legal@whitelabel.lat">legal@whitelabel.lat</a></p>
              <p>Incluyendo:</p>
              <ul className="legal-list">
                <li>Identificación del titular.</li>
                <li>Descripción precisa del derecho que desea ejercer.</li>
                <li>Pruebas o anexos relevantes (si aplica).</li>
              </ul>
              <p>Whitelabel responderá dentro de los plazos establecidos por la Ley 1581 de 2012.</p>

              <h3 className="legal-subtitle">10. Seguridad de la Información</h3>
              <p>Implementamos medidas técnicas, físicas y administrativas de seguridad, incluyendo:</p>
              <ul className="legal-list">
                <li>Servidores dedicados protegidos por VPN.</li>
                <li>Cifrado de datos en tránsito (TLS) y en reposo (AES-256).</li>
                <li>Control de acceso y autenticación de doble factor.</li>
                <li>Copias de respaldo cifradas y almacenamiento segregado.</li>
                <li>Políticas internas de gestión de incidentes y brechas de seguridad.</li>
              </ul>
              <p>
                En caso de incidente de seguridad que afecte datos personales, Whitelabel notificará oportunamente al titular y a la Superintendencia de Industria y Comercio (SIC) según corresponda.
              </p>

              <h3 className="legal-subtitle">11. Atención de Solicitudes y Quejas</h3>
              <p>El área de protección de datos de Whitelabel atenderá todas las solicitudes en los plazos legales:</p>
              <ul className="legal-list">
                <li>Consultas: 10 días hábiles.</li>
                <li>Reclamos: 15 días hábiles.</li>
              </ul>
              <p>
                Si el titular no recibe respuesta o no queda conforme, podrá acudir ante la Superintendencia de Industria y Comercio (SIC) para presentar una reclamación formal.
              </p>

              <h3 className="legal-subtitle">12. Modificaciones a esta Política</h3>
              <p>
                Whitelabel SAS se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Las actualizaciones serán notificadas por correo electrónico y publicadas en
                {" "}
                <a href="https://whitelabel.lat/privacidad" target="_blank" rel="noopener noreferrer">https://whitelabel.lat/privacidad</a>.
              </p>
              <p>El uso continuado del servicio después de la publicación implica la aceptación de los cambios.</p>

              <h3 className="legal-subtitle">13. Ley Aplicable y Jurisdicción</h3>
              <p>
                Esta Política se rige por la legislación colombiana, en especial la Ley 1581 de 2012 y el Decreto 1377 de 2013. Cualquier controversia derivada será resuelta por los tribunales de Bogotá, Colombia, salvo pacto distinto entre las partes.
              </p>
            </article>

            <div className="mt-40">
              <Link href="/" className="tp-btn-yellow-green green-solid" aria-label="Volver al inicio">
                <i>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17L2 9L11 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </i>
                <span>
                  <span className="text-1">Volver al inicio</span>
                  <span className="text-2">Volver al inicio</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .legal-area { background: #0f1012; color: #e2e8f0; }
        .legal-intro { color: #e6edf3; }
        .legal-subtitle { margin-top: 24px; margin-bottom: 12px; color: #f1f5f9; font-size: 20px; }
        .legal-list { margin: 10px 0 16px; padding-left: 18px; }
        .legal-list li { margin-bottom: 6px; color: #e6edf3; }
        .legal-content p { line-height: 1.75; color: #e2e8f0; }
        .subtitle-black { color: #e6edf3; }
      `}</style>
    </section>
  );
}