/* Wasteland Interactive — Conversion helpers (plain JS, no JSX)
   Defines Reveal, FunnelStepper and LogoStrip and attaches them onto the
   design-system namespace so kits + cards can use them via
   window.<NS>.<Name> regardless of bundle-emit timing. Plain
   React.createElement so it loads as a normal <script src> (no Babel).
   Mirrors the canonical sources in components/layout, /forms, /brand. */
(function () {
  var h = React.createElement;
  var NS = (window.WastelandInteractiveDesignSystem_24d9fb =
    window.WastelandInteractiveDesignSystem_24d9fb || {});

  /* ── Reveal — scroll-triggered fade-up ─────────────────────── */
  function Reveal(props) {
    var children = props.children, delay = props.delay || 0, y = props.y == null ? 18 : props.y,
        once = props.once !== false, style = props.style || {};
    var rest = {};
    Object.keys(props).forEach(function (k) {
      if (["children", "delay", "y", "once", "style"].indexOf(k) === -1) rest[k] = props[k];
    });
    var ref = React.useRef(null);
    var reduce = typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var st = React.useState(!!reduce), shown = st[0], setShown = st[1];
    React.useEffect(function () {
      if (reduce || !ref.current) return;
      var el = ref.current;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { setShown(true); if (once) io.unobserve(e.target); }
          else if (!once) { setShown(false); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      io.observe(el);
      return function () { io.disconnect(); };
    }, [reduce, once]);
    var base = {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(" + y + "px)",
      transition: "opacity var(--wl-dur-base) var(--wl-ease-standard) " + delay +
        "ms, transform var(--wl-dur-base) var(--wl-ease-standard) " + delay + "ms",
      willChange: "opacity, transform",
    };
    Object.keys(style).forEach(function (k) { base[k] = style[k]; });
    return h("div", Object.assign({ ref: ref, style: base }, rest), children);
  }

  /* ── FunnelStepper — multi-step funnel chrome ──────────────── */
  function FunnelStepper(props) {
    var steps = props.steps || [], current = props.current || 0,
        onStepClick = props.onStepClick, children = props.children, style = props.style;
    var total = steps.length || 1;
    var pct = Math.round(((current + 1) / total) * 100);
    var header = h("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "10px" } },
      h("span", { style: { fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wl-cyan)" } }, "Schritt " + (current + 1) + " / " + total),
      h("span", { style: { fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--wl-text-dim)" } }, pct + "%")
    );
    var bar = h("div", { style: { position: "relative", height: "2px", background: "var(--wl-border-15)", marginBottom: "20px" } },
      h("span", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: pct + "%", background: "var(--wl-cyan)", boxShadow: "var(--wl-glow-xs)", transition: "width var(--wl-dur-base) var(--wl-ease-standard)" } })
    );
    var pills = h("div", { style: { display: "flex", gap: "8px", marginBottom: "24px" } },
      steps.map(function (label, i) {
        var done = i < current, active = i === current, clickable = onStepClick && i <= current;
        return h("button", {
          type: "button", key: i, disabled: !clickable,
          onClick: clickable ? function () { onStepClick(i); } : undefined,
          style: {
            flex: 1, display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px",
            background: active ? "var(--wl-cyan-05)" : "transparent",
            border: "1px solid " + (active ? "var(--wl-cyan)" : done ? "var(--wl-cyan-45)" : "var(--wl-border-15)"),
            boxShadow: active ? "var(--wl-glow-sm)" : "none",
            cursor: clickable ? "pointer" : "default", textAlign: "left", transition: "var(--wl-transition)",
          },
        },
          h("span", { style: {
            width: "18px", height: "18px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--wl-font-mono)", fontSize: "10px", fontWeight: 700,
            background: done ? "var(--wl-cyan)" : "transparent",
            color: done ? "#000" : active ? "var(--wl-cyan)" : "var(--wl-text-dim)",
            border: done ? "none" : "1px solid " + (active ? "var(--wl-cyan)" : "var(--wl-border-20)"),
          } }, done ? "✓" : ("0" + (i + 1)).slice(-2)),
          h("span", { style: {
            fontFamily: "var(--wl-font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em",
            color: active ? "var(--wl-text)" : done ? "var(--wl-text-soft)" : "var(--wl-text-dim)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          } }, label)
        );
      })
    );
    return h("div", { style: style }, header, bar, pills, children);
  }

  /* ── LogoStrip — social-proof trust row ────────────────────── */
  function LogoStrip(props) {
    var label = props.label == null ? "Vertraut von" : props.label,
        logos = props.logos || [], align = props.align || "center", style = props.style || {};
    var wrap = { display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: "20px" };
    Object.keys(style).forEach(function (k) { wrap[k] = style[k]; });
    return h("div", { style: wrap },
      label ? h("span", { style: { fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--wl-text-dim)" } },
        h("span", { "aria-hidden": "true", style: { color: "var(--wl-cyan)" } }, "// "), label) : null,
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", gap: "40px", flexWrap: "wrap" } },
        logos.map(function (l, i) {
          return h("img", {
            key: i, src: l.src, alt: l.alt,
            style: { height: l.height || "34px", width: "auto", opacity: 0.5, filter: "grayscale(1) brightness(1.4)", transition: "opacity var(--wl-dur-fast) ease, filter var(--wl-dur-fast) ease" },
            onMouseEnter: function (e) { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = "grayscale(0) brightness(1)"; },
            onMouseLeave: function (e) { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.filter = "grayscale(1) brightness(1.4)"; },
          });
        })
      )
    );
  }

  /* ── TiltCard — 3D cursor-tilt with cyan glare ─────────────── */
  function TiltCard(props) {
    var children = props.children, max = props.max == null ? 9 : props.max,
        glare = props.glare !== false, pad = props.pad || "lg", style = props.style || {};
    var rest = {};
    Object.keys(props).forEach(function (k) { if (["children", "max", "glare", "pad", "style"].indexOf(k) === -1) rest[k] = props[k]; });
    var ref = React.useRef(null);
    var pads = { sm: "16px", md: "24px", lg: "32px", xl: "40px" };
    var stt = React.useState({ rx: 0, ry: 0, gx: 50, gy: 0, active: false }), t = stt[0], setT = stt[1];
    var reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function onMove(e) {
      if (reduce || !ref.current) return;
      var r = ref.current.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      setT({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, active: true });
    }
    function reset() { setT({ rx: 0, ry: 0, gx: 50, gy: 0, active: false }); }
    var inner = h("div", Object.assign({
      ref: ref, onMouseMove: onMove, onMouseLeave: reset,
      style: {
        position: "relative", transformStyle: "preserve-3d",
        transform: "rotateX(" + t.rx + "deg) rotateY(" + t.ry + "deg) translateZ(0) scale(" + (t.active ? 1.015 : 1) + ")",
        transition: t.active ? "transform 0.08s linear, border-color 0.3s ease, box-shadow 0.4s ease" : "transform 0.5s var(--wl-ease-standard), border-color 0.3s ease, box-shadow 0.4s ease",
        background: t.active ? "var(--wl-surface)" : "var(--wl-surface-2)",
        border: "1px solid " + (t.active ? "var(--wl-cyan-45)" : "var(--wl-border)"),
        borderRadius: "var(--wl-radius)", padding: pads[pad] || pads.lg,
        boxShadow: t.active ? "var(--wl-shadow-lift), var(--wl-glow-md)" : "none", willChange: "transform",
      },
    }, rest),
      glare ? h("span", { "aria-hidden": "true", style: {
        position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
        opacity: t.active ? 1 : 0, transition: "opacity 0.3s ease",
        background: "radial-gradient(circle at " + t.gx + "% " + t.gy + "%, rgba(0,240,255,0.18), transparent 45%)",
        mixBlendMode: "screen",
      } }) : null,
      h("div", { style: { position: "relative", transform: "translateZ(40px)", transformStyle: "preserve-3d" } }, children)
    );
    return h("div", { style: Object.assign({ perspective: "1000px" }, style) }, inner);
  }

  /* ── WireCube — pure-CSS 3D rotating wireframe ─────────────── */
  function WireCube(props) {
    var size = props.size || 240, speed = props.speed || 18, glow = props.glow !== false, style = props.style || {};
    var half = size / 2;
    var faceBase = { position: "absolute", width: size + "px", height: size + "px",
      border: "1px solid var(--wl-cyan-30)", background: "linear-gradient(135deg, rgba(0,240,255,0.05), transparent 60%)",
      boxShadow: glow ? "inset 0 0 40px rgba(0,240,255,0.06)" : "none" };
    var faces = [
      "translateZ(" + half + "px)", "rotateY(180deg) translateZ(" + half + "px)",
      "rotateY(90deg) translateZ(" + half + "px)", "rotateY(-90deg) translateZ(" + half + "px)",
      "rotateX(90deg) translateZ(" + half + "px)", "rotateX(-90deg) translateZ(" + half + "px)",
    ];
    var corners = [{ left: 0, top: 0 }, { left: size, top: 0 }, { left: 0, top: size }, { left: size, top: size }];
    function nodeStyle(c) { return { position: "absolute", width: "8px", height: "8px", marginLeft: "-4px", marginTop: "-4px",
      borderRadius: "9999px", background: "var(--wl-cyan)", boxShadow: "0 0 10px var(--wl-cyan)", left: c.left + "px", top: c.top + "px" }; }
    return h("div", { style: Object.assign({ perspective: "900px", width: size + "px", height: size + "px",
        animation: "wl-float-y " + (speed / 3) + "s var(--wl-ease-soft) infinite" }, style) },
      h("div", { style: { position: "relative", width: size + "px", height: size + "px", transformStyle: "preserve-3d", animation: "wl-spin-3d " + speed + "s linear infinite" } },
        faces.map(function (f, i) {
          return h("div", { key: i, style: Object.assign({}, faceBase, { transform: f }) },
            corners.map(function (c, j) { return h("span", { key: j, style: nodeStyle(c) }); }));
        }),
        h("div", { style: { position: "absolute", left: (half - 4) + "px", top: (half - 4) + "px", width: "8px", height: "8px",
          borderRadius: "9999px", background: "var(--wl-cyan)", boxShadow: "0 0 24px 6px rgba(0,240,255,0.6)" } })
      )
    );
  }

  /* ── StickyBar — scroll-triggered conversion bar ───────────── */
  function StickyBar(props) {
    var message = props.message == null ? "Kostenloses System-Audit sichern — in 24h Antwort." : props.message,
        ctaLabel = props.ctaLabel || "Audit sichern", onCta = props.onCta, href = props.href,
        showAfter = props.showAfter == null ? 480 : props.showAfter, scrollTargetId = props.scrollTargetId,
        dismissible = props.dismissible !== false, style = props.style || {};
    var s1 = React.useState(false), shown = s1[0], setShown = s1[1];
    var s2 = React.useState(false), closed = s2[0], setClosed = s2[1];
    React.useEffect(function () {
      var target = scrollTargetId ? document.getElementById(scrollTargetId) : window;
      if (!target) return;
      function read() { return scrollTargetId ? target.scrollTop : (window.scrollY || window.pageYOffset); }
      function onScroll() { setShown(read() > showAfter); }
      onScroll();
      target.addEventListener("scroll", onScroll, { passive: true });
      return function () { target.removeEventListener("scroll", onScroll); };
    }, [scrollTargetId, showAfter]);
    var visible = shown && !closed;
    var Button = NS.Button;
    return h("div", Object.assign({ style: Object.assign({ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 9990,
        transform: visible ? "translateY(0)" : "translateY(120%)", transition: "transform 0.5s var(--wl-ease-standard)" }, style) }, {}),
      h("div", { className: "wl-accent-line" }),
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap",
          padding: "14px 24px", background: "rgba(5,5,5,0.92)", borderTop: "1px solid var(--wl-border)", backdropFilter: "blur(12px)" } },
        h("div", { style: { display: "flex", alignItems: "center", gap: "12px", minWidth: 0 } },
          h("span", { style: { width: "8px", height: "8px", flexShrink: 0, borderRadius: "9999px", background: "var(--wl-cyan)", boxShadow: "0 0 8px var(--wl-cyan)", animation: "wl-pulse 2s infinite" } }),
          h("span", { style: { fontFamily: "var(--wl-font-mono)", fontSize: "13px", letterSpacing: "0.02em", color: "var(--wl-text-soft)" } }, message)
        ),
        h("div", { style: { display: "flex", alignItems: "center", gap: "12px" } },
          Button ? h(Button, { size: "sm", withArrow: true, href: href, onClick: onCta }, ctaLabel) : null,
          dismissible ? h("button", { type: "button", "aria-label": "Schließen", onClick: function () { setClosed(true); },
            style: { background: "transparent", border: "1px solid var(--wl-border-20)", color: "var(--wl-text-dim)", width: "34px", height: "34px", cursor: "pointer", fontFamily: "var(--wl-font-mono)", fontSize: "13px", borderRadius: "var(--wl-radius)" } }, "✕") : null
        )
      )
    );
  }

  /* ── ExitIntentModal — exit-intent lead-capture overlay ────── */
  function ExitIntentModal(props) {
    var eyebrow = props.eyebrow == null ? "Warte kurz //" : props.eyebrow,
        title = props.title == null ? "Geh nicht mit leeren Händen." : props.title,
        children = props.children, onClose = props.onClose, once = props.once !== false,
        force = !!props.force, storageKey = props.storageKey || "wl-exit-intent", style = props.style || {};
    var s1 = React.useState(false), open = s1[0], setOpen = s1[1];
    var firedRef = React.useRef(false);
    React.useEffect(function () {
      if (force) { setOpen(true); return; }
      if (once && typeof sessionStorage !== "undefined" && sessionStorage.getItem(storageKey)) return;
      function onLeave(e) {
        if (firedRef.current) return;
        if (e.clientY <= 0) { firedRef.current = true; setOpen(true); if (once && typeof sessionStorage !== "undefined") sessionStorage.setItem(storageKey, "1"); }
      }
      document.addEventListener("mouseout", onLeave);
      return function () { document.removeEventListener("mouseout", onLeave); };
    }, [force, once, storageKey]);
    function close() { setOpen(false); if (onClose) onClose(); }
    return h("div", { "aria-hidden": !open, onClick: close, style: Object.assign({ position: "fixed", inset: 0, zIndex: 9995,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.32s var(--wl-ease-inout)" }, style) },
      h("div", { onClick: function (e) { e.stopPropagation(); }, style: {
          position: "relative", width: "min(440px, 100%)", background: "var(--wl-surface)", border: "1px solid var(--wl-cyan-45)",
          borderTop: "2px solid var(--wl-cyan)", borderRadius: "var(--wl-radius)", boxShadow: "var(--wl-shadow-modal), var(--wl-glow-lg)",
          padding: "36px 32px 32px", transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)", opacity: open ? 1 : 0,
          transition: "transform 0.4s var(--wl-ease-standard), opacity 0.4s ease" } },
        h("button", { type: "button", "aria-label": "Schließen", onClick: close, style: { position: "absolute", top: "12px", right: "12px",
          background: "transparent", border: "1px solid var(--wl-border-20)", color: "var(--wl-text-dim)", width: "30px", height: "30px",
          cursor: "pointer", fontFamily: "var(--wl-font-mono)", fontSize: "12px", borderRadius: "var(--wl-radius)" } }, "✕"),
        h("div", { style: { fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wl-cyan)", marginBottom: "12px" } }, eyebrow),
        h("h3", { style: { margin: "0 0 16px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "1.6rem", lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" } }, title),
        children
      )
    );
  }

  /* ── NetworkSphere — canvas rotating particle network ──────── */
  function NetworkSphere(props) {
    var size = props.size || 320, count = props.count || 90, speed = props.speed || 0.12,
        linkDist = props.linkDist || 0.55, color = props.color || "0,240,255", style = props.style || {};
    var rest = {};
    Object.keys(props).forEach(function (k) { if (["size","count","speed","linkDist","color","style"].indexOf(k) === -1) rest[k] = props[k]; });
    var canvasRef = React.useRef(null);
    React.useEffect(function () {
      var canvas = canvasRef.current; if (!canvas) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr; canvas.height = size * dpr;
      var ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var R = size * 0.4, cx = size / 2, cy = size / 2;
      var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < count; i++) {
        var y = 1 - (i / (count - 1)) * 2, r = Math.sqrt(1 - y * y), theta = golden * i;
        pts.push({ x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r });
      }
      var raf, angle = 0;
      function draw() {
        ctx.clearRect(0, 0, size, size);
        var sin = Math.sin(angle), cos = Math.cos(angle);
        var proj = pts.map(function (p) {
          var x = p.x * cos - p.z * sin, z = p.x * sin + p.z * cos;
          return { x: x, y: p.y, z: z, sx: cx + x * R, sy: cy + p.y * R };
        });
        for (var i2 = 0; i2 < proj.length; i2++) {
          for (var j = i2 + 1; j < proj.length; j++) {
            var a = proj[i2], b = proj[j];
            var dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
            var d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < linkDist) {
              var depth = (a.z + b.z) / 2;
              var alpha = (1 - d / linkDist) * 0.5 * (0.45 + (depth + 1) / 2 * 0.55);
              ctx.strokeStyle = "rgba(" + color + "," + alpha.toFixed(3) + ")";
              ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
            }
          }
        }
        proj.sort(function (a, b) { return a.z - b.z; });
        proj.forEach(function (p) {
          var t = (p.z + 1) / 2, rr = 0.8 + t * 2.2, al = 0.25 + t * 0.75;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, rr, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + color + "," + al.toFixed(3) + ")";
          ctx.shadowBlur = t > 0.6 ? 8 * t : 0; ctx.shadowColor = "rgba(" + color + ",0.8)";
          ctx.fill(); ctx.shadowBlur = 0;
        });
        if (!reduce) { angle += speed * 0.016; raf = requestAnimationFrame(draw); }
      }
      draw();
      return function () { if (raf) cancelAnimationFrame(raf); };
    }, [size, count, speed, linkDist, color]);
    return h("div", Object.assign({ style: Object.assign({ width: size + "px", height: size + "px", animation: "wl-float-y 9s var(--wl-ease-soft) infinite" }, style) }, rest),
      h("canvas", { ref: canvasRef, style: { width: size + "px", height: size + "px", display: "block" } }));
  }

  /* ── AmbientField — living full-page background layer ──────────
     Fixed-to-viewport backdrop: engineering grid + drifting cyan/navy
     orbs + a slow breathing aurora. Reacts subtly to scroll (parallax)
     and pointer (orbs lean toward the cursor). On-brand: only cyan
     (#00f0ff) and navy (#1a3066) on black. prefers-reduced-motion →
     static. pointer-events:none, decorative. Mount once per page as the
     first child of the scroll container; keep section bgs translucent. */
  function AmbientField(props) {
    var intensity = props.intensity == null ? 1 : props.intensity;
    var scrollTargetId = props.scrollTargetId || null;
    var reduce = typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var gridRef = React.useRef(null);
    var aRef = React.useRef(null), bRef = React.useRef(null), cRef = React.useRef(null);

    React.useEffect(function () {
      if (reduce) return;
      var scroller = scrollTargetId ? document.getElementById(scrollTargetId) : window;
      var pointer = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 };
      var scrollP = 0, curScroll = 0, raf;
      function onMove(e) {
        pointer.x = e.clientX / window.innerWidth;
        pointer.y = e.clientY / window.innerHeight;
      }
      function readScroll() {
        var top = scroller === window ? (window.scrollY || 0) : scroller.scrollTop;
        var h2 = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
        scrollP = Math.min(top / Math.max(h2 - window.innerHeight, 1), 1);
      }
      function tick() {
        cur.x += (pointer.x - cur.x) * 0.05;
        cur.y += (pointer.y - cur.y) * 0.05;
        curScroll += (scrollP - curScroll) * 0.08;
        var px = (cur.x - 0.5), py = (cur.y - 0.5);
        var s = curScroll;
        if (aRef.current) aRef.current.style.transform =
          "translate3d(" + (px * 40 * intensity) + "px," + (py * 40 * intensity - s * 120) + "px,0)";
        if (bRef.current) bRef.current.style.transform =
          "translate3d(" + (px * -55 * intensity) + "px," + (py * -45 * intensity + s * 90) + "px,0)";
        if (cRef.current) cRef.current.style.transform =
          "translate3d(" + (px * 30 * intensity) + "px," + (py * 30 * intensity - s * 60) + "px,0)";
        if (gridRef.current) gridRef.current.style.transform =
          "translate3d(0," + (s * 40) + "px,0)";
        raf = requestAnimationFrame(tick);
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      (scroller === window ? window : scroller).addEventListener("scroll", readScroll, { passive: true });
      readScroll();
      raf = requestAnimationFrame(tick);
      return function () {
        window.removeEventListener("pointermove", onMove);
        (scroller === window ? window : scroller).removeEventListener("scroll", readScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [reduce, scrollTargetId, intensity]);

    var orb = function (ref, st, drift) {
      var base = {
        position: "absolute", borderRadius: "9999px", filter: "blur(72px)",
        pointerEvents: "none", willChange: "transform",
      };
      Object.keys(st).forEach(function (k) { base[k] = st[k]; });
      if (!reduce && drift) base.animation = drift;
      return h("span", { "aria-hidden": "true", ref: ref, style: base });
    };

    return h("div", {
      "aria-hidden": "true",
      style: {
        position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
        pointerEvents: "none", background: "var(--wl-bg-pure)",
      },
    },
      // grid
      h("span", {
        ref: gridRef, className: "wl-grid-lines",
        style: { position: "absolute", inset: "-5% -5% -5% -5%", opacity: 0.10, willChange: "transform" },
      }),
      // breathing aurora (very soft, central)
      h("span", {
        "aria-hidden": "true",
        style: {
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(60% 50% at 50% 30%, rgba(0,240,255,0.05), transparent 70%)",
          animation: reduce ? "none" : "wl-aurora 14s ease-in-out infinite",
        },
      }),
      orb(aRef, { width: "34rem", height: "34rem", left: "-12rem", top: "-6rem",
        background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 68%)", opacity: 0.7 },
        "wl-ambient-drift 22s var(--wl-ease-soft) infinite alternate"),
      orb(bRef, { width: "38rem", height: "38rem", right: "-14rem", top: "30%",
        background: "radial-gradient(circle, rgba(26,48,102,0.30) 0%, transparent 70%)", opacity: 0.65 },
        "wl-ambient-drift 28s var(--wl-ease-soft) infinite alternate-reverse"),
      orb(cRef, { width: "28rem", height: "28rem", left: "20%", bottom: "-12rem",
        background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 68%)", opacity: 0.55 },
        "wl-ambient-drift 25s var(--wl-ease-soft) infinite alternate")
    );
  }

  NS.AmbientField = NS.AmbientField || AmbientField;

  /* ── ScrollProgress — top scroll-progress bar ───────────────── */
  function ScrollProgress(props) {
    var scrollTargetId = props.scrollTargetId || null;
    var height = props.height || 3;
    var ref = React.useRef(null);
    React.useEffect(function () {
      var scroller = scrollTargetId ? document.getElementById(scrollTargetId) : window;
      if (!scroller) return;
      var raf;
      function update() {
        var top = scroller === window ? (window.scrollY || 0) : scroller.scrollTop;
        var hh = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
        var p = Math.min(Math.max(top / Math.max(hh - window.innerHeight, 1), 0), 1);
        if (ref.current) ref.current.style.transform = "scaleX(" + p.toFixed(4) + ")";
      }
      function onScroll() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }
      (scroller === window ? window : scroller).addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
      return function () {
        (scroller === window ? window : scroller).removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [scrollTargetId]);
    return h("div", { "aria-hidden": "true", style: { position: "fixed", top: 0, left: 0, right: 0, height: height + "px", zIndex: 100, pointerEvents: "none", background: "rgba(255,255,255,0.04)" } },
      h("div", { ref: ref, style: { height: "100%", width: "100%", transform: "scaleX(0)", transformOrigin: "left center", background: "linear-gradient(90deg, var(--wl-cyan), #7df9ff)", boxShadow: "0 0 10px rgba(0,240,255,0.6)", willChange: "transform" } }));
  }
  NS.ScrollProgress = NS.ScrollProgress || ScrollProgress;

  /* ── CursorGlow — subtle cyan glow following the cursor ─────── */
  function CursorGlow(props) {
    var size = props.size || 360;
    var reduce = typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fine = typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(pointer: fine)").matches;
    var ref = React.useRef(null);
    React.useEffect(function () {
      if (reduce || !fine) return;
      var tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty, raf, vis = false;
      function onMove(e) { tx = e.clientX; ty = e.clientY; if (!vis && ref.current) { ref.current.style.opacity = "1"; vis = true; } }
      function onLeave() { if (ref.current) ref.current.style.opacity = "0"; vis = false; }
      function tick() {
        cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
        if (ref.current) ref.current.style.transform = "translate3d(" + (cx - size / 2) + "px," + (cy - size / 2) + "px,0)";
        raf = requestAnimationFrame(tick);
      }
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
      return function () {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [reduce, fine, size]);
    if (reduce) return null;
    return h("div", { "aria-hidden": "true", ref: ref, style: { position: "fixed", top: 0, left: 0, width: size + "px", height: size + "px", zIndex: 60, pointerEvents: "none", opacity: 0, transition: "opacity 0.4s ease", background: "radial-gradient(circle, rgba(0,240,255,0.10) 0%, rgba(0,240,255,0.04) 35%, transparent 70%)", mixBlendMode: "screen", willChange: "transform" } });
  }
  NS.CursorGlow = NS.CursorGlow || CursorGlow;

  /* ── FaqList — accordion of question/answer pairs ──────────── */
  function FaqItemRow(props) {
    var item = props.item, open = props.open, onToggle = props.onToggle;
    return h("div", { style: { borderBottom: "1px solid var(--wl-border)" } },
      h("button", {
        type: "button", onClick: onToggle,
        style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "20px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" },
      },
        h("span", { style: { fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "15px", textTransform: "uppercase", letterSpacing: "-0.01em", color: open ? "var(--wl-cyan)" : "#fff", transition: "color var(--wl-dur-fast) ease" } }, item.q),
        h("span", { "aria-hidden": "true", style: { flexShrink: 0, fontFamily: "var(--wl-font-mono)", fontSize: "16px", color: "var(--wl-cyan)", transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform var(--wl-dur-fast) var(--wl-ease-standard)" } }, "+")
      ),
      h("div", { style: { maxHeight: open ? "320px" : "0", overflow: "hidden", transition: "max-height var(--wl-dur-base) var(--wl-ease-standard)" } },
        h("p", { style: { margin: 0, padding: "0 4px 22px", fontSize: "14px", lineHeight: 1.65, color: "var(--wl-text-muted)", maxWidth: "60ch" } }, item.a)
      )
    );
  }
  function FaqList(props) {
    var items = props.items || [], style = props.style || {};
    var st = React.useState(0), openIdx = st[0], setOpen = st[1];
    return h("div", { style: Object.assign({ borderTop: "1px solid var(--wl-border)" }, style) },
      items.map(function (it, i) {
        return h(FaqItemRow, { key: i, item: it, open: openIdx === i, onToggle: function () { setOpen(openIdx === i ? -1 : i); } });
      })
    );
  }
  NS.FaqList = NS.FaqList || FaqList;


  NS.Reveal = NS.Reveal || Reveal;
  NS.FunnelStepper = NS.FunnelStepper || FunnelStepper;
  NS.LogoStrip = NS.LogoStrip || LogoStrip;
  NS.TiltCard = NS.TiltCard || TiltCard;
  NS.WireCube = NS.WireCube || WireCube;
  NS.NetworkSphere = NS.NetworkSphere || NetworkSphere;
  NS.StickyBar = NS.StickyBar || StickyBar;
  NS.ExitIntentModal = NS.ExitIntentModal || ExitIntentModal;
})();
