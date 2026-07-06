const fs = require('fs');

const pageFile = 'app/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Replace Concept
const newConcept = `/* ══════════════════════════════════════════════════════════════
   CONCEPT (Minimalist High-End)
══════════════════════════════════════════════════════════════ */
function Concept() {
  const scrollY = useScrollY();
  return (
    <section className="concept--lux" id="concepto" aria-labelledby="concepto-title">
      <div className="concept__lux-inner">
        
        <Reveal className="concept__lux-eyebrow">
          <span className="concept__lux-line" />
          Misión Binacional
        </Reveal>

        <Reveal delay={100} className="concept__lux-title-wrap">
          <h2 className="concept__lux-title" id="concepto-title">
            Consolidar la proyección<br/>
            <em>internacional de México</em>
          </h2>
        </Reveal>

        <div className="concept__lux-grid">
          <Reveal delay={200} className="concept__lux-text-block">
            <p>
              Expo México Mujer 2027 es una plataforma de encuentros internacionales que
              transforma el liderazgo mexicano en acciones concretas, creando oportunidades
              de desarrollo económico y fortaleciendo la identidad de México
              en el extranjero.
            </p>
          </Reveal>
          
          <Reveal delay={300} className="concept__lux-text-block">
            <p>
              Nuestra misión es fortalecer los puentes comerciales, culturales y sociales
              entre México y Canadá, consolidando una comunidad binacional que impulse el
              crecimiento de empresas, productos y talentos mexicanos.
            </p>
          </Reveal>
        </div>

      </div>

      <DecoMariposa className="concept__lux-watermark" style={{ transform: \`translateY(\${scrollY * 0.05}px)\` }} />
    </section>
  );
}`;

pageContent = pageContent.replace(/\/\* ══════════════════════════════════════════════════════════════\n   CONCEPT[\s\S]*?(?=\/\* ══════════════════════════════════════════════════════════════\n   PILLARS)/, newConcept + '\n\n');

// Replace CTA
const newCTA = `/* ══════════════════════════════════════════════════════════════
   CTA (Impact Dark Block)
══════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="cta--lux" id="registro" aria-labelledby="cta-title">
      <div className="cta__lux-inner">
        <Reveal>
          <div className="cta__lux-eyebrow">Únete a la plataforma</div>
          <h2 className="cta__lux-title" id="cta-title">
            ¿Lista para ser parte de<br/>
            <em>esta edición?</em>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="cta__lux-actions">
            <a href="mailto:francisco@expomexico.ca" className="cta__lux-btn cta__lux-btn--primary">
              <span className="cta__lux-btn-text">Escribir por correo</span>
              <span className="cta__lux-btn-fill" />
            </a>
            <a href="https://wa.link/jboroz" className="cta__lux-btn cta__lux-btn--outline" target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}`;

pageContent = pageContent.replace(/\/\* ══════════════════════════════════════════════════════════════\n   CTA[\s\S]*?(?=\/\* Removed Footer)/, newCTA + '\n\n');

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('page.tsx updated.');
