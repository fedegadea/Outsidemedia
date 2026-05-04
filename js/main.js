// =============================================
// OUTSIDEMEDIA — main.js
// =============================================

// ── Navbar: agrega clase 'scrolled' al hacer scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll reveal: anima elementos al entrar en viewport
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.formato-card, .feature-card, .step-card, .cobertura-card, .stat-item, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  revealObserver.observe(el);
});

// ── Smooth scroll para links del navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 12;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });

    // Cierra menú móvil si está abierto
    const collapse = document.getElementById('navMenu');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

// ── Floating WhatsApp: ocultar mientras el usuario scrollea rápido
let scrollTimer;
const waFloat = document.getElementById('waFloat');
window.addEventListener('scroll', () => {
  waFloat.style.opacity = '0.4';
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => { waFloat.style.opacity = '1'; }, 400);
}, { passive: true });

// ── Animación del ticker (pausa on hover)
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.parentElement.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
}
