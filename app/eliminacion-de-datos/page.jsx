"use client";

import Link from "next/link";

export default function EliminacionDeDatosPage() {
  return (
    <section className="legal-area pt-120 pb-120" aria-labelledby="deletion-title">
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <header className="mb-30">
              <span className="tp-section-subtitle subtitle-black mb-15">Legal</span>
              <h2 id="deletion-title" className="tp-section-title-grotesk">Política de Eliminación de Datos — Whitelabel SAS</h2>
              <p className="legal-intro mt-15">Última actualización: 01/10/2025</p>
              <p className="legal-intro">Titular: Whitelabel SAS</p>
              <p className="legal-intro">Correo de contacto: <a href="mailto:hola@whitelabel.lat">hola@whitelabel.lat</a></p>
            </header>
            <article className="legal-content">
              <h3 className="legal-subtitle">1. Introducción</h3>
              <p>
                Whitelabel SAS respeta los derechos de los titulares de datos personales y ofrece mecanismos transparentes para ejercer el derecho de supresión o eliminación establecido en la Ley 1581 de 2012, el Decreto 1377 de 2013, y el Reglamento General de Protección de Datos (GDPR) cuando aplica.
              </p>
              <p>
                Esta política aplica a los datos tratados directamente por Whitelabel SAS y a aquellos procesados por cuenta de sus clientes en calidad de encargado del tratamiento.
              </p>

              <h3 className="legal-subtitle">2. Quién puede solicitar la eliminación</h3>
              <ul className="legal-list">
                <li>El titular de los datos personales.</li>
                <li>Su representante legal o apoderado, previa presentación del documento que acredite la representación.</li>
                <li>Cuando se trate de usuarios finales de un cliente, Whitelabel SAS remitirá la solicitud al cliente responsable para su gestión, conforme a los términos contractuales vigentes.</li>
              </ul>

              <h3 className="legal-subtitle">3. Datos sujetos a eliminación</h3>
              <ul className="legal-list">
                <li>Datos de identificación y contacto registrados en la plataforma.</li>
                <li>Contenido de mensajes, grabaciones, documentos o interacciones.</li>
                <li>Metadatos técnicos asociados a sesiones, logs o configuraciones.</li>
              </ul>
              <p><strong>Whitelabel no eliminará información cuando:</strong></p>
              <ul className="legal-list">
                <li>Exista obligación legal o contractual de conservarla.</li>
                <li>Sea necesaria para el cumplimiento de una relación activa.</li>
                <li>Forme parte de registros técnicos o de seguridad requeridos para auditorías o defensa de reclamaciones.</li>
              </ul>

              <h3 className="legal-subtitle">4. Procedimiento para solicitar la eliminación</h3>
              <ul className="legal-list">
                <li><strong>Envío de solicitud:</strong> Dirigir un correo a <a href="mailto:hola@whitelabel.lat">hola@whitelabel.lat</a> con el asunto “Solicitud de Eliminación de Datos”.</li>
                <li><strong>Identificación del solicitante:</strong> Incluir nombre completo, tipo y número de documento, correo y teléfono de contacto.</li>
                <li><strong>Detalle de los datos a eliminar:</strong> Especificar qué información desea suprimir (mensajes, grabaciones, perfil de cuenta, etc.).</li>
                <li><strong>Validación:</strong> Whitelabel podrá requerir documentos o información adicional para verificar la identidad o legitimidad de la solicitud.</li>
                <li><strong>Confirmación de recepción:</strong> Se enviará acuse de recibo con un número de caso asignado.</li>
                <li><strong>Gestión interna:</strong> El equipo de Protección de Datos revisará la solicitud y coordinará el borrado seguro en las bases correspondientes.</li>
              </ul>

              <h3 className="legal-subtitle">5. Plazos de respuesta</h3>
              <p>
                Whitelabel responderá dentro de un plazo máximo de 15 días hábiles a partir de la recepción completa de la solicitud. Si se requiere un tiempo adicional, se notificará al solicitante indicando la causa y el nuevo plazo estimado.
              </p>

              <h3 className="legal-subtitle">6. Consecuencias de la eliminación</h3>
              <p>
                La eliminación implica la pérdida permanente de acceso a historiales, reportes, grabaciones o configuraciones relacionadas con los datos suprimidos. El proceso es irreversible y puede afectar la disponibilidad de ciertos servicios o funcionalidades contratadas.
              </p>

              <h3 className="legal-subtitle">7. Retención y excepciones</h3>
              <ul className="legal-list">
                <li>Los datos podrán conservarse hasta 90 días después de la terminación contractual o mientras existan obligaciones legales o financieras pendientes.</li>
                <li>Los respaldos automáticos son eliminados de forma cíclica y segura según la política de retención interna.</li>
                <li>Whitelabel podrá mantener información anonimizada o agregada para fines estadísticos, de auditoría o mejora del servicio.</li>
                <li>Los logs de seguridad y transacciones no se eliminan para preservar la integridad del sistema.</li>
              </ul>

              <h3 className="legal-subtitle">8. Seguridad del proceso de eliminación</h3>
              <p>El proceso de eliminación sigue estándares reconocidos internacionalmente (ISO/IEC 27001, NIST SP 800-88) e incluye:</p>
              <ul className="legal-list">
                <li>Borrado lógico irreversible en bases de datos productivas.</li>
                <li>Desvinculación de claves o tokens asociados.</li>
                <li>Destrucción segura de copias temporales.</li>
                <li>Registro de la acción en el sistema de trazabilidad interna.</li>
              </ul>

              <h3 className="legal-subtitle">9. Canales de contacto</h3>
              <ul className="legal-list">
                <li>📧 <a href="mailto:hola@whitelabel.lat">hola@whitelabel.lat</a></li>
                <li>📞 +57 311 253 0069</li>
                <li>🏢 Cra 20 N° 6-65, Girardot, Cundinamarca, Colombia</li>
              </ul>

              <h3 className="legal-subtitle">10. Formato sugerido de solicitud</h3>
              <p><strong>Asunto:</strong> Solicitud de Eliminación de Datos</p>
              <p>
                Yo, [nombre completo], identificado con [tipo y número de documento], solicito la eliminación de los siguientes datos tratados por Whitelabel SAS:
              </p>
              <p>[Describir claramente los datos o servicios asociados]</p>
              <p>
                Declaro que soy el titular / representante autorizado de los datos y entiendo las consecuencias de su eliminación irreversible.
              </p>
              <p>Firma (digital o escaneada)</p>
              <p>Correo electrónico:</p>
              <p>Teléfono de contacto:</p>
              <p>Fecha:</p>
            </article>

            <div className="mt-40">
              <Link href="/" className="tp-btn-yellow-green green-solid" aria-label="Volver al inicio">
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