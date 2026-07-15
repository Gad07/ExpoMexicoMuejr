import React from 'react';

export const MEXICO_DATA = [
  { l: 'M', c: '#28ace3' },  // Cian
  { l: 'É', c: '#E4007C' },  // Pink
  { l: 'X', c: '#002E51' },  // Navy
  { l: 'I', c: '#28ace3' },  // Cian
  { l: 'C', c: '#E4007C' },  // Pink
  { l: 'O', c: '#002E51' },  // Navy
];

export function WordMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={`wordmark${compact ? ' wordmark--compact' : ''} ${className || ''}`}
      aria-label="Expo México Mujer">
      <div className="wordmark__expo">
        <span className="wordmark__expo-text">EXPO</span>
        <span className="wordmark__diamond" aria-hidden="true">◆</span>
      </div>
      <div className="wordmark__mexico" aria-hidden="true">
        {MEXICO_DATA.map(({ l, c }) => (
          <span key={l} className="wordmark__letter" style={{ color: c }}>{l}</span>
        ))}
      </div>
      <div className="wordmark__mujer" aria-hidden="true">MUJER</div>
    </div>
  );
}

type MariposaProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  mono?: boolean;
};

export function Mariposa({ className, mono = false, ...props }: MariposaProps) {
  return <img src="/recursos/Recurso 8.png" alt="" aria-hidden="true" loading="lazy" width="100" height="100" className={className} {...props} />;
}

type DecoMariposaProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  style?: React.CSSProperties;
};

export function DecoMariposa({ className, style, ...props }: DecoMariposaProps) {
  return <img src="/recursos/Recurso 8.png" alt="" aria-hidden="true" loading="lazy" width="100" height="100" className={className} style={style} {...props} />;
}

export function ArrowDown() {
  return (
    <svg className="hero__scroll-arrow" width="16" height="24" viewBox="0 0 16 24" fill="none">
      <line x1="8" y1="0" x2="8" y2="20" stroke="currentColor" strokeWidth="1"/>
      <path d="M3 15 L8 21 L13 15" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );
}
