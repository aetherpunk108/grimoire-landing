/* Epinoia Horizon — Docs runtime: starfield background, copy buttons, TOC scrollspy */
(function () {
  'use strict';

  // ---- Lightweight 2D Glowing Colorful Circular Orbs ----
  var canvas = document.getElementById('bg-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var palette = [
      [250, 204, 21],  // Sovereign Gold
      [34, 211, 238],  // Electric Cyan
      [168, 85, 247],  // Arcane Violet
      [244, 114, 182], // Nebula Rose
      [56, 189, 248],  // Celestial Sky Blue
      [52, 211, 153],  // Aether Emerald
      [251, 146, 60]   // Solar Amber
    ];
    var spriteSize = 64;
    var orbSprites = palette.map(function (col) {
      var off = document.createElement('canvas');
      off.width = spriteSize; off.height = spriteSize;
      var octx = off.getContext('2d');
      var half = spriteSize / 2;
      var grad = octx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0.0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.15, 'rgba(' + Math.min(255, col[0] + 45) + ',' + Math.min(255, col[1] + 45) + ',' + Math.min(255, col[2] + 45) + ',0.95)');
      grad.addColorStop(0.34, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.72)');
      grad.addColorStop(0.62, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.24)');
      grad.addColorStop(0.86, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0.05)');
      grad.addColorStop(1.0, 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',0)');
      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(half, half, half, 0, Math.PI * 2);
      octx.fill();
      return off;
    });
    var stars = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(220, Math.max(110, Math.round((W * H) / 8000)));
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 5.0 + 3.0,
          sprite: orbSprites[(Math.random() * orbSprites.length) | 0],
          a: Math.random() * 0.55 + 0.35,
          s: Math.random() * 0.18 + 0.04,
          vx: (Math.random() - 0.5) * 0.15,
          p: Math.random() * Math.PI * 2
        });
      }
      if (reduce) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduce) {
          s.y -= s.s;
          s.x += s.vx;
          if (s.y < -10) { s.y = H + 10; s.x = Math.random() * W; }
          if (s.x < -10) s.x = W + 10;
          else if (s.x > W + 10) s.x = -10;
        }
        var tw = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 0.0018 + s.p);
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.a * tw));
        var d = s.r * 2;
        ctx.drawImage(s.sprite, s.x - s.r, s.y - s.r, d, d);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
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
