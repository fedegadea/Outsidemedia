// =============================================
// OUTSIDEMEDIA — main.js
// =============================================

// ── Navbar scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Scroll reveal (Outfront-style: sutil y limpio)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.formato-card, .feature-card, .step-card, .cobertura-card, .stat-item, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  revealObserver.observe(el);
});

// ── Counter animado para los stats
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.textContent.trim();
    const num = parseInt(raw.replace(/\D/g, ''));
    if (!num) return;

    const prefix = raw.startsWith('+') ? '+' : '';
    const duration = 1600;
    const steps = 50;
    const stepVal = num / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += stepVal;
      if (current >= num) {
        el.textContent = prefix + num;
        clearInterval(interval);
      } else {
        el.textContent = prefix + Math.floor(current);
      }
    }, duration / steps);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ── Smooth scroll para links del navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });

    const collapse = document.getElementById('navMenu');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

// ── WhatsApp float: fade mientras scrollea
let scrollTimer;
const waFloat = document.getElementById('waFloat');
window.addEventListener('scroll', () => {
  if (waFloat) waFloat.style.opacity = '0.5';
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (waFloat) waFloat.style.opacity = '1';
  }, 350);
}, { passive: true });

// ── Ticker: pausa on hover
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.parentElement.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}
