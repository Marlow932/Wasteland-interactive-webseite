/* Wasteland Interactive — Sentinel Home · Product Website
   Full content per the client Content Brief (5 tiers, audiences, problem,
   how-it-works, competitor comparison, technology, reseller, FAQ).
   Data in ./data.js (window.SENTINEL). Conversion/3D helpers from
   ../_conversion.js. Self-mounts into #root. Honest status: Beta,
   Linux/Windows live, macOS in Arbeit → CTA führt zur Early-Access-Warteliste. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const S = window.SENTINEL;
const {
  Button, Label, StatusBadge, Tag, MotionCard, BenefitCard, StatTile, ScannerLog,
  Input, Select, FormField, OptionGrid, SectionHeading,
  Reveal, FunnelStepper, TiltCard, NetworkSphere, StickyBar, ExitIntentModal,
  AmbientField, ScrollProgress, CursorGlow, FaqList,
} = WL;

const EUR = (n) => n.toLocaleString("de-DE");

function useNarrow(bp) {
  const [n, setN] = React.useState(typeof window !== "undefined" && window.innerWidth < bp);
  React.useEffect(() => {
    const on = () => setN(window.innerWidth < bp);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bp]);
  return n;
}

const Cell = ({ v, color }) => {
  if (v === true) return <span style={{ color: color || "var(--wl-cyan)", fontWeight: 700 }}>✓</span>;
  if (v === false) return <span style={{ color: "var(--wl-text-faint)" }}>—</span>;
  return <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", color: "var(--wl-text-soft)" }}>{v}</span>;
};

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({ onCta }) {
  const links = [["Editionen", "sn-pricing"], ["So funktioniert's", "sn-how"], ["Vergleich", "sn-compare"], ["FAQ", "sn-faq"]];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", height: "72px", background: "rgba(5,5,5,0.82)", borderBottom: "1px solid var(--wl-border)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "15px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#fff" }}>
        Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Sentinel
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ display: "flex", gap: "22px" }} className="sn-navlinks">
          {links.map(([t, id]) => (
            <a key={id} href="#" onClick={(e) => { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--wl-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wl-cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wl-text-muted)")}>{t}</a>
          ))}
        </div>
        <Button size="sm" withArrow onClick={onCta}>Jetzt schützen</Button>
      </nav>
    </header>
  );
}

function Hero({ onCta }) {
  const narrow = useNarrow(900);
  return (
    <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", background: "transparent", padding: "100px 24px 80px", borderBottom: "1px solid var(--wl-border)" }}>
      <span aria-hidden="true" className="wl-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "1.05fr 0.95fr", gap: narrow ? "40px" : "48px", alignItems: "center" }}>
        <div>
          <StatusBadge dot="cyan">Beta · Linux & Windows · macOS in Arbeit</StatusBadge>
          <h1 style={{ margin: "24px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-xl)", lineHeight: 1.02, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff", textWrap: "balance" }}>
            Der erste Einbruch kostet alles. <span style={{ color: "var(--wl-cyan)" }} className="wl-text-glow">Sentinel kostet 14 €.</span>
          </h1>
          <p style={{ margin: "24px 0 0", maxWidth: "36rem", fontSize: "var(--wl-text-lg)", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
            Ein Ransomware-Angriff kostet im Schnitt 4.500 € Schaden und Wochen Ausfallzeit. Sentinel erkennt den Angriff, isoliert dein Netzwerk und erstellt automatisch den forensischen Bericht — bevor du überhaupt weißt, dass jemand versucht hat einzubrechen.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <Button variant="primary" glow withArrow onClick={onCta}>Jetzt schützen</Button>
            <Button variant="ghost" withArrow onClick={() => document.getElementById("sn-pricing").scrollIntoView({ behavior: "smooth" })}>Editionen ansehen</Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--wl-emerald)" }}>✓ Kein Cloud-Zwang</span>
            <span>✓ DSGVO-konform</span>
            <span>✓ Made in Germany</span>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "360px" }}>
          <span aria-hidden="true" style={{ position: "absolute", width: "24rem", height: "24rem", borderRadius: "9999px", filter: "blur(60px)", background: "radial-gradient(circle, rgba(0,240,255,0.16), transparent 68%)" }} />
          <div aria-hidden="true"><NetworkSphere size={narrow ? 280 : 340} count={104} /></div>
          <span style={{ position: "absolute", top: "8%", left: "12%", filter: "drop-shadow(0 0 14px var(--wl-sentinel-home-glow))" }}><img src="../../assets/sentinel-home.png" alt="" style={{ height: "50px" }} /></span>
          <span style={{ position: "absolute", bottom: "10%", left: "6%", filter: "drop-shadow(0 0 14px var(--wl-sentinel-server-glow))" }}><img src="../../assets/sentinel-server.png" alt="" style={{ height: "44px" }} /></span>
          <span style={{ position: "absolute", top: "16%", right: "6%", filter: "drop-shadow(0 0 14px var(--wl-sentinel-enterprise-glow))" }}><img src="../../assets/sentinel-enterprise.png" alt="" style={{ height: "46px" }} /></span>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Das Risiko // real" title="Was passiert, wenn du" accent="nicht geschützt bist." lead="Antivirus allein stoppt moderne Angriffe nicht. Ein einziger erfolgreicher Einbruch trifft Daten, Betrieb und Haftung gleichzeitig." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid var(--wl-border)" }} className="sn-stat-grid">
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Ø Schaden Ransomware" count={4500} suffix=" €" /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Ausfallzeit" value="Wochen" /></div>
          <div><StatTile label="Sentinel reagiert in" value="Sekunden" /></div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const narrow = useNarrow(820);
  return (
    <section id="sn-how" style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="So funktioniert's // 01-03" title="Erkennen." accent="Isolieren. Dokumentieren." lead="Drei Schritte, vollautomatisch. Du musst nichts überwachen — Sentinel handelt, während du arbeitest." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)", border: "1px solid var(--wl-border)" }}>
          {S.STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 100} style={{ borderRight: !narrow && i < 2 ? "1px solid var(--wl-border)" : "none", borderBottom: narrow && i < 2 ? "1px solid var(--wl-border)" : "none" }}>
              <div style={{ padding: "32px", height: "100%" }}>
                <div style={{ fontFamily: "var(--wl-font-mono)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", color: "var(--wl-cyan)", marginBottom: "18px" }}>{s.num}</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "var(--wl-text-sm)", lineHeight: 1.625, color: "var(--wl-text-muted)" }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audiences() {
  const narrow = useNarrow(820);
  return (
    <section style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Für wen // Zielgruppen" title="Gebaut für alle," accent="die etwas zu verlieren haben." lead="Vom privaten Rechner bis zum Firmenserver — dieselbe Engine, abgestimmt auf dein Risiko." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(2,1fr)", gap: "20px" }}>
          {S.AUDIENCES.map((a, i) => (
            <Reveal key={a.tag} delay={i * 90}>
              <TiltCard pad="lg" style={{ height: "100%" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: a.color }} aria-hidden="true" />
                <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "var(--wl-label)", letterSpacing: "0.18em", textTransform: "uppercase", color: a.color, marginBottom: "10px" }}>{a.tag}</div>
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1.25rem", textTransform: "uppercase", color: "#fff" }}>{a.title}</h3>
                <p style={{ margin: 0, fontSize: "var(--wl-text-sm)", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>{a.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ onCta }) {
  const narrow = useNarrow(960);
  return (
    <section id="sn-pricing" style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Editionen // 05 Pakete" title="Ein Preis für" accent="jede Größe." lead="Alle Pakete enthalten den vollen Echtzeit-Schutz, Honeypot-Erkennung und automatische Netzwerk-Isolation. Höhere Tiers ergänzen Forensik, Dashboard und Server-Monitoring." />
        </Reveal>
        {narrow ? <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--wl-text-dim)", marginBottom: "10px" }}>→ Tabelle horizontal wischen</div> : null}
        <div style={{ overflowX: "auto", border: "1px solid var(--wl-border)" }}>
          <table style={{ width: "100%", minWidth: "780px", borderCollapse: "collapse", fontFamily: "var(--wl-font-body)" }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", left: 0, zIndex: 2, background: "var(--wl-surface-2)", textAlign: "left", padding: "20px", borderBottom: "1px solid var(--wl-border)", borderRight: "1px solid var(--wl-border)", minWidth: "200px", verticalAlign: "bottom" }}>
                  <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--wl-text-dim)" }}>Leistung // Paket</span>
                </th>
                {S.TIERS.map((t) => (
                  <th key={t.key} style={{ padding: "20px 16px", borderBottom: "1px solid var(--wl-border)", borderRight: "1px solid var(--wl-border)", textAlign: "center", background: t.popular ? "rgba(0,240,255,0.05)" : "transparent", borderTop: t.popular ? "2px solid var(--wl-cyan)" : "none", minWidth: "130px", verticalAlign: "bottom" }}>
                    {t.popular ? <div style={{ marginBottom: "8px", fontFamily: "var(--wl-font-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000", background: "var(--wl-cyan)", padding: "3px 6px", display: "inline-block" }}>Beliebt</div> : null}
                    <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "1.1rem", textTransform: "uppercase", color: S.C[t.key] }}>{t.name}</div>
                    <div style={{ marginTop: "8px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: "3px" }}>
                      <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "1.9rem", color: "#fff" }}>{t.price}</span>
                      <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--wl-cyan)" }}>€</span>
                    </div>
                    <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--wl-text-dim)" }}>/ Monat</div>
                    <div style={{ marginTop: "6px", fontFamily: "var(--wl-font-mono)", fontSize: "9px", color: "var(--wl-text-soft)" }}>{t.devices}</div>
                    <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "9px", color: "var(--wl-text-dim)" }}>{t.audience}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {S.FEATURES.map((f, ri) => (
                <tr key={f.label} style={{ background: ri % 2 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                  <td style={{ position: "sticky", left: 0, zIndex: 1, background: ri % 2 ? "#070809" : "var(--wl-surface-3)", padding: "13px 20px", borderBottom: "1px solid var(--wl-border-05)", borderRight: "1px solid var(--wl-border)", fontSize: "13px", color: "var(--wl-text-soft)" }}>{f.label}</td>
                  {f.v.map((val, ci) => (
                    <td key={ci} style={{ padding: "13px 16px", textAlign: "center", borderBottom: "1px solid var(--wl-border-05)", borderRight: "1px solid var(--wl-border)", background: S.TIERS[ci].popular ? "rgba(0,240,255,0.03)" : "transparent" }}>
                      <Cell v={val} color={S.C[S.TIERS[ci].key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ position: "sticky", left: 0, background: "var(--wl-surface-2)", borderRight: "1px solid var(--wl-border)" }} />
                {S.TIERS.map((t) => (
                  <td key={t.key} style={{ padding: "18px 12px", textAlign: "center", borderRight: "1px solid var(--wl-border)", background: t.popular ? "rgba(0,240,255,0.05)" : "transparent" }}>
                    <Button size="sm" variant={t.popular ? "primary" : "ghost"} onClick={onCta}>Wählen</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ margin: "16px 0 0", fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--wl-text-dim)" }}>
          ✓ Alle aufgeführten Funktionen sind im jeweiligen Paket aktiv · Beta — Zugang aktuell über die Warteliste.
        </p>
      </div>
    </section>
  );
}

function Compare() {
  const c = S.COMPARE;
  const narrow = useNarrow(820);
  return (
    <section id="sn-compare" style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Vergleich // mehr als Antivirus" title="Warum Sentinel" accent="kein normales AV ist." lead="Klassische Antivirus-Suiten scannen Dateien. Sentinel verteidigt aktiv dein Netzwerk — und liefert den Beweis." />
        </Reveal>
        {narrow ? <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--wl-text-dim)", marginBottom: "10px" }}>→ Tabelle horizontal wischen</div> : null}
        <div style={{ overflowX: "auto", border: "1px solid var(--wl-border)" }}>
          <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "18px 20px", borderBottom: "1px solid var(--wl-border)", borderRight: "1px solid var(--wl-border)", minWidth: "190px" }} />
                {c.cols.map((col, i) => (
                  <th key={col} style={{ padding: "18px 16px", textAlign: "center", borderBottom: "1px solid var(--wl-border)", borderRight: "1px solid var(--wl-border)", background: i === c.highlight ? "rgba(0,240,255,0.05)" : "transparent", borderTop: i === c.highlight ? "2px solid var(--wl-cyan)" : "none" }}>
                    <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", color: i === c.highlight ? "var(--wl-cyan)" : "var(--wl-text-soft)" }}>{col}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, ri) => (
                <tr key={r.label} style={{ background: ri % 2 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                  <td style={{ padding: "14px 20px", borderBottom: "1px solid var(--wl-border-05)", borderRight: "1px solid var(--wl-border)", fontSize: "13px", color: "var(--wl-text-soft)" }}>{r.label}</td>
                  {r.v.map((val, ci) => (
                    <td key={ci} style={{ padding: "14px 16px", textAlign: "center", borderBottom: "1px solid var(--wl-border-05)", borderRight: "1px solid var(--wl-border)", background: ci === c.highlight ? "rgba(0,240,255,0.03)" : "transparent" }}>
                      <Cell v={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const narrow = useNarrow(820);
  return (
    <section style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "0.8fr 1.2fr", gap: "48px", alignItems: "start" }}>
        <Reveal>
          <Label tone="cyan">Unter der Haube // Technologie</Label>
          <h2 style={{ margin: "16px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-lg)", lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff" }}>
            Echte Verteidigung, <span style={{ color: "var(--wl-cyan)" }}>kein Marketing.</span>
          </h2>
          <p style={{ margin: "20px 0 0", fontSize: "var(--wl-text-base)", lineHeight: 1.625, color: "var(--wl-text-muted)" }}>
            Sentinel kombiniert bewährte Open-Threat-Intelligence mit aktiver Abwehr — lokal, ohne Cloud-Zwang, ohne Telemetrie.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "1fr 1fr", gap: "14px" }}>
          {S.TECH.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <BenefitCard title={t.name}>{t.body}</BenefitCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reseller() {
  const narrow = useNarrow(820);
  return (
    <section style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Partner // Reseller-Programm" title="Verdiene passiv —" accent="ohne Support-Aufwand." lead="Du vermittelst oder installierst, Sentinel schützt und wir liefern den Support. Deine Provision läuft monatlich weiter, solange dein Kunde bleibt." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)", gap: "20px" }}>
          {S.RESELLER.map((r, i) => (
            <Reveal key={r.model} delay={i * 90}>
              <TiltCard pad="lg" style={{ height: "100%" }}>
                {r.featured ? <div style={{ position: "absolute", left: 0, right: 0, top: "-1px", height: "2px", background: "var(--wl-cyan)" }} aria-hidden="true" /> : null}
                <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "var(--wl-label)", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--wl-text-dim)", marginBottom: "10px" }}>{r.desc}</div>
                <h3 style={{ margin: "0 0 16px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "1.3rem", textTransform: "uppercase", color: "#fff" }}>{r.model}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", paddingBottom: "16px", borderBottom: "1px solid var(--wl-border)", marginBottom: "16px" }}>
                  <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "2.6rem", lineHeight: 1, color: "var(--wl-cyan)" }}>{r.rate}</span>
                  <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--wl-cyan)" }}>%</span>
                  <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--wl-text-dim)", marginLeft: "4px" }}>wiederkehrend</span>
                </div>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.55, color: "var(--wl-text-soft)" }}>{r.example}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: "24px", border: "1px solid var(--wl-border)", borderTop: "2px solid var(--wl-cyan)", background: "var(--wl-surface-2)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wl-text-dim)", marginBottom: "8px" }}>Rechenbeispiel // IT-Dienstleister</div>
              <div style={{ fontFamily: "var(--wl-font-body)", fontSize: "15px", color: "var(--wl-text-soft)", lineHeight: 1.5 }}>
                5 Business-Kunden installiert <span style={{ color: "var(--wl-text-dim)" }}>× 99 € × 35 %</span> = <span style={{ color: "var(--wl-cyan)", fontWeight: 600 }}>173 € / Monat passiv.</span> Einmal eingerichtet — Sentinel schützt, du verdienst.
              </div>
            </div>
            <Button variant="ghost" withArrow href="../partner/index.html">Partner werden</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const narrow = useNarrow(820);
  return (
    <section id="sn-faq" style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "0.55fr 1.45fr", gap: "48px", alignItems: "start" }}>
        <Reveal>
          <Label tone="cyan">FAQ // ehrliche Antworten</Label>
          <h2 style={{ margin: "16px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-lg)", lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff" }}>
            Brauche ich <span style={{ color: "var(--wl-cyan)" }}>das wirklich?</span>
          </h2>
        </Reveal>
        <Reveal delay={100}><FaqList items={S.FAQ} /></Reveal>
      </div>
    </section>
  );
}

function Waitlist({ formRef, step, setStep }) {
  const narrow = useNarrow(820);
  const STEPS = ["Edition", "Umfeld", "Kontakt"];
  const [tier, setTier] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  return (
    <section ref={formRef} style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px 120px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "1fr 0.95fr", gap: narrow ? "32px" : "48px", alignItems: "start" }}>
        <Reveal>
          <SectionHeading label="Warteliste // Early Access" title="Sichere dir" accent="frühen Zugang zu Sentinel." lead="Sentinel ist in der Beta. Sag uns, welche Edition zu dir passt — du erfährst zuerst, wenn dein Zugang bereitsteht. Kostenlos und unverbindlich." />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            <BenefitCard title="Früher Zugang">Beta-Plätze sind begrenzt. Wartelisten-Mitglieder kommen zuerst rein.</BenefitCard>
            <BenefitCard title="Kein Risiko">Keine Vorabkosten, keine Verpflichtung. Du entscheidest beim Launch.</BenefitCard>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)", borderTop: "2px solid var(--wl-cyan)" }}>
            <div style={{ marginBottom: "20px" }}><Label tone="cyan">Sentinel // Zugang sichern</Label></div>
            {done ? (
              <div style={{ padding: "28px 0", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "22px", textTransform: "uppercase", color: "var(--wl-emerald)", textShadow: "0 0 18px rgba(16,185,129,0.35)" }}>Auf der Warteliste ✓</div>
                <p style={{ color: "var(--wl-text-muted)", fontSize: "14px", marginTop: "10px", lineHeight: 1.6 }}>Wir melden uns, sobald <span style={{ color: "var(--wl-cyan)" }}>{tier || "Sentinel"}</span> in den Early Access geht.</p>
                <div style={{ marginTop: "18px" }}><Button variant="ghost" onClick={() => { setDone(false); setStep(0); }}>Weitere Edition</Button></div>
              </div>
            ) : (
              <FunnelStepper steps={STEPS} current={step} onStepClick={setStep}>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                  {step === 0 ? (
                    <div>
                      <FormField label="Welche Edition?" required hint="Du kannst später wechseln — das hilft uns nur bei der Priorisierung.">
                        <OptionGrid value={tier} onChange={(v) => { setTier(v); setTimeout(next, 180); }} columns={1}
                          options={S.TIERS.map((t) => ({ value: "Sentinel " + t.name, label: "Sentinel " + t.name + " · " + t.price + " € · " + t.audience }))} />
                      </FormField>
                      <Button variant="ghost" full withArrow disabled={!tier} onClick={next}>Weiter</Button>
                    </div>
                  ) : null}
                  {step === 1 ? (
                    <div>
                      <FormField label="Wie viele Geräte / Endpunkte?" required>
                        <OptionGrid value={undefined} onChange={() => setTimeout(next, 180)} columns={3} options={[
                          { value: "s", label: "1–2" }, { value: "m", label: "3–10" }, { value: "l", label: "10+" },
                        ]} />
                      </FormField>
                      <FormField label="Einsatzumfeld" required>
                        <Select defaultValue="">
                          <option value="" disabled>Bitte wählen</option>
                          <option>Privat / Zuhause</option>
                          <option>Freelancer / Homeoffice</option>
                          <option>Praxis / Kanzlei</option>
                          <option>KMU mit Server</option>
                          <option>Unternehmen</option>
                        </Select>
                      </FormField>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Button variant="ghost" onClick={back}>Zurück</Button>
                        <Button variant="primary" full withArrow onClick={next}>Weiter</Button>
                      </div>
                    </div>
                  ) : null}
                  {step === 2 ? (
                    <div>
                      <FormField label="Dein Name" required><Input placeholder="Vorname Nachname" autoFocus required /></FormField>
                      <FormField label="E-Mail-Adresse" required><Input type="email" placeholder="name@firma.de" required /></FormField>
                      <FormField label="Firma (optional)"><Input placeholder="Firmenname" /></FormField>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Button variant="ghost" onClick={back}>Zurück</Button>
                        <Button variant="primary" full glow withArrow>Jetzt schützen</Button>
                      </div>
                      <p style={{ margin: "12px 0 0", fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", textAlign: "center" }}>✓ Kostenlos & unverbindlich · jederzeit widerrufbar</p>
                    </div>
                  ) : null}
                </form>
              </FunnelStepper>
            )}
          </MotionCard>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ position: "relative", background: "rgba(5,5,5,0.7)", padding: "48px 24px 80px", color: "var(--wl-text-dim)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "14px", textTransform: "uppercase", color: "var(--wl-text-soft)" }}>
          Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Sentinel
        </div>
        <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span>sentinel@wasteland-interactive.de</span>
          <span>Leverkusen · NRW</span>
          <span>© 2026 · Beta</span>
        </div>
      </div>
    </footer>
  );
}

function Sentinel() {
  const [step, setStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toCta = () => formRef.current && formRef.current.scrollIntoView({ behavior: "smooth" });
  return (
    <div id="sn-scroll" style={{ height: "100vh", overflowY: "auto", background: "var(--wl-bg-pure)" }}>
      <AmbientField scrollTargetId="sn-scroll" />
      <ScrollProgress scrollTargetId="sn-scroll" />
      <CursorGlow />
      <TopNav onCta={toCta} />
      <Hero onCta={toCta} />
      <Problem />
      <HowItWorks />
      <Audiences />
      <Pricing onCta={toCta} />
      <Compare />
      <Technology />
      <Reseller />
      <Faq />
      <Waitlist formRef={formRef} step={step} setStep={setStep} />
      <Footer />
      <StickyBar scrollTargetId="sn-scroll" showAfter={620}
        message="Sentinel ist in der Beta — sichere dir frühen Zugang ab 14 €/Monat."
        ctaLabel="Jetzt schützen" onCta={toCta} />
      <ExitIntentModal eyebrow="Bevor du gehst //" title="Sentinel-Zugang sichern.">
        <p style={{ margin: "0 0 18px", fontSize: "13px", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
          Trag dich ein und sei beim Early Access dabei — kostenlos, unverbindlich, Plätze begrenzt.
        </p>
        <FormField label="E-Mail-Adresse" required><Input type="email" placeholder="name@firma.de" /></FormField>
        <Button variant="primary" full glow withArrow onClick={toCta}>Auf die Warteliste</Button>
      </ExitIntentModal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Sentinel />);
