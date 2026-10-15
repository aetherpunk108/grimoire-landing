/* Epinoia Horizon — Docs runtime: starfield background, copy buttons, TOC scrollspy */
(function () {
  'use strict';

  // ---- Lightweight 2D starfield (no WebGL, no overlap with content) ----
  var canvas = document.getElementById('bg-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var colors = ['139,92,246', '34,211,238', '234,179,8', '148,163,184'];
    var stars = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round((W * H) / 9000);
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.3 + 0.3,
          c: colors[(Math.random() * colors.length) | 0],
          a: Math.random() * 0.6 + 0.2,
          s: Math.random() * 0.15 + 0.03,
          p: Math.random() * Math.PI * 2
        });
      }
      if (reduce) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduce) { s.y -= s.s; if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; } }
        var tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * 0.0015 + s.p);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + s.c + ',' + (s.a * tw).toFixed(3) + ')';
        ctx.fill();
      }
    }

    function loop(t) { draw(t); requestAnimationFrame(loop); }
    window.addEventListener('resize', resize);
    resize();
    if (!reduce) requestAnimationFrame(loop);
  }

  // ---- Copy buttons ----
  var ICON_COPY = '<i class="far fa-copy"></i>';
  var ICON_OK = '<i class="fas fa-check"></i>';

  function copyText(text, btn) {
    function done() {
      btn.classList.add('ok');
      btn.innerHTML = ICON_OK + '<span>copied</span>';
      setTimeout(function () { btn.classList.remove('ok'); btn.innerHTML = ICON_COPY + '<span>copy</span>'; }, 1400);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.innerHTML = ICON_COPY + '<span>copy</span>';
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-copy'));
      if (!target) return;
      // strip comment spans so only runnable commands are copied
      var clone = target.cloneNode(true);
      clone.querySelectorAll('.cm, .prompt').forEach(function (n) { n.remove(); });
      var text = clone.textContent.split('\n').map(function (l) { return l.replace(/\s+$/, ''); }).join('\n').trim();
      copyText(text, btn);
    });
  });

  // ---- TOC scrollspy ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var firstId = null;
      for (var i = 0; i < links.length; i++) {
        var id = links[i].getAttribute('href').slice(1);
        if (visible[id]) { firstId = id; break; }
      }
      if (firstId) {
        links.forEach(function (a) { a.classList.remove('active'); });
        map[firstId].classList.add('active');
      }
    }, { rootMargin: '-90px 0px -55% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
