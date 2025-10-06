"use client";

import Link from "next/link";

export default function TerminosYCondicionesPage() {
  return (
    <section className="legal-area pt-120 pb-120" aria-labelledby="terms-title">
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <header className="mb-30">
              <span className="tp-section-subtitle subtitle-black mb-15">Legal</span>
              <h2 id="terms-title" className="tp-section-title-grotesk">Términos y Condiciones de Uso — Plataforma Whitelabel</h2>
              <p className="legal-intro mt-15">Última actualización: 01/10/2025</p>
              <p className="legal-intro">Titular: Whitelabel SAS</p>
              <p className="legal-intro">NIT: 901086196-2</p>
              <p className="legal-intro">Correo de contacto: legal@whitelabel.lat</p>
            </header>

            <article className="legal-content">
              <h3 className="legal-subtitle">1. Introducción</h3>
              <p>
                El presente documento regula el acceso y uso de la plataforma Whitelabel, propiedad de Whitelabel SAS, sociedad legalmente constituida en Colombia.
              </p>
              <p>
                Al acceder, registrarse o utilizar los servicios, el cliente declara haber leído, comprendido y aceptado plenamente estos Términos y Condiciones. Si no está de acuerdo, deberá abstenerse de usar la plataforma.
              </p>

              <h3 className="legal-subtitle">2. Definiciones</h3>
              <ul className="legal-list">
                <li><strong>Plataforma Whitelabel:</strong> Sistema de inteligencia artificial desarrollado por Whitelabel SAS que permite la gestión automatizada de mensajes, llamadas y flujos de atención.</li>
                <li><strong>Cliente:</strong> Persona natural o jurídica titular de una cuenta o suscripción activa en la plataforma.</li>
                <li><strong>Usuarios finales:</strong> Personas cuyos datos o interacciones son procesados a través de la plataforma del cliente.</li>
                <li><strong>Créditos:</strong> Unidad de uso que permite ejecutar funciones dentro de la plataforma (mensajes, llamadas, procesos automáticos, etc.).</li>
                <li><strong>Torre de Control:</strong> Panel administrativo donde los clientes gestionan sus créditos, configuración, integraciones y reportes.</li>
                <li><strong>Datos:</strong> Toda información procesada por la plataforma, incluyendo mensajes, grabaciones, logs, metadatos o resultados de modelos de IA.</li>
              </ul>

              <h3 className="legal-subtitle">3. Propiedad, Custodia y Privacidad de los Datos</h3>
              <p>
                <strong>3.1 Propiedad de los datos.</strong> Los datos procesados a través de la plataforma son propiedad del cliente. Whitelabel SAS actúa como encargado del tratamiento, limitando su uso a la prestación, mantenimiento y mejora del servicio.
              </p>
              <p>
                <strong>3.2 Responsabilidad sobre usuarios finales.</strong> El cliente es el responsable del tratamiento respecto de los datos de sus usuarios finales. Se compromete a garantizar que dichos usuarios han otorgado su consentimiento informado conforme a la legislación aplicable (Ley 1581/2012, GDPR u otra según jurisdicción).
              </p>
              <p>
                <strong>3.3 Custodia y seguridad.</strong> Whitelabel SAS implementa medidas técnicas y organizativas apropiadas conforme a estándares internacionales (ISO/IEC 27001, NIST SP 800-53) para garantizar la confidencialidad, integridad y disponibilidad de los datos. Los datos se almacenan en servidores dedicados protegidos mediante VPN y protocolos de cifrado en tránsito y en reposo.
              </p>
              <p>
                <strong>3.4 Respaldo, retención y eliminación.</strong> Los datos se respaldan periódicamente y se conservan hasta 90 días después de la terminación del contrato. Antes de su eliminación, el cliente podrá solicitar una copia de respaldo mediante correo a privacidad@whitelabel.lat. Whitelabel podrá conservar datos de manera anonimizada por motivos estadísticos o de auditoría técnica.
              </p>

              <h3 className="legal-subtitle">4. Servicios</h3>
              <p>La plataforma Whitelabel ofrece servicios tecnológicos que incluyen:</p>
              <ul className="legal-list">
                <li><strong>Automatización:</strong> Gestión automatizada de mensajes, llamadas e interacciones mediante inteligencia artificial.</li>
                <li><strong>Gestión:</strong> Control de créditos, reportes, métricas y configuración personalizada desde la Torre de Control.</li>
                <li><strong>Soporte:</strong> Asistencia técnica a través de los canales habilitados, en horarios definidos en la documentación oficial.</li>
              </ul>
              <p>Whitelabel podrá actualizar, modificar o suspender temporalmente funcionalidades sin previo aviso cuando sea necesario por razones técnicas o de seguridad.</p>

              <h3 className="legal-subtitle">5. Propiedad Intelectual</h3>
              <p>
                Todo el software, interfaces, código fuente, diseños, modelos de IA, documentación técnica, marcas y demás activos intangibles relacionados con la plataforma son propiedad exclusiva de Whitelabel SAS.
              </p>
              <p>
                Nada en este contrato otorga licencia o cesión de derechos de propiedad intelectual al cliente, salvo el derecho limitado de uso previsto en estos Términos.
              </p>

              <h3 className="legal-subtitle">6. Obligaciones del Cliente</h3>
              <ul className="legal-list">
                <li>Usar la plataforma conforme a la ley y estos Términos.</li>
                <li>No realizar ingeniería inversa, descompilación ni extracción de modelos de IA o estructuras de datos.</li>
                <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
                <li>Garantizar la veracidad de la información proporcionada y actualizarla oportunamente.</li>
                <li>Obtener los consentimientos requeridos de sus usuarios finales.</li>
              </ul>

              <h3 className="legal-subtitle">7. Pagos y Facturación</h3>
              <ul className="legal-list">
                <li><strong>Métodos de pago:</strong> Transferencias electrónicas, tarjetas de crédito o cualquier método habilitado.</li>
                <li><strong>Facturación:</strong> Se emitirá factura electrónica mensual con el detalle de consumos y créditos utilizados.</li>
                <li><strong>Incumplimiento:</strong> La falta de pago dentro del plazo acordado podrá resultar en suspensión temporal del servicio.</li>
                <li><strong>Retención de datos:</strong> Durante la suspensión, Whitelabel conservará los datos del cliente por 30 días, permitiendo su reactivación una vez se regularice el pago.</li>
              </ul>

              <h3 className="legal-subtitle">8. Limitación de Responsabilidad</h3>
              <ul className="legal-list">
                <li>Daños indirectos, pérdida de beneficios o datos.</li>
                <li>Fallos derivados de proveedores externos (OpenAI, Meta, Google, AWS, etc.).</li>
                <li>Interrupciones del servicio causadas por mantenimiento, fallos técnicos o fuerza mayor.</li>
              </ul>
              <p>
                La responsabilidad total de Whitelabel frente al cliente se limitará al valor pagado por el servicio en los últimos tres (3) meses previos al evento.
              </p>

              <h3 className="legal-subtitle">9. Confidencialidad</h3>
              <p>
                Ambas partes se obligan a mantener la confidencialidad de toda la información técnica, comercial o estratégica obtenida durante la relación contractual, incluso después de su terminación.
              </p>
              <p>
                Esta obligación no aplica a información pública o legalmente requerida por autoridad competente.
              </p>

              <h3 className="legal-subtitle">10. Terminación</h3>
              <p>El cliente podrá cancelar su cuenta en cualquier momento.</p>
              <p>Whitelabel podrá suspender o terminar el acceso en caso de incumplimiento grave de estos Términos o uso indebido del servicio.</p>
              <p>La terminación no libera al cliente de sus obligaciones económicas pendientes.</p>

              <h3 className="legal-subtitle">11. Notificaciones y solicitudes de privacidad</h3>
              <p>Las solicitudes relacionadas con datos personales deberán enviarse a:</p>
              <ul className="legal-list">
                <li>📧 <a href="mailto:legal@whitelabel.lat">legal@whitelabel.lat</a></li>
                <li>Incluir identificación del solicitante y descripción clara de la solicitud (acceso, rectificación, cancelación u oposición).</li>
              </ul>

              <h3 className="legal-subtitle">12. Ley aplicable y jurisdicción</h3>
              <p>Estos Términos se rigen por las leyes de la República de Colombia.</p>
              <p>Cualquier controversia será resuelta por los tribunales de la ciudad de Bogotá, salvo acuerdo diferente entre las partes.</p>

              <h3 className="legal-subtitle">13. Modificaciones</h3>
              <p>Whitelabel SAS podrá actualizar estos Términos y Condiciones en cualquier momento.</p>
              <p>
                Las modificaciones se publicarán en {" "}
                <a href="https://whitelabel.lat/terminos" target="_blank" rel="noopener noreferrer">https://whitelabel.lat/terminos</a>{" "}
                y entrarán en vigor a los 10 días calendario de su publicación.
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