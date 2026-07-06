const fs = require('fs');
const file = 'app/globals.css';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const before = lines.slice(0, 346); // up to line 346
const after = lines.slice(452); // from line 453 onwards

const fixed = `  100% { transform: scale(1) translateY(0) rotate(0); opacity: 1; }
}

@keyframes mariposaEnter2 {
  0% { transform: scale(0.6) translateY(50px) rotate(20deg); opacity: 0; }
  100% { transform: scale(1) translateY(20px) translateX(40px) rotate(15deg); opacity: 0.85; }
}

.loader__brand {
  position: absolute;
  top: 36px;
  left: 48px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--green-deep);
  opacity: 0;
  animation: fadeIn 0.6s ease 0.9s forwards;
}
.loader__brand-sub {
  display: block;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.52rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: var(--gold);
  margin-top: 3px;
}

.loader__percent {
  position: absolute;
  bottom: 36px;
  right: 48px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 4rem;
  font-weight: 300;
  color: var(--text);
  line-height: 1;
  letter-spacing: -0.05em;
  opacity: 0;
  animation: fadeIn 0.5s ease 0.5s forwards;
}
.loader__percent sup {
  font-size: 1.1rem;
  font-weight: 300;
  vertical-align: super;
  letter-spacing: 0;
  margin-left: 2px;
}

.loader__tagline {
  position: absolute;
  bottom: 44px;
  left: 48px;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0;
  animation: fadeIn 0.5s ease 1.1s forwards;
}

/* ─── NAV (Transparent to Solid Parallax) ─────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding: 24px 48px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: padding 0.4s, background 0.4s, box-shadow 0.4s, border-color 0.4s;
}
.nav.nav--scrolled {
  padding: 12px 48px;
  background: rgba(243, 236, 224, 0.92); /* Translucent cream */
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(4, 72, 41, 0.08);
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

/* Nav links */
.nav__links { display: flex; align-items: center; gap: 40px; }
.nav__link {
  position: relative;
  font-family: var(--font-display), sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff; /* White when on top of video */
  transition: color 0.3s;
  cursor: pointer;
}
.nav.nav--scrolled .nav__link {
  color: var(--green-deep); /* Dark when scrolled */
}
.nav__link:hover, .nav.nav--scrolled .nav__link:hover {
  color: var(--magenta);
}`;

const newContent = before.join('\n') + '\n' + fixed + '\n' + after.join('\n');
fs.writeFileSync(file, newContent, 'utf8');
console.log('Fixed CSS');
