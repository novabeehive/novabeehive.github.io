(function () {
  var items = [];
  var current = 0;

  function collect() {
    items = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] img'));
  }

  function show() {
    var el = items[current];
    if (!el) return;
    var overlay = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    if (!overlay || !img) return;
    img.src = el.dataset.full || el.src;
    img.alt = el.alt || '';
    overlay.classList.add('open');
  }

  window.openLightbox = function (imgEl) {
    collect();
    current = items.indexOf(imgEl);
    if (current < 0) current = 0;
    show();
  };

  window.closeLightbox = function () {
    var overlay = document.getElementById('lightbox');
    if (overlay) overlay.classList.remove('open');
  };

  window.navLightbox = function (dir) {
    collect();
    if (items.length === 0) return;
    current = (current + dir + items.length) % items.length;
    show();
  };

  window.swapMain = function (thumbEl) {
    var main = document.getElementById('hero-main-img');
    if (!main) return;
    var full = thumbEl.dataset.full || thumbEl.src;
    main.src = full;
    main.dataset.full = full;
    main.alt = thumbEl.alt || main.alt;
    document.querySelectorAll('.hero-thumb').forEach(function (t) {
      t.classList.remove('active');
    });
    thumbEl.classList.add('active');
  };

  document.addEventListener('keydown', function (e) {
    var overlay = document.getElementById('lightbox');
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.navLightbox(1);
    if (e.key === 'ArrowLeft') window.navLightbox(-1);
  });
})();
