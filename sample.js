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

  // --- Capture UTM / click params from URL and persist to sessionStorage ---
  var TRACKED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'msclkid', 'ref'];
  (function captureTrackingParams() {
    try {
      var urlParams = new URLSearchParams(window.location.search);
      TRACKED_PARAMS.forEach(function (key) {
        var value = urlParams.get(key);
        if (value) {
          sessionStorage.setItem('fitin_' + key, value);
        }
      });
    } catch (err) { /* storage unavailable — skip */ }
  })();

  function getTrackingParams() {
    var tracking = {};
    try {
      TRACKED_PARAMS.forEach(function (key) {
        var stored = sessionStorage.getItem('fitin_' + key);
        if (stored) tracking[key] = stored;
      });
    } catch (err) { /* ignore */ }
    return tracking;
  }

  // --- Form handling ---
  var GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/edFsk1NiB8Tk9lS1eipJ/webhook-trigger/9adecb4b-d62f-4fa9-b0cc-62d3d0af853f';
  var THANK_YOU_URL = 'thank-you.html';

  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  // --- Inline error message helpers ---
  function clearFieldError(field) {
    field.classList.remove('error');
    var wrapper = field.closest('.form-field');
    if (wrapper) {
      var msg = wrapper.querySelector('.form-field__error');
      if (msg) msg.remove();
    }
  }

  function setFieldError(field, message) {
    field.classList.add('error');
    var wrapper = field.closest('.form-field');
    if (!wrapper) return;
    var msg = wrapper.querySelector('.form-field__error');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'form-field__error';
      wrapper.appendChild(msg);
    }
    msg.textContent = message;
  }

  var FIELD_LABELS = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone number',
    goals: 'Goals',
    schedule: 'Schedule'
  };

  if (leadForm) {
    // Clear a field's error as soon as the user starts fixing it
    leadForm.querySelectorAll('input, select').forEach(function (f) {
      var handler = function () { clearFieldError(f); clearSummaryError(); };
      f.addEventListener('input', handler);
      f.addEventListener('change', handler);
    });

    function clearSummaryError() {
      var summary = leadForm.querySelector('.form-summary-error');
      if (summary) summary.remove();
    }

    function setSummaryError(message) {
      clearSummaryError();
      var summary = document.createElement('div');
      summary.className = 'form-summary-error';
      summary.setAttribute('role', 'alert');
      summary.textContent = message;
      leadForm.insertBefore(summary, leadForm.firstChild);
    }

    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset previous errors
      clearSummaryError();
      leadForm.querySelectorAll('input, select').forEach(clearFieldError);

      // Validate required fields with specific messages
      var firstInvalid = null;
      var missing = [];
      leadForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          var label = FIELD_LABELS[field.name] || 'This field';
          setFieldError(field, label + ' is required.');
          missing.push(label);
          if (!firstInvalid) firstInvalid = field;
        }
      });

      // Email format check (only if not already empty)
      var emailField = leadForm.querySelector('[type="email"]');
      if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        setFieldError(emailField, 'Please enter a valid email address.');
        if (!firstInvalid) firstInvalid = emailField;
      }

      // Basic phone check (needs at least 7 digits)
      var phoneField = leadForm.querySelector('[type="tel"]');
      if (phoneField && phoneField.value.trim()) {
        var digits = phoneField.value.replace(/\D/g, '');
        if (digits.length < 7) {
          setFieldError(phoneField, 'Please enter a valid phone number.');
          if (!firstInvalid) firstInvalid = phoneField;
        }
      }

      if (firstInvalid) {
        setSummaryError('Please complete the highlighted fields before submitting.');
        firstInvalid.focus({ preventScroll: false });
        try { firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (err) { /* ignore */ }
        return;
      }

      // Disable submit button during send
      var submitBtn = leadForm.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      // Collect form data into a plain object
      var formData = new FormData(leadForm);
      var payload = {};
      formData.forEach(function (value, key) { payload[key] = value; });

      // Merge in captured UTM / click-id tracking params
      var tracking = getTrackingParams();
      Object.keys(tracking).forEach(function (k) { payload[k] = tracking[k]; });

      // Add source metadata
      payload.source_url = window.location.href;
      payload.page = window.location.pathname;
      payload.referrer = document.referrer || '';
      payload.submitted_at = new Date().toISOString();

      // Fire Meta Pixel Lead event
      if (typeof window.fbq === 'function') {
        try {
          window.fbq('track', 'Lead', {
            content_name: 'Invest in You — 8 for $80',
            content_category: payload.location || 'unknown'
          });
        } catch (err) { /* ignore */ }
      }

      // POST to GHL webhook
      fetch(GHL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .catch(function () { /* non-blocking: lead still redirected */ })
      .finally(function () {
        // Always redirect to thank-you page; preserve UTMs and basic context
        var params = new URLSearchParams();
        if (payload.location) params.set('location', payload.location);
        if (payload.firstName) params.set('name', payload.firstName);
        Object.keys(tracking).forEach(function (k) { params.set(k, tracking[k]); });
        var suffix = params.toString() ? ('?' + params.toString()) : '';
        window.location.href = THANK_YOU_URL + suffix;
      });
    });
  }
})();
