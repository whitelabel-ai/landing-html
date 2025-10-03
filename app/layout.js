import "./globals.css";

import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export const viewport = {
  initialScale: 1.0,
  interactiveWidget: 'resizes-content',
  width: 'device-width'
};

export const metadata = {
  title: {
    template: 'Whitelabel | %s',
    default: 'Whitelabel'
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="no-js agntix-dark" lang="es">
      <body>
        <Header />
        <main className="tp-magic-cursor">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};
