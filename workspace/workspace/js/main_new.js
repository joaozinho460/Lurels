/* =========================================================
   LAURELS — interações e animações
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  var preDone = false;

  function hidePreloader() {
    if (preDone) return;
    preDone = true;
    if (preloader) preloader.classList.add('done');
  }

  window.addEventListener('load', function () {
    setTimeout(hidePreloader, 500);
  });

  setTimeout(hidePreloader, 3200);

  /* ---------- Navigation: estado ao fazer scroll ---------- */
  var nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu móvel ---------- */
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    toggle.classList.remove('active');
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    toggle.classList.add('active');
    nav.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Animações ao scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Delay sequencial para grelhas ---------- */
  var grids = document.querySelectorAll('.pillars, .cats-grid, .gallery-grid, .ig-grid, .loja-strip, .contact-channels');
  grids.forEach(function (grid) {
    var children = Array.prototype.slice.call(grid.children);
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i % 6) * 0.08 + 's';
    });
  });

  /* ---------- Links do rodapé ainda sem destino ---------- */
  document.querySelectorAll('.footer-placeholder').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
