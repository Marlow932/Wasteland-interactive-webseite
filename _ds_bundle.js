/* @ds-bundle: {"format":3,"namespace":"WastelandInteractiveDesignSystem_24d9fb","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"FAB","sourcePath":"components/actions/FAB.jsx"},{"name":"AmbientField","sourcePath":"components/brand/AmbientField.jsx"},{"name":"CursorGlow","sourcePath":"components/brand/CursorGlow.jsx"},{"name":"LogoStrip","sourcePath":"components/brand/LogoStrip.jsx"},{"name":"NetworkSphere","sourcePath":"components/brand/NetworkSphere.jsx"},{"name":"ScrollProgress","sourcePath":"components/brand/ScrollProgress.jsx"},{"name":"WireCube","sourcePath":"components/brand/WireCube.jsx"},{"name":"BenefitCard","sourcePath":"components/cards/BenefitCard.jsx"},{"name":"ConnectLink","sourcePath":"components/cards/ConnectLink.jsx"},{"name":"MotionCard","sourcePath":"components/cards/MotionCard.jsx"},{"name":"PricingCard","sourcePath":"components/cards/PricingCard.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"StatTile","sourcePath":"components/cards/StatTile.jsx"},{"name":"TiltCard","sourcePath":"components/cards/TiltCard.jsx"},{"name":"ExitIntentModal","sourcePath":"components/conversion/ExitIntentModal.jsx"},{"name":"StickyBar","sourcePath":"components/conversion/StickyBar.jsx"},{"name":"FaqList","sourcePath":"components/feedback/FaqList.jsx"},{"name":"Label","sourcePath":"components/feedback/Label.jsx"},{"name":"ScannerLog","sourcePath":"components/feedback/ScannerLog.jsx"},{"name":"StatusBadge","sourcePath":"components/feedback/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"FunnelStepper","sourcePath":"components/forms/FunnelStepper.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"OptionGrid","sourcePath":"components/forms/OptionGrid.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Reveal","sourcePath":"components/layout/Reveal.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"},{"name":"SectionShell","sourcePath":"components/layout/SectionShell.jsx"}],"sourceHashes":{"assets/wl-motion.js":"85322e9b7404","components/actions/Button.jsx":"9cd4bd0a64da","components/actions/FAB.jsx":"73e2d9c9dcbd","components/brand/AmbientField.jsx":"3b38b699c499","components/brand/CursorGlow.jsx":"8d69b4630b9d","components/brand/LogoStrip.jsx":"aad431c37fd1","components/brand/NetworkSphere.jsx":"41b728401d84","components/brand/ScrollProgress.jsx":"672d06779c01","components/brand/WireCube.jsx":"369a22a26757","components/cards/BenefitCard.jsx":"dc849900cb9a","components/cards/ConnectLink.jsx":"fc94c5df163f","components/cards/MotionCard.jsx":"0061fdf4b1f3","components/cards/PricingCard.jsx":"aac1a9024f81","components/cards/ServiceCard.jsx":"532a96ebf014","components/cards/StatTile.jsx":"a1dd3ce699f0","components/cards/TiltCard.jsx":"5c081b2314d9","components/conversion/ExitIntentModal.jsx":"56613f65b94f","components/conversion/StickyBar.jsx":"1f2f5783392f","components/feedback/FaqList.jsx":"ce3b6883af09","components/feedback/Label.jsx":"e5be730852f5","components/feedback/ScannerLog.jsx":"893b5b645161","components/feedback/StatusBadge.jsx":"a619cabd35c6","components/feedback/Tag.jsx":"580e77a3f2c8","components/forms/FormField.jsx":"37df51876412","components/forms/FunnelStepper.jsx":"446f4a41cfea","components/forms/Input.jsx":"f70e5d2198ee","components/forms/OptionGrid.jsx":"2cfd4aa42b8f","components/forms/Select.jsx":"3e9f30d10527","components/forms/Textarea.jsx":"315b0550d164","components/layout/Reveal.jsx":"d4f46a7dd269","components/layout/SectionHeading.jsx":"49512d3fd8e1","components/layout/SectionShell.jsx":"09c0c994badf","ui_kits/connect/screens.jsx":"e45c97df4fac","ui_kits/lead-engine/screens.jsx":"990448767f02","ui_kits/partner/screens.jsx":"6fba629056d4","ui_kits/sentinel/data.js":"13f6cb70f9cb","ui_kits/sentinel/screens.jsx":"8b514f0b9c87","ui_kits/website/screens.jsx":"860c55a1e076"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WastelandInteractiveDesignSystem_24d9fb = window.WastelandInteractiveDesignSystem_24d9fb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/wl-motion.js
try { (() => {
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
        reveals.forEach(function (el) {
          el.classList.add("is-in");
        });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        }, {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px"
        });
        reveals.forEach(function (el) {
          io.observe(el);
        });
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
          var px = (ev.clientX - r.left) / r.width; // 0..1
          var py = (ev.clientY - r.top) / r.height; // 0..1
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/wl-motion.js", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Button
 * Hard-edged terminal CTA. Mono uppercase label, wide tracking,
 * optional "->" arrow. Renders <a> when `href` is set, else <button>.
 */
function Button({
  variant = "primary",
  size = "md",
  full = false,
  withArrow = false,
  glow = false,
  disabled = false,
  href,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: "10px 20px",
      fontSize: "10px",
      minHeight: "auto"
    },
    md: {
      padding: "14px 24px",
      fontSize: "11px",
      minHeight: "3rem"
    },
    lg: {
      padding: "18px 32px",
      fontSize: "12px",
      minHeight: "3.25rem"
    }
  };
  const palette = {
    primary: {
      rest: {
        background: "var(--wl-cyan)",
        color: "#000",
        border: "1px solid var(--wl-cyan)"
      },
      hover: {
        background: "#fff",
        color: "#000",
        borderColor: "#fff"
      }
    },
    ghost: {
      rest: {
        background: "transparent",
        color: "var(--wl-text)",
        border: "1px solid var(--wl-border-20)"
      },
      hover: {
        borderColor: "var(--wl-cyan)",
        color: "var(--wl-cyan)"
      }
    },
    success: {
      rest: {
        background: "var(--wl-green)",
        color: "#fff",
        border: "1px solid var(--wl-green)"
      },
      hover: {
        background: "var(--wl-emerald)",
        borderColor: "var(--wl-emerald)"
      }
    }
  };
  const v = palette[variant] || palette.primary;
  const base = {
    display: full ? "flex" : "inline-flex",
    width: full ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--wl-font-mono)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "var(--wl-tracking-cta)",
    borderRadius: "var(--wl-radius)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "var(--wl-transition)",
    whiteSpace: "nowrap",
    boxShadow: glow && variant === "primary" ? "var(--wl-glow-cta)" : "none",
    ...sizes[size],
    ...v.rest,
    ...(hover && !disabled ? v.hover : null),
    ...style
  };
  const arrow = withArrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--wl-font-mono)"
    }
  }, "->") : null;
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: base
    }, handlers, rest), children, arrow);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: base
  }, handlers, rest), children, arrow);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/FAB.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — FAB
 * Fixed floating action control, bottom-right. Outlined cyan on
 * black with a soft glow that intensifies on hover. Mono label.
 */
function FAB({
  label = "Audit",
  icon,
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 9998,
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: hover ? "var(--wl-cyan-10)" : "var(--wl-bg-pure)",
    color: "var(--wl-cyan)",
    border: "1px solid var(--wl-cyan)",
    padding: "15px 25px",
    fontFamily: "var(--wl-font-mono)",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "var(--wl-tracking-label)",
    borderRadius: "var(--wl-radius)",
    cursor: "pointer",
    boxShadow: hover ? "var(--wl-glow-lg)" : "var(--wl-glow-sm)",
    transition: "var(--wl-transition)",
    ...style
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), icon, label);
}
Object.assign(__ds_scope, { FAB });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/FAB.jsx", error: String((e && e.message) || e) }); }

