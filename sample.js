/* ========================================
   FITIN Sample Page — Interactions
   ======================================== */

(function () {
  'use strict';

  // --- Nav scroll state ---
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Mobile menu ---
  var burger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- Hero text stagger animation ---
  var heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    var lines = heroTitle.querySelectorAll('.hero__line');
    lines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateY(40px)';
      line.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      line.style.transitionDelay = (0.3 + i * 0.2) + 's';
      // Trigger after a frame
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        });
      });
    });

    // Animate tag and sub too
    var tag = document.querySelector('.hero__tag');
    var sub = document.querySelector('.hero__sub');
    var btn = document.querySelector('.hero__content .btn-main');
    [tag, sub, btn].forEach(function (el, i) {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.style.transitionDelay = (0.1 + i * 0.3) + 's';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // --- Scroll-triggered animations ---
  var animElements = document.querySelectorAll('.anim');
  if (animElements.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    animElements.forEach(function (el) { observer.observe(el); });
  }

  // --- Form handling ---
  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  if (leadForm && formSuccess) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      leadForm.querySelectorAll('.error').forEach(function (f) {
        f.classList.remove('error');
      });

      var valid = true;
      leadForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      var emailField = leadForm.querySelector('[type="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      leadForm.hidden = true;
      formSuccess.hidden = false;
    });
  }
})();
