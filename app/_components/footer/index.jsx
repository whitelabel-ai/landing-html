import Link from "next/link";

import styles from './footer.module.css';

export const Footer = () => (
  <footer className={styles.footer} aria-label="Pie de página legal">
    <div className="container container-1230">
      <div className={styles.inner}>
        <nav className={styles.legal} aria-label="Enlaces legales">
          <ul className={styles.links}>
            <li>
              <Link href="/politicas-de-privacidad">
                Políticas de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos-y-condiciones">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="/eliminacion-de-datos">
                Eliminación de Datos
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.copy}>
          <span>© 2025 Whitelabel SAS</span>
        </div>
      </div>
    </div>
  </footer>
);
