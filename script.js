(function () {
  'use strict';

  // ----- Mobile nav toggle -----
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var header = document.querySelector('.site-header');

  function setNavOpen(open) {
    if (!toggle || !header) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) header.setAttribute('data-nav-open', '');
    else header.removeAttribute('data-nav-open');
  }

  if (toggle && menu && header) {
    toggle.addEventListener('click', function () {
      setNavOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A') setNavOpen(false);
    });
  }

  // ----- Lightbox gallery -----
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCap = document.getElementById('lightbox-caption');
  var lbCount = document.getElementById('lightbox-counter');
  var lbPrev = document.getElementById('lightbox-prev');
  var lbNext = document.getElementById('lightbox-next');
  var lbClose = document.getElementById('lightbox-close');
  var setsEl = document.getElementById('project-sets');

  if (!lb || !lbImg || !setsEl) return;

  var sets = {};
  try { sets = JSON.parse(setsEl.textContent || '{}'); } catch (e) { return; }

  var currentSet = [];
  var currentIdx = 0;
  var triggerEl = null;

  function preload(src) { var i = new Image(); i.src = src; }

  function showAt(idx) {
    if (!currentSet.length) return;
    if (idx < 0) idx = currentSet.length - 1;
    if (idx >= currentSet.length) idx = 0;
    currentIdx = idx;
    var item = currentSet[idx];
    lb.classList.add('is-loading');
    lbImg.onload = function () { lb.classList.remove('is-loading'); };
    lbImg.onerror = function () { lb.classList.remove('is-loading'); };
    lbImg.src = item.src;
    lbImg.alt = item.alt || '';
    lbCap.textContent = item.alt || '';
    if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + currentSet.length;
    var multi = currentSet.length > 1;
    lbPrev.hidden = !multi;
    lbNext.hidden = !multi;
    if (lbCount) lbCount.hidden = !multi;
    if (multi) {
      var nextIdx = (idx + 1) % currentSet.length;
      var prevIdx = (idx - 1 + currentSet.length) % currentSet.length;
      preload(currentSet[nextIdx].src);
      preload(currentSet[prevIdx].src);
    }
  }

  function openLightbox(setKey, trigger) {
    var s = sets[setKey];
    if (!s || !s.length) return;
    currentSet = s;
    triggerEl = trigger || null;
    showAt(0);
    lb.hidden = false;
    document.body.setAttribute('data-lightbox-open', '');
    lbClose.focus();
  }

  function closeLightbox() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.removeAttribute('data-lightbox-open');
    if (triggerEl && typeof triggerEl.focus === 'function') triggerEl.focus();
  }

  function focusableInLightbox() {
    return [lbClose, lbPrev, lbNext].filter(function (el) { return el && !el.hidden; });
  }

  lb.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = focusableInLightbox();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  });

  document.querySelectorAll('.tile[data-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(btn.getAttribute('data-project'), btn);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function () { showAt(currentIdx - 1); });
  lbNext.addEventListener('click', function () { showAt(currentIdx + 1); });

  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) {
      if (e.key === 'Escape' && header && header.hasAttribute('data-nav-open')) {
        setNavOpen(false);
        if (toggle) toggle.focus();
      }
      return;
    }
    if (e.key === 'Escape') { closeLightbox(); }
    else if (e.key === 'ArrowLeft' && currentSet.length > 1) { showAt(currentIdx - 1); }
    else if (e.key === 'ArrowRight' && currentSet.length > 1) { showAt(currentIdx + 1); }
  });
})();
