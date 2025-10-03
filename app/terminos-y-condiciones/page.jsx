import Link from "next/link";

import styles from './tyc.module.css';

export default function TycPage() {
  return (
    <section className={`${styles.area} pt-120 pb-120`} aria-labelledby="terms-title">
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <header className="mb-30">
              <span className={`tp-section-subtitle ${styles.subtitleBlack} mb-15`}>Legal</span>
              <h2 id="terms-title" className="tp-section-title-grotesk">Términos y Condiciones</h2>
              <p className={`${styles.intro} mt-15`}>Estos términos aplican al uso de la plataforma Whitelabel, propiedad de Whitelabel SAS.</p>
            </header>

            <article className={styles.content}>
              <h3 className={styles.subtitle}>1. Introducción</h3>
              <p>
                Estos términos y condiciones regulan el uso de la plataforma Whitelabel, propiedad de Whitelabel SAS. Al utilizar nuestros servicios, el cliente acepta estas condiciones en su totalidad. Si no está de acuerdo, deberá abstenerse de utilizar la plataforma.
              </p>

              <h3 className={styles.subtitle}>2. Definiciones</h3>
              <ul className={styles.list}>
                <li><strong>Plataforma Whitelabel:</strong> Plataforma de inteligencia artificial desarrollada por Whitelabel SAS para gestionar mensajes y llamadas inbound y outbound de manera automatizada.</li>
                <li><strong>Cliente:</strong> Usuario titular de una suscripción activa en la plataforma.</li>
                <li><strong>Créditos:</strong> Unidad de uso en la plataforma Whitelabel que permite enviar mensajes o realizar llamadas.</li>
                <li><strong>Torre de Control:</strong> Plataforma interna donde los clientes gestionan sus créditos, configuración y reportes.</li>
                <li><strong>Datos:</strong> Toda información generada a través de la plataforma, incluyendo mensajes, grabaciones y metadatos.</li>
              </ul>

              <h3 className={styles.subtitle}>3. Propiedad, Custodia y Privacidad de los Datos</h3>
              <p><strong>Propiedad:</strong> Los datos generados en la plataforma Whitelabel son propiedad de Whitelabel SAS, que actúa como responsable del tratamiento de acuerdo con las leyes aplicables. Los clientes tienen acceso y uso limitado de los datos según las políticas de privacidad de Whitelabel SAS.</p>
              <p><strong>Consentimiento:</strong> Los clientes deberán aceptar las políticas de privacidad de Whitelabel SAS como parte del registro y uso de la plataforma Whitelabel. Esto incluye garantizar que informan y obtienen el consentimiento de sus propios usuarios finales para el tratamiento de sus datos personales.</p>
              <p><strong>Privacidad y seguridad:</strong> Whitelabel SAS custodia los datos bajo estándares de seguridad reconocidos internacionalmente y cumple con las leyes colombianas (Ley 1581 de 2012) y el Reglamento General de Protección de Datos (GDPR).</p>
              <p><strong>Respaldo y eliminación:</strong> Los datos serán respaldados periódicamente y eliminados automáticamente 90 días después de la terminación del contrato, salvo requerimientos legales que indiquen lo contrario.</p>

              <h3 className={styles.subtitle}>4. Servicios</h3>
              <p>La plataforma Whitelabel ofrece una plataforma tecnológica que permite la gestión automatizada de mensajes y llamadas. Los servicios incluyen:</p>
              <ul className={styles.list}>
                <li><strong>Automatización:</strong> Envío y recepción de mensajes y llamadas mediante inteligencia artificial.</li>
                <li><strong>Gestión:</strong> Control de créditos, reportes detallados y configuración personalizada a través de la Torre de Control.</li>
                <li><strong>Soporte:</strong> Asistencia técnica para garantizar la continuidad del servicio.</li>
              </ul>

              <h3 className={styles.subtitle}>5. Obligaciones del Cliente</h3>
              <ul className={styles.list}>
                <li><strong>Uso adecuado:</strong> El cliente se compromete a utilizar la plataforma de manera responsable, evitando actividades ilícitas o no autorizadas.</li>
                <li><strong>Información precisa:</strong> El cliente deberá proporcionar información veraz y actualizada durante el registro y uso del servicio.</li>
                <li><strong>Confidencialidad:</strong> Mantener la confidencialidad de sus credenciales de acceso y reportar inmediatamente cualquier uso no autorizado.</li>
              </ul>

              <h3 className={styles.subtitle}>6. Pagos</h3>
              <p>Los pagos por los servicios de la plataforma Whitelabel se realizarán de acuerdo con los planes seleccionados por el cliente. Las condiciones incluyen:</p>
              <ul className={styles.list}>
                <li><strong>Métodos de pago:</strong> Transferencias electrónicas, tarjetas de crédito o cualquier método habilitado en la plataforma.</li>
                <li><strong>Facturación:</strong> Los clientes recibirán una factura electrónica mensual con el detalle de los servicios utilizados.</li>
                <li><strong>Suspensión:</strong> El incumplimiento en los pagos podrá resultar en la suspensión temporal o definitiva del servicio.</li>
              </ul>
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
    </section>
  );
};
