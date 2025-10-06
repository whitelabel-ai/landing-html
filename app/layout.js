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
        {/* CSS del proyecto original (orden exacto del HTML fuente) */}
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/css/slick.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome-pro.css" />
        <link rel="stylesheet" href="/assets/css/spacing.css" />
        <link rel="stylesheet" href="/assets/css/atropos.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="icon" href="/assets/img/favicon/logo.png" type="image/png" />
      </head>
      <body className="tp-magic-cursor">{children}</body>
    </html>
  );
}
