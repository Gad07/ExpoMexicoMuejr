'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import GlobalHero from '@/components/GlobalHero';
import Footer from '@/components/Footer';
import CtaSkyline from '@/components/CtaSkyline';
import ScrollToTop from '@/components/ScrollToTop';
import InitialLoader from '@/components/InitialLoader';
import WhatsAppChat from '@/components/WhatsAppChat';
import PromoPopup from '@/components/PromoPopup';
import LanguageModal from '@/components/LanguageModal';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <InitialLoader />
      <LanguageModal />
      <ScrollToTop />
      <PromoPopup />
      <Nav />
      <GlobalHero />
      <main>{children}</main>
      <CtaSkyline />
      <Footer />
      <WhatsAppChat />
    </>
  );
}