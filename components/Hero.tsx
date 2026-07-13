import React from 'react';

type HeroProps = {
  image?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: {
    text: string;
    href: string;
  } | null;
  secondaryCta?: {
    text: string;
    href: string;
  } | null;
  imagePosition?: string;
  overlayVariant?: 'default' | 'strong';
};

export default function Hero({
  image = "https://portales.sre.gob.mx/saladeprensa/images/CatrinasFashionShowPhoto.jpg",
  eyebrow = "Expo México Mujer 2027",
  title = <>México en<br />Toronto<em>Con todo su poder</em></>,
  description = "La plataforma binacional que transforma el liderazgo mexicano en oportunidades concretas de negocio, cultura y desarrollo. Cinco días que conectan a México con Canadá.",
  primaryCta = { text: "Reservar Lugar", href: "#registro" },
  secondaryCta = { text: "Ver Agenda", href: "#agenda" },
  imagePosition,
  overlayVariant = 'default'
}: HeroProps) {
  return (
    <section className="hero-gradient" id="inicio" aria-label="Sección principal">
      <div className="hero-gradient__bg">
        <img
          className="hero-gradient__image"
          src={image}
          alt=""
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <div className={`hero-gradient__overlay ${overlayVariant === 'strong' ? 'hero-gradient__overlay--strong' : ''}`}></div>
      </div>

      {/* Content Layer */}
      <div className="hero-gradient__content-wrapper">
        <div className="hero-gradient__left">
          <div className="hero-gradient__content">
            <div className="hero-gradient__eyebrow">{eyebrow}</div>
            <h1 className="hero-gradient__title">
              {title}
            </h1>
            <div className="hero-gradient__desc">
              {description}
            </div>
            {(primaryCta || secondaryCta) && (
              <div className="hero-gradient__actions">
                {primaryCta && (
                  <a href={primaryCta.href} className="btn btn--primary">
                    {primaryCta.text}
                  </a>
                )}
                {secondaryCta && (
                  <a href={secondaryCta.href} className="btn btn--outline">
                    {secondaryCta.text}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
