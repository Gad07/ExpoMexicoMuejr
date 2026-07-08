import type { Metadata } from 'next';
import { Nunito_Sans, Jost } from 'next/font/google';
import './globals.css';

/**
 * Jost — geometrisk sans-serif, el substituto open-source más fiel a Futura.
 * Futura no está disponible en Google Fonts, pero Jost reproduce fielmente
 * sus características: formas circulares perfectas, terminaciones cortadas,
 * y la misma personalidad geométrica y contemporánea.
 */
const futura = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

/**
 * Nunito Sans — tipografía de cuerpo oficial de la marca EMM.
 */
const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Expo México Mujer 2027 | Toronto, Canadá',
  description:
    'La plataforma binacional que transforma el liderazgo mexicano en oportunidades concretas de negocio, cultura y desarrollo. Cinco días que conectan a México con Canadá.',
  metadataBase: new URL('https://expomexico.ca'),
  keywords: [
    'Expo México Mujer', 'Toronto', 'negocios', 'emprendedoras',
    'México Canadá', 'liderazgo femenino', 'EMM 2027',
  ],
  openGraph: {
    title: 'Expo México Mujer 2027 | Toronto, Canadá',
    description:
      'Cinco días que transforman el liderazgo mexicano en acciones concretas. 9–13 junio 2027, Toronto.',
    url: 'https://expomexico.ca',
    siteName: 'Expo México Mujer',
    type: 'website',
  },
};

import Nav from '../components/Nav';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import CtaSkyline from '../components/CtaSkyline';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${futura.variable} ${nunito.variable}`}>
      <body>
        <Nav />
        <GlobalHero />
        <main>{children}</main>
        <CtaSkyline />
        <Footer />
      </body>
    </html>
  );
}