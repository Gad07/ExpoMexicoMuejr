'use client';

import { useRef, useState, useEffect, forwardRef, useImperativeHandle, VideoHTMLAttributes } from 'react';

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  thumbTime?: number;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(function LazyVideo(
  { thumbTime = 1, children, ...rest },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useImperativeHandle(ref, () => videoRef.current!);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rest.autoPlay) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad, rest.autoPlay]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          {...rest}
          preload={rest.preload || 'metadata'}
        >
          {children}
        </video>
      ) : (
        rest.poster && (
          <img
            src={rest.poster}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: rest.style?.objectFit || 'cover' }}
          />
        )
      )}
    </div>
  );
});

export default LazyVideo;
