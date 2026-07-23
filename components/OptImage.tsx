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
  quality = 75,
  loading = 'lazy',
  sizes,
  style,
  alt,
  onError,
  ...rest
}: OptImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  let src = rest.src;
  if (imgError || !src) {
    src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400';
  } else if (typeof src === 'string') {
    if (src.includes('dropbox.com') || src.includes('dropboxusercontent.com')) {
      src = src.replace(/https?:\/\/(www\.)?dropbox\.com/, 'https://dl.dropboxusercontent.com');
      if (src.includes('dl=0') || src.includes('dl=1')) {
        src = src.replace(/dl=[01]/, 'raw=1');
      } else if (!src.includes('raw=1')) {
        src += src.includes('?') ? '&raw=1' : '?raw=1';
      }
    } else if (src.includes('images.unsplash.com') && !src.includes('w=')) {
      src = src + (src.includes('?') ? '&w=800&q=75&auto=format' : '?w=800&q=75&auto=format');
    }
  }

  const isDropbox = typeof src === 'string' && src.includes('dropboxusercontent.com');
  const isTransparentImage = typeof src === 'string' && (
    src.toLowerCase().includes('.png') ||
    src.toLowerCase().includes('.svg') ||
    src.toLowerCase().includes('logo')
  );

  const enableBlur = blur && !isTransparentImage && !imgError;

  return (
    <Image
      {...rest}
      suppressHydrationWarning
      src={src}
      alt={alt || ''}
      quality={quality || 90}
      unoptimized={isDropbox ? true : rest.unoptimized}
      loading={rest.priority ? undefined : loading}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      placeholder={enableBlur ? 'blur' : undefined}
      blurDataURL={enableBlur ? BLUR_SVG : undefined}
      style={{
        opacity: loaded ? 1 : 0.9,
        transition: 'opacity 0.3s ease',
        ...style,
      }}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        setImgError(true);
        if (onError) onError(e);
      }}
    />
  );
}
