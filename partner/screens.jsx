/* Wasteland Interactive — Partner UI Kit
   Partner-programme landing + application funnel. Showcases the 3D
   components (TiltCard tiers, WireCube hero motif) and conversion
   overlays (StickyBar, ExitIntentModal). Self-mounts into #root.
   Loads design-system primitives from the bundle + ../_conversion.js. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button, Label, StatusBadge, Tag, MotionCard, BenefitCard, StatTile,
  Input, Select, FormField, OptionGrid, SectionHeading,
  Reveal, FunnelStepper, LogoStrip, TiltCard, WireCube, NetworkSphere, StickyBar, ExitIntentModal, AmbientField,
} = WL;

const REFS = [
  { src: "../../assets/ref-musaservice-logo.webp", alt: "MusaService", height: "24px" },
  { src: "../../assets/ref-pzgrenbtl908-logo.webp", alt: "PzGrenBtl 908", height: "44px" },
];

const MODELS = [
  { index: "01", name: "Empfehlungsgeber", provision: "20 %", period: "wiederkehrend / Monat", lead: "Du empfiehlst, wir setzen um. Du bekommst 20 % — jeden Monat, solange dein Kunde bleibt.", tags: ["Keine Akquise", "Passives Einkommen"], featured: false },
  { index: "02", name: "Vertriebspartner", provision: "30 %", period: "wiederkehrend / Monat", lead: "Aktiver Vertrieb mit vollem Support & Leads. 30 % auf jede Zahlung — dauerhaft, solange der Kunde bleibt. Inklusive kostenlosem Zugang zur Lead Engine.", tags: ["Lead Engine gratis", "Co-Branding", "Prio-Support"], featured: true },
  { index: "03", name: "IT-Dienstleister", provision: "35 %", period: "wiederkehrend / Monat", lead: "Du installierst und betreust selbst. 35 % auf jede Zahlung — plus White-Label-Option, um unter deiner Marke zu liefern.", tags: ["Installiert + betreut", "White-Label möglich"], featured: false },
];

const HOW = [
  { num: "01", title: "Bewerben", body: "Kurzprofil senden — wir prüfen den Fit und melden uns innerhalb von 24h." },
  { num: "02", title: "Onboarding", body: "Materialien, Schulung und Zugänge. In 7 Tagen startklar — ohne technisches Vorwissen." },
  { num: "03", title: "Wiederkehrende Provision", body: "Du vermittelst, wir liefern sauber ab — und du verdienst jeden Monat aufs Neue, solange dein Kunde bleibt. Transparente, monatliche Auszahlung." },
];

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({ onApply }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", height: "72px", background: "rgba(5,5,5,0.85)", borderBottom: "1px solid var(--wl-border)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "15px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#fff" }}>
        Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Partner
      </div>
      <Button size="sm" withArrow onClick={onApply}>Jetzt bewerben</Button>
    </header>
  );
}

function Hero({ onApply }) {
  const narrow = useNarrow(820);
  return (
    <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", background: "transparent", padding: "100px 24px 80px", borderBottom: "1px solid var(--wl-border)" }}>
      <span aria-hidden="true" className="wl-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <span aria-hidden="true" style={{ position: "absolute", left: "-12rem", top: "-4rem", width: "32rem", height: "32rem", borderRadius: "9999px", filter: "blur(64px)", opacity: 0.55, background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 65%)", animation: "wl-ambient-drift 20s var(--wl-ease-soft) infinite alternate" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "1.05fr 0.95fr", gap: narrow ? "32px" : "48px", alignItems: "center" }}>
        <div>
          <StatusBadge dot="cyan">Partnerprogramm · Bewerbung offen</StatusBadge>
          <h1 style={{ margin: "24px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-xl)", lineHeight: 1.02, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff", textWrap: "balance" }}>
            Werde <span style={{ color: "var(--wl-cyan)" }} className="wl-text-glow">Wasteland-Partner</span>
          </h1>
          <p style={{ margin: "24px 0 0", maxWidth: "34rem", fontSize: "var(--wl-text-lg)", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
            Verdiene an digitalen Systemen, ohne sie selbst zu bauen — inklusive dem Sentinel-Sicherheitssystem im Abo. Du bringst die Beziehung, wir liefern. Deine Provision läuft jeden Monat weiter, solange dein Kunde bleibt.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <Button variant="primary" glow withArrow onClick={onApply}>Jetzt bewerben</Button>
            <Button variant="ghost" withArrow onClick={() => document.getElementById("pt-models").scrollIntoView({ behavior: "smooth" })}>Modelle ansehen</Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--wl-emerald)" }}>✓ Kein Risiko</span>
            <span>✓ Monatliche Auszahlung</span>
            <span>✓ Onboarding in 7 Tagen</span>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "340px" }}>
          <span aria-hidden="true" style={{ position: "absolute", width: "22rem", height: "22rem", borderRadius: "9999px", filter: "blur(60px)", background: "radial-gradient(circle, rgba(0,240,255,0.18), transparent 68%)" }} />
          <div aria-hidden="true"><NetworkSphere size={340} count={104} /></div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "48px auto 0", paddingTop: "32px", borderTop: "1px solid var(--wl-border)" }}>
        <LogoStrip align="left" label="Partner liefern an" logos={REFS} />
      </div>
    </section>
  );
}

function Models({ onApply }) {
  const narrow = useNarrow(820);
  return (
    <section id="pt-models" style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Modelle // 01-03" title="Drei Wege," accent="eine wiederkehrende Provision." lead="Vom lockeren Empfehlungsgeber bis zum IT-Dienstleister mit White-Label. In jedem Modell verdienst du Monat für Monat mit — solange dein Kunde bleibt." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)", gap: "24px" }}>
          {MODELS.map((m, i) => (
            <Reveal key={m.index} delay={i * 100}>
              <TiltCard pad="lg" style={{ height: "100%" }}>
                {m.featured ? <div style={{ display: "inline-block", marginBottom: "12px", background: "var(--wl-cyan)", color: "#000", padding: "4px 8px", fontFamily: "var(--wl-font-mono)", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Beliebt</div> : null}
                <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "var(--wl-label)", letterSpacing: "0.2em", color: "var(--wl-cyan)", marginBottom: "8px" }}>{m.index}</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" }}>{m.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", paddingBottom: "16px", marginBottom: "16px", borderBottom: "1px solid var(--wl-border)" }}>
                  <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "2rem", lineHeight: 1, color: "var(--wl-cyan)" }}>{m.provision}</span>
                  <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wl-text-dim)" }}>{m.period}</span>
                </div>
                <p style={{ margin: "0 0 20px", fontSize: "13px", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>{m.lead}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>{m.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                <Button variant={m.featured ? "primary" : "ghost"} full withArrow onClick={onApply}>{m.name} werden</Button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const narrow = useNarrow(820);
  return (
    <section style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Ablauf // 01-03" title="So läuft die" accent="Partnerschaft." lead="Transparent, schnell, ohne Kleingedrucktes. Du startest in einer Woche." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(3,1fr)", border: "1px solid var(--wl-border)" }}>
          {HOW.map((s, i) => (
            <Reveal key={s.num} delay={i * 100} style={{ borderRight: !narrow && i < 2 ? "1px solid var(--wl-border)" : "none", borderBottom: narrow && i < 2 ? "1px solid var(--wl-border)" : "none" }}>
              <div style={{ padding: "32px", height: "100%" }}>
                <div style={{ fontFamily: "var(--wl-font-mono)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", color: "var(--wl-cyan)", marginBottom: "20px" }}>{s.num}</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "var(--wl-text-sm)", lineHeight: 1.625, color: "var(--wl-text-muted)" }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "repeat(2,1fr)" : "repeat(4,1fr)", border: "1px solid var(--wl-border)", borderTop: "none" }}>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Provision" count={35} prefix="bis " suffix=" %" /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Auszahlung" value="Monatl." /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Onboarding" count={7} suffix=" Tage" /></div>
          <div><StatTile label="Modelle" count={3} prefix="0" /></div>
        </div>
        <Reveal><EarningsCalc /></Reveal>
      </div>
    </section>
  );
}

/* ── interactive recurring-earnings calculator ─────────────── */
const RATE = 0.30; // Vertriebspartner-Provision (wiederkehrend)
const TIER_PRICE = { home: 14, server: 189, enterprise: 449 };
const TIER_META = {
  home: { label: "Sentinel Home", sub: "14 € · pro Gerät", color: "var(--wl-sentinel-home)", rgb: "70,227,90", max: 60 },
  server: { label: "Sentinel Server", sub: "189 € · pro Server", color: "var(--wl-sentinel-server)", rgb: "46,197,255", max: 40 },
  enterprise: { label: "Sentinel Enterprise", sub: "449 € · Plattform", color: "var(--wl-sentinel-enterprise)", rgb: "165,103,245", max: 25 },
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

function TierSlider({ tierKey, value, onChange }) {
  const m = TIER_META[tierKey];
  const monthly = value * TIER_PRICE[tierKey] * RATE;
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <span style={{ width: "8px", height: "8px", flexShrink: 0, background: m.color, boxShadow: `0 0 8px rgba(${m.rgb},0.6)` }} />
          <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", color: "#fff", whiteSpace: "nowrap" }}>{m.label}</span>
          <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", color: "var(--wl-text-dim)", whiteSpace: "nowrap" }}>{m.sub}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "12px", color: m.color }}>{value} Kd.</span>
          <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "15px", color: "#fff" }}>+{monthly.toLocaleString("de-DE", { maximumFractionDigits: 0 })} €</span>
        </div>
      </div>
      <input
        type="range" min="0" max={m.max} value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        aria-label={m.label + " Kunden"}
        style={{ width: "100%", accentColor: m.color, cursor: "pointer", height: "4px" }}
      />
    </div>
  );
}

