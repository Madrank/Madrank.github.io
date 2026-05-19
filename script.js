/* ============================================
   MENU MOBILE
   ============================================ */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', closeNav);

mobLinks.forEach(link => link.addEventListener('click', closeNav));

function closeNav() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================
   NAV SCROLL STYLE
   ============================================ */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
  } else {
    nav.style.background = 'rgba(15, 23, 42, 0.7)';
  }
}, { passive: true });

/* ============================================
   INTERSECTION OBSERVER — SCROLL REVEAL
   ============================================ */

// Révèle les éléments génériques avec la classe .reveal
const revealEls = document.querySelectorAll(
  '#about .section-label, #about .section-title, .about-text p, .stat-card, ' +
  '#contact .section-label, #contact .section-title, .contact-sub, .contact-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger léger pour les groupes d'éléments
        const delay = Array.from(revealEls).indexOf(entry.target) * 60;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 400));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// Révèle les skill-cards avec leur délai CSS
const skillCards = document.querySelectorAll('.skill-card');
const skillSectionLabel = document.querySelector('#skills .section-label');
const skillSectionTitle = document.querySelector('#skills .section-title');

[skillSectionLabel, skillSectionTitle].forEach(el => {
  if (el) el.classList.add('reveal');
  revealObserver.observe(el);
});

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

skillCards.forEach(card => skillObserver.observe(card));

/* ============================================
   SMOOTH SCROLL (fallback pour anciens navigateurs)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================
   EASTER EGG — Konami code 🎮
   ============================================ */
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.keyCode === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      konamiIndex = 0;
      triggerEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerEgg() {
  const msg = document.createElement('div');
  msg.textContent = '🚀 Tu connais le Konami code, respect !';
  Object.assign(msg.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '999px',
    fontWeight: '700',
    fontSize: '1rem',
    zIndex: '9999',
    boxShadow: '0 8px 40px rgba(147,51,234,0.5)',
    opacity: '0',
    transition: 'opacity 0.4s ease',
    fontFamily: 'system-ui, sans-serif',
    whiteSpace: 'nowrap',
  });
  document.body.appendChild(msg);
  requestAnimationFrame(() => { msg.style.opacity = '1'; });
  setTimeout(() => {
    msg.style.opacity = '0';
    msg.addEventListener('transitionend', () => msg.remove());
  }, 3200);
}