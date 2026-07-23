'use client';

import { useRef, useState, useEffect, forwardRef, useImperativeHandle, VideoHTMLAttributes } from 'react';
import OptImage from './OptImage';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  thumbTime?: number;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { thumbTime = 1, children, ...rest },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(() => !!rest.autoPlay || rest.preload === 'auto');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useImperativeHandle(ref, () => videoRef.current!);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || shouldLoad) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: '600px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    try {
      video.load();
    } catch {}

    const handlePlaying = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);

    if (rest.autoPlay) {
      video.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rest.autoPlay) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      observer.disconnect();
    };
  }, [shouldLoad, rest.autoPlay]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }} suppressHydrationWarning>
      {rest.poster && (
        <OptImage
          src={rest.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          blur
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: (rest.style?.objectFit as any) || 'cover',
            zIndex: 0,
            opacity: isVideoPlaying ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none'
          }}
        />
      )}
      <video
        ref={videoRef}
        {...rest}
        preload={rest.preload || 'none'}
        suppressHydrationWarning
        style={{
          position: 'relative',
          zIndex: 0,
          width: '100%',
          height: '100%',
          objectFit: (rest.style?.objectFit as any) || 'cover',
          ...rest.style
        }}
      >
        {shouldLoad ? children : null}
      </video>
    </div>
  );
});

export default LazyVideo;