function EarningsCalc() {
  const narrow = useNarrow(760);
  const [counts, setCounts] = React.useState({ home: 20, server: 10, enterprise: 5 });
  const set = (k) => (v) => setCounts((c) => ({ ...c, [k]: v }));
  const monthly = Object.keys(counts).reduce((sum, k) => sum + counts[k] * TIER_PRICE[k] * RATE, 0);
  const yearly = monthly * 12;
  const totalCustomers = counts.home + counts.server + counts.enterprise;

  const presets = [
    { label: "Nebenbei", v: { home: 8, server: 3, enterprise: 1 } },
    { label: "Solides Plus", v: { home: 20, server: 10, enterprise: 5 } },
    { label: "Davon leben", v: { home: 40, server: 22, enterprise: 12 } },
  ];

  const fmt = (n) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

  return (
    <div style={{ marginTop: "24px", border: "1px solid var(--wl-border)", borderTop: "2px solid var(--wl-cyan)", background: "var(--wl-surface-2)" }}>
      <div style={{ padding: narrow ? "20px" : "28px 32px", display: "grid", gridTemplateColumns: narrow ? "1fr" : "1.25fr 0.75fr", gap: narrow ? "24px" : "40px", alignItems: "center" }}>
        {/* left: sliders */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wl-cyan)" }}>Verdienst-Rechner // 30 % wiederkehrend</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {presets.map((p) => (
                <button key={p.label} type="button" onClick={() => setCounts(p.v)}
                  style={{ fontFamily: "var(--wl-font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wl-text-soft)", background: "transparent", border: "1px solid var(--wl-border-20)", padding: "5px 8px", cursor: "pointer", borderRadius: "var(--wl-radius)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--wl-cyan)"; e.currentTarget.style.color = "var(--wl-cyan)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--wl-border-20)"; e.currentTarget.style.color = "var(--wl-text-soft)"; }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <TierSlider tierKey="home" value={counts.home} onChange={set("home")} />
          <TierSlider tierKey="server" value={counts.server} onChange={set("server")} />
          <TierSlider tierKey="enterprise" value={counts.enterprise} onChange={set("enterprise")} />
          <p style={{ margin: "14px 0 0", fontFamily: "var(--wl-font-body)", fontSize: "12px", lineHeight: 1.5, color: "var(--wl-text-dim)" }}>
            {totalCustomers} Kunden, einmal gewonnen — die Provision läuft <span style={{ color: "var(--wl-text-soft)" }}>jeden Monat weiter</span>, solange sie bleiben. Kein erneuter Verkauf nötig.
          </p>
        </div>
        {/* right: result */}
        <div style={{ textAlign: narrow ? "left" : "right", borderTop: narrow ? "1px solid var(--wl-border)" : "none", borderLeft: narrow ? "none" : "1px solid var(--wl-border)", paddingTop: narrow ? "20px" : 0, paddingLeft: narrow ? 0 : "32px" }}>
          <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--wl-text-dim)", marginBottom: "10px" }}>Dein Einkommen / Monat</div>
          <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 3.5rem)", lineHeight: 1, color: "var(--wl-cyan)", textShadow: "var(--wl-text-glow)" }}>
            {fmt(monthly)} €
          </div>
          <div style={{ marginTop: "12px", fontFamily: "var(--wl-font-mono)", fontSize: "13px", color: "var(--wl-text-soft)" }}>
            = {fmt(yearly)} € / Jahr
          </div>
          <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "var(--wl-cyan-05)", border: "1px solid var(--wl-cyan-30)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "var(--wl-emerald)", boxShadow: "0 0 8px var(--wl-emerald)" }} />
            <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--wl-emerald)" }}>Wiederkehrend · planbar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Apply({ formRef, step, setStep }) {
  const narrow = useNarrow(820);
  const STEPS = ["Modell", "Reichweite", "Kontakt"];
  const [model, setModel] = React.useState("");
  const [reach, setReach] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  return (
    <section ref={formRef} style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px 120px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: narrow ? "1fr" : "1fr 0.95fr", gap: narrow ? "32px" : "48px", alignItems: "start" }}>
        <Reveal>
          <SectionHeading label="Bewerbung // Partner werden" title="Bewirb dich in" accent="60 Sekunden." lead="Erzähl uns kurz, wer du bist und welches Modell dich reizt. Wir prüfen den Fit und melden uns innerhalb von 24 Stunden." />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            <BenefitCard title="Unverbindlich">Eine Bewerbung ist kein Vertrag. Wir klären erst gemeinsam, ob es passt.</BenefitCard>
            <BenefitCard title="Lead Engine gratis">Als Vertriebspartner bekommst du kostenlosen Zugang zur Lead Engine — für deine eigene Akquise.</BenefitCard>
            <BenefitCard title="Persönlich geprüft">Kein anonymer Funnel — wir schauen uns jede Bewerbung selbst an.</BenefitCard>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)", borderTop: "2px solid var(--wl-cyan)" }}>
            <div style={{ marginBottom: "20px" }}><Label tone="cyan">Partner // Bewerbung</Label></div>
            {done ? (
              <div style={{ padding: "28px 0", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "22px", textTransform: "uppercase", color: "var(--wl-emerald)", textShadow: "0 0 18px rgba(16,185,129,0.35)" }}>Bewerbung eingegangen ✓</div>
                <p style={{ color: "var(--wl-text-muted)", fontSize: "14px", marginTop: "10px", lineHeight: 1.6 }}>Wir prüfen deinen Fit für das <span style={{ color: "var(--wl-cyan)" }}>{model || "Partner"}</span>-Modell und melden uns in 24h.</p>
                <div style={{ marginTop: "18px" }}><Button variant="ghost" onClick={() => { setDone(false); setStep(0); }}>Neue Bewerbung</Button></div>
              </div>
            ) : (
              <FunnelStepper steps={STEPS} current={step} onStepClick={setStep}>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                  {step === 0 ? (
                    <div>
                      <FormField label="Welches Modell reizt dich?" required hint="Unsicher? Wir beraten dich.">
                        <OptionGrid value={model} onChange={(v) => { setModel(v); setTimeout(next, 180); }} columns={2} options={[
                          { value: "Empfehlung", label: "Empfehlungsgeber" }, { value: "Vertrieb", label: "Vertriebspartner" },
                          { value: "White-Label", label: "White-Label" }, { value: "Unsicher", label: "Noch unsicher" },
                        ]} />
                      </FormField>
                      <Button variant="ghost" full withArrow disabled={!model} onClick={next}>Weiter</Button>
                    </div>
                  ) : null}
                  {step === 1 ? (
                    <div>
                      <FormField label="Wie groß ist dein Netzwerk?" required>
                        <OptionGrid value={reach} onChange={(v) => { setReach(v); setTimeout(next, 180); }} columns={3} options={[
                          { value: "klein", label: "< 50" }, { value: "mittel", label: "50–500" }, { value: "gross", label: "500+" },
                        ]} />
                      </FormField>
                      <FormField label="Deine Branche / dein Markt" required>
                        <Select defaultValue="">
                          <option value="" disabled>Bitte wählen</option>
                          <option>Agentur / Marketing</option>
                          <option>Beratung / Coaching</option>
                          <option>Handwerk / Bau</option>
                          <option>IT / Software</option>
                          <option>Andere</option>
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
                      <FormField label="Firma / Marke" required><Input placeholder="Firmenname" required /></FormField>
                      <FormField label="E-Mail-Adresse" required><Input type="email" placeholder="name@firma.de" required /></FormField>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Button variant="ghost" onClick={back}>Zurück</Button>
                        <Button variant="primary" full glow withArrow>Bewerbung absenden</Button>
                      </div>
                      <p style={{ margin: "12px 0 0", fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", textAlign: "center" }}>✓ Unverbindlich · persönlich geprüft · Antwort in 24h</p>
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
          Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Partner
        </div>
        <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span>partner@wasteland-interactive.de</span>
          <span>Leverkusen · NRW</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

function Partner() {
  const [step, setStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toApply = () => formRef.current && formRef.current.scrollIntoView({ behavior: "smooth" });
  return (
    <div id="pt-scroll" style={{ height: "100vh", overflowY: "auto", background: "var(--wl-bg-pure)" }}>
      <AmbientField scrollTargetId="pt-scroll" />
      <TopNav onApply={toApply} />
      <Hero onApply={toApply} />
      <Models onApply={toApply} />
      <HowItWorks />
      <Apply formRef={formRef} step={step} setStep={setStep} />
      <Footer />
      <StickyBar scrollTargetId="pt-scroll" showAfter={520}
        message="Partner werden — bis 35 % wiederkehrende Provision, jeden Monat."
        ctaLabel="Jetzt bewerben" onCta={toApply} />
      <ExitIntentModal eyebrow="Bevor du gehst //" title="Lohnt sich dein Netzwerk?">
        <p style={{ margin: "0 0 18px", fontSize: "13px", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
          Lass uns kurz rechnen, was dein Netzwerk als Wasteland-Partner wert ist. Trag dich ein — unverbindlich.
        </p>
        <FormField label="E-Mail-Adresse" required><Input type="email" placeholder="name@firma.de" /></FormField>
        <Button variant="primary" full glow withArrow onClick={() => { toApply(); }}>Partner-Infos anfordern</Button>
      </ExitIntentModal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Partner />);
