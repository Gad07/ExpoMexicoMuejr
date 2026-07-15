'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type OptImageProps = Omit<ImageProps, 'placeholder'> & {
  /** Show blur placeholder while loading (default: true) */
  blur?: boolean;
};

const BLUR_SVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmOGYzIi8+PC9zdmc+`;

export default function OptImage({
  blur = true,
  quality = 80,
  loading = 'lazy',
  sizes,
  style,
  alt,
  ...rest
}: OptImageProps) {
  const [loaded, setLoaded] = useState(false);

  const isExternal = typeof rest.src === 'string' && rest.src.startsWith('http');
  const needsWidth = isExternal && !rest.width;

  return (
    <Image
      {...rest}
      alt={alt || ''}
      quality={quality}
      loading={rest.priority ? undefined : loading}
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      placeholder={blur ? 'blur' : undefined}
      blurDataURL={blur ? BLUR_SVG : undefined}
      style={{
        opacity: loaded ? 1 : 0.9,
        transition: 'opacity 0.3s ease',
        ...style,
      }}
      onLoad={() => setLoaded(true)}
    />
  );
}
