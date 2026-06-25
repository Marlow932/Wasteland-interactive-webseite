/* ════════════════════════════════════════════════════════════
   Wasteland Interactive — wl-motion.js
   Aktiviert die non-destruktiven Motion-Utilities aus tokens/motion.css.
   Einbinden: <script src="assets/wl-motion.js" defer></script>

   Tut nur etwas bei Elementen mit den passenden Klassen:
   · .wl-reveal  → blendet beim Scrollen elegant ein (IntersectionObserver)
   · .wl-tilt    → 3D-Neigung, die der Maus folgt (Desktop, Pointer:fine)
   Respektiert prefers-reduced-motion. Nur transform/opacity.
   ──────────────────────────────────────────────────────────── */
(function () {
  "use strict";
  var docEl = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Signalisiert dem CSS, dass JS aktiv ist (erst dann darf etwas
     versteckt werden → non-destruktiv bei deaktiviertem JS). */
  if (!reduce) docEl.setAttribute("data-wl-motion", "");

  function init() {
    /* ── 3 · Scroll-In Reveal ─────────────────────────────────── */
    var reveals = [].slice.call(document.querySelectorAll(".wl-reveal"));
    if (reveals.length) {
      reveals.forEach(function (el) {
        var d = el.getAttribute("data-wl-delay");
        if (d) el.style.setProperty("--wl-reveal-delay", parseInt(d, 10) + "ms");
      });
      if (reduce || !("IntersectionObserver" in window)) {
        reveals.forEach(function (el) { el.classList.add("is-in"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
      }
    }

    /* ── 2c · 3D-Tilt ─────────────────────────────────────────── */
    if (!reduce && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      var tilts = [].slice.call(document.querySelectorAll(".wl-tilt"));
      tilts.forEach(function (el) {
        var MAX = parseFloat(el.getAttribute("data-wl-tilt")) || 6; // Grad
        var raf = null;
        function onMove(ev) {
          var r = el.getBoundingClientRect();
          var px = (ev.clientX - r.left) / r.width;   // 0..1
          var py = (ev.clientY - r.top) / r.height;   // 0..1
          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(function () {
            el.style.setProperty("--wl-ry", ((px - 0.5) * 2 * MAX).toFixed(2) + "deg");
            el.style.setProperty("--wl-rx", ((0.5 - py) * 2 * MAX).toFixed(2) + "deg");
            el.style.setProperty("--wl-mx", (px * 100).toFixed(1) + "%");
            el.style.setProperty("--wl-my", (py * 100).toFixed(1) + "%");
            el.style.setProperty("--wl-glare", "1");
          });
        }
        function onLeave() {
          if (raf) cancelAnimationFrame(raf);
          el.style.setProperty("--wl-rx", "0deg");
          el.style.setProperty("--wl-ry", "0deg");
          el.style.setProperty("--wl-glare", "0");
        }
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
