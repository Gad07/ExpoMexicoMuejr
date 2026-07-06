const fs = require('fs');
const file = 'app/globals.css';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const before = lines.slice(0, 526); // Up to line 526
const after = lines.slice(659); // From line 660 onwards

const parallaxHeroCSS = `/* ─── HERO PARALLAX (Kanak Naturals Style) ────────────────────────────────── */
.hero--parallax {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* The video wrapper stays fixed in the background */
.hero__parallax-video-wrap {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; /* Behind content */
}
.hero__parallax-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__parallax-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 46, 81, 0.4); /* Navy overlay */
}

/* The scrollable content container */
.hero__parallax-content-container {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 5%;
}

.hero__parallax-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 1s ease 0.5s forwards;
}

.hero__parallax-title {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(4rem, 9vw, 9rem);
  font-weight: 700;
  line-height: 0.9;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
  max-width: 1200px;
}
.hero__parallax-title em {
  font-style: normal;
  display: block;
  font-size: clamp(1.5rem, 3.5vw, 3.5rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
}

.hero__parallax-desc {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  max-width: 700px;
  margin-bottom: 60px;
  opacity: 0;
  animation: fadeUp 1s ease 1.1s forwards;
}

.hero__parallax-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #fff;
  opacity: 0;
  animation: fadeIn 1s ease 1.5s forwards;
}
.hero__parallax-scroll span {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

/* This pushes the rest of the page down so it scrolls OVER the fixed hero */
.page-content-wrapper {
  position: relative;
  z-index: 20;
  background: var(--cream);
  padding-top: 0;
}
`;

const newContent = before.join('\n') + '\n' + parallaxHeroCSS + '\n' + after.join('\n');
fs.writeFileSync(file, newContent, 'utf8');
console.log('Fixed Hero CSS');
