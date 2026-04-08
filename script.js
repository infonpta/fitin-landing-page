/* ========================================
   FITIN Landing Page — Interactive Behavior
   ======================================== */

(function () {
  'use strict';

  // --- Sticky CTA Bar ---
  var stickyBar = document.getElementById('stickyBar');
  var hero = document.getElementById('hero');
  var formSection = document.getElementById('form-section');

  if (stickyBar && hero && formSection) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        });
      },
      { threshold: 0 }
    );

    var formObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyBar.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(hero);
    formObserver.observe(formSection);
  }

  // --- Scroll-Triggered Animations ---
  var animElements = document.querySelectorAll('.anim-fade');
  if (animElements.length) {
    var animObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animElements.forEach(function (el) {
      animObserver.observe(el);
    });
  }

  // --- Journey Roadmap Path Animation ---
  var journeyPath = document.getElementById('journeyPath');
  var heroSection = document.getElementById('hero');
  var milestones = document.querySelectorAll('.milestone');

  if (journeyPath && heroSection) {
    var pathTotalLength = journeyPath.getTotalLength();
    journeyPath.style.strokeDasharray = pathTotalLength;
    journeyPath.style.strokeDashoffset = pathTotalLength;

    function updateJourneyPath() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var heroHeight = heroSection.offsetHeight;

      // Progress: 0 at top, 1 when hero is about to scroll out of view
      var progress = scrollTop / (heroHeight * 0.5);
      progress = Math.max(0, Math.min(1, progress));

      // Draw the path
      journeyPath.style.strokeDashoffset = pathTotalLength * (1 - progress);

      // Show milestones at different thresholds
      milestones.forEach(function (m, i) {
        var threshold = 0.15 + (i * 0.22);
        if (progress >= threshold) {
          m.classList.add('visible');
        }
      });
    }

    window.addEventListener('scroll', updateJourneyPath, { passive: true });
    updateJourneyPath(); // Run once on load
  }

  // --- Form Handling ---
  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  if (leadForm && formSuccess) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var fields = leadForm.querySelectorAll('.error');
      fields.forEach(function (field) {
        field.classList.remove('error');
      });

      var valid = true;
      var requiredFields = leadForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
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