// components/brand/AmbientField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — AmbientField
 * Living full-page background layer. A fixed-to-viewport backdrop with
 * the engineering grid, slowly drifting cyan/navy orbs and a breathing
 * aurora. Reacts subtly to scroll (parallax) and pointer (orbs lean
 * toward the cursor). Strictly on-brand — only cyan (#00f0ff) and navy
 * (#1a3066) on black. Decorative (pointer-events:none, aria-hidden);
 * honors prefers-reduced-motion (static). Mount once per page as the
 * first child of the scroll container and keep section backgrounds
 * translucent so it breathes through.
 */
function AmbientField({
  intensity = 1,
  scrollTargetId = null,
  style,
  ...rest
}) {
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gridRef = React.useRef(null);
  const aRef = React.useRef(null),
    bRef = React.useRef(null),
    cRef = React.useRef(null);
  React.useEffect(() => {
    if (reduce) return;
    const scroller = scrollTargetId ? document.getElementById(scrollTargetId) : window;
    const pointer = {
        x: 0.5,
        y: 0.5
      },
      cur = {
        x: 0.5,
        y: 0.5
      };
    let scrollP = 0,
      curScroll = 0,
      raf;
    const onMove = e => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    };
    const readScroll = () => {
      const top = scroller === window ? window.scrollY || 0 : scroller.scrollTop;
      const h = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
      scrollP = Math.min(top / Math.max(h - window.innerHeight, 1), 1);
    };
    const tick = () => {
      cur.x += (pointer.x - cur.x) * 0.05;
      cur.y += (pointer.y - cur.y) * 0.05;
      curScroll += (scrollP - curScroll) * 0.08;
      const px = cur.x - 0.5,
        py = cur.y - 0.5,
        s = curScroll;
      if (aRef.current) aRef.current.style.transform = `translate3d(${px * 40 * intensity}px,${py * 40 * intensity - s * 120}px,0)`;
      if (bRef.current) bRef.current.style.transform = `translate3d(${px * -55 * intensity}px,${py * -45 * intensity + s * 90}px,0)`;
      if (cRef.current) cRef.current.style.transform = `translate3d(${px * 30 * intensity}px,${py * 30 * intensity - s * 60}px,0)`;
      if (gridRef.current) gridRef.current.style.transform = `translate3d(0,${s * 40}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, {
      passive: true
    });
    (scroller === window ? window : scroller).addEventListener("scroll", readScroll, {
      passive: true
    });
    readScroll();
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      (scroller === window ? window : scroller).removeEventListener("scroll", readScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, scrollTargetId, intensity]);
  const orb = (ref, st, drift) => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    ref: ref,
    style: {
      position: "absolute",
      borderRadius: "9999px",
      filter: "blur(72px)",
      pointerEvents: "none",
      willChange: "transform",
      animation: reduce ? "none" : drift,
      ...st
    }
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none",
      background: "var(--wl-bg-pure)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    ref: gridRef,
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: "-5%",
      opacity: 0.1,
      willChange: "transform"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(60% 50% at 50% 30%, rgba(0,240,255,0.05), transparent 70%)",
      animation: reduce ? "none" : "wl-aurora 14s ease-in-out infinite"
    }
  }), orb(aRef, {
    width: "34rem",
    height: "34rem",
    left: "-12rem",
    top: "-6rem",
    background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 68%)",
    opacity: 0.7
  }, "wl-ambient-drift 22s var(--wl-ease-soft) infinite alternate"), orb(bRef, {
    width: "38rem",
    height: "38rem",
    right: "-14rem",
    top: "30%",
    background: "radial-gradient(circle, rgba(26,48,102,0.30) 0%, transparent 70%)",
    opacity: 0.65
  }, "wl-ambient-drift 28s var(--wl-ease-soft) infinite alternate-reverse"), orb(cRef, {
    width: "28rem",
    height: "28rem",
    left: "20%",
    bottom: "-12rem",
    background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 68%)",
    opacity: 0.55
  }, "wl-ambient-drift 25s var(--wl-ease-soft) infinite alternate"));
}
Object.assign(__ds_scope, { AmbientField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AmbientField.jsx", error: String((e && e.message) || e) }); }

// components/brand/CursorGlow.jsx
try { (() => {
/**
 * Wasteland Interactive — CursorGlow
 * A subtle cyan glow that trails the cursor (desktop / fine-pointer only),
 * screen-blended over the page. Decorative, pointer-events:none. Renders
 * nothing under prefers-reduced-motion or on touch devices.
 */
function CursorGlow({
  size = 360
}) {
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (reduce || !fine) return;
    let tx = window.innerWidth / 2,
      ty = window.innerHeight / 2,
      cx = tx,
      cy = ty,
      raf,
      vis = false;
    const onMove = e => {
      tx = e.clientX;
      ty = e.clientY;
      if (!vis && ref.current) {
        ref.current.style.opacity = "1";
        vis = true;
      }
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0";
      vis = false;
    };
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - size / 2}px,${cy - size / 2}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, {
      passive: true
    });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, fine, size]);
  if (reduce) return null;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    ref: ref,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: size + "px",
      height: size + "px",
      zIndex: 60,
      pointerEvents: "none",
      opacity: 0,
      transition: "opacity 0.4s ease",
      background: "radial-gradient(circle, rgba(0,240,255,0.10) 0%, rgba(0,240,255,0.04) 35%, transparent 70%)",
      mixBlendMode: "screen",
      willChange: "transform"
    }
  });
}
Object.assign(__ds_scope, { CursorGlow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/CursorGlow.jsx", error: String((e && e.message) || e) }); }

// components/brand/LogoStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* social-proof trust row — see LogoStrip.prompt.md */

/**
 * Wasteland Interactive — LogoStrip
 * Social-proof / trust row. A mono lead-in label ("Vertraut von")
 * followed by client reference logos, rendered muted + monochrome and
 * lighting up to full opacity on hover. Logos pass as { src, alt }.
 */
function LogoStrip({
  label = "Vertraut von",
  logos = [],
  align = "center",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
      gap: "20px",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--wl-cyan)"
    }
  }, "// "), label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: align === "center" ? "center" : "flex-start",
      gap: "40px",
      flexWrap: "wrap"
    }
  }, logos.map((l, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: l.src,
    alt: l.alt,
    style: {
      height: l.height || "34px",
      width: "auto",
      opacity: 0.5,
      filter: "grayscale(1) brightness(1.4)",
      transition: "opacity var(--wl-dur-fast) ease, filter var(--wl-dur-fast) ease"
    },
    onMouseEnter: e => {
      e.currentTarget.style.opacity = "1";
      e.currentTarget.style.filter = "grayscale(0) brightness(1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.opacity = "0.5";
      e.currentTarget.style.filter = "grayscale(1) brightness(1.4)";
    }
  }))));
}
Object.assign(__ds_scope, { LogoStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoStrip.jsx", error: String((e && e.message) || e) }); }

// components/brand/NetworkSphere.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — NetworkSphere
 * Canvas-rendered rotating sphere of nodes whose near neighbours connect
 * with hairlines — a living "großes Netzwerk" motif for partner / system
 * surfaces. Points are distributed on a Fibonacci sphere, slowly spun on
 * the Y axis, depth-shaded (far = dim, near = bright cyan with glow).
 * `color` recolors it (e.g. a Sentinel tier). Honors prefers-reduced-
 * motion (renders one static frame). Decorative — mark aria-hidden.
 */
function NetworkSphere({
  size = 320,
  count = 90,
  speed = 0.12,
  linkDist = 0.55,
  color = "0,240,255",
  style,
  ...rest
}) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const R = size * 0.4;
    const cx = size / 2;
    const cy = size / 2;

    // Fibonacci sphere
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - i / (count - 1) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r
      });
    }
    let raf;
    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const sin = Math.sin(angle),
        cos = Math.cos(angle);
      const proj = pts.map(p => {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        return {
          x,
          y: p.y,
          z,
          sx: cx + x * R,
          sy: cy + p.y * R
        };
      });

      // edges — connect near neighbours, fade by depth + distance
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i],
            b = proj[j];
          const dx = a.x - b.x,
            dy = a.y - b.y,
            dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < linkDist) {
            const depth = (a.z + b.z) / 2;
            const alpha = (1 - d / linkDist) * 0.5 * (0.45 + (depth + 1) / 2 * 0.55);
            ctx.strokeStyle = `rgba(${color},${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // nodes — depth-shaded, near ones glow
      proj.sort((a, b) => a.z - b.z);
      for (const p of proj) {
        const t = (p.z + 1) / 2; // 0 far .. 1 near
        const r = 0.8 + t * 2.2;
        const alpha = 0.25 + t * 0.75;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
        ctx.shadowBlur = t > 0.6 ? 8 * t : 0;
        ctx.shadowColor = `rgba(${color},0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (!reduce) {
        angle += speed * 0.016;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => raf && cancelAnimationFrame(raf);
  }, [size, count, speed, linkDist, color]);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size + "px",
      height: size + "px",
      animation: "wl-float-y 9s var(--wl-ease-soft) infinite",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: size + "px",
      height: size + "px",
      display: "block"
    }
  }));
}
Object.assign(__ds_scope, { NetworkSphere });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/NetworkSphere.jsx", error: String((e && e.message) || e) }); }

// components/brand/ScrollProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — ScrollProgress
 * Thin cyan progress bar pinned to the top of the viewport that fills
 * as the page scrolls. GPU-only (scaleX transform). Pass `scrollTargetId`
 * when the page scrolls inside a container instead of the window.
 */
function ScrollProgress({
  scrollTargetId = null,
  height = 3,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const scroller = scrollTargetId ? document.getElementById(scrollTargetId) : window;
    if (!scroller) return;
    let raf;
    const update = () => {
      const top = scroller === window ? window.scrollY || 0 : scroller.scrollTop;
      const h = scroller === window ? document.body.scrollHeight : scroller.scrollHeight;
      const p = Math.min(Math.max(top / Math.max(h - window.innerHeight, 1), 0), 1);
      if (ref.current) ref.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    (scroller === window ? window : scroller).addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      (scroller === window ? window : scroller).removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollTargetId]);
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: height + "px",
      zIndex: 100,
      pointerEvents: "none",
      background: "rgba(255,255,255,0.04)"
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      height: "100%",
      width: "100%",
      transform: "scaleX(0)",
      transformOrigin: "left center",
      background: "linear-gradient(90deg, var(--wl-cyan), #7df9ff)",
      boxShadow: "0 0 10px rgba(0,240,255,0.6)",
      willChange: "transform"
    }
  }));
}
Object.assign(__ds_scope, { ScrollProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ScrollProgress.jsx", error: String((e && e.message) || e) }); }

// components/brand/WireCube.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — WireCube
 * Pure-CSS 3D rotating wireframe cube — the "system / network" brand
 * motif for hero backdrops. Six cyan-edged faces on transform-style:
 * preserve-3d, slowly spinning, with glowing corner nodes and a soft
 * floating bob. Decorative; set `aria-hidden`. Honors reduced-motion
 * via the global keyframes (animation simply runs slowly).
 */
function WireCube({
  size = 240,
  speed = 18,
  glow = true,
  style,
  ...rest
}) {
  const half = size / 2;
  const faceBase = {
    position: "absolute",
    width: size + "px",
    height: size + "px",
    border: "1px solid var(--wl-cyan-30)",
    background: "linear-gradient(135deg, rgba(0,240,255,0.05), transparent 60%)",
    boxShadow: glow ? "inset 0 0 40px rgba(0,240,255,0.06)" : "none"
  };
  const faces = [{
    transform: `translateZ(${half}px)`
  }, {
    transform: `rotateY(180deg) translateZ(${half}px)`
  }, {
    transform: `rotateY(90deg) translateZ(${half}px)`
  }, {
    transform: `rotateY(-90deg) translateZ(${half}px)`
  }, {
    transform: `rotateX(90deg) translateZ(${half}px)`
  }, {
    transform: `rotateX(-90deg) translateZ(${half}px)`
  }];
  const node = {
    position: "absolute",
    width: "8px",
    height: "8px",
    marginLeft: "-4px",
    marginTop: "-4px",
    borderRadius: "9999px",
    background: "var(--wl-cyan)",
    boxShadow: "0 0 10px var(--wl-cyan)"
  };
  const corners = [{
    left: 0,
    top: 0
  }, {
    left: size,
    top: 0
  }, {
    left: 0,
    top: size
  }, {
    left: size,
    top: size
  }];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      perspective: "900px",
      width: size + "px",
      height: size + "px",
      animation: `wl-float-y ${speed / 3}s var(--wl-ease-soft) infinite`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size + "px",
      height: size + "px",
      transformStyle: "preserve-3d",
      animation: `wl-spin-3d ${speed}s linear infinite`
    }
  }, faces.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...faceBase,
      ...f
    }
  }, corners.map((c, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      ...node,
      left: c.left + "px",
      top: c.top + "px"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: half - 4 + "px",
      top: half - 4 + "px",
      width: "8px",
      height: "8px",
      borderRadius: "9999px",
      background: "var(--wl-cyan)",
      boxShadow: "0 0 24px 6px rgba(0,240,255,0.6)"
    }
  })));
}
Object.assign(__ds_scope, { WireCube });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WireCube.jsx", error: String((e && e.message) || e) }); }

// components/cards/BenefitCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — BenefitCard
 * Compact feature card. Display title prefixed with a mono "[+]"
 * marker, then muted body copy. Border ignites cyan and lifts
 * slightly on hover.
 */
function BenefitCard({
  title,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--wl-surface-2)",
      border: `1px solid ${hover ? "var(--wl-cyan)" : "var(--wl-border)"}`,
      borderRadius: "var(--wl-radius)",
      padding: "24px",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "var(--wl-transition)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("h3", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "0 0 10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "14px",
      textTransform: "uppercase",
      color: "var(--wl-text)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      color: "var(--wl-cyan)"
    }
  }, "[+]"), title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.55,
      color: "var(--wl-text-muted)"
    }
  }, children));
}
Object.assign(__ds_scope, { BenefitCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BenefitCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ConnectLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — ConnectLink
 * Link-in-bio / QR landing row. Mono "// Label" over a description,
 * with a right-aligned index that slides on hover. `featured` adds a
 * cyan border + glow. The whole row is a single anchor.
 */
function ConnectLink({
  index = "01",
  label,
  text,
  href = "#",
  featured = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      textAlign: "left",
      padding: "16px 20px",
      background: featured ? "var(--wl-bg-pure)" : hover ? "var(--wl-cyan-05)" : "rgba(0,0,0,0.7)",
      border: `1px solid ${featured ? hover ? "var(--wl-cyan)" : "var(--wl-cyan-45)" : hover ? "var(--wl-cyan-45)" : "var(--wl-border)"}`,
      borderRadius: "var(--wl-radius)",
      boxShadow: featured ? "var(--wl-glow-md)" : "none",
      backdropFilter: "blur(4px)",
      transition: "var(--wl-transition)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "4px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.24em",
      color: "var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "// "), label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-soft)"
    }
  }, text)), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-text-xs)",
      color: hover ? "var(--wl-cyan)" : "var(--wl-text-dim)",
      transform: hover ? "translateX(4px)" : "none",
      transition: "var(--wl-transition)"
    }
  }, String(index).padStart(2, "0")));
}
Object.assign(__ds_scope, { ConnectLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ConnectLink.jsx", error: String((e && e.message) || e) }); }

// components/cards/MotionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — MotionCard
 * The foundational hover-lift surface. Recessed near-black panel,
 * hairline border; on hover it lifts 6px, deepens its shadow and
 * its border ignites cyan. Wrap any content.
 */
function MotionCard({
  children,
  pad = "lg",
  active = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lifted = hover || active;
  const pads = {
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "40px"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      background: lifted ? "var(--wl-surface)" : "var(--wl-surface-2)",
      border: `1px solid ${lifted ? "var(--wl-cyan-45)" : "var(--wl-border)"}`,
      borderRadius: "var(--wl-radius)",
      padding: pads[pad] || pads.lg,
      transform: lifted ? "translateY(var(--wl-lift))" : "translateY(0)",
      boxShadow: lifted ? "var(--wl-shadow-lift)" : "none",
      transition: "var(--wl-transition-card)",
      willChange: "transform",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { MotionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MotionCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/PricingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — PricingCard
 * Package tier. Mono index, display name, big price with cyan euro
 * glyph, bullet feature list and a CTA. `popular` adds the cyan top
 * rule + "Empfohlen" badge and promotes the CTA to a filled button.
 */
function PricingCard({
  index = "01",
  name,
  price,
  period = "einmalig",
  lead,
  features = [],
  cta = "Anfragen",
  href = "#kontakt",
  popular = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      background: popular ? "var(--wl-surface)" : hover ? "var(--wl-surface-2)" : "transparent",
      border: `1px solid ${hover ? "var(--wl-cyan-45)" : "var(--wl-border)"}`,
      borderRadius: "var(--wl-radius)",
      padding: "40px 32px",
      transform: hover ? "translateY(var(--wl-lift))" : "none",
      boxShadow: hover ? "var(--wl-shadow-lift)" : "none",
      transition: "var(--wl-transition-card)",
      ...style
    }
  }, rest), popular ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "-1px",
      height: "2px",
      background: "var(--wl-cyan)"
    }
  }) : null, popular ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "24px",
      top: "24px",
      background: "var(--wl-cyan)",
      color: "#000",
      padding: "4px 8px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }
  }, "Empfohlen") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      marginBottom: "8px"
    }
  }, index), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontSize: "1.5rem",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "var(--wl-text)"
    }
  }, name), lead ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      fontSize: "var(--wl-text-sm)",
      color: "var(--wl-text-muted)",
      lineHeight: 1.5
    }
  }, lead) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
      borderBottom: "1px solid var(--wl-border)",
      paddingBottom: "24px",
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontSize: "3rem",
      fontWeight: 900,
      lineHeight: 1,
      color: "var(--wl-text)"
    }
  }, String(price).replace(/\s*€/, "")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "var(--wl-cyan)"
    }
  }, "\u20AC"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, period)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "0 0 40px",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontSize: "var(--wl-text-sm)",
      color: "var(--wl-text-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "8px",
      width: "5px",
      height: "5px",
      flexShrink: 0,
      background: "var(--wl-cyan)",
      boxShadow: "var(--wl-glow-xs)"
    }
  }), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: popular ? "primary" : "ghost",
    full: true,
    withArrow: true,
    href: href
  }, cta)));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — ServiceCard
 * Numbered service tile (01–04). Cyan index, mono tag, display
 * title, body and a mono bullet spec-list. A cyan bar grows along
 * the top edge on hover and the panel washes darker.
 */
function ServiceCard({
  num = "01",
  tag,
  title,
  body,
  bullets = [],
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: hover ? "var(--wl-surface)" : "transparent",
      border: "1px solid var(--wl-border)",
      borderRadius: "var(--wl-radius)",
      padding: "32px",
      overflow: "hidden",
      transition: "var(--wl-transition)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "2px",
      width: hover ? "100%" : "0%",
      background: "var(--wl-cyan)",
      boxShadow: hover ? "var(--wl-glow-xs)" : "none",
      transition: "width 0.4s var(--wl-ease-standard)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      transform: hover ? "translateX(6px)" : "none",
      transition: "transform 0.3s"
    }
  }, num), tag ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, tag) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.6rem",
      lineHeight: 1.1,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "var(--wl-text)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, body)), bullets.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "24px 0 0",
      padding: "20px 0 0",
      borderTop: "1px solid var(--wl-border)",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-text-xs)",
      letterSpacing: "0.03em",
      color: "var(--wl-text-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "6px",
      width: "4px",
      height: "4px",
      flexShrink: 0,
      background: "var(--wl-cyan)"
    }
  }), /*#__PURE__*/React.createElement("span", null, b)))) : null);
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — StatTile
 * Compact metric cell. Mono label over a display value; the value
 * ignites cyan on hover. Sits in bordered metric strips
 * ("Projekte seit 2021 · Launch-Speed 7 Tage · Made in DE").
 * Pass `count` (number) to animate up from 0 when scrolled into view,
 * with optional `prefix` / `suffix` (e.g. "7" + " Tage").
 */
function StatTile({
  label,
  value,
  count,
  prefix = "",
  suffix = "",
  duration = 1100,
  align = "center",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = React.useState(count == null);
  const [n, setN] = React.useState(count != null && reduce ? count : 0);
  React.useEffect(() => {
    if (count == null || reduce || !ref.current) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.4
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [count, reduce]);
  React.useEffect(() => {
    if (count == null || !shown || reduce) return;
    let raf, start;
    const tick = t => {
      if (start == null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * count));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, shown, reduce, duration]);
  const display = count != null ? `${prefix}${n.toLocaleString("de-DE")}${suffix}` : value;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: "24px",
      textAlign: align,
      transition: "var(--wl-transition)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)",
      marginBottom: "8px"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontSize: "1.875rem",
      fontWeight: 900,
      lineHeight: 1,
      color: hover ? "var(--wl-cyan)" : "var(--wl-text)",
      transition: "color var(--wl-dur-fast) ease"
    }
  }, display));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/cards/TiltCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — TiltCard
 * 3D perspective card that tilts toward the cursor and lifts on hover,
 * with a cyan glare sheen that tracks the pointer and a hairline border
 * that ignites. Children can use translateZ() for parallax depth — the
 * card sets transform-style: preserve-3d. Honors prefers-reduced-motion.
 */
function TiltCard({
  children,
  max = 9,
  glare = true,
  pad = "lg",
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 0,
    active: false
  });
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pads = {
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "40px"
  };
  const onMove = e => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true
    });
  };
  const reset = () => setT({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 0,
    active: false
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      perspective: "1000px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: {
      position: "relative",
      transformStyle: "preserve-3d",
      transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0) scale(${t.active ? 1.015 : 1})`,
      transition: t.active ? "transform 0.08s linear, border-color 0.3s ease, box-shadow 0.4s ease" : "transform 0.5s var(--wl-ease-standard), border-color 0.3s ease, box-shadow 0.4s ease",
      background: t.active ? "var(--wl-surface)" : "var(--wl-surface-2)",
      border: `1px solid ${t.active ? "var(--wl-cyan-45)" : "var(--wl-border)"}`,
      borderRadius: "var(--wl-radius)",
      padding: pads[pad] || pads.lg,
      boxShadow: t.active ? "var(--wl-shadow-lift), var(--wl-glow-md)" : "none",
      willChange: "transform"
    }
  }, rest), glare ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      pointerEvents: "none",
      opacity: t.active ? 1 : 0,
      transition: "opacity 0.3s ease",
      background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(0,240,255,0.18), transparent 45%)`,
      mixBlendMode: "screen"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      transform: "translateZ(40px)",
      transformStyle: "preserve-3d"
    }
  }, children)));
}
Object.assign(__ds_scope, { TiltCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TiltCard.jsx", error: String((e && e.message) || e) }); }

// components/conversion/ExitIntentModal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — ExitIntentModal
 * Exit-intent lead-capture overlay. Opens once when the cursor leaves
 * the viewport top (desktop), or via the `force` prop. Blurred backdrop,
 * hard-edged panel with a cyan top rule and a scale+fade entrance. Wrap
 * your capture form / CTA as children. Remembers dismissal for the
 * session when `once` is set.
 */
function ExitIntentModal({
  eyebrow = "Warte kurz //",
  title = "Geh nicht mit leeren Händen.",
  children,
  onClose,
  once = true,
  force = false,
  storageKey = "wl-exit-intent",
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    if (force) {
      setOpen(true);
      return;
    }
    if (once && typeof sessionStorage !== "undefined" && sessionStorage.getItem(storageKey)) return;
    const onLeave = e => {
      if (firedRef.current) return;
      if (e.clientY <= 0) {
        firedRef.current = true;
        setOpen(true);
        if (once && typeof sessionStorage !== "undefined") sessionStorage.setItem(storageKey, "1");
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [force, once, storageKey]);
  const close = () => {
    setOpen(false);
    onClose && onClose();
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": !open,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 9995,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "rgba(0,0,0,0.72)",
      backdropFilter: "blur(6px)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity 0.32s var(--wl-ease-inout)",
      ...style
    },
    onClick: close
  }, rest), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "relative",
      width: "min(440px, 100%)",
      background: "var(--wl-surface)",
      border: "1px solid var(--wl-cyan-45)",
      borderTop: "2px solid var(--wl-cyan)",
      borderRadius: "var(--wl-radius)",
      boxShadow: "var(--wl-shadow-modal), var(--wl-glow-lg)",
      padding: "36px 32px 32px",
      transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)",
      opacity: open ? 1 : 0,
      transition: "transform 0.4s var(--wl-ease-standard), opacity 0.4s ease"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Schlie\xDFen",
    onClick: close,
    style: {
      position: "absolute",
      top: "12px",
      right: "12px",
      background: "transparent",
      border: "1px solid var(--wl-border-20)",
      color: "var(--wl-text-dim)",
      width: "30px",
      height: "30px",
      cursor: "pointer",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "12px",
      borderRadius: "var(--wl-radius)"
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-cyan)",
      marginBottom: "12px"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "1.6rem",
      lineHeight: 1.05,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, title), children));
}
Object.assign(__ds_scope, { ExitIntentModal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/conversion/ExitIntentModal.jsx", error: String((e && e.message) || e) }); }

// components/conversion/StickyBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — StickyBar
 * Scroll-triggered sticky conversion bar pinned to the bottom. Slides up
 * once the user scrolls past `showAfter`, carries a red→cyan accent rule,
 * a message and a primary CTA, and is dismissible. Listens to window
 * scroll by default, or an inner scroll container via `scrollTargetId`.
 */
function StickyBar({
  message = "Kostenloses System-Audit sichern — in 24h Antwort.",
  ctaLabel = "Audit sichern",
  onCta,
  href,
  showAfter = 480,
  scrollTargetId,
  dismissible = true,
  style,
  ...rest
}) {
  const [shown, setShown] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  React.useEffect(() => {
    const target = scrollTargetId ? document.getElementById(scrollTargetId) : window;
    if (!target) return;
    const read = () => scrollTargetId ? target.scrollTop : window.scrollY || window.pageYOffset;
    const onScroll = () => setShown(read() > showAfter);
    onScroll();
    target.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollTargetId, showAfter]);
  const visible = shown && !closed;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9990,
      transform: visible ? "translateY(0)" : "translateY(120%)",
      transition: "transform 0.5s var(--wl-ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "wl-accent-line"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
      padding: "14px 24px",
      background: "rgba(5,5,5,0.92)",
      borderTop: "1px solid var(--wl-border)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      flexShrink: 0,
      borderRadius: "9999px",
      background: "var(--wl-cyan)",
      boxShadow: "0 0 8px var(--wl-cyan)",
      animation: "wl-pulse 2s infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "13px",
      letterSpacing: "0.02em",
      color: "var(--wl-text-soft)"
    }
  }, message)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    withArrow: true,
    href: href,
    onClick: onCta
  }, ctaLabel), dismissible ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Schlie\xDFen",
    onClick: () => setClosed(true),
    style: {
      background: "transparent",
      border: "1px solid var(--wl-border-20)",
      color: "var(--wl-text-dim)",
      width: "34px",
      height: "34px",
      cursor: "pointer",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "13px",
      borderRadius: "var(--wl-radius)"
    }
  }, "\u2715") : null)));
}
Object.assign(__ds_scope, { StickyBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/conversion/StickyBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FaqList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — FaqList
 * Accordion of question/answer pairs. One open at a time; the active
 * question turns cyan and its "+" rotates to "×". Hairline dividers,
 * brand display headings.
 */
function FaqList({
  items = [],
  style,
  ...rest
}) {
  const [openIdx, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: "1px solid var(--wl-border)",
      ...style
    }
  }, rest), items.map((it, i) => {
    const open = openIdx === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderBottom: "1px solid var(--wl-border)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setOpen(open ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "20px 4px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--wl-font-display)",
        fontWeight: 700,
        fontSize: "15px",
        textTransform: "uppercase",
        letterSpacing: "-0.01em",
        color: open ? "var(--wl-cyan)" : "#fff",
        transition: "color var(--wl-dur-fast) ease"
      }
    }, it.q), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flexShrink: 0,
        fontFamily: "var(--wl-font-mono)",
        fontSize: "16px",
        color: "var(--wl-cyan)",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform var(--wl-dur-fast) var(--wl-ease-standard)"
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: open ? "320px" : "0",
        overflow: "hidden",
        transition: "max-height var(--wl-dur-base) var(--wl-ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: "0 4px 22px",
        fontSize: "14px",
        lineHeight: 1.65,
        color: "var(--wl-text-muted)",
        maxWidth: "60ch"
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { FaqList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FaqList.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Label
 * The signature mono kicker: "/ Leistungen 01-04". Slash prefix,
 * uppercase, wide tracking. `tone` recolors it (cyan / gold / muted).
 */
function Label({
  children,
  tone = "muted",
  slash = true,
  style,
  ...rest
}) {
  const colors = {
    muted: "var(--wl-text-muted)",
    cyan: "var(--wl-cyan)",
    gold: "var(--wl-gold)",
    silver: "var(--wl-silver)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "var(--wl-tracking-label)",
      textTransform: "uppercase",
      color: colors[tone] || colors.muted,
      ...style
    }
  }, rest), slash ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      opacity: 0.9
    }
  }, "/ ") : null, children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Label.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ScannerLog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — ScannerLog
 * Terminal / scanner readout. Monospace lines on near-black with a
 * cyan left rule. Line tone conveys state: active (cyan), success
 * (emerald glow), error (red), or muted (default).
 */
function ScannerLog({
  lines = [],
  title,
  style,
  ...rest
}) {
  const toneColor = {
    muted: "var(--wl-text-muted)",
    active: "var(--wl-cyan)",
    success: "var(--wl-emerald)",
    error: "var(--wl-red)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--wl-surface-3)",
      border: "1px solid var(--wl-border)",
      borderLeft: "2px solid var(--wl-cyan)",
      borderRadius: "var(--wl-radius)",
      padding: "14px 16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "12px",
      lineHeight: 1.7,
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--wl-text-dim)",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      fontSize: "10px",
      marginBottom: "8px"
    }
  }, title) : null, lines.map((ln, i) => {
    const tone = typeof ln === "string" ? "muted" : ln.tone || "muted";
    const text = typeof ln === "string" ? ln : ln.text;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        color: toneColor[tone],
        textShadow: tone === "success" ? "0 0 8px rgba(16,185,129,0.3)" : "none",
        marginBottom: "4px"
      }
    }, tone === "active" ? "> " : tone === "success" ? "✓ " : tone === "error" ? "✗ " : ">> ", text);
  }));
}
Object.assign(__ds_scope, { ScannerLog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ScannerLog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — StatusBadge
 * Pulsing-dot system indicator. Cyan capsule on a faint cyan wash;
 * the dot pulses (green = online, red = alert, cyan = info).
 */
function StatusBadge({
  children = "System Aktiv",
  dot = "green",
  style,
  ...rest
}) {
  const dotColors = {
    green: "var(--wl-green)",
    red: "var(--wl-red)",
    cyan: "var(--wl-cyan)"
  };
  const c = dotColors[dot] || dotColors.green;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      background: "var(--wl-cyan-10)",
      border: "1px solid var(--wl-cyan-30)",
      padding: "6px 12px",
      borderRadius: "var(--wl-radius)",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-label)",
      color: "var(--wl-cyan)",
      boxShadow: "var(--wl-glow-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      background: c,
      borderRadius: "var(--wl-radius-pill)",
      boxShadow: `0 0 8px ${c}`,
      animation: "wl-pulse 2s infinite",
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Tag
 * Small mono micro-label / chip. Outlined by default; `solid`
 * fills it cyan. Used for spec bullets ("n8n", "A1/A3", "C0").
 */
function Tag({
  children,
  solid = false,
  tone = "cyan",
  style,
  ...rest
}) {
  const tones = {
    cyan: "var(--wl-cyan)",
    gold: "var(--wl-gold)",
    silver: "var(--wl-silver)",
    muted: "var(--wl-text-muted)"
  };
  const c = tones[tone] || tones.cyan;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-wide)",
      padding: "4px 8px",
      borderRadius: "var(--wl-radius)",
      border: `1px solid ${solid ? c : "var(--wl-border-20)"}`,
      background: solid ? c : "transparent",
      color: solid ? "#000" : c,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — FormField
 * Label + control wrapper. Mono uppercase label; cyan asterisk when
 * required. Wrap an Input / Textarea / Select as children.
 */
function FormField({
  label,
  required = false,
  hint,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      marginBottom: "20px",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "var(--wl-text-dim)",
      marginBottom: "6px"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, " *") : null) : null, children, hint ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "6px",
      fontSize: "11px",
      color: "var(--wl-text-dim)",
      lineHeight: 1.4
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/FunnelStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — FunnelStepper
 * Progress chrome for a multi-step lead funnel. Mono "Schritt X / N"
 * counter, a cyan progress bar that fills as you advance, and a row
 * of numbered step pills (done = cyan fill, current = cyan outline +
 * glow, upcoming = muted). Controlled via `current`; the parent owns
 * step state and renders the active step as children.
 */
function FunnelStepper({
  steps = [],
  current = 0,
  onStepClick,
  children,
  style,
  ...rest
}) {
  const total = steps.length || 1;
  const pct = Math.round((current + 1) / total * 100);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-cyan)"
    }
  }, "Schritt ", current + 1, " / ", total), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.1em",
      color: "var(--wl-text-dim)"
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "2px",
      background: "var(--wl-border-15)",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: `${pct}%`,
      background: "var(--wl-cyan)",
      boxShadow: "var(--wl-glow-xs)",
      transition: "width var(--wl-dur-base) var(--wl-ease-standard)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginBottom: "24px"
    }
  }, steps.map((label, i) => {
    const done = i < current;
    const active = i === current;
    const clickable = onStepClick && i <= current;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: i,
      disabled: !clickable,
      onClick: clickable ? () => onStepClick(i) : undefined,
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 10px",
        background: active ? "var(--wl-cyan-05)" : "transparent",
        border: `1px solid ${active ? "var(--wl-cyan)" : done ? "var(--wl-cyan-45)" : "var(--wl-border-15)"}`,
        borderRadius: "var(--wl-radius)",
        boxShadow: active ? "var(--wl-glow-sm)" : "none",
        cursor: clickable ? "pointer" : "default",
        textAlign: "left",
        transition: "var(--wl-transition)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "18px",
        height: "18px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--wl-font-mono)",
        fontSize: "10px",
        fontWeight: 700,
        background: done ? "var(--wl-cyan)" : "transparent",
        color: done ? "#000" : active ? "var(--wl-cyan)" : "var(--wl-text-dim)",
        border: done ? "none" : `1px solid ${active ? "var(--wl-cyan)" : "var(--wl-border-20)"}`
      }
    }, done ? "✓" : String(i + 1).padStart(2, "0").slice(-2)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--wl-font-mono)",
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: active ? "var(--wl-text)" : done ? "var(--wl-text-soft)" : "var(--wl-text-dim)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, label));
  })), children);
}
Object.assign(__ds_scope, { FunnelStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FunnelStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldBase = {
  width: "100%",
  background: "var(--wl-input)",
  border: "1px solid var(--wl-border-15)",
  padding: "12px 14px",
  color: "var(--wl-text)",
  fontFamily: "var(--wl-font-body)",
  fontSize: "13px",
  outline: "none",
  borderRadius: "var(--wl-radius)",
  transition: "border-color var(--wl-dur-fast) ease, box-shadow var(--wl-dur-fast) ease"
};

/**
 * Wasteland Interactive — Input
 * Hard-edged dark text field. Cyan border + faint glow on focus.
 */
function Input({
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...fieldBase,
      borderColor: focus ? "var(--wl-cyan)" : "var(--wl-border-15)",
      boxShadow: focus ? "var(--wl-glow-sm)" : "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/OptionGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — OptionGrid
 * Single-select button grid (funnel steps). Each option is a dark
 * cell; the chosen / hovered one ignites cyan. Controlled via
 * `value` + `onChange`.
 */
function OptionGrid({
  options = [],
  value,
  onChange,
  columns = 2,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: "12px",
      ...style
    }
  }, rest), options.map(opt => {
    const val = typeof opt === "string" ? opt : opt.value;
    const lab = typeof opt === "string" ? opt : opt.label;
    const selected = value === val;
    const lit = selected || hover === val;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: val,
      onClick: () => onChange && onChange(val),
      onMouseEnter: () => setHover(val),
      onMouseLeave: () => setHover(null),
      style: {
        background: lit ? "var(--wl-cyan-05)" : "var(--wl-surface-2)",
        border: `1px solid ${lit ? "var(--wl-cyan)" : "var(--wl-border-20)"}`,
        color: lit ? "var(--wl-text)" : "var(--wl-text-muted)",
        padding: "14px",
        cursor: "pointer",
        fontFamily: "var(--wl-font-body)",
        fontSize: "13px",
        borderRadius: "var(--wl-radius)",
        textAlign: "center",
        transition: "var(--wl-transition)"
      }
    }, lab);
  }));
}
Object.assign(__ds_scope, { OptionGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/OptionGrid.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Select
 * Native select styled to match the dark field. Custom cyan caret,
 * sharp corners, cyan focus border.
 */
function Select({
  children,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      width: "100%",
      background: "var(--wl-input)",
      border: `1px solid ${focus ? "var(--wl-cyan)" : "var(--wl-border-15)"}`,
      padding: "12px 36px 12px 14px",
      color: "var(--wl-text)",
      fontFamily: "var(--wl-font-body)",
      fontSize: "13px",
      outline: "none",
      borderRadius: "var(--wl-radius)",
      appearance: "none",
      WebkitAppearance: "none",
      cursor: "pointer",
      transition: "border-color var(--wl-dur-fast) ease",
      ...style
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--wl-cyan)",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px"
    }
  }, "\u25BC"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Textarea
 * Multi-line variant of the dark field. Vertical resize, cyan focus.
 */
function Textarea({
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      width: "100%",
      background: "var(--wl-input)",
      border: `1px solid ${focus ? "var(--wl-cyan)" : "var(--wl-border-15)"}`,
      padding: "12px 14px",
      color: "var(--wl-text)",
      fontFamily: "var(--wl-font-body)",
      fontSize: "13px",
      outline: "none",
      borderRadius: "var(--wl-radius)",
      resize: "vertical",
      minHeight: "90px",
      boxShadow: focus ? "var(--wl-glow-sm)" : "none",
      transition: "border-color var(--wl-dur-fast) ease, box-shadow var(--wl-dur-fast) ease",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/Reveal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — Reveal
 * Scroll-triggered entrance. Fades + slides its child up the first
 * time it enters the viewport. `delay` staggers siblings. Honors
 * prefers-reduced-motion (renders visible immediately).
 */
function Reveal({
  children,
  delay = 0,
  y = 18,
  once = true,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = React.useState(reduce);
  React.useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.unobserve(e.target);
        } else if (!once) {
          setShown(false);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px"
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, once]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity var(--wl-dur-base) var(--wl-ease-standard) ${delay}ms, transform var(--wl-dur-base) var(--wl-ease-standard) ${delay}ms`,
      willChange: "opacity, transform",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Reveal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Reveal.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — SectionHeading
 * The standard section intro: mono kicker label, then a black
 * uppercase display headline whose `accent` phrase is cyan.
 */
function SectionHeading({
  label,
  labelTone = "muted",
  title,
  accent,
  lead,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: "56rem",
      marginBottom: "64px",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Label, {
    tone: labelTone
  }, label)) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-lg)",
      lineHeight: 1.05,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "var(--wl-text)",
      textWrap: "balance"
    }
  }, title, accent ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, " ", accent) : null), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "24px",
      maxWidth: "42rem",
      fontSize: "var(--wl-text-base)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, lead) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionShell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wasteland Interactive — SectionShell
 * Full-bleed section wrapper carrying the ambient atmosphere: drifting
 * cyan/navy orbs, optional 48px engineering grid, hairline top/bottom
 * borders. `tone` swaps the base fill (black vs cool deep).
 */
