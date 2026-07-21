'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin panel browsing
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referer: document.referrer || '',
          userAgent: navigator.userAgent || '',
        }),
      }).catch(() => {});
    } catch {
      // Ignore network error
    }
  }, [pathname]);

  return null;
}
