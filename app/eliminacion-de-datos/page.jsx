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
              <h2 id="deletion-title" className="tp-section-title-grotesk">Eliminación de Datos</h2>
              <p className="legal-intro mt-15">Aquí encontrarás el procedimiento para solicitar la eliminación de tus datos personales tratados por la plataforma Whitelabel, propiedad de Whitelabel SAS.</p>
            </header>
            <article className="legal-content">
              <h3 className="legal-subtitle">1. Introducción</h3>
              <p>
                En Whitelabel SAS respetamos los derechos de los titulares de datos personales. Si deseas ejercer tu derecho de supresión o eliminación, ponemos a tu disposición el siguiente procedimiento conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.
              </p>

              <h3 className="legal-subtitle">2. ¿Quién puede solicitar la eliminación?</h3>
              <p>
                Puede solicitar la eliminación el titular de los datos o su representante debidamente autorizado. En caso de representación, se debe adjuntar el poder o autorización correspondiente.
              </p>

              <h3 className="legal-subtitle">3. Datos elegibles para eliminación</h3>
              <ul className="legal-list">
                <li>Datos de contacto y perfiles recolectados durante la prestación del servicio.</li>
                <li>Contenido de mensajes y grabaciones asociadas a interacciones en la plataforma.</li>
                <li>Metadatos técnicos vinculados a tu cuenta y/o sesiones.</li>
              </ul>
              <p>
                Algunos datos pueden estar sujetos a retención por obligaciones legales o contractuales, según se detalla en la sección de excepciones.
              </p>

              <h3 className="legal-subtitle">4. Pasos para solicitar la eliminación</h3>
              <ul className="legal-list">
                <li><strong>Envía tu solicitud:</strong> Escríbenos a <a href="mailto:hola@whitelabel.lat">hola@whitelabel.lat</a> con el asunto “Solicitud de Eliminación de Datos”.</li>
                <li><strong>Identificación:</strong> Indica tu nombre completo, número de identificación y datos de contacto.</li>
                <li><strong>Detalle de datos:</strong> Describe qué datos deseas eliminar (por ejemplo: mensajes, grabaciones, perfil de cuenta).</li>
                <li><strong>Verificación:</strong> Podremos requerir información adicional para validar tu identidad.</li>
                <li><strong>Confirmación:</strong> Te enviaremos confirmación del recibo y el número de caso.</li>
              </ul>

              <h3 className="legal-subtitle">5. Plazos de respuesta</h3>
              <p>
                Atendemos las solicitudes de eliminación en un plazo máximo de 15 días hábiles, conforme a la normativa aplicable. Si se requiere más tiempo, te informaremos el motivo y el nuevo plazo.
              </p>

              <h3 className="legal-subtitle">6. Consecuencias de la eliminación</h3>
              <p>
                La eliminación puede implicar la pérdida de acceso a historiales, grabaciones, reportes y funcionalidades asociadas a los datos suprimidos. Esta acción es irreversible.
              </p>

              <h3 className="legal-subtitle">7. Retención y excepciones</h3>
              <ul className="legal-list">
                <li>Conservamos datos cuando exista obligación legal o contractual de retención.</li>
                <li>Los respaldos se eliminan de forma segura dentro de ciclos operativos; según nuestra política, los datos se suprimen definitivamente hasta 90 días después de la terminación contractual.</li>
                <li>Podemos mantener información anonimizada para fines estadísticos y de mejora del servicio.</li>
              </ul>

              <h3 className="legal-subtitle">8. Seguridad del borrado</h3>
              <p>
                Implementamos procesos de borrado seguro y controlado, siguiendo estándares reconocidos, para evitar accesos no autorizados o reconstrucción de información eliminada.
              </p>

              <h3 className="legal-subtitle">9. Canales de contacto</h3>
              <ul className="legal-list">
                <li><strong>Correo:</strong> <a href="mailto:hola@whitelabel.lat">hola@whitelabel.lat</a></li>
                <li><strong>Teléfono:</strong> +57 311 253 0069</li>
                <li><strong>Dirección:</strong> Cra 20 N° 6-65, Girardot, Cundinamarca, Colombia</li>
              </ul>

              <h3 className="legal-subtitle">10. Formato sugerido de solicitud</h3>
              <p>
                Puedes copiar y pegar este formato al enviar tu solicitud:
              </p>
              <ul className="legal-list">
                <li>Asunto: Solicitud de Eliminación de Datos</li>
                <li>Nombre completo y documento de identidad</li>
                <li>Datos de contacto (correo y teléfono)</li>
                <li>Descripción de los datos a eliminar</li>
                <li>Relación con la plataforma (cliente / usuario final)</li>
              </ul>
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