function SectionShell({
  children,
  tone = "black",
  grid = false,
  orbs = true,
  style,
  ...rest
}) {
  const bg = {
    black: "var(--wl-bg-pure)",
    deep: "var(--wl-surface-3)",
    canvas: "var(--wl-bg)"
  };
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      background: bg[tone] || bg.black,
      borderTop: "1px solid var(--wl-border)",
      borderBottom: "1px solid var(--wl-border)",
      padding: "96px 24px",
      ...style
    }
  }, rest), orbs ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-10rem",
      top: "2rem",
      width: "20rem",
      height: "20rem",
      borderRadius: "9999px",
      filter: "blur(48px)",
      opacity: 0.75,
      pointerEvents: "none",
      background: "radial-gradient(circle, rgba(0,240,255,0.22) 0%, rgba(0,240,255,0.02) 72%, transparent 100%)",
      animation: "wl-ambient-drift 18s var(--wl-ease-soft) infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "-8rem",
      top: "6rem",
      width: "24rem",
      height: "24rem",
      borderRadius: "9999px",
      filter: "blur(48px)",
      opacity: 0.7,
      pointerEvents: "none",
      background: "radial-gradient(circle, rgba(26,48,102,0.22) 0%, rgba(26,48,102,0.02) 72%, transparent 100%)",
      animation: "wl-ambient-drift 22s var(--wl-ease-soft) infinite alternate"
    }
  })) : null, grid ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.25,
      pointerEvents: "none"
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      width: "100%"
    }
  }, children));
}
Object.assign(__ds_scope, { SectionShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/connect/screens.jsx
try { (() => {
/* Wasteland Interactive — Connect (link-in-bio / QR landing) UI Kit
   Single-screen scanner page. Self-mounts into #root. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  ConnectLink,
  Label
} = WL;
const LINKS = [{
  label: "Lead Maschine",
  text: "Vollautomatische B2B Lead Generierung & KI Outreach",
  featured: true
}, {
  label: "Partner",
  text: "Vertriebspartner werden & gemeinsam wachsen",
  featured: true
}, {
  label: "Lösungen NRW",
  text: "Digitale Lösungen für Unternehmen in NRW"
}, {
  label: "KI & Tech",
  text: "KI-Systeme, Automationen & digitale Infrastruktur"
}, {
  label: "Drohnen",
  text: "Luftaufnahmen, Immobilien, Inspektionen & Events"
}, {
  label: "Leistungen",
  text: "Webseiten, Systeme & digitale Services"
}, {
  label: "Referenzen",
  text: "Projekte, Ergebnisse & Kundenbeispiele"
}, {
  label: "Kontakt",
  text: "Direkt Anfrage stellen"
}];
function Connect() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      background: "var(--wl-bg-pure)",
      color: "#fff",
      padding: "32px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.14), transparent 32%), radial-gradient(circle at 80% 82%, rgba(0,54,74,0.42), transparent 36%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.25,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "wl-accent-line wl-accent-line--cyan",
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    }
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "36rem",
      margin: "0 auto",
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      textAlign: "center",
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan",
    slash: false
  }, "SCAN // CONNECT"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "16px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "2.5rem",
      lineHeight: 1,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Interactive"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px auto 0",
      maxWidth: "24rem",
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, "Select your path. Ein Einstieg, alle relevanten Bereiche der Wasteland-Welt.")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, LINKS.map((l, i) => /*#__PURE__*/React.createElement(ConnectLink, {
    key: l.label,
    index: i + 1,
    label: l.label,
    text: l.text,
    featured: l.featured,
    href: "#"
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      paddingTop: "20px",
      borderTop: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, "wasteland-interactive.de"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wasteland-connect-qr.svg",
    alt: "QR",
    width: "56",
    height: "56",
    style: {
      opacity: 0.9
    }
  }))));
}
window.WLConnect = Connect;
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Connect, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/connect/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lead-engine/screens.jsx
try { (() => {
/* Wasteland Interactive — Lead Engine UI Kit
   Lead-gen landing + waitlist funnel. (Product renamed from
   "Lead Maschine" → "Lead Engine".) Self-mounts into #root.
   Uses design-system primitives from the bundle + conversion
   helpers (Reveal, FunnelStepper, LogoStrip) from ../_conversion.jsx. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button,
  Label,
  StatusBadge,
  Tag,
  MotionCard,
  BenefitCard,
  StatTile,
  Input,
  Select,
  FormField,
  OptionGrid,
  SectionHeading,
  Reveal,
  FunnelStepper,
  LogoStrip,
  AmbientField
} = WL;
const REFS = [{
  src: "../../assets/ref-musaservice-logo.webp",
  alt: "MusaService",
  height: "24px"
}, {
  src: "../../assets/ref-pzgrenbtl908-logo.webp",
  alt: "PzGrenBtl 908",
  height: "44px"
}];
const STEPS_HOW = [{
  num: "01",
  title: "Wunschkunden-Scan",
  body: "Wir scannen deine Zielregion nach passenden B2B-Betrieben — nach Branche, Größe und Standort. Verifiziert und bereinigt.",
  tags: ["Branche", "Region", "Firmengröße"]
}, {
  num: "02",
  title: "KI-Personalisierung",
  body: "Jede Erstansprache wird individuell formuliert — auf Betrieb und Anlass zugeschnitten. Kein generischer Spam.",
  tags: ["GPT-Modelle", "Tonalität", "DSGVO-konform"]
}, {
  num: "03",
  title: "Automatischer Outreach",
  body: "Versand, Follow-ups und Antwort-Routing laufen automatisch über deine Domain. Du sprichst nur noch mit Interessenten.",
  tags: ["E-Mail-Sequenzen", "Follow-up", "CRM-Sync"]
}];

/* ── Live lead-scanner terminal (entrance + replay animation) ── */
function LeadScanner() {
  const TARGET = 900;
  const LINES = [{
    text: "Zielregion geladen: Düsseldorf + 40 km",
    tone: "active"
  }, {
    text: "Branchenfilter: Handwerk, B2B-Dienstleister",
    tone: "muted"
  }, {
    text: "1.284 Betriebe erfasst",
    tone: "muted"
  }, {
    text: "Duplikate & inaktive bereinigt",
    tone: "muted"
  }, {
    text: "KI-Personalisierung vorbereitet",
    tone: "active"
  }, {
    text: "900 verifizierte Leads bereit",
    tone: "success"
  }];
  const ref = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const run = React.useCallback(() => {
    setRunning(true);
    setCount(0);
    setVisible(0);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(TARGET);
      setVisible(LINES.length);
      setRunning(false);
      return;
    }
    let li = 0;
    const lineTimer = setInterval(() => {
      li += 1;
      setVisible(li);
      if (li >= LINES.length) clearInterval(lineTimer);
    }, 420);
    let start;
    const tick = t => {
      if (start == null) start = t;
      const p = Math.min((t - start) / 2400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * TARGET));
      if (p < 1) requestAnimationFrame(tick);else setRunning(false);
    };
    requestAnimationFrame(tick);
  }, []);
  React.useEffect(() => {
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
  }, [run]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)",
      borderTop: "2px solid var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "Wunschkunden-Scan // Live"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: running ? "var(--wl-cyan)" : "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: running ? "var(--wl-cyan)" : "var(--wl-emerald)",
      boxShadow: "0 0 8px currentColor",
      animation: running ? "wl-pulse 1.2s infinite" : "none"
    }
  }), running ? "Scan läuft" : "Bereit")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "10px",
      paddingBottom: "16px",
      borderBottom: "1px solid var(--wl-border)",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "3rem",
      lineHeight: 1,
      color: "var(--wl-cyan)",
      textShadow: "var(--wl-text-glow)"
    }
  }, count.toLocaleString("de-DE")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "var(--wl-text-dim)"
    }
  }, "verifizierte Leads")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--wl-surface-3)",
      border: "1px solid var(--wl-border)",
      borderLeft: "2px solid var(--wl-cyan)",
      padding: "14px 16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "12px",
      lineHeight: 1.7,
      minHeight: "150px"
    }
  }, LINES.slice(0, visible).map((ln, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      color: ln.tone === "success" ? "var(--wl-emerald)" : ln.tone === "active" ? "var(--wl-cyan)" : "var(--wl-text-muted)",
      textShadow: ln.tone === "success" ? "0 0 8px rgba(16,185,129,0.3)" : "none",
      marginBottom: "4px"
    }
  }, ln.tone === "active" ? "> " : ln.tone === "success" ? "✓ " : ">> ", ln.text)), running ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)",
      animation: "wl-pulse 1s infinite"
    }
  }, "\u258B") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    disabled: running,
    onClick: run
  }, running ? "Scan läuft…" : "Scan erneut starten"))));
}

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      height: "72px",
      background: "rgba(5,5,5,0.85)",
      borderBottom: "1px solid var(--wl-border)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "15px",
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Lead Engine"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    withArrow: true,
    onClick: onJoin
  }, "Auf die Warteliste"));
}
function Hero({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      background: "transparent",
      padding: "100px 24px 80px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-12rem",
      top: "-4rem",
      width: "32rem",
      height: "32rem",
      borderRadius: "9999px",
      filter: "blur(64px)",
      opacity: 0.6,
      background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 65%)",
      animation: "wl-ambient-drift 20s var(--wl-ease-soft) infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "-10rem",
      top: "2rem",
      width: "30rem",
      height: "30rem",
      borderRadius: "9999px",
      filter: "blur(64px)",
      opacity: 0.5,
      background: "radial-gradient(circle, rgba(26,48,102,0.30) 0%, transparent 66%)",
      animation: "wl-ambient-drift 24s var(--wl-ease-soft) infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    dot: "cyan"
  }, "Early Access \xB7 Warteliste offen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "24px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-xl)",
      lineHeight: 1.02,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff",
      textWrap: "balance"
    }
  }, "Deine ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    },
    className: "wl-text-glow"
  }, "Lead Engine"), " f\xFCr planbaren B2B-Vertrieb"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      maxWidth: "34rem",
      fontSize: "var(--wl-text-lg)",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Vollautomatische Lead-Generierung & KI-Outreach. Sie scannt deine Wunschkunden, schreibt personalisiert an und \xFCbergibt dir nur die Antworten."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "32px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    glow: true,
    withArrow: true,
    onClick: onJoin
  }, "Auf die Warteliste"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    withArrow: true,
    onClick: () => document.getElementById("le-how").scrollIntoView({
      behavior: "smooth"
    })
  }, "So funktioniert's")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-emerald)"
    }
  }, "\u2713 Kostenlos eintragen"), /*#__PURE__*/React.createElement("span", null, "\u2713 DSGVO-konform"), /*#__PURE__*/React.createElement("span", null, "\u2713 Made in NRW"))), /*#__PURE__*/React.createElement(LeadScanner, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "48px auto 0",
      paddingTop: "32px",
      borderTop: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(LogoStrip, {
    align: "left",
    label: "Bereits im Einsatz bei",
    logos: REFS
  })));
}
function HowItWorks() {
  return /*#__PURE__*/React.createElement("section", {
    id: "le-how",
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Pipeline // 01-03",
    title: "Drei Schritte.",
    accent: "Dann l\xE4uft sie von allein.",
    lead: "Einmal eingerichtet, l\xE4uft die Lead Engine im Hintergrund. Du bekommst Antworten, keine Aufgabenliste."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      border: "1px solid var(--wl-border)"
    }
  }, STEPS_HOW.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.num,
    delay: i * 100,
    style: {
      borderRight: i < 2 ? "1px solid var(--wl-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      marginBottom: "20px"
    }
  }, s.num), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.4rem",
      lineHeight: 1.1,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 20px",
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "auto"
    }
  }, s.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      border: "1px solid var(--wl-border)",
      borderTop: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Pro Scan",
    count: 900,
    prefix: "bis "
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Setup",
    count: 7,
    suffix: " Tage"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Routine/Woche",
    value: "0 h"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatTile, {
    label: "DSGVO",
    value: "Konform"
  })))));
}
function Waitlist({
  formRef,
  joinStep,
  setJoinStep
}) {
  const STEPS = ["Ziel", "Kontakt", "Bestätigen"];
  const [region, setRegion] = React.useState("");
  const [branche, setBranche] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setJoinStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setJoinStep(s => Math.max(s - 1, 0));
  return /*#__PURE__*/React.createElement("section", {
    ref: formRef,
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 0.95fr",
      gap: "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Warteliste // Early Access",
    title: "Sichere dir deinen",
    accent: "Platz in der Lead Engine.",
    lead: "Wir \xF6ffnen die Lead Engine schrittweise f\xFCr ausgew\xE4hlte Regionen und Branchen. Trag dich ein \u2014 du erf\xE4hrst zuerst, wenn dein Zugang bereitsteht."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Kein Risiko"
  }, "Kostenlose, unverbindliche Eintragung. Kein Abo, keine Verpflichtung."), /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Regional begrenzt"
  }, "Pro Region nehmen wir nur wenige Betriebe auf \u2014 keine Konkurrenz aus deinem Markt im selben Funnel."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)",
      borderTop: "2px solid var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "Lead Engine // Zugang anfragen")), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "22px",
      textTransform: "uppercase",
      color: "var(--wl-emerald)",
      textShadow: "0 0 18px rgba(16,185,129,0.35)"
    }
  }, "Du stehst auf der Warteliste \u2713"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--wl-text-muted)",
      fontSize: "14px",
      marginTop: "10px",
      lineHeight: 1.6
    }
  }, "Wir pr\xFCfen Verf\xFCgbarkeit f\xFCr ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, region || "deine Region"), " und melden uns, sobald dein Zugang bereitsteht."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "18px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => {
      setDone(false);
      setJoinStep(0);
    }
  }, "Weitere Region eintragen"))) : /*#__PURE__*/React.createElement(FunnelStepper, {
    steps: STEPS,
    current: joinStep,
    onStepClick: setJoinStep
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    }
  }, joinStep === 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Zielregion / Stadt",
    required: true,
    hint: "Wo sollen deine Wunschkunden sitzen?"
  }, /*#__PURE__*/React.createElement(Input, {
    value: region,
    onChange: e => setRegion(e.target.value),
    placeholder: "z. B. D\xFCsseldorf, K\xF6ln, Bochum",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Zielbranche",
    required: true
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: branche,
    onChange: v => {
      setBranche(v);
      setTimeout(next, 180);
    },
    columns: 2,
    options: [{
      value: "handwerk",
      label: "Handwerk"
    }, {
      value: "dienst",
      label: "B2B-Dienstleister"
    }, {
      value: "immo",
      label: "Immobilien"
    }, {
      value: "other",
      label: "Andere"
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true,
    withArrow: true,
    disabled: !region || !branche,
    onClick: next
  }, "Weiter")) : null, joinStep === 1 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Dein Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Vorname Nachname",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Firma",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Firmenname",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    withArrow: true,
    onClick: next
  }, "Weiter"))) : null, joinStep === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--wl-border)",
      padding: "16px",
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, [["Region", region || "—"], ["Branche", branche || "—"], ["Monatl. Lead-Ziel", "bis 900"], ["Setup", "7 Tage"]].map(r => /*#__PURE__*/React.createElement("div", {
    key: r[0],
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-text-dim)",
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-text-soft)"
    }
  }, r[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true
  }, "Jetzt eintragen")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      textAlign: "center"
    }
  }, "\u2713 Kostenlos & unverbindlich \xB7 jederzeit widerrufbar")) : null))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      background: "rgba(5,5,5,0.7)",
      padding: "48px 24px",
      color: "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "14px",
      textTransform: "uppercase",
      color: "var(--wl-text-soft)"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Lead Engine"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "info@wasteland-interactive.de"), /*#__PURE__*/React.createElement("span", null, "Leverkusen \xB7 NRW"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026"))));
}
function LeadEngine() {
  const [joinStep, setJoinStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toJoin = () => formRef.current && formRef.current.scrollIntoView({
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "le-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "var(--wl-bg-pure)"
    }
  }, /*#__PURE__*/React.createElement(AmbientField, {
    scrollTargetId: "le-scroll"
  }), /*#__PURE__*/React.createElement(TopNav, {
    onJoin: toJoin
  }), /*#__PURE__*/React.createElement(Hero, {
    onJoin: toJoin
  }), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Waitlist, {
    formRef: formRef,
    joinStep: joinStep,
    setJoinStep: setJoinStep
  }), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(LeadEngine, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lead-engine/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/partner/screens.jsx
try { (() => {
/* Wasteland Interactive — Partner UI Kit
   Partner-programme landing + application funnel. Showcases the 3D
   components (TiltCard tiers, WireCube hero motif) and conversion
   overlays (StickyBar, ExitIntentModal). Self-mounts into #root.
   Loads design-system primitives from the bundle + ../_conversion.js. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button,
  Label,
  StatusBadge,
  Tag,
  MotionCard,
  BenefitCard,
  StatTile,
  Input,
  Select,
  FormField,
  OptionGrid,
  SectionHeading,
  Reveal,
  FunnelStepper,
  LogoStrip,
  TiltCard,
  WireCube,
  NetworkSphere,
  StickyBar,
  ExitIntentModal,
  AmbientField
} = WL;
const REFS = [{
  src: "../../assets/ref-musaservice-logo.webp",
  alt: "MusaService",
  height: "24px"
}, {
  src: "../../assets/ref-pzgrenbtl908-logo.webp",
  alt: "PzGrenBtl 908",
  height: "44px"
}];
const MODELS = [{
  index: "01",
  name: "Empfehlungsgeber",
  provision: "20 %",
  period: "wiederkehrend / Monat",
  lead: "Du empfiehlst, wir setzen um. Du bekommst 20 % — jeden Monat, solange dein Kunde bleibt.",
  tags: ["Keine Akquise", "Passives Einkommen"],
  featured: false
}, {
  index: "02",
  name: "Vertriebspartner",
  provision: "30 %",
  period: "wiederkehrend / Monat",
  lead: "Aktiver Vertrieb mit vollem Support & Leads. 30 % auf jede Zahlung — dauerhaft, solange der Kunde bleibt. Inklusive kostenlosem Zugang zur Lead Engine.",
  tags: ["Lead Engine gratis", "Co-Branding", "Prio-Support"],
  featured: true
}, {
  index: "03",
  name: "IT-Dienstleister",
  provision: "35 %",
  period: "wiederkehrend / Monat",
  lead: "Du installierst und betreust selbst. 35 % auf jede Zahlung — plus White-Label-Option, um unter deiner Marke zu liefern.",
  tags: ["Installiert + betreut", "White-Label möglich"],
  featured: false
}];
const HOW = [{
  num: "01",
  title: "Bewerben",
  body: "Kurzprofil senden — wir prüfen den Fit und melden uns innerhalb von 24h."
}, {
  num: "02",
  title: "Onboarding",
  body: "Materialien, Schulung und Zugänge. In 7 Tagen startklar — ohne technisches Vorwissen."
}, {
  num: "03",
  title: "Wiederkehrende Provision",
  body: "Du vermittelst, wir liefern sauber ab — und du verdienst jeden Monat aufs Neue, solange dein Kunde bleibt. Transparente, monatliche Auszahlung."
}];

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({
  onApply
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      height: "72px",
      background: "rgba(5,5,5,0.85)",
      borderBottom: "1px solid var(--wl-border)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "15px",
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Partner"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    withArrow: true,
    onClick: onApply
  }, "Jetzt bewerben"));
}
function Hero({
  onApply
}) {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      background: "transparent",
      padding: "100px 24px 80px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-12rem",
      top: "-4rem",
      width: "32rem",
      height: "32rem",
      borderRadius: "9999px",
      filter: "blur(64px)",
      opacity: 0.55,
      background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 65%)",
      animation: "wl-ambient-drift 20s var(--wl-ease-soft) infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1.05fr 0.95fr",
      gap: narrow ? "32px" : "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    dot: "cyan"
  }, "Partnerprogramm \xB7 Bewerbung offen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "24px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-xl)",
      lineHeight: 1.02,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff",
      textWrap: "balance"
    }
  }, "Werde ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    },
    className: "wl-text-glow"
  }, "Wasteland-Partner")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      maxWidth: "34rem",
      fontSize: "var(--wl-text-lg)",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Verdiene an digitalen Systemen, ohne sie selbst zu bauen \u2014 inklusive dem Sentinel-Sicherheitssystem im Abo. Du bringst die Beziehung, wir liefern. Deine Provision l\xE4uft jeden Monat weiter, solange dein Kunde bleibt."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "32px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    glow: true,
    withArrow: true,
    onClick: onApply
  }, "Jetzt bewerben"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    withArrow: true,
    onClick: () => document.getElementById("pt-models").scrollIntoView({
      behavior: "smooth"
    })
  }, "Modelle ansehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-emerald)"
    }
  }, "\u2713 Kein Risiko"), /*#__PURE__*/React.createElement("span", null, "\u2713 Monatliche Auszahlung"), /*#__PURE__*/React.createElement("span", null, "\u2713 Onboarding in 7 Tagen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "340px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      width: "22rem",
      height: "22rem",
      borderRadius: "9999px",
      filter: "blur(60px)",
      background: "radial-gradient(circle, rgba(0,240,255,0.18), transparent 68%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(NetworkSphere, {
    size: 340,
    count: 104
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "48px auto 0",
      paddingTop: "32px",
      borderTop: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(LogoStrip, {
    align: "left",
    label: "Partner liefern an",
    logos: REFS
  })));
}
function Models({
  onApply
}) {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    id: "pt-models",
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Modelle // 01-03",
    title: "Drei Wege,",
    accent: "eine wiederkehrende Provision.",
    lead: "Vom lockeren Empfehlungsgeber bis zum IT-Dienstleister mit White-Label. In jedem Modell verdienst du Monat f\xFCr Monat mit \u2014 solange dein Kunde bleibt."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)",
      gap: "24px"
    }
  }, MODELS.map((m, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: m.index,
    delay: i * 100
  }, /*#__PURE__*/React.createElement(TiltCard, {
    pad: "lg",
    style: {
      height: "100%"
    }
  }, m.featured ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      marginBottom: "12px",
      background: "var(--wl-cyan)",
      color: "#000",
      padding: "4px 8px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em"
    }
  }, "Beliebt") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      marginBottom: "8px"
    }
  }, m.index), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "1.4rem",
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
      paddingBottom: "16px",
      marginBottom: "16px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "2rem",
      lineHeight: 1,
      color: "var(--wl-cyan)"
    }
  }, m.provision), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, m.period)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 20px",
      fontSize: "13px",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, m.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "24px"
    }
  }, m.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement(Button, {
    variant: m.featured ? "primary" : "ghost",
    full: true,
    withArrow: true,
    onClick: onApply
  }, m.name, " werden")))))));
}
function HowItWorks() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Ablauf // 01-03",
    title: "So l\xE4uft die",
    accent: "Partnerschaft.",
    lead: "Transparent, schnell, ohne Kleingedrucktes. Du startest in einer Woche."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)",
      border: "1px solid var(--wl-border)"
    }
  }, HOW.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.num,
    delay: i * 100,
    style: {
      borderRight: !narrow && i < 2 ? "1px solid var(--wl-border)" : "none",
      borderBottom: narrow && i < 2 ? "1px solid var(--wl-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      marginBottom: "20px"
    }
  }, s.num), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.4rem",
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, s.body))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "repeat(2,1fr)" : "repeat(4,1fr)",
      border: "1px solid var(--wl-border)",
      borderTop: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Provision",
    count: 35,
    prefix: "bis ",
    suffix: " %"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Auszahlung",
    value: "Monatl."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Onboarding",
    count: 7,
    suffix: " Tage"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatTile, {
    label: "Modelle",
    count: 3,
    prefix: "0"
  }))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(EarningsCalc, null))));
}

