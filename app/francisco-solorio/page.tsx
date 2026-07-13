"use client";

import BusinessCardPage from '../business-card/[slug]/page';

export default function Page() {
  const paramsPromise = Promise.resolve({ slug: 'francisco' });
  return <BusinessCardPage params={paramsPromise} />;
}
