(function () {
  'use strict';

  var bar = document.getElementById('ed-subbar');
  if (!bar) return;

  var masthead = document.getElementById('topbar-wrapper');
  var root = document.documentElement;

  function setOffset() {
    if (!masthead) return;
    root.style.setProperty('--ed-masthead', masthead.offsetHeight + 'px');
  }

  setOffset();

  if (window.ResizeObserver && masthead) {
    new ResizeObserver(setOffset).observe(masthead);
  } else {
    window.addEventListener('resize', setOffset);
  }

  var content = document.querySelector('article.ed-post > .content');
  if (!content) return;

  var headings = Array.prototype.filter.call(
    content.querySelectorAll('h2[id], h3[id]'),
    function (h) { return h.id; }
  );

  var parts = headings.filter(function (h) { return h.tagName === 'H2'; });
  var partEl = bar.querySelector('[data-part]');
  var progressEl = bar.querySelector('[data-progress]');
  var details = bar.querySelector('.ed-subbar-parts');
  var listEl = bar.querySelector('[data-part-list]');
  var items = [];

  headings.forEach(function (h) {
    var link = document.createElement('a');
    link.href = '#' + h.id;
    link.textContent = h.textContent.trim();
    link.className = 'ed-subbar-item' + (h.tagName === 'H3' ? ' is-sub' : '');
    listEl.appendChild(link);
    items.push({ link: link, heading: h, isPart: h.tagName === 'H2' });
  });

  details.hidden = parts.length < 2;

  details.addEventListener('click', function (event) {
    if (event.target.closest('a')) details.open = false;
  });

  var frame = 0;

  function update() {
    frame = 0;

    var rect = content.getBoundingClientRect();
    var span = content.offsetHeight - window.innerHeight;
    var ratio = span > 0 ? -rect.top / span : 0;
    ratio = Math.min(1, Math.max(0, ratio));
    if (progressEl) progressEl.style.transform = 'scaleX(' + ratio + ')';

    bar.classList.toggle('is-scrolled', window.scrollY > 80);

  if (items.length === 0) return;

    var marker = window.innerHeight * 0.25;
    var seenParts = 0;
    var currentPart = 0;
    var activeItem = null;

    items.forEach(function (item) {
      if (item.isPart) seenParts++;
      if (item.heading.getBoundingClientRect().top <= marker) {
        activeItem = item;
        if (item.isPart) currentPart = seenParts;
      }
    });

    if (currentPart === 0) currentPart = 1;

    if (partEl) partEl.textContent = 'Part ' + currentPart + '/' + parts.length;

    items.forEach(function (item) {
      item.link.classList.toggle('is-active', item === activeItem);
    });
  }

  function request() {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
})();
