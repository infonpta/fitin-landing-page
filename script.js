/* ========================================
   FITIN Landing Page — Interactive Behavior
   ======================================== */

(function () {
  'use strict';

  // --- Sticky CTA Bar ---
  const stickyBar = document.getElementById('stickyBar');
  const hero = document.getElementById('hero');
  const formSection = document.getElementById('form-section');

  if (stickyBar && hero && formSection) {
    const heroObserver = new IntersectionObserver(
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

    const formObserver = new IntersectionObserver(
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
