/* Reese Professional Cleaning Service — interactions */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Quote form (mailto handoff, no backend/API) ---------- */
  var form = document.getElementById('quote-form');
  var note = document.getElementById('form-note');

  function setError(name, message) {
    var span = form.querySelector('[data-err="' + name + '"]');
    var input = form.elements[name];
    if (span) span.textContent = message || '';
    if (input && input.parentElement) {
      input.parentElement.classList.toggle('is-invalid', Boolean(message));
    }
    return !message;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var phone = form.elements.phone.value.trim();
      var region = form.elements.region.value;
      var service = form.elements.service.value;
      var message = form.elements.message.value.trim();

      var ok = true;
      ok = setError('name', name ? '' : 'Please enter your name.') && ok;
      ok = setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Please enter a valid email address.') && ok;
      ok = setError('phone', phone.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a phone number with at least 10 digits.') && ok;

      if (!ok) {
        note.textContent = 'Please correct the highlighted fields and try again.';
        note.classList.remove('is-success');
        return;
      }

      var subject = 'Quote request — ' + service + ' (' + region + ')';
      var body = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        'Service area: ' + region,
        'Service needed: ' + service,
        '',
        'Details:',
        message || '(none provided)'
      ].join('\n');

      window.location.href = 'mailto:reesecleaningservice@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      note.textContent = 'Thanks, ' + name.split(' ')[0] + '! Your email app is opening with the request ready to send. '
        + 'If nothing opens, call 267.257.0946 (PA & NY) or 302.932.1896 (DE).';
      note.classList.add('is-success');
      form.reset();
      ['name', 'email', 'phone'].forEach(function (f) { setError(f, ''); });
    });

    ['name', 'email', 'phone'].forEach(function (f) {
      var input = form.elements[f];
      if (input) {
        input.addEventListener('input', function () {
          if (input.parentElement.classList.contains('is-invalid')) setError(f, '');
        });
      }
    });
  }
})();
