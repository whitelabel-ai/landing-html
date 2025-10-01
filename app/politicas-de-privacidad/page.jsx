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
              <h2 id="legal-title" className="tp-section-title-grotesk">Políticas de Privacidad</h2>
              <p className="legal-intro mt-15">Esta política aplica a los servicios de Whitelabel SAS prestados a través de la plataforma Whitelabel.</p>
            </header>

            <article className="legal-content">
              <h3 className="legal-subtitle">1. Introducción</h3>
              <p>
                Whitelabel SAS, una empresa especializada en soluciones de agentes inteligentes impulsados por inteligencia artificial, se compromete firmemente a proteger la privacidad y seguridad de los datos personales recopilados a través de nuestra plataforma Whitelabel. Este compromiso está respaldado por el cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, y otras normativas internacionales aplicables. Al utilizar los servicios de la plataforma Whitelabel, tanto nuestros clientes como los usuarios finales de sus servicios reconocen y aceptan los términos descritos en esta política de privacidad.
              </p>

              <h3 className="legal-subtitle">2. Responsable del tratamiento de datos</h3>
              <p>
                Whitelabel SAS actúa como el responsable del tratamiento de los datos personales recolectados a través de la plataforma Whitelabel, garantizando su manejo ético y conforme a la ley.
              </p>
              <ul className="legal-list">
                <li><strong>Razón social:</strong> Whitelabel SAS</li>
                <li><strong>NIT:</strong> 901086196-2</li>
                <li><strong>Dirección:</strong> Cra 20 N° 6-65, Girardot, Cundinamarca, Colombia</li>
                <li><strong>Correo electrónico:</strong> hola@whitelabel.lat</li>
                <li><strong>Teléfono:</strong> +57 311 253 0069</li>
              </ul>
              <p>Para consultas relacionadas con el tratamiento de datos personales, estamos disponibles en los canales mencionados anteriormente.</p>

              <h3 className="legal-subtitle">3. Datos que recopilamos</h3>
              <p>Recopilamos los siguientes datos personales con el propósito de prestar y optimizar nuestros servicios:</p>
              <ul className="legal-list">
                <li><strong>Datos del cliente:</strong> Nombre completo, NIT, dirección de correo electrónico, número de teléfono, dirección física y detalles de facturación.</li>
                <li><strong>Datos de los usuarios finales:</strong> Información proporcionada durante interacciones como nombres, apellidos, números de teléfono, direcciones de correo electrónico, contenido de mensajes y grabaciones de llamadas.</li>
                <li><strong>Datos técnicos:</strong> Información del dispositivo, tipo de navegador y datos generales de geolocalización obtenidos a través de herramientas analíticas como Google Analytics.</li>
              </ul>
              <p>La recopilación de estos datos se realiza de manera transparente y con el conocimiento de los titulares involucrados.</p>

              <h3 className="legal-subtitle">4. Finalidades del tratamiento de datos</h3>
              <p>Utilizamos los datos recopilados para los siguientes fines específicos:</p>
              <ul className="legal-list">
                <li><strong>Prestación del servicio:</strong> Garantizar el funcionamiento correcto y eficiente de la plataforma Whitelabel, facilitando la comunicación y el intercambio de información entre clientes y usuarios finales.</li>
                <li><strong>Cumplimiento normativo:</strong> Asegurar que nuestras operaciones cumplan con las leyes y regulaciones aplicables, incluyendo la protección de datos personales.</li>
                <li><strong>Mejora continua:</strong> Analizar las interacciones para identificar áreas de mejora y optimizar nuestros servicios.</li>
                <li><strong>Comunicación comercial:</strong> Informar a nuestros clientes sobre actualizaciones, nuevos productos y servicios relevantes para su actividad.</li>
              </ul>
              <p>Los datos serán tratados exclusivamente para los fines descritos y bajo estrictas medidas de seguridad.</p>

              <h3 className="legal-subtitle">5. Relación con los usuarios finales</h3>
              <p>
                En nuestra relación con los usuarios finales, Whitelabel SAS actúa como el responsable del tratamiento de datos personales recolectados mediante la plataforma Whitelabel. Sin embargo, es obligación del cliente garantizar que sus usuarios finales estén informados y hayan otorgado su consentimiento para el uso de sus datos según lo estipulado por la ley. Whitelabel SAS proporciona a sus clientes un modelo de aviso de privacidad que puede ser adaptado y compartido con los usuarios finales, asegurando así el cumplimiento de las normativas aplicables.
              </p>

              <h3 className="legal-subtitle">6. Derechos de los titulares de datos</h3>
              <p>De acuerdo con la Ley 1581 de 2012, los titulares de datos personales tienen los siguientes derechos:</p>
              <ul className="legal-list">
                <li><strong>Acceso:</strong> Conocer los datos personales que se encuentran en nuestras bases de datos.</li>
                <li><strong>Rectificación:</strong> Solicitar correcciones en caso de que los datos sean inexactos o incompletos.</li>
                <li><strong>Cancelación:</strong> Pedir la eliminación de datos cuando sea procedente.</li>
                <li><strong>Oposición:</strong> Restringir o limitar el uso de sus datos personales en ciertas circunstancias.</li>
              </ul>
              <p>Para ejercer estos derechos, los titulares pueden contactarnos a través de:</p>
              <ul className="legal-list">
                <li><strong>Correo electrónico:</strong> hola@whitelabel.lat</li>
                <li><strong>Teléfono:</strong> +57 311 253 0069</li>
              </ul>
              <p>Respondemos a todas las solicitudes relacionadas con estos derechos dentro de los plazos establecidos por la ley.</p>

              <h3 className="legal-subtitle">7. Transferencia y conservación de datos</h3>
              <p>
                Conservamos los datos personales durante el tiempo necesario para cumplir con las finalidades del tratamiento. En el caso de una terminación de la relación contractual, los datos se mantendrán durante un período de 90 días, tras el cual serán eliminados de manera segura y definitiva, salvo disposición legal en contrario.
              </p>

              <h3 className="legal-subtitle">8. Política de cookies</h3>
              <p>Nuestra plataforma utiliza cookies con el objetivo de:</p>
              <ul className="legal-list">
                <li>Brindar una experiencia personalizada a los usuarios.</li>
                <li>Recopilar datos estadísticos sobre el uso de la plataforma.</li>
                <li>Recordar configuraciones y preferencias del usuario.</li>
              </ul>
              <p>
                Los usuarios tienen la opción de gestionar y bloquear las cookies a través de la configuración de sus navegadores. La desactivación de cookies puede afectar algunas funcionalidades del servicio.
              </p>

              <h3 className="legal-subtitle">9. Modificaciones a la política</h3>
              <p>
                Whitelabel SAS se reserva el derecho de modificar esta política de privacidad en cualquier momento. Los cambios serán comunicados a los clientes mediante correo electrónico y reflejados en la sección correspondiente dentro de la plataforma. El uso continuado de los servicios después de la notificación de los cambios implica la aceptación de dichas modificaciones.
              </p>

              <h3 className="legal-subtitle">10. Legislación aplicable y jurisdicción</h3>
              <p>
                Esta política de privacidad se rige por la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia. Cualquier controversia derivada de su interpretación o aplicación será resuelta ante los tribunales competentes de Bogotá, Colombia.
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