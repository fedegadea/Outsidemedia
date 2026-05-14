// =============================================
// OUTSIDEMEDIA — main.js
// =============================================

// ── Navbar scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.formato-card, .feature-card, .step-card, .cobertura-card, .power-stat-block, .section-header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  revealObserver.observe(el);
});

// ── Smooth scroll (excluye dropdown toggles)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (link.dataset.bsToggle === 'dropdown') return; // no interceptar dropdowns
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
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

// ── WhatsApp float fade en scroll
let scrollTimer;
const waFloat = document.getElementById('waFloat');
window.addEventListener('scroll', () => {
  if (waFloat) waFloat.style.opacity = '0.5';
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (waFloat) waFloat.style.opacity = '1';
  }, 350);
}, { passive: true });

// ── Ticker pausa on hover
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.parentElement.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// ── Tabs de "El Poder de los Medios Exteriores"
document.querySelectorAll('.poder-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // Toggle botones
    document.querySelectorAll('.poder-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Toggle contenido
    document.querySelectorAll('.poder-tab-body').forEach(body => {
      body.classList.add('d-none');
    });
    const target = document.getElementById('tab-' + tab);
    if (target) target.classList.remove('d-none');
  });
});

// ── Parallax suave en billboards animados (el efecto "nube con mov")
// Los paneles se mueven a distintas velocidades al hacer scroll
const bbGrid  = document.getElementById('bb-grid');
const bbSlash = document.querySelectorAll('.bb-slash');

function onParallaxScroll() {
  const section = document.getElementById('power-move');
  if (!section) return;

  const rect   = section.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (!inView) return;

  const progress = -rect.top / section.offsetHeight; // 0 al entrar, ~1 al salir

  // Grid de paneles: mueve hacia arriba suavemente
  if (bbGrid) {
    bbGrid.style.transform = `perspective(900px) rotateY(-6deg) translateY(${progress * -40}px)`;
  }

  // Slash de fondo: mueve más despacio (parallax diferencial)
  bbSlash.forEach((el, i) => {
    const speed = i === 0 ? -25 : -15;
    el.style.transform = `skewX(-14deg) translateY(${progress * speed}px)`;
  });
}

window.addEventListener('scroll', onParallaxScroll, { passive: true });
onParallaxScroll(); // ejecutar al cargar