/* ── interactive recurring-earnings calculator ─────────────── */
const RATE = 0.30; // Vertriebspartner-Provision (wiederkehrend)
const TIER_PRICE = {
  home: 14,
  server: 189,
  enterprise: 449
};
const TIER_META = {
  home: {
    label: "Sentinel Home",
    sub: "14 € · pro Gerät",
    color: "var(--wl-sentinel-home)",
    rgb: "70,227,90",
    max: 60
  },
  server: {
    label: "Sentinel Server",
    sub: "189 € · pro Server",
    color: "var(--wl-sentinel-server)",
    rgb: "46,197,255",
    max: 40
  },
  enterprise: {
    label: "Sentinel Enterprise",
    sub: "449 € · Plattform",
    color: "var(--wl-sentinel-enterprise)",
    rgb: "165,103,245",
    max: 25
  }
};
function useNarrow(bp) {
  const [narrow, setNarrow] = React.useState(typeof window !== "undefined" && window.innerWidth < bp);
  React.useEffect(() => {
    const on = () => setNarrow(window.innerWidth < bp);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return narrow;
}
function TierSlider({
  tierKey,
  value,
  onChange
}) {
  const m = TIER_META[tierKey];
  const monthly = value * TIER_PRICE[tierKey] * RATE;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 0",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      flexShrink: 0,
      background: m.color,
      boxShadow: `0 0 8px rgba(${m.rgb},0.6)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "13px",
      textTransform: "uppercase",
      color: "#fff",
      whiteSpace: "nowrap"
    }
  }, m.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      color: "var(--wl-text-dim)",
      whiteSpace: "nowrap"
    }
  }, m.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "12px",
      color: m.color
    }
  }, value, " Kd."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "15px",
      color: "#fff"
    }
  }, "+", monthly.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  }), " \u20AC"))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: m.max,
    value: value,
    onChange: e => onChange(parseInt(e.target.value, 10)),
    "aria-label": m.label + " Kunden",
    style: {
      width: "100%",
      accentColor: m.color,
      cursor: "pointer",
      height: "4px"
    }
  }));
}
function EarningsCalc() {
  const narrow = useNarrow(760);
  const [counts, setCounts] = React.useState({
    home: 20,
    server: 10,
    enterprise: 5
  });
  const set = k => v => setCounts(c => ({
    ...c,
    [k]: v
  }));
  const monthly = Object.keys(counts).reduce((sum, k) => sum + counts[k] * TIER_PRICE[k] * RATE, 0);
  const yearly = monthly * 12;
  const totalCustomers = counts.home + counts.server + counts.enterprise;
  const presets = [{
    label: "Nebenbei",
    v: {
      home: 8,
      server: 3,
      enterprise: 1
    }
  }, {
    label: "Solides Plus",
    v: {
      home: 20,
      server: 10,
      enterprise: 5
    }
  }, {
    label: "Davon leben",
    v: {
      home: 40,
      server: 22,
      enterprise: 12
    }
  }];
  const fmt = n => n.toLocaleString("de-DE", {
    maximumFractionDigits: 0
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px",
      border: "1px solid var(--wl-border)",
      borderTop: "2px solid var(--wl-cyan)",
      background: "var(--wl-surface-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: narrow ? "20px" : "28px 32px",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1.25fr 0.75fr",
      gap: narrow ? "24px" : "40px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "8px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-cyan)"
    }
  }, "Verdienst-Rechner // 30 % wiederkehrend"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      flexWrap: "wrap"
    }
  }, presets.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.label,
    type: "button",
    onClick: () => setCounts(p.v),
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "9px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--wl-text-soft)",
      background: "transparent",
      border: "1px solid var(--wl-border-20)",
      padding: "5px 8px",
      cursor: "pointer",
      borderRadius: "var(--wl-radius)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "var(--wl-cyan)";
      e.currentTarget.style.color = "var(--wl-cyan)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "var(--wl-border-20)";
      e.currentTarget.style.color = "var(--wl-text-soft)";
    }
  }, p.label)))), /*#__PURE__*/React.createElement(TierSlider, {
    tierKey: "home",
    value: counts.home,
    onChange: set("home")
  }), /*#__PURE__*/React.createElement(TierSlider, {
    tierKey: "server",
    value: counts.server,
    onChange: set("server")
  }), /*#__PURE__*/React.createElement(TierSlider, {
    tierKey: "enterprise",
    value: counts.enterprise,
    onChange: set("enterprise")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontFamily: "var(--wl-font-body)",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "var(--wl-text-dim)"
    }
  }, totalCustomers, " Kunden, einmal gewonnen \u2014 die Provision l\xE4uft ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-text-soft)"
    }
  }, "jeden Monat weiter"), ", solange sie bleiben. Kein erneuter Verkauf n\xF6tig.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: narrow ? "left" : "right",
      borderTop: narrow ? "1px solid var(--wl-border)" : "none",
      borderLeft: narrow ? "none" : "1px solid var(--wl-border)",
      paddingTop: narrow ? "20px" : 0,
      paddingLeft: narrow ? 0 : "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)",
      marginBottom: "10px"
    }
  }, "Dein Einkommen / Monat"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
      lineHeight: 1,
      color: "var(--wl-cyan)",
      textShadow: "var(--wl-text-glow)"
    }
  }, fmt(monthly), " \u20AC"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "13px",
      color: "var(--wl-text-soft)"
    }
  }, "= ", fmt(yearly), " \u20AC / Jahr"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      background: "var(--wl-cyan-05)",
      border: "1px solid var(--wl-cyan-30)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "9999px",
      background: "var(--wl-emerald)",
      boxShadow: "0 0 8px var(--wl-emerald)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--wl-emerald)"
    }
  }, "Wiederkehrend \xB7 planbar")))));
}
function Apply({
  formRef,
  step,
  setStep
}) {
  const narrow = useNarrow(820);
  const STEPS = ["Modell", "Reichweite", "Kontakt"];
  const [model, setModel] = React.useState("");
  const [reach, setReach] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  return /*#__PURE__*/React.createElement("section", {
    ref: formRef,
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px 120px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1fr 0.95fr",
      gap: narrow ? "32px" : "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Bewerbung // Partner werden",
    title: "Bewirb dich in",
    accent: "60 Sekunden.",
    lead: "Erz\xE4hl uns kurz, wer du bist und welches Modell dich reizt. Wir pr\xFCfen den Fit und melden uns innerhalb von 24 Stunden."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Unverbindlich"
  }, "Eine Bewerbung ist kein Vertrag. Wir kl\xE4ren erst gemeinsam, ob es passt."), /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Lead Engine gratis"
  }, "Als Vertriebspartner bekommst du kostenlosen Zugang zur Lead Engine \u2014 f\xFCr deine eigene Akquise."), /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Pers\xF6nlich gepr\xFCft"
  }, "Kein anonymer Funnel \u2014 wir schauen uns jede Bewerbung selbst an."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)",
      borderTop: "2px solid var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "Partner // Bewerbung")), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "22px",
      textTransform: "uppercase",
      color: "var(--wl-emerald)",
      textShadow: "0 0 18px rgba(16,185,129,0.35)"
    }
  }, "Bewerbung eingegangen \u2713"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--wl-text-muted)",
      fontSize: "14px",
      marginTop: "10px",
      lineHeight: 1.6
    }
  }, "Wir pr\xFCfen deinen Fit f\xFCr das ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, model || "Partner"), "-Modell und melden uns in 24h."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "18px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => {
      setDone(false);
      setStep(0);
    }
  }, "Neue Bewerbung"))) : /*#__PURE__*/React.createElement(FunnelStepper, {
    steps: STEPS,
    current: step,
    onStepClick: setStep
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    }
  }, step === 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Welches Modell reizt dich?",
    required: true,
    hint: "Unsicher? Wir beraten dich."
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: model,
    onChange: v => {
      setModel(v);
      setTimeout(next, 180);
    },
    columns: 2,
    options: [{
      value: "Empfehlung",
      label: "Empfehlungsgeber"
    }, {
      value: "Vertrieb",
      label: "Vertriebspartner"
    }, {
      value: "White-Label",
      label: "White-Label"
    }, {
      value: "Unsicher",
      label: "Noch unsicher"
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true,
    withArrow: true,
    disabled: !model,
    onClick: next
  }, "Weiter")) : null, step === 1 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Wie gro\xDF ist dein Netzwerk?",
    required: true
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: reach,
    onChange: v => {
      setReach(v);
      setTimeout(next, 180);
    },
    columns: 3,
    options: [{
      value: "klein",
      label: "< 50"
    }, {
      value: "mittel",
      label: "50–500"
    }, {
      value: "gross",
      label: "500+"
    }]
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Deine Branche / dein Markt",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Bitte w\xE4hlen"), /*#__PURE__*/React.createElement("option", null, "Agentur / Marketing"), /*#__PURE__*/React.createElement("option", null, "Beratung / Coaching"), /*#__PURE__*/React.createElement("option", null, "Handwerk / Bau"), /*#__PURE__*/React.createElement("option", null, "IT / Software"), /*#__PURE__*/React.createElement("option", null, "Andere"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    withArrow: true,
    onClick: next
  }, "Weiter"))) : null, step === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Dein Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Vorname Nachname",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Firma / Marke",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Firmenname",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true
  }, "Bewerbung absenden")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      textAlign: "center"
    }
  }, "\u2713 Unverbindlich \xB7 pers\xF6nlich gepr\xFCft \xB7 Antwort in 24h")) : null))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      background: "rgba(5,5,5,0.7)",
      padding: "48px 24px 80px",
      color: "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "14px",
      textTransform: "uppercase",
      color: "var(--wl-text-soft)"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Partner"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "partner@wasteland-interactive.de"), /*#__PURE__*/React.createElement("span", null, "Leverkusen \xB7 NRW"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026"))));
}
function Partner() {
  const [step, setStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toApply = () => formRef.current && formRef.current.scrollIntoView({
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "pt-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "var(--wl-bg-pure)"
    }
  }, /*#__PURE__*/React.createElement(AmbientField, {
    scrollTargetId: "pt-scroll"
  }), /*#__PURE__*/React.createElement(TopNav, {
    onApply: toApply
  }), /*#__PURE__*/React.createElement(Hero, {
    onApply: toApply
  }), /*#__PURE__*/React.createElement(Models, {
    onApply: toApply
  }), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Apply, {
    formRef: formRef,
    step: step,
    setStep: setStep
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyBar, {
    scrollTargetId: "pt-scroll",
    showAfter: 520,
    message: "Partner werden \u2014 bis 35 % wiederkehrende Provision, jeden Monat.",
    ctaLabel: "Jetzt bewerben",
    onCta: toApply
  }), /*#__PURE__*/React.createElement(ExitIntentModal, {
    eyebrow: "Bevor du gehst //",
    title: "Lohnt sich dein Netzwerk?"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontSize: "13px",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Lass uns kurz rechnen, was dein Netzwerk als Wasteland-Partner wert ist. Trag dich ein \u2014 unverbindlich."), /*#__PURE__*/React.createElement(FormField, {
    label: "E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true,
    onClick: () => {
      toApply();
    }
  }, "Partner-Infos anfordern")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Partner, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/partner/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sentinel/data.js
try { (() => {
/* Wasteland Interactive — Sentinel Home · Content data
   All copy/prices/structure from the client's Content Brief.
   Plain JS (no JSX); loaded with a normal <script src> before screens.jsx
   so window.SENTINEL is ready when React mounts. */
window.SENTINEL = function () {
  /* Tier accent colors (3 have shields; Pro/Business use brand accents) */
  var C = {
    home: "var(--wl-sentinel-home)",
    // green
    pro: "var(--wl-cyan)",
    // cyan
    business: "var(--wl-gold)",
    // gold
    server: "var(--wl-sentinel-server)",
    // blue
    enterprise: "var(--wl-sentinel-enterprise)" // purple
  };
  var RGB = {
    home: "70,227,90",
    pro: "0,240,255",
    business: "200,169,104",
    server: "46,197,255",
    enterprise: "165,103,245"
  };
  var TIERS = [{
    key: "home",
    name: "Home",
    price: 14,
    devices: "1 Gerät",
    audience: "Privatnutzer"
  }, {
    key: "pro",
    name: "Pro",
    price: 49,
    devices: "2 Geräte",
    audience: "Freelancer",
    popular: true
  }, {
    key: "business",
    name: "Business",
    price: 99,
    devices: "5 Geräte",
    audience: "Kleine Büros"
  }, {
    key: "server",
    name: "Server",
    price: 189,
    devices: "1 Server + 3 Clients",
    audience: "KMU"
  }, {
    key: "enterprise",
    name: "Enterprise",
    price: 449,
    devices: "Unbegrenzt",
    audience: "Unternehmen"
  }];

  /* feature matrix — order = tiers above; true = enthalten */
  var FEATURES = [{
    label: "AV + Echtzeit-Schutz",
    v: [true, true, true, true, true]
  }, {
    label: "Honeypot-Erkennung",
    v: [true, true, true, true, true]
  }, {
    label: "Automatische Netzwerk-Isolation",
    v: [true, true, true, true, true]
  }, {
    label: "USB-Geräteschutz",
    v: [true, true, true, true, true]
  }, {
    label: "VirusTotal / MalwareBazaar",
    v: [false, true, true, true, true]
  }, {
    label: "Netzwerk-IDS (Geräte-Baseline)",
    v: [false, true, true, true, true]
  }, {
    label: "Forensischer Report (ZIP)",
    v: [false, true, true, true, true]
  }, {
    label: "Forensik-Report per E-Mail",
    v: [false, false, true, true, true]
  }, {
    label: "Password Vault",
    v: [false, true, true, true, true]
  }, {
    label: "Server-Dienst-Monitoring",
    v: [false, false, false, true, true]
  }, {
    label: "Multi-Device Dashboard",
    v: [false, false, true, true, true]
  }, {
    label: "API-Zugang",
    v: [false, false, false, false, true]
  }, {
    label: "SLA + Prioritäts-Support",
    v: [false, false, false, false, true]
  }];
  var AUDIENCES = [{
    tag: "Privatnutzer",
    title: "Schutz ohne Komplexität",
    body: "Einrichten, läuft. Besser als Norton — und günstiger als ein Anwalt nach dem Hack.",
    color: C.home,
    rgb: RGB.home
  }, {
    tag: "Freelancer & Homeoffice",
    title: "Kundendaten = deine Haftung",
    body: "Werden Kundendaten gestohlen, haftest du. Sentinel dokumentiert nachweisbar, dass du alles getan hast.",
    color: C.pro,
    rgb: RGB.pro
  }, {
    tag: "Praxen & Kanzleien",
    title: "Hochsensible Akten, keine IT",
    body: "Patientendaten und Mandantenakten auf Enterprise-Niveau geschützt — ganz ohne eigene IT-Abteilung.",
    color: C.business,
    rgb: RGB.business
  }, {
    tag: "KMU mit Server",
    title: "24/7 unbeaufsichtigt sicher",
    body: "Ein Angriff = kompletter Betriebsausfall. Sentinel überwacht deinen Server rund um die Uhr und schlägt Alarm, bevor der Schaden passiert.",
    color: C.server,
    rgb: RGB.server
  }];
  var STEPS = [{
    num: "01",
    title: "Erkennen",
    body: "Honeypot-Fallen (FTP, SSH, RDP) und Netzwerk-IDS entlarven Angreifer und unbekannte Geräte sofort — noch bevor echter Schaden entsteht."
  }, {
    num: "02",
    title: "Isolieren",
    body: "Bei einem echten Angriff kappt Sentinel das Internet in Sekunden und riegelt das Netzwerk ab. Der Angreifer verliert den Zugriff."
  }, {
    num: "03",
    title: "Dokumentieren",
    body: "Automatisch erstellter forensischer Bericht als ZIP: Angreifer-IP, GeoIP, Payload, Prozessliste — gerichtsfest aufbereitet und direkt verwertbar für die Strafanzeige."
  }];
  var COMPARE = {
    cols: ["Sentinel Pro", "Bitdefender Total", "Norton 360", "Bitdefender BOX"],
    highlight: 0,
    rows: [{
      label: "Preis / Monat",
      v: ["49 €", "~4 €", "~8 €", "~8 € + 99 € HW"]
    }, {
      label: "Honeypot",
      v: [true, false, false, false]
    }, {
      label: "Auto-Netzwerk-Isolation",
      v: [true, false, false, "teilweise"]
    }, {
      label: "Forensischer Report",
      v: [true, false, false, false]
    }, {
      label: "Netzwerk-IDS",
      v: [true, false, false, true]
    }, {
      label: "Keine Hardware nötig",
      v: [true, true, true, false]
    }]
  };
  var TECH = [{
    name: "Phoenix-Watchdog",
    body: "Startet sich selbst neu, falls ein Angreifer versucht, Sentinel zu beenden."
  }, {
    name: "VirusTotal-Integration",
    body: "Abgleich jeder Datei gegen 70+ Antiviren-Engines in Echtzeit."
  }, {
    name: "MalwareBazaar",
    body: "Bekannte Malware-Datenbank von abuse.ch für sofortige Treffer."
  }, {
    name: "GeoIP-Ortung",
    body: "Angreifer-IP wird automatisch geortet — Land, Stadt, ISP."
  }, {
    name: "Kein Cloud-Zwang",
    body: "Läuft lokal. Deine Daten bleiben bei dir."
  }, {
    name: "DSGVO-konform",
    body: "Keine Telemetrie, keine Datenweitergabe. Made in Germany."
  }];
  var RESELLER = [{
    model: "Affiliate",
    desc: "Link / Empfehlung",
    rate: 20,
    example: "Pro-Kunde = 9,80 € / Monat dauerhaft"
  }, {
    model: "Reseller",
    desc: "Aktiver Vertrieb",
    rate: 30,
    example: "Pro-Kunde = 14,70 € / Monat dauerhaft",
    featured: true
  }, {
    model: "IT-Dienstleister",
    desc: "Installiert + betreut",
    rate: 35,
    example: "Business-Kunde = 34,65 € / Monat"
  }];
  var FAQ = [{
    q: "Brauche ich das wirklich?",
    a: "Wenn du Kundendaten verarbeitest oder einen Server betreibst: ja. Ein Ransomware-Angriff kostet im Schnitt rund 4.500 € Schaden und Wochen Ausfallzeit. Sentinel erkennt, isoliert und dokumentiert — und weist im Ernstfall nach, dass du geschützt warst."
  }, {
    q: "Was passiert genau bei einem Angriff?",
    a: "Sentinel erkennt den Angriff über Honeypots und Netzwerk-IDS, kappt in Sekunden die Internetverbindung und riegelt das Netzwerk ab. Anschließend erstellt es automatisch einen forensischen Bericht (Angreifer-IP, GeoIP, Payload, Prozessliste) als ZIP — direkt verwertbar für eine Strafanzeige."
  }, {
    q: "Auf welchen Systemen läuft Sentinel?",
    a: "Aktuell auf Linux und Windows. Eine macOS-Version ist in Arbeit. Sentinel befindet sich in der Beta — über die Warteliste sicherst du dir frühen Zugang."
  }, {
    q: "Werden meine Daten in die Cloud geladen?",
    a: "Nein. Sentinel läuft lokal auf deinem Gerät, ohne Cloud-Zwang. Es gibt keine Telemetrie und keine Datenweitergabe — DSGVO-konform und Made in Germany."
  }, {
    q: "Ist das nicht zu kompliziert für mich?",
    a: "Nein. Sentinel ist auf Einrichten-und-läuft ausgelegt — gerade für Nutzer ohne eigene IT. Die Pakete Business und höher bieten zusätzlich ein zentrales Dashboard für mehrere Geräte."
  }, {
    q: "Was kostet der Einstieg?",
    a: "Sentinel Home startet bei 14 € im Monat für ein Gerät. Pro (49 €) ergänzt Forensik-Report, Netzwerk-IDS und Password Vault — das beliebteste Paket für Freelancer und Homeoffice."
  }];
  return {
    C: C,
    RGB: RGB,
    TIERS: TIERS,
    FEATURES: FEATURES,
    AUDIENCES: AUDIENCES,
    STEPS: STEPS,
    COMPARE: COMPARE,
    TECH: TECH,
    RESELLER: RESELLER,
    FAQ: FAQ
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sentinel/data.js", error: String((e && e.message) || e) }); }

// ui_kits/sentinel/screens.jsx
try { (() => {
/* Wasteland Interactive — Sentinel Home · Product Website
   Full content per the client Content Brief (5 tiers, audiences, problem,
   how-it-works, competitor comparison, technology, reseller, FAQ).
   Data in ./data.js (window.SENTINEL). Conversion/3D helpers from
   ../_conversion.js. Self-mounts into #root. Honest status: Beta,
   Linux/Windows live, macOS in Arbeit → CTA führt zur Early-Access-Warteliste. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const S = window.SENTINEL;
const {
  Button,
  Label,
  StatusBadge,
  Tag,
  MotionCard,
  BenefitCard,
  StatTile,
  ScannerLog,
  Input,
  Select,
  FormField,
  OptionGrid,
  SectionHeading,
  Reveal,
  FunnelStepper,
  TiltCard,
  NetworkSphere,
  StickyBar,
  ExitIntentModal,
  AmbientField,
  ScrollProgress,
  CursorGlow,
  FaqList
} = WL;
const EUR = n => n.toLocaleString("de-DE");
function useNarrow(bp) {
  const [n, setN] = React.useState(typeof window !== "undefined" && window.innerWidth < bp);
  React.useEffect(() => {
    const on = () => setN(window.innerWidth < bp);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return n;
}
const Cell = ({
  v,
  color
}) => {
  if (v === true) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: color || "var(--wl-cyan)",
      fontWeight: 700
    }
  }, "\u2713");
  if (v === false) return /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-text-faint)"
    }
  }, "\u2014");
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      color: "var(--wl-text-soft)"
    }
  }, v);
};

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({
  onCta
}) {
  const links = [["Editionen", "sn-pricing"], ["So funktioniert's", "sn-how"], ["Vergleich", "sn-compare"], ["FAQ", "sn-faq"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      height: "72px",
      background: "rgba(5,5,5,0.82)",
      borderBottom: "1px solid var(--wl-border)",
      backdropFilter: "blur(12px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "15px",
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Sentinel"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "22px"
    },
    className: "sn-navlinks"
  }, links.map(([t, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: "smooth"
      });
    },
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.16em",
      color: "var(--wl-text-muted)"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--wl-cyan)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--wl-text-muted)"
  }, t))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    withArrow: true,
    onClick: onCta
  }, "Jetzt sch\xFCtzen")));
}
function Hero({
  onCta
}) {
  const narrow = useNarrow(900);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      background: "transparent",
      padding: "100px 24px 80px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1.05fr 0.95fr",
      gap: narrow ? "40px" : "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    dot: "cyan"
  }, "Beta \xB7 Linux & Windows \xB7 macOS in Arbeit"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "24px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-xl)",
      lineHeight: 1.02,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff",
      textWrap: "balance"
    }
  }, "Der erste Einbruch kostet alles. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    },
    className: "wl-text-glow"
  }, "Sentinel kostet 14 \u20AC.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      maxWidth: "36rem",
      fontSize: "var(--wl-text-lg)",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Ein Ransomware-Angriff kostet im Schnitt 4.500 \u20AC Schaden und Wochen Ausfallzeit. Sentinel erkennt den Angriff, isoliert dein Netzwerk und erstellt automatisch den forensischen Bericht \u2014 bevor du \xFCberhaupt wei\xDFt, dass jemand versucht hat einzubrechen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "32px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    glow: true,
    withArrow: true,
    onClick: onCta
  }, "Jetzt sch\xFCtzen"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    withArrow: true,
    onClick: () => document.getElementById("sn-pricing").scrollIntoView({
      behavior: "smooth"
    })
  }, "Editionen ansehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-emerald)"
    }
  }, "\u2713 Kein Cloud-Zwang"), /*#__PURE__*/React.createElement("span", null, "\u2713 DSGVO-konform"), /*#__PURE__*/React.createElement("span", null, "\u2713 Made in Germany"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "360px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      width: "24rem",
      height: "24rem",
      borderRadius: "9999px",
      filter: "blur(60px)",
      background: "radial-gradient(circle, rgba(0,240,255,0.16), transparent 68%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement(NetworkSphere, {
    size: narrow ? 280 : 340,
    count: 104
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "8%",
      left: "12%",
      filter: "drop-shadow(0 0 14px var(--wl-sentinel-home-glow))"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sentinel-home.png",
    alt: "",
    style: {
      height: "50px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "10%",
      left: "6%",
      filter: "drop-shadow(0 0 14px var(--wl-sentinel-server-glow))"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sentinel-server.png",
    alt: "",
    style: {
      height: "44px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "16%",
      right: "6%",
      filter: "drop-shadow(0 0 14px var(--wl-sentinel-enterprise-glow))"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sentinel-enterprise.png",
    alt: "",
    style: {
      height: "46px"
    }
  })))));
}
function Problem() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Das Risiko // real",
    title: "Was passiert, wenn du",
    accent: "nicht gesch\xFCtzt bist.",
    lead: "Antivirus allein stoppt moderne Angriffe nicht. Ein einziger erfolgreicher Einbruch trifft Daten, Betrieb und Haftung gleichzeitig."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      border: "1px solid var(--wl-border)"
    },
    className: "sn-stat-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "\xD8 Schaden Ransomware",
    count: 4500,
    suffix: " \u20AC"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Ausfallzeit",
    value: "Wochen"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatTile, {
    label: "Sentinel reagiert in",
    value: "Sekunden"
  })))));
}
function HowItWorks() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    id: "sn-how",
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "So funktioniert's // 01-03",
    title: "Erkennen.",
    accent: "Isolieren. Dokumentieren.",
    lead: "Drei Schritte, vollautomatisch. Du musst nichts \xFCberwachen \u2014 Sentinel handelt, w\xE4hrend du arbeitest."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)",
      border: "1px solid var(--wl-border)"
    }
  }, S.STEPS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.num,
    delay: i * 100,
    style: {
      borderRight: !narrow && i < 2 ? "1px solid var(--wl-border)" : "none",
      borderBottom: narrow && i < 2 ? "1px solid var(--wl-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "0.2em",
      color: "var(--wl-cyan)",
      marginBottom: "18px"
    }
  }, s.num), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.4rem",
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tight)",
      color: "#fff"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, s.body)))))));
}
function Audiences() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "F\xFCr wen // Zielgruppen",
    title: "Gebaut f\xFCr alle,",
    accent: "die etwas zu verlieren haben.",
    lead: "Vom privaten Rechner bis zum Firmenserver \u2014 dieselbe Engine, abgestimmt auf dein Risiko."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "repeat(2,1fr)",
      gap: "20px"
    }
  }, S.AUDIENCES.map((a, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: a.tag,
    delay: i * 90
  }, /*#__PURE__*/React.createElement(TiltCard, {
    pad: "lg",
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "3px",
      background: a.color
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: a.color,
      marginBottom: "10px"
    }
  }, a.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.25rem",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, a.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--wl-text-sm)",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, a.body)))))));
}
function Pricing({
  onCta
}) {
  const narrow = useNarrow(960);
  return /*#__PURE__*/React.createElement("section", {
    id: "sn-pricing",
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Editionen // 05 Pakete",
    title: "Ein Preis f\xFCr",
    accent: "jede Gr\xF6\xDFe.",
    lead: "Alle Pakete enthalten den vollen Echtzeit-Schutz, Honeypot-Erkennung und automatische Netzwerk-Isolation. H\xF6here Tiers erg\xE4nzen Forensik, Dashboard und Server-Monitoring."
  })), narrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.1em",
      color: "var(--wl-text-dim)",
      marginBottom: "10px"
    }
  }, "\u2192 Tabelle horizontal wischen") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      border: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      minWidth: "780px",
      borderCollapse: "collapse",
      fontFamily: "var(--wl-font-body)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      position: "sticky",
      left: 0,
      zIndex: 2,
      background: "var(--wl-surface-2)",
      textAlign: "left",
      padding: "20px",
      borderBottom: "1px solid var(--wl-border)",
      borderRight: "1px solid var(--wl-border)",
      minWidth: "200px",
      verticalAlign: "bottom"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, "Leistung // Paket")), S.TIERS.map(t => /*#__PURE__*/React.createElement("th", {
    key: t.key,
    style: {
      padding: "20px 16px",
      borderBottom: "1px solid var(--wl-border)",
      borderRight: "1px solid var(--wl-border)",
      textAlign: "center",
      background: t.popular ? "rgba(0,240,255,0.05)" : "transparent",
      borderTop: t.popular ? "2px solid var(--wl-cyan)" : "none",
      minWidth: "130px",
      verticalAlign: "bottom"
    }
  }, t.popular ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "8px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#000",
      background: "var(--wl-cyan)",
      padding: "3px 6px",
      display: "inline-block"
    }
  }, "Beliebt") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "1.1rem",
      textTransform: "uppercase",
      color: S.C[t.key]
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8px",
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: "3px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "1.9rem",
      color: "#fff"
    }
  }, t.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1rem",
      color: "var(--wl-cyan)"
    }
  }, "\u20AC")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "9px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)"
    }
  }, "/ Monat"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "6px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "9px",
      color: "var(--wl-text-soft)"
    }
  }, t.devices), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "9px",
      color: "var(--wl-text-dim)"
    }
  }, t.audience))))), /*#__PURE__*/React.createElement("tbody", null, S.FEATURES.map((f, ri) => /*#__PURE__*/React.createElement("tr", {
    key: f.label,
    style: {
      background: ri % 2 ? "rgba(255,255,255,0.012)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      position: "sticky",
      left: 0,
      zIndex: 1,
      background: ri % 2 ? "#070809" : "var(--wl-surface-3)",
      padding: "13px 20px",
      borderBottom: "1px solid var(--wl-border-05)",
      borderRight: "1px solid var(--wl-border)",
      fontSize: "13px",
      color: "var(--wl-text-soft)"
    }
  }, f.label), f.v.map((val, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      padding: "13px 16px",
      textAlign: "center",
      borderBottom: "1px solid var(--wl-border-05)",
      borderRight: "1px solid var(--wl-border)",
      background: S.TIERS[ci].popular ? "rgba(0,240,255,0.03)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Cell, {
    v: val,
    color: S.C[S.TIERS[ci].key]
  }))))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      position: "sticky",
      left: 0,
      background: "var(--wl-surface-2)",
      borderRight: "1px solid var(--wl-border)"
    }
  }), S.TIERS.map(t => /*#__PURE__*/React.createElement("td", {
    key: t.key,
    style: {
      padding: "18px 12px",
      textAlign: "center",
      borderRight: "1px solid var(--wl-border)",
      background: t.popular ? "rgba(0,240,255,0.05)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: t.popular ? "primary" : "ghost",
    onClick: onCta
  }, "W\xE4hlen"))))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)"
    }
  }, "\u2713 Alle aufgef\xFChrten Funktionen sind im jeweiligen Paket aktiv \xB7 Beta \u2014 Zugang aktuell \xFCber die Warteliste.")));
}
function Compare() {
  const c = S.COMPARE;
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    id: "sn-compare",
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Vergleich // mehr als Antivirus",
    title: "Warum Sentinel",
    accent: "kein normales AV ist.",
    lead: "Klassische Antivirus-Suiten scannen Dateien. Sentinel verteidigt aktiv dein Netzwerk \u2014 und liefert den Beweis."
  })), narrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.1em",
      color: "var(--wl-text-dim)",
      marginBottom: "10px"
    }
  }, "\u2192 Tabelle horizontal wischen") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      border: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      minWidth: "680px",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: "left",
      padding: "18px 20px",
      borderBottom: "1px solid var(--wl-border)",
      borderRight: "1px solid var(--wl-border)",
      minWidth: "190px"
    }
  }), c.cols.map((col, i) => /*#__PURE__*/React.createElement("th", {
    key: col,
    style: {
      padding: "18px 16px",
      textAlign: "center",
      borderBottom: "1px solid var(--wl-border)",
      borderRight: "1px solid var(--wl-border)",
      background: i === c.highlight ? "rgba(0,240,255,0.05)" : "transparent",
      borderTop: i === c.highlight ? "2px solid var(--wl-cyan)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "13px",
      textTransform: "uppercase",
      color: i === c.highlight ? "var(--wl-cyan)" : "var(--wl-text-soft)"
    }
  }, col))))), /*#__PURE__*/React.createElement("tbody", null, c.rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: r.label,
    style: {
      background: ri % 2 ? "rgba(255,255,255,0.012)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 20px",
      borderBottom: "1px solid var(--wl-border-05)",
      borderRight: "1px solid var(--wl-border)",
      fontSize: "13px",
      color: "var(--wl-text-soft)"
    }
  }, r.label), r.v.map((val, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      padding: "14px 16px",
      textAlign: "center",
      borderBottom: "1px solid var(--wl-border-05)",
      borderRight: "1px solid var(--wl-border)",
      background: ci === c.highlight ? "rgba(0,240,255,0.03)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(Cell, {
    v: val
  }))))))))));
}
function Technology() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "0.8fr 1.2fr",
      gap: "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "Unter der Haube // Technologie"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-lg)",
      lineHeight: 1.05,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff"
    }
  }, "Echte Verteidigung, ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "kein Marketing.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      fontSize: "var(--wl-text-base)",
      lineHeight: 1.625,
      color: "var(--wl-text-muted)"
    }
  }, "Sentinel kombiniert bew\xE4hrte Open-Threat-Intelligence mit aktiver Abwehr \u2014 lokal, ohne Cloud-Zwang, ohne Telemetrie.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1fr 1fr",
      gap: "14px"
    }
  }, S.TECH.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.name,
    delay: i * 70
  }, /*#__PURE__*/React.createElement(BenefitCard, {
    title: t.name
  }, t.body))))));
}
function Reseller() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Partner // Reseller-Programm",
    title: "Verdiene passiv \u2014",
    accent: "ohne Support-Aufwand.",
    lead: "Du vermittelst oder installierst, Sentinel sch\xFCtzt und wir liefern den Support. Deine Provision l\xE4uft monatlich weiter, solange dein Kunde bleibt."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)",
      gap: "20px"
    }
  }, S.RESELLER.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.model,
    delay: i * 90
  }, /*#__PURE__*/React.createElement(TiltCard, {
    pad: "lg",
    style: {
      height: "100%"
    }
  }, r.featured ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "-1px",
      height: "2px",
      background: "var(--wl-cyan)"
    },
    "aria-hidden": "true"
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "var(--wl-label)",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)",
      marginBottom: "10px"
    }
  }, r.desc), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "1.3rem",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, r.model), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "6px",
      paddingBottom: "16px",
      borderBottom: "1px solid var(--wl-border)",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "2.6rem",
      lineHeight: 1,
      color: "var(--wl-cyan)"
    }
  }, r.rate), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "1.2rem",
      color: "var(--wl-cyan)"
    }
  }, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)",
      marginLeft: "4px"
    }
  }, "wiederkehrend")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "13px",
      lineHeight: 1.55,
      color: "var(--wl-text-soft)"
    }
  }, r.example))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px",
      border: "1px solid var(--wl-border)",
      borderTop: "2px solid var(--wl-cyan)",
      background: "var(--wl-surface-2)",
      padding: "24px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--wl-text-dim)",
      marginBottom: "8px"
    }
  }, "Rechenbeispiel // IT-Dienstleister"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-body)",
      fontSize: "15px",
      color: "var(--wl-text-soft)",
      lineHeight: 1.5
    }
  }, "5 Business-Kunden installiert ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-text-dim)"
    }
  }, "\xD7 99 \u20AC \xD7 35 %"), " = ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)",
      fontWeight: 600
    }
  }, "173 \u20AC / Monat passiv."), " Einmal eingerichtet \u2014 Sentinel sch\xFCtzt, du verdienst.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    withArrow: true,
    href: "../partner/index.html"
  }, "Partner werden")))));
}
function Faq() {
  const narrow = useNarrow(820);
  return /*#__PURE__*/React.createElement("section", {
    id: "sn-faq",
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "0.55fr 1.45fr",
      gap: "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "FAQ // ehrliche Antworten"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "16px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-lg)",
      lineHeight: 1.05,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff"
    }
  }, "Brauche ich ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "das wirklich?"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement(FaqList, {
    items: S.FAQ
  }))));
}
function Waitlist({
  formRef,
  step,
  setStep
}) {
  const narrow = useNarrow(820);
  const STEPS = ["Edition", "Umfeld", "Kontakt"];
  const [tier, setTier] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  return /*#__PURE__*/React.createElement("section", {
    ref: formRef,
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px 120px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "1fr 0.95fr",
      gap: narrow ? "32px" : "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Warteliste // Early Access",
    title: "Sichere dir",
    accent: "fr\xFChen Zugang zu Sentinel.",
    lead: "Sentinel ist in der Beta. Sag uns, welche Edition zu dir passt \u2014 du erf\xE4hrst zuerst, wenn dein Zugang bereitsteht. Kostenlos und unverbindlich."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Fr\xFCher Zugang"
  }, "Beta-Pl\xE4tze sind begrenzt. Wartelisten-Mitglieder kommen zuerst rein."), /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Kein Risiko"
  }, "Keine Vorabkosten, keine Verpflichtung. Du entscheidest beim Launch."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)",
      borderTop: "2px solid var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "Sentinel // Zugang sichern")), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "22px",
      textTransform: "uppercase",
      color: "var(--wl-emerald)",
      textShadow: "0 0 18px rgba(16,185,129,0.35)"
    }
  }, "Auf der Warteliste \u2713"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--wl-text-muted)",
      fontSize: "14px",
      marginTop: "10px",
      lineHeight: 1.6
    }
  }, "Wir melden uns, sobald ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, tier || "Sentinel"), " in den Early Access geht."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "18px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => {
      setDone(false);
      setStep(0);
    }
  }, "Weitere Edition"))) : /*#__PURE__*/React.createElement(FunnelStepper, {
    steps: STEPS,
    current: step,
    onStepClick: setStep
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    }
  }, step === 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Welche Edition?",
    required: true,
    hint: "Du kannst sp\xE4ter wechseln \u2014 das hilft uns nur bei der Priorisierung."
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: tier,
    onChange: v => {
      setTier(v);
      setTimeout(next, 180);
    },
    columns: 1,
    options: S.TIERS.map(t => ({
      value: "Sentinel " + t.name,
      label: "Sentinel " + t.name + " · " + t.price + " € · " + t.audience
    }))
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true,
    withArrow: true,
    disabled: !tier,
    onClick: next
  }, "Weiter")) : null, step === 1 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Wie viele Ger\xE4te / Endpunkte?",
    required: true
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: undefined,
    onChange: () => setTimeout(next, 180),
    columns: 3,
    options: [{
      value: "s",
      label: "1–2"
    }, {
      value: "m",
      label: "3–10"
    }, {
      value: "l",
      label: "10+"
    }]
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Einsatzumfeld",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Bitte w\xE4hlen"), /*#__PURE__*/React.createElement("option", null, "Privat / Zuhause"), /*#__PURE__*/React.createElement("option", null, "Freelancer / Homeoffice"), /*#__PURE__*/React.createElement("option", null, "Praxis / Kanzlei"), /*#__PURE__*/React.createElement("option", null, "KMU mit Server"), /*#__PURE__*/React.createElement("option", null, "Unternehmen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    withArrow: true,
    onClick: next
  }, "Weiter"))) : null, step === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Dein Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Vorname Nachname",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Firma (optional)"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Firmenname"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true
  }, "Jetzt sch\xFCtzen")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      textAlign: "center"
    }
  }, "\u2713 Kostenlos & unverbindlich \xB7 jederzeit widerrufbar")) : null))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      background: "rgba(5,5,5,0.7)",
      padding: "48px 24px 80px",
      color: "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "14px",
      textTransform: "uppercase",
      color: "var(--wl-text-soft)"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Sentinel"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "sentinel@wasteland-interactive.de"), /*#__PURE__*/React.createElement("span", null, "Leverkusen \xB7 NRW"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \xB7 Beta"))));
}
function Sentinel() {
  const [step, setStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toCta = () => formRef.current && formRef.current.scrollIntoView({
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "sn-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "var(--wl-bg-pure)"
    }
  }, /*#__PURE__*/React.createElement(AmbientField, {
    scrollTargetId: "sn-scroll"
  }), /*#__PURE__*/React.createElement(ScrollProgress, {
    scrollTargetId: "sn-scroll"
  }), /*#__PURE__*/React.createElement(CursorGlow, null), /*#__PURE__*/React.createElement(TopNav, {
    onCta: toCta
  }), /*#__PURE__*/React.createElement(Hero, {
    onCta: toCta
  }), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Audiences, null), /*#__PURE__*/React.createElement(Pricing, {
    onCta: toCta
  }), /*#__PURE__*/React.createElement(Compare, null), /*#__PURE__*/React.createElement(Technology, null), /*#__PURE__*/React.createElement(Reseller, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Waitlist, {
    formRef: formRef,
    step: step,
    setStep: setStep
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(StickyBar, {
    scrollTargetId: "sn-scroll",
    showAfter: 620,
    message: "Sentinel ist in der Beta \u2014 sichere dir fr\xFChen Zugang ab 14 \u20AC/Monat.",
    ctaLabel: "Jetzt sch\xFCtzen",
    onCta: toCta
  }), /*#__PURE__*/React.createElement(ExitIntentModal, {
    eyebrow: "Bevor du gehst //",
    title: "Sentinel-Zugang sichern."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 18px",
      fontSize: "13px",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Trag dich ein und sei beim Early Access dabei \u2014 kostenlos, unverbindlich, Pl\xE4tze begrenzt."), /*#__PURE__*/React.createElement(FormField, {
    label: "E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true,
    onClick: toCta
  }, "Auf die Warteliste")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Sentinel, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sentinel/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Wasteland Interactive — Marketing Website UI Kit
   Interactive homepage recreation. Composes design-system primitives
   from the compiled bundle. Exposes window.WLWebsite for index.html. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button,
  FAB,
  Label,
  StatusBadge,
  Tag,
  ScannerLog,
  MotionCard,
  ServiceCard,
  PricingCard,
  StatTile,
  ConnectLink,
  BenefitCard,
  Input,
  Textarea,
  Select,
  FormField,
  OptionGrid,
  SectionShell,
  SectionHeading,
  Reveal,
  FunnelStepper,
  LogoStrip,
  AmbientField
} = WL;

/* ── data ─────────────────────────────────────────────────── */
const NAV = ["Leistungen", "Pakete", "Referenzen", "Prozess", "Kontakt"];
const SERVICES = [{
  num: "01",
  tag: "Conversion-fokussiert",
  title: "Webseiten",
  body: "Verkaufsstarke Business-Webseiten mit klarer Positionierung, starken Texten und sauberen Conversion-Pfaden.",
  bullets: ["Basic 599 €", "Standard 899 €", "Premium 1.299 €"]
}, {
  num: "02",
  tag: "Weniger Routine",
  title: "Automatisierung",
  body: "Formulare, E-Mail, CRM und interne Routinen verbunden — weniger manuell kopieren, prüfen und nachfassen.",
  bullets: ["n8n / Make / Zapier", "CRM-Integration", "E-Mail & Lead-Routing"]
}, {
  num: "03",
  tag: "Maßgeschneidert",
  title: "Software & KI",
  body: "Passgenaue Lösungen für Teams, Datenflüsse und KI-gestützte Prozesse. Wenn Standard nicht mehr reicht.",
  bullets: ["KI-Agenten & Assistenten", "Interne Tools", "API & Integrationen"]
}, {
  num: "04",
  tag: "Transparent & seriös",
  title: "Drohnen-Service",
  body: "Luftbilder, Objektübersichten und dokumentarische Aufnahmen für Immobilien, Dächer und PV-Anlagen.",
  bullets: ["Holystone C0-Klasse", "Foto & Doku-Clips", "A1/A3 zertifiziert · versichert"]
}];
const REFS = [{
  src: "../../assets/ref-musaservice-logo.webp",
  alt: "MusaService",
  height: "26px"
}, {
  src: "../../assets/ref-pzgrenbtl908-logo.webp",
  alt: "PzGrenBtl 908",
  height: "48px"
}];
const PACKAGES = [{
  index: "01",
  name: "Basic",
  price: "599 €",
  lead: "Hochwertige Landingpage, mobil optimiert, SSL-verschlüsselt.",
  features: ["Hochwertige Landingpage", "Mobil optimiert", "SSL-verschlüsselt"],
  cta: "Basic anfragen",
  popular: false
}, {
  index: "02",
  name: "Standard",
  price: "899 €",
  lead: "Corporate Website bis 5 Seiten, mobil optimiert, SEO-Grundsetup.",
  features: ["Corporate Website bis 5 Seiten", "Mobil optimiert", "SEO-Grundsetup"],
  cta: "Standard anfragen",
  popular: true
}, {
  index: "03",
  name: "Premium",
  price: "1.299 €",
  lead: "High-End Lösung, individuelle Features, maximale Performance.",
  features: ["Individuelle Features", "Maximale Performance", "Saubere technische Umsetzung"],
  cta: "Premium anfragen",
  popular: false
}];
const ADDONS = [["Cloud Hosting inkl. Backups", "+14,99 €/Monat"], ["Wartung, Sicherheit & Support", "+19,99 €/Monat"], ["SEO Professional", "einmalig 149 €"], ["Google My Business Setup", "99 €"], ["Content-Erstellung", "ab 99 €"]];

/* ── shared chrome ────────────────────────────────────────── */
function TopNav({
  onContact
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.getElementById("wl-scroll");
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 24);
    root.addEventListener("scroll", onScroll);
    return () => root.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      height: "72px",
      background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
      borderBottom: `1px solid ${scrolled ? "var(--wl-border)" : "transparent"}`,
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "var(--wl-transition)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "16px",
      textTransform: "uppercase",
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Interactive"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "28px"
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "var(--wl-text-muted)"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--wl-cyan)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--wl-text-muted)"
  }, n)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    withArrow: true,
    onClick: onContact
  }, "Erstgespr\xE4ch")));
}

/* ── sections ─────────────────────────────────────────────── */
function Hero({
  onContact
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
      background: "transparent",
      padding: "120px 24px 96px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "wl-grid-lines",
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatusBadge, {
    dot: "green"
  }, "Digital Systems Foundry \xB7 2021"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "24px 0 0",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "var(--wl-display-xl)",
      lineHeight: 1.02,
      textTransform: "uppercase",
      letterSpacing: "var(--wl-tracking-tighter)",
      color: "#fff",
      textWrap: "balance"
    }
  }, "Webseiten, Automatisierung & ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    },
    className: "wl-text-glow"
  }, "KI-Systeme")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      maxWidth: "34rem",
      fontSize: "var(--wl-text-lg)",
      lineHeight: 1.6,
      color: "var(--wl-text-muted)"
    }
  }, "Digitale Systeme f\xFCr Unternehmen, die wachsen wollen. In Tagen, nicht Monaten \u2014 sauber umgesetzt, ehrlich beraten."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "14px",
      marginTop: "32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    glow: true,
    withArrow: true,
    onClick: onContact
  }, "Kostenloses Erstgespr\xE4ch"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    withArrow: true,
    onClick: () => document.getElementById("wl-leistungen").scrollIntoView({
      behavior: "smooth"
    })
  }, "Leistungen ansehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginTop: "16px",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-emerald)"
    }
  }, "\u2713 Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("span", null, "\u2713 Antwort in 24h"), /*#__PURE__*/React.createElement("span", null, "\u2713 Made in NRW"))), /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "System-Status // Live"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement(ScannerLog, {
    lines: [{
      text: "Audit-Engine initialisiert",
      tone: "active"
    }, {
      text: "Performance: 100/100",
      tone: "success"
    }, {
      text: "DSGVO & BFSG: konform",
      tone: "success"
    }, {
      text: "Lead-Pipeline V2 aktiv",
      tone: "muted"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginTop: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "React"), /*#__PURE__*/React.createElement(Tag, null, "n8n"), /*#__PURE__*/React.createElement(Tag, null, "KI-Agenten"), /*#__PURE__*/React.createElement(Tag, {
    tone: "gold"
  }, "Made in DE")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: "var(--wl-container)",
      margin: "56px auto 0",
      paddingTop: "32px",
      borderTop: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(LogoStrip, {
    align: "left",
    label: "Im Einsatz bei",
    logos: REFS
  })));
}
function Services({
  active,
  setActive
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "wl-leistungen",
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Leistungen 01-04",
    title: "Ein Business-Auftritt mit",
    accent: "Wirkung, nicht nur Optik.",
    lead: "Vier Kernleistungen. Kombinierbar. Skalierbar. Jede so geplant, dass sie sauber und nachvollziehbar umgesetzt werden kann."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      border: "1px solid var(--wl-border)"
    }
  }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.num,
    delay: i * 90,
    style: {
      borderRight: i % 2 === 0 ? "1px solid var(--wl-border)" : "none",
      borderBottom: i < 2 ? "1px solid var(--wl-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setActive(i),
    style: {
      cursor: "pointer",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, _extends({}, s, {
    style: {
      border: "none",
      height: "100%",
      background: active === i ? "var(--wl-surface)" : "transparent"
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      border: "1px solid var(--wl-border)",
      borderTop: "none",
      marginTop: "48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Projekte seit",
    value: "2021"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Launch-Speed",
    count: 7,
    suffix: " Tage"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Core Services",
    count: 4,
    prefix: "0"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StatTile, {
    label: "Made in",
    value: "DE"
  })))));
}
function Pricing({
  onContact
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "rgba(3,5,7,0.62)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Pakete // Preislogik",
    title: "Transparente Preise.",
    accent: "Klare Pakete, klare Add-ons.",
    lead: "Die Website-Pakete sind bewusst einfach gehalten. Zusatzleistungen kommen nur dazu, wenn sie wirklich sinnvoll sind."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      border: "1px solid var(--wl-border)"
    }
  }, PACKAGES.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.name,
    delay: i * 90,
    style: {
      borderRight: i < 2 ? "1px solid var(--wl-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement(PricingCard, _extends({}, p, {
    href: "#",
    style: {
      border: "none",
      height: "100%"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "48px",
      border: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--wl-border)",
      padding: "16px 24px"
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Optionale Add-ons")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)"
    }
  }, ADDONS.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a[0],
    style: {
      borderRight: i < 4 ? "1px solid var(--wl-border)" : "none",
      padding: "24px",
      minHeight: "96px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "var(--wl-text-soft)"
    }
  }, a[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "16px",
      fontFamily: "var(--wl-font-display)",
      fontWeight: 700,
      fontSize: "13px",
      color: "var(--wl-cyan)"
    }
  }, a[1])))))));
}
function Contact({
  formRef
}) {
  const STEPS = ["Leistung", "Kontakt", "Projekt"];
  const [step, setStep] = React.useState(0);
  const [svc, setSvc] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  return /*#__PURE__*/React.createElement("section", {
    ref: formRef,
    style: {
      position: "relative",
      background: "rgba(0,0,0,0.55)",
      padding: "96px 24px",
      borderBottom: "1px solid var(--wl-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 0.9fr",
      gap: "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "Kontakt // Erstgespr\xE4ch",
    title: "Bereit f\xFCr den n\xE4chsten",
    accent: "digitalen Schritt?",
    lead: "Ein ehrliches Erstgespr\xE4ch: aktuelle Situation, Ziele, sinnvolle n\xE4chste Schritte \u2014 und welche L\xF6sung wirklich passt."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Antwort in 24h"
  }, "Kein Funnel-Limbo \u2014 wir melden uns pers\xF6nlich, meist am selben Werktag."), /*#__PURE__*/React.createElement(BenefitCard, {
    title: "Launch in 7 Tagen"
  }, "Schlanke Einstiege gehen schnell live. Gr\xF6\xDFere Systeme planen wir sauber."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement(MotionCard, {
    pad: "lg",
    active: true,
    style: {
      background: "var(--wl-surface-2)",
      borderTop: "2px solid var(--wl-cyan)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement(Label, {
    tone: "cyan"
  }, "System-Konfigurator")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "20px",
      textTransform: "uppercase",
      color: "var(--wl-emerald)",
      textShadow: "0 0 18px rgba(16,185,129,0.35)"
    }
  }, "Anfrage gesendet \u2713"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--wl-text-muted)",
      fontSize: "14px",
      marginTop: "8px"
    }
  }, "Wir melden uns innerhalb von 24 Stunden \u2014 werktags meist schneller."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => {
      setSent(false);
      setStep(0);
    }
  }, "Neue Anfrage"))) : /*#__PURE__*/React.createElement(FunnelStepper, {
    steps: STEPS,
    current: step,
    onStepClick: setStep
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, step === 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Welche Leistung interessiert Sie?",
    required: true,
    hint: "Ein Klick gen\xFCgt \u2014 Details kommen sp\xE4ter."
  }, /*#__PURE__*/React.createElement(OptionGrid, {
    value: svc,
    onChange: v => {
      setSvc(v);
      setTimeout(next, 180);
    },
    columns: 2,
    options: [{
      value: "web",
      label: "Webseite"
    }, {
      value: "auto",
      label: "Automatisierung"
    }, {
      value: "ki",
      label: "Software & KI"
    }, {
      value: "drohne",
      label: "Drohnen-Service"
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    full: true,
    withArrow: true,
    disabled: !svc,
    onClick: next
  }, "Weiter")) : null, step === 1 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Ihr Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Vorname Nachname",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Ihre E-Mail-Adresse",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "name@firma.de",
    required: true
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Firma (optional)"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Firmenname"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    withArrow: true,
    onClick: next
  }, "Weiter"))) : null, step === 2 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
    label: "Worum geht es?",
    required: true,
    hint: "Kurz das Ziel \u2014 wir bereiten das Gespr\xE4ch vor."
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 4,
    placeholder: "Projektidee, aktueller Stand, Wunschtermin...",
    autoFocus: true,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: back
  }, "Zur\xFCck"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    full: true,
    glow: true,
    withArrow: true
  }, "Anfrage absenden")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontFamily: "var(--wl-font-mono)",
      fontSize: "10px",
      letterSpacing: "0.04em",
      color: "var(--wl-text-dim)",
      textAlign: "center"
    }
  }, "\u2713 Kostenlos & unverbindlich \xB7 keine Verpflichtung")) : null))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      background: "rgba(5,5,5,0.7)",
      padding: "48px 24px",
      color: "var(--wl-text-dim)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--wl-container)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-display)",
      fontWeight: 900,
      fontSize: "14px",
      textTransform: "uppercase",
      color: "var(--wl-text-soft)"
    }
  }, "Wasteland ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--wl-cyan)"
    }
  }, "//"), " Interactive"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--wl-font-mono)",
      fontSize: "11px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, "info@wasteland-interactive.de"), /*#__PURE__*/React.createElement("span", null, "Leverkusen \xB7 NRW"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026"))));
}
function Website() {
  const [active, setActive] = React.useState(1);
  const formRef = React.useRef(null);
  const toContact = () => formRef.current && formRef.current.scrollIntoView({
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "wl-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "var(--wl-bg-pure)"
    }
  }, /*#__PURE__*/React.createElement(AmbientField, {
    scrollTargetId: "wl-scroll"
  }), /*#__PURE__*/React.createElement(TopNav, {
    onContact: toContact
  }), /*#__PURE__*/React.createElement(Hero, {
    onContact: toContact
  }), /*#__PURE__*/React.createElement(Services, {
    active: active,
    setActive: setActive
  }), /*#__PURE__*/React.createElement(Pricing, {
    onContact: toContact
  }), /*#__PURE__*/React.createElement(Contact, {
    formRef: formRef
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(FAB, {
    label: "Audit sichern",
    href: "#"
  }));
}
window.WLWebsite = Website;

/* mount */
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Website, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FAB = __ds_scope.FAB;

__ds_ns.AmbientField = __ds_scope.AmbientField;

__ds_ns.CursorGlow = __ds_scope.CursorGlow;

__ds_ns.LogoStrip = __ds_scope.LogoStrip;

__ds_ns.NetworkSphere = __ds_scope.NetworkSphere;

__ds_ns.ScrollProgress = __ds_scope.ScrollProgress;

__ds_ns.WireCube = __ds_scope.WireCube;

__ds_ns.BenefitCard = __ds_scope.BenefitCard;

__ds_ns.ConnectLink = __ds_scope.ConnectLink;

__ds_ns.MotionCard = __ds_scope.MotionCard;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.TiltCard = __ds_scope.TiltCard;

__ds_ns.ExitIntentModal = __ds_scope.ExitIntentModal;

__ds_ns.StickyBar = __ds_scope.StickyBar;

__ds_ns.FaqList = __ds_scope.FaqList;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.ScannerLog = __ds_scope.ScannerLog;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.FunnelStepper = __ds_scope.FunnelStepper;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.OptionGrid = __ds_scope.OptionGrid;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.SectionShell = __ds_scope.SectionShell;

})();
