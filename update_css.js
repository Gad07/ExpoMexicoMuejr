const fs = require('fs');
const file = 'app/globals.css';
let content = fs.readFileSync(file, 'utf8');

const newCSS = `
/* ══════════════════════════════════════════════════════════════
   LUXURY REDESIGN OVERRIDES (Navbar, Concept, CTA)
══════════════════════════════════════════════════════════════ */

/* -- NAV LUXURY DROPDOWNS -- */
.nav__dropdown-menu {
  background: #ffffff;
  border: none;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03);
  border-radius: 4px;
  padding: 12px 0;
  transform: translateX(-50%) translateY(15px);
}
.nav__dropdown:hover .nav__dropdown-menu {
  transform: translateX(-50%) translateY(5px);
}
.nav__dropdown-item {
  font-family: var(--font-display), sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--green-deep);
  padding: 14px 32px;
  border-bottom: 1px solid rgba(0,0,0,0.02);
}
.nav__dropdown-item:last-child {
  border-bottom: none;
}
.nav__dropdown-item:hover {
  background: transparent;
  color: var(--magenta);
  padding-left: 36px; /* Subtle indent animation */
}

/* -- CONCEPT LUXURY -- */
.concept--lux {
  position: relative;
  padding: 160px 0 200px;
  background: var(--cream);
  overflow: hidden;
  z-index: 20;
}
.concept__lux-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  position: relative;
  z-index: 5;
}
.concept__lux-eyebrow {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--magenta);
  margin-bottom: 40px;
}
.concept__lux-line {
  width: 60px;
  height: 1px;
  background: var(--magenta);
}
.concept__lux-title {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 700;
  line-height: 0.95;
  color: var(--green-deep);
  text-transform: uppercase;
  margin-bottom: 80px;
}
.concept__lux-title em {
  font-style: normal;
  font-weight: 300;
  color: var(--navy);
  letter-spacing: -0.02em;
}
.concept__lux-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-left: 10%; /* Offset for asymmetrical luxury look */
}
.concept__lux-text-block p {
  font-family: var(--font-sans);
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-muted);
  font-weight: 300;
}
.concept__lux-watermark {
  position: absolute;
  top: 10%;
  right: -15%;
  width: 1000px;
  height: 1000px;
  color: var(--green-deep);
  opacity: 0.02;
  pointer-events: none;
  z-index: 0;
}

/* -- CTA LUXURY -- */
.cta--lux {
  position: relative;
  padding: 160px 0;
  background: var(--navy); /* Deep rich color */
  color: #ffffff;
  text-align: center;
  z-index: 20;
}
.cta__lux-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 48px;
  position: relative;
  z-index: 5;
}
.cta__lux-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 30px;
}
.cta__lux-title {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 700;
  line-height: 0.95;
  text-transform: uppercase;
  margin-bottom: 60px;
}
.cta__lux-title em {
  font-style: normal;
  font-weight: 300;
  color: var(--magenta);
}
.cta__lux-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.cta__lux-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 48px;
  font-family: var(--font-display), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  overflow: hidden;
  transition: color 0.4s;
}
.cta__lux-btn--primary {
  border: 1px solid var(--magenta);
  color: #fff;
}
.cta__lux-btn-fill {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: var(--magenta);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}
.cta__lux-btn:hover .cta__lux-btn-fill {
  transform: scaleY(1);
}
.cta__lux-btn-text {
  position: relative;
  z-index: 1;
}
.cta__lux-btn--outline {
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  transition: border-color 0.4s, background 0.4s;
}
.cta__lux-btn--outline:hover {
  border-color: #fff;
  background: rgba(255,255,255,0.05);
}

@media (max-width: 900px) {
  .concept__lux-grid {
    grid-template-columns: 1fr;
    margin-left: 0;
    gap: 40px;
  }
  .cta__lux-actions {
    flex-direction: column;
  }
}
`;

fs.writeFileSync(file, content + '\n' + newCSS, 'utf8');
console.log('globals.css updated with luxury styles.');
