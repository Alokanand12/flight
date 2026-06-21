/* ============================================================
   ANIMATION.JS — Scroll Reveal, Counters, Parallax, Particles
   ============================================================ */

const AnimationEngine = (() => {

  /* ── Scroll Reveal via IntersectionObserver ─────────────── */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Unobserve once revealed for performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── Animated Counters ─────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(startVal + (target - startVal) * easedProgress);
      el.textContent = currentVal.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  /* ── Particles Generator ───────────────────────────────── */
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      container.appendChild(particle);
    }
  }

  /* ── Floating Clouds ───────────────────────────────────── */
  function initClouds() {
    const container = document.querySelector('.hero-clouds');
    if (!container) return;

    const cloudEmoji = '☁️';
    for (let i = 0; i < 6; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.textContent = cloudEmoji;
      cloud.style.top = (Math.random() * 60 + 10) + '%';
      cloud.style.fontSize = (Math.random() * 3 + 2) + 'rem';
      cloud.style.animationDuration = (Math.random() * 30 + 25) + 's';
      cloud.style.animationDelay = -(Math.random() * 30) + 's';
      cloud.style.opacity = Math.random() * 0.08 + 0.03;
      container.appendChild(cloud);
    }
  }

  /* ── Cursor Glow Effect ────────────────────────────────── */
  function initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ── Tilt Card Effect ──────────────────────────────────── */
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* ── Ripple Effect ─────────────────────────────────────── */
  function initRipple() {
    document.querySelectorAll('.ripple').forEach(el => {
      el.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ── Navbar Scroll Effect ──────────────────────────────── */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── Scroll-to-Top Button ──────────────────────────────── */
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Live Clock ────────────────────────────────────────── */
  function initLiveClock() {
    const clockEl = document.querySelector('.live-clock-time');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      clockEl.textContent = now.toLocaleTimeString('en-US', options);
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ── Loading Screen ────────────────────────────────────── */
  function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 2200);
    });
    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';
  }

  /* ── Smooth Scroll for Anchor Links ────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Master Init ───────────────────────────────────────── */
  function init() {
    initLoadingScreen();
    initNavbarScroll();
    initScrollReveal();
    initCounters();
    initParticles();
    initClouds();
    initCursorGlow();
    initTiltCards();
    initRipple();
    initScrollTop();
    initLiveClock();
    initSmoothScroll();
  }

  return { init, animateCounter };
})();

document.addEventListener('DOMContentLoaded', AnimationEngine.init);
