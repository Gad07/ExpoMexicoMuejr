import React from 'react';
import OptImage from './OptImage';

type HeroProps = {
  image?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: {
    text: string;
    action?: 'link' | 'popup';
    href?: string;
  } | null;
  secondaryCta?: {
    text: string;
    action?: 'link' | 'popup';
    href?: string;
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
        <OptImage
          className="hero-gradient__image"
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <div className={`hero-gradient__overlay ${overlayVariant === 'strong' ? 'hero-gradient__overlay--strong' : ''}`}></div>
      </div>

      {/* Content Layer */}
      <div className="hero-gradient__content-wrapper">
        <div className="hero-gradient__left">
          <div className="hero-gradient__content">
            <h1 className="hero-gradient__title">
              {title}
            </h1>
            <div className="hero-gradient__desc">
              {description}
            </div>
            {(primaryCta || secondaryCta) && (
              <div className="hero-gradient__actions">
                {primaryCta && (
                  primaryCta.action === 'popup' ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('openEmbeddedFormModal', {
                          detail: { url: primaryCta.href, title: primaryCta.text }
                        }));
                      }}
                      className="btn btn--primary"
                    >
                      {primaryCta.text}
                    </button>
                  ) : (
                    <a href={primaryCta.href || '#'} className="btn btn--primary">
                      {primaryCta.text}
                    </a>
                  )
                )}
                {secondaryCta && (
                  secondaryCta.action === 'popup' ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('openEmbeddedFormModal', {
                          detail: { url: secondaryCta.href, title: secondaryCta.text }
                        }));
                      }}
                      className="btn btn--outline"
                    >
                      {secondaryCta.text}
                    </button>
                  ) : (
                    <a href={secondaryCta.href || '#'} className="btn btn--outline">
                      {secondaryCta.text}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
