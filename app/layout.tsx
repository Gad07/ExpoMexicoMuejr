import type { Metadata } from 'next';
import { Nunito_Sans, Jost } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import './globals.css';
import './mega-menu.css';

/**
 * Jost — sustituto open-source más fiel a Futura para titulos EMM.
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#002E51',
};

export const metadata: Metadata = {
  title: 'Expo México Mujer 2027 | Toronto, Canadá',
  description:
    'La plataforma binacional que transforma el liderazgo mexicano en oportunidades concretas de negocio, cultura y desarrollo. Cinco días que conectan a México con Canadá.',
  metadataBase: new URL('https://expomexico.ca'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'EMM 2027',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'Expo México Mujer', 'Toronto', 'negocios', 'emprendedoras',
    'México Canadá', 'liderazgo femenino', 'EMM 2027',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Expo México Mujer 2027 | Toronto, Canadá',
    description:
      'Cinco días que transforman el liderazgo mexicano en acciones concretas. 9–13 junio 2027, Toronto.',
    url: 'https://expomexico.ca',
    siteName: 'Expo México Mujer',
    type: 'website',
  },
};

import TopProgressBar from '@/components/TopProgressBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${futura.variable} ${nunito.variable}`}>
      <head>
        <link rel="preconnect" href="https://dl.dropboxusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dl.dropboxusercontent.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-body antialiased bg-sand text-navy">
        <LanguageProvider>
          <TopProgressBar />
          <AnalyticsTracker />
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
