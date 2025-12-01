import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Whitelabel Landing",
  description: "Migración de landing estática a Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html className="no-js agntix-dark" lang="es">
      <head>
        <link rel="icon" href="/assets/img/favicon/logo.png" type="image/png" />
      </head>
      <body className="tp-magic-cursor">{children}</body>
    </html>
  );
}
