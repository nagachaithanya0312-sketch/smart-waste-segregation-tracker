/* ============================================================
   SMART WASTE SEGREGATION TRACKER — Premium Controller v2.0
   ============================================================ */

(() => {
  'use strict';

  /* ─── DOM Cache ─── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── Constants ─── */
  const TYPING_STRINGS = [
    'Classify Waste Intelligently',
    'Promote Recycling Awareness',
    'Powered by NLP & AI',
    'Reduce, Reuse, Recycle ♻',
    'Smart Waste Management',
    'Eco Friendly Technology 🌿',
  ];

  const LEAF_EMOJIS = ['🍃', '🌿', '🍂', '🌱', '☘️', '🌾'];

  /* ═══════════════════════════════════════════════════════════
     1. LOADING SCREEN
     ═══════════════════════════════════════════════════════════ */
  function initLoader() {
    const screen = $('#loadingScreen');
    const bar = $('#loadingBarFill');
    if (!screen) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      if (bar) bar.style.width = progress + '%';
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          screen.classList.add('hidden');
          document.body.style.overflow = '';
          initAOS();
          initGSAP();
        }, 400);
      }
    }, 120);

    document.body.style.overflow = 'hidden';
  }


  /* ═══════════════════════════════════════════════════════════
     2. THEME TOGGLE (Dark / Light)
     ═══════════════════════════════════════════════════════════ */
  function initTheme() {
    const btn = $('#themeToggle');
    if (!btn) return;

    const saved = localStorage.getItem('swt_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(btn, saved);

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('swt_theme', next);
      updateThemeIcon(btn, next);
      showToast(next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode');
    });
  }

  function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark'
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }


  /* ═══════════════════════════════════════════════════════════
     3. NAVIGATION
     ═══════════════════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const mobileMenu = $('#mobileMenu');
    const mobileOverlay = $('#mobileOverlay');
    const navLinks = $$('.nav-link');
    const mobileLinks = $$('.mobile-link');

    /* Scroll state */
    function onScroll() {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      /* Active section highlight */
      const sections = $$('section[id]');
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === current);
      });
      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile toggle */
    function toggleMobile(open) {
      if (hamburger) hamburger.classList.toggle('active', open);
      if (mobileMenu) mobileMenu.classList.toggle('active', open);
      if (mobileOverlay) mobileOverlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (hamburger) hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu && mobileMenu.classList.contains('active');
      toggleMobile(!isOpen);
    });

    if (mobileOverlay) mobileOverlay.addEventListener('click', () => toggleMobile(false));

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobile(false));
    });
  }


  /* ═══════════════════════════════════════════════════════════
     4. SCROLL PROGRESS BAR
     ═══════════════════════════════════════════════════════════ */
  function initScrollProgress() {
    const bar = $('#scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════
     5. CURSOR GLOW
     ═══════════════════════════════════════════════════════════ */
  function initCursorGlow() {
    const glow = $('#cursorGlow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }


  /* ═══════════════════════════════════════════════════════════
     6. FLOATING LEAF PARTICLES
     ═══════════════════════════════════════════════════════════ */
  function initLeafParticles() {
    const container = $('#bgParticles');
    if (!container) return;

    function createLeaf() {
      const leaf = document.createElement('span');
      leaf.className = 'leaf-particle';
      leaf.textContent = LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)];
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
      leaf.style.animationDuration = (Math.random() * 15 + 10) + 's';
      leaf.style.animationDelay = (Math.random() * 5) + 's';
      container.appendChild(leaf);

      setTimeout(() => leaf.remove(), 25000);
    }

    // Start with a few
    for (let i = 0; i < 8; i++) {
      setTimeout(createLeaf, i * 600);
    }

    // Continue adding
    setInterval(createLeaf, 3000);
  }


  /* ═══════════════════════════════════════════════════════════
     7. TYPING EFFECT
     ═══════════════════════════════════════════════════════════ */
  function initTypingEffect() {
    const el = $('#typingText');
    if (!el) return;

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = TYPING_STRINGS[stringIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % TYPING_STRINGS.length;
        speed = 300;
      }

      setTimeout(type, speed);
    }

    type();
  }


  /* ═══════════════════════════════════════════════════════════
     8. STATISTICS COUNTER ANIMATION
     ═══════════════════════════════════════════════════════════ */
  function initCounters() {
    const counters = $$('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * ease);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }


  /* ═══════════════════════════════════════════════════════════
     9. AOS INITIALIZATION
     ═══════════════════════════════════════════════════════════ */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: false,
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════
     10. GSAP ANIMATIONS
     ═══════════════════════════════════════════════════════════ */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* Parallax hero blobs */
    gsap.utils.toArray('.hero-blob').forEach((blob, i) => {
      gsap.to(blob, {
        y: -80 * (i + 1),
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    /* Section headers stagger */
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* Stat cards stagger on scroll */
    const statCards = gsap.utils.toArray('.stat-card');
    if (statCards.length) {
      gsap.from(statCards, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
        },
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════
     11. RIPPLE BUTTON EFFECT
     ═══════════════════════════════════════════════════════════ */
  function initRipple() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.ripple');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-wave';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        width: 0; height: 0;
        left: ${x}px; top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: rippleWave 0.6s ease-out forwards;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });

    // Inject keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleWave {
        to { width: 500px; height: 500px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }


  /* ═══════════════════════════════════════════════════════════
     12. 3D TILT EFFECT (Waste Cards)
     ═══════════════════════════════════════════════════════════ */
  function initTiltCards() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    $$('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════
     13. BACK TO TOP
     ═══════════════════════════════════════════════════════════ */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ═══════════════════════════════════════════════════════════
     14. CONTACT FORM
     ═══════════════════════════════════════════════════════════ */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('✅ Message sent successfully!');
      form.reset();
    });
  }


  /* ═══════════════════════════════════════════════════════════
     15. GALLERY LIGHTBOX
     ═══════════════════════════════════════════════════════════ */
  function initGallery() {
    const lightbox = $('#lightbox');
    const content = $('#lightboxContent');
    const closeBtn = $('#lightboxClose');
    if (!lightbox || !content) return;

    $$('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const placeholder = item.querySelector('.gallery-placeholder');
        if (placeholder) {
          const icon = placeholder.querySelector('i');
          const label = placeholder.querySelector('span');
          content.innerHTML = `
            <div style="text-align:center;">
              <i class="${icon ? icon.className : ''}" style="font-size:5rem;margin-bottom:20px;color:var(--secondary);"></i>
              <p style="font-size:1.5rem;font-weight:600;">${label ? label.textContent : ''}</p>
            </div>
          `;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }


  /* ═══════════════════════════════════════════════════════════
     16. SMOOTH SCROLL (for anchor links)
     ═══════════════════════════════════════════════════════════ */
  function initSmoothScroll() {
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = $(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════
     17. TOAST NOTIFICATION HELPER
     ═══════════════════════════════════════════════════════════ */
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Expose for global use
  window.showToast = showToast;


  /* ═══════════════════════════════════════════════════════════
     18. PARALLAX FLOATING ICONS
     ═══════════════════════════════════════════════════════════ */
  function initParallaxIcons() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      $$('.float-icon').forEach((icon, i) => {
        const speed = (i % 3 + 1) * 0.3;
        icon.style.transform = `translateY(${scrollY * speed * -0.15}px)`;
      });
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════
     19. ENHANCED GSAP SCROLL ANIMATIONS
     ═══════════════════════════════════════════════════════════ */
  function initEnhancedGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Stagger animate card grids on scroll
    const grids = [
      '.about-grid .about-card',
      '.features-grid .feature-card',
      '.waste-grid .waste-card',
      '.future-grid .future-card',
      '.team-grid .team-card',
      '.tech-grid .tech-card'
    ];

    grids.forEach(selector => {
      const items = gsap.utils.toArray(selector);
      if (!items.length) return;
      gsap.from(items, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: items[0].parentElement,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Advantages slide in alternating directions
    const advItems = gsap.utils.toArray('.adv-item');
    advItems.forEach((item, i) => {
      gsap.from(item, {
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Flowchart nodes stagger
    const flowNodes = gsap.utils.toArray('.flow-node, .flow-arrow');
    if (flowNodes.length) {
      gsap.from(flowNodes, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.flowchart',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════
     20. MAGNETIC BUTTON HOVER (Desktop only)
     ═══════════════════════════════════════════════════════════ */
  function initMagneticButtons() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    $$('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════
     21. SMART NAVBAR (Auto-hide on scroll down)
     ═══════════════════════════════════════════════════════════ */
  function initSmartNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const threshold = 100;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current <= threshold) {
        navbar.style.transform = 'translateY(0)';
        return;
      }

      if (current > lastScroll + 10) {
        // Scrolling down — hide
        navbar.style.transform = 'translateY(-100%)';
      } else if (current < lastScroll - 5) {
        // Scrolling up — show
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════
     BOOTSTRAP EVERYTHING
     ═══════════════════════════════════════════════════════════ */
  function init() {
    initLoader();
    initTheme();
    initNavbar();
    initScrollProgress();
    initCursorGlow();
    initLeafParticles();
    initTypingEffect();
    initCounters();
    initRipple();
    initTiltCards();
    initBackToTop();
    initContactForm();
    initGallery();
    initSmoothScroll();
    initParallaxIcons();
    initMagneticButtons();
    initSmartNavbar();
    initEnhancedGSAP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

