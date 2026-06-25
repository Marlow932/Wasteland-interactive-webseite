/* Wasteland Interactive — Lead Engine UI Kit
   Lead-gen landing + waitlist funnel. (Product renamed from
   "Lead Maschine" → "Lead Engine".) Self-mounts into #root.
   Uses design-system primitives from the bundle + conversion
   helpers (Reveal, FunnelStepper, LogoStrip) from ../_conversion.jsx. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button, Label, StatusBadge, Tag, MotionCard, BenefitCard, StatTile,
  Input, Select, FormField, OptionGrid, SectionHeading,
  Reveal, FunnelStepper, LogoStrip, AmbientField,
} = WL;

const REFS = [
  { src: "../../assets/ref-musaservice-logo.webp", alt: "MusaService", height: "24px" },
  { src: "../../assets/ref-pzgrenbtl908-logo.webp", alt: "PzGrenBtl 908", height: "44px" },
];

const STEPS_HOW = [
  { num: "01", title: "Wunschkunden-Scan", body: "Wir scannen deine Zielregion nach passenden B2B-Betrieben — nach Branche, Größe und Standort. Verifiziert und bereinigt.", tags: ["Branche", "Region", "Firmengröße"] },
  { num: "02", title: "KI-Personalisierung", body: "Jede Erstansprache wird individuell formuliert — auf Betrieb und Anlass zugeschnitten. Kein generischer Spam.", tags: ["GPT-Modelle", "Tonalität", "DSGVO-konform"] },
  { num: "03", title: "Automatischer Outreach", body: "Versand, Follow-ups und Antwort-Routing laufen automatisch über deine Domain. Du sprichst nur noch mit Interessenten.", tags: ["E-Mail-Sequenzen", "Follow-up", "CRM-Sync"] },
];

/* ── Live lead-scanner terminal (entrance + replay animation) ── */
function LeadScanner() {
  const TARGET = 900;
  const LINES = [
    { text: "Zielregion geladen: Düsseldorf + 40 km", tone: "active" },
    { text: "Branchenfilter: Handwerk, B2B-Dienstleister", tone: "muted" },
    { text: "1.284 Betriebe erfasst", tone: "muted" },
    { text: "Duplikate & inaktive bereinigt", tone: "muted" },
    { text: "KI-Personalisierung vorbereitet", tone: "active" },
    { text: "900 verifizierte Leads bereit", tone: "success" },
  ];
  const ref = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  const run = React.useCallback(() => {
    setRunning(true);
    setCount(0);
    setVisible(0);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setCount(TARGET); setVisible(LINES.length); setRunning(false); return; }
    let li = 0;
    const lineTimer = setInterval(() => {
      li += 1;
      setVisible(li);
      if (li >= LINES.length) clearInterval(lineTimer);
    }, 420);
    let start;
    const tick = (t) => {
      if (start == null) start = t;
      const p = Math.min((t - start) / 2400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * TARGET));
      if (p < 1) requestAnimationFrame(tick);
      else setRunning(false);
    };
    requestAnimationFrame(tick);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
  }, [run]);

  return (
    <div ref={ref}>
      <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)", borderTop: "2px solid var(--wl-cyan)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <Label tone="cyan">Wunschkunden-Scan // Live</Label>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--wl-font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: running ? "var(--wl-cyan)" : "var(--wl-text-dim)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "9999px", background: running ? "var(--wl-cyan)" : "var(--wl-emerald)", boxShadow: "0 0 8px currentColor", animation: running ? "wl-pulse 1.2s infinite" : "none" }} />
            {running ? "Scan läuft" : "Bereit"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", paddingBottom: "16px", borderBottom: "1px solid var(--wl-border)", marginBottom: "16px" }}>
          <span style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "3rem", lineHeight: 1, color: "var(--wl-cyan)", textShadow: "var(--wl-text-glow)" }}>{count.toLocaleString("de-DE")}</span>
          <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-dim)" }}>verifizierte Leads</span>
        </div>

        <div style={{ background: "var(--wl-surface-3)", border: "1px solid var(--wl-border)", borderLeft: "2px solid var(--wl-cyan)", padding: "14px 16px", fontFamily: "var(--wl-font-mono)", fontSize: "12px", lineHeight: 1.7, minHeight: "150px" }}>
          {LINES.slice(0, visible).map((ln, i) => (
            <div key={i} style={{ color: ln.tone === "success" ? "var(--wl-emerald)" : ln.tone === "active" ? "var(--wl-cyan)" : "var(--wl-text-muted)", textShadow: ln.tone === "success" ? "0 0 8px rgba(16,185,129,0.3)" : "none", marginBottom: "4px" }}>
              {ln.tone === "active" ? "> " : ln.tone === "success" ? "✓ " : ">> "}{ln.text}
            </div>
          ))}
          {running ? <span style={{ color: "var(--wl-cyan)", animation: "wl-pulse 1s infinite" }}>▋</span> : null}
        </div>

        <div style={{ marginTop: "16px" }}>
          <Button variant="ghost" size="sm" disabled={running} onClick={run}>{running ? "Scan läuft…" : "Scan erneut starten"}</Button>
        </div>
      </MotionCard>
    </div>
  );
}

/* ── chrome ───────────────────────────────────────────────── */
function TopNav({ onJoin }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", height: "72px", background: "rgba(5,5,5,0.85)", borderBottom: "1px solid var(--wl-border)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "15px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#fff" }}>
        Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Lead Engine
      </div>
      <Button size="sm" withArrow onClick={onJoin}>Auf die Warteliste</Button>
    </header>
  );
}

function Hero({ onJoin }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", background: "transparent", padding: "100px 24px 80px", borderBottom: "1px solid var(--wl-border)" }}>
      <span aria-hidden="true" className="wl-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <span aria-hidden="true" style={{ position: "absolute", left: "-12rem", top: "-4rem", width: "32rem", height: "32rem", borderRadius: "9999px", filter: "blur(64px)", opacity: 0.6, background: "radial-gradient(circle, rgba(0,240,255,0.16) 0%, transparent 65%)", animation: "wl-ambient-drift 20s var(--wl-ease-soft) infinite alternate" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: "-10rem", top: "2rem", width: "30rem", height: "30rem", borderRadius: "9999px", filter: "blur(64px)", opacity: 0.5, background: "radial-gradient(circle, rgba(26,48,102,0.30) 0%, transparent 66%)", animation: "wl-ambient-drift 24s var(--wl-ease-soft) infinite alternate" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "48px", alignItems: "center" }}>
        <div>
          <StatusBadge dot="cyan">Early Access · Warteliste offen</StatusBadge>
          <h1 style={{ margin: "24px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-xl)", lineHeight: 1.02, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff", textWrap: "balance" }}>
            Deine <span style={{ color: "var(--wl-cyan)" }} className="wl-text-glow">Lead Engine</span> für planbaren B2B-Vertrieb
          </h1>
          <p style={{ margin: "24px 0 0", maxWidth: "34rem", fontSize: "var(--wl-text-lg)", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
            Vollautomatische Lead-Generierung & KI-Outreach. Sie scannt deine Wunschkunden, schreibt personalisiert an und übergibt dir nur die Antworten.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <Button variant="primary" glow withArrow onClick={onJoin}>Auf die Warteliste</Button>
            <Button variant="ghost" withArrow onClick={() => document.getElementById("le-how").scrollIntoView({ behavior: "smooth" })}>So funktioniert's</Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--wl-emerald)" }}>✓ Kostenlos eintragen</span>
            <span>✓ DSGVO-konform</span>
            <span>✓ Made in NRW</span>
          </div>
        </div>
        <LeadScanner />
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "48px auto 0", paddingTop: "32px", borderTop: "1px solid var(--wl-border)" }}>
        <LogoStrip align="left" label="Bereits im Einsatz bei" logos={REFS} />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="le-how" style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Pipeline // 01-03" title="Drei Schritte." accent="Dann läuft sie von allein." lead="Einmal eingerichtet, läuft die Lead Engine im Hintergrund. Du bekommst Antworten, keine Aufgabenliste." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid var(--wl-border)" }}>
          {STEPS_HOW.map((s, i) => (
            <Reveal key={s.num} delay={i * 100} style={{ borderRight: i < 2 ? "1px solid var(--wl-border)" : "none" }}>
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--wl-font-mono)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", color: "var(--wl-cyan)", marginBottom: "20px" }}>{s.num}</div>
                <h3 style={{ margin: "0 0 12px", fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "1.4rem", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" }}>{s.title}</h3>
                <p style={{ margin: "0 0 20px", fontSize: "var(--wl-text-sm)", lineHeight: 1.625, color: "var(--wl-text-muted)" }}>{s.body}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
                  {s.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid var(--wl-border)", borderTop: "none" }}>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Pro Scan" count={900} prefix="bis " /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Setup" count={7} suffix=" Tage" /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Routine/Woche" value="0 h" /></div>
          <div><StatTile label="DSGVO" value="Konform" /></div>
        </div>
      </div>
    </section>
  );
}

function Waitlist({ formRef, joinStep, setJoinStep }) {
  const STEPS = ["Ziel", "Kontakt", "Bestätigen"];
  const [region, setRegion] = React.useState("");
  const [branche, setBranche] = React.useState("");
  const [done, setDone] = React.useState(false);
  const next = () => setJoinStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setJoinStep((s) => Math.max(s - 1, 0));

  return (
    <section ref={formRef} style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.95fr", gap: "48px", alignItems: "start" }}>
        <Reveal>
          <SectionHeading label="Warteliste // Early Access" title="Sichere dir deinen" accent="Platz in der Lead Engine." lead="Wir öffnen die Lead Engine schrittweise für ausgewählte Regionen und Branchen. Trag dich ein — du erfährst zuerst, wenn dein Zugang bereitsteht." />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            <BenefitCard title="Kein Risiko">Kostenlose, unverbindliche Eintragung. Kein Abo, keine Verpflichtung.</BenefitCard>
            <BenefitCard title="Regional begrenzt">Pro Region nehmen wir nur wenige Betriebe auf — keine Konkurrenz aus deinem Markt im selben Funnel.</BenefitCard>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)", borderTop: "2px solid var(--wl-cyan)" }}>
            <div style={{ marginBottom: "20px" }}><Label tone="cyan">Lead Engine // Zugang anfragen</Label></div>
            {done ? (
              <div style={{ padding: "28px 0", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "22px", textTransform: "uppercase", color: "var(--wl-emerald)", textShadow: "0 0 18px rgba(16,185,129,0.35)" }}>Du stehst auf der Warteliste ✓</div>
                <p style={{ color: "var(--wl-text-muted)", fontSize: "14px", marginTop: "10px", lineHeight: 1.6 }}>Wir prüfen Verfügbarkeit für <span style={{ color: "var(--wl-cyan)" }}>{region || "deine Region"}</span> und melden uns, sobald dein Zugang bereitsteht.</p>
                <div style={{ marginTop: "18px" }}><Button variant="ghost" onClick={() => { setDone(false); setJoinStep(0); }}>Weitere Region eintragen</Button></div>
              </div>
            ) : (
              <FunnelStepper steps={STEPS} current={joinStep} onStepClick={setJoinStep}>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                  {joinStep === 0 ? (
                    <div>
                      <FormField label="Zielregion / Stadt" required hint="Wo sollen deine Wunschkunden sitzen?">
                        <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="z. B. Düsseldorf, Köln, Bochum" autoFocus required />
                      </FormField>
                      <FormField label="Zielbranche" required>
                        <OptionGrid value={branche} onChange={(v) => { setBranche(v); setTimeout(next, 180); }} columns={2} options={[
                          { value: "handwerk", label: "Handwerk" }, { value: "dienst", label: "B2B-Dienstleister" },
                          { value: "immo", label: "Immobilien" }, { value: "other", label: "Andere" },
                        ]} />
                      </FormField>
                      <Button variant="ghost" full withArrow disabled={!region || !branche} onClick={next}>Weiter</Button>
                    </div>
                  ) : null}
                  {joinStep === 1 ? (
                    <div>
                      <FormField label="Dein Name" required><Input placeholder="Vorname Nachname" autoFocus required /></FormField>
                      <FormField label="Firma" required><Input placeholder="Firmenname" required /></FormField>
                      <FormField label="E-Mail-Adresse" required><Input type="email" placeholder="name@firma.de" required /></FormField>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Button variant="ghost" onClick={back}>Zurück</Button>
                        <Button variant="primary" full withArrow onClick={next}>Weiter</Button>
                      </div>
                    </div>
                  ) : null}
                  {joinStep === 2 ? (
                    <div>
                      <div style={{ border: "1px solid var(--wl-border)", padding: "16px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {[["Region", region || "—"], ["Branche", branche || "—"], ["Monatl. Lead-Ziel", "bis 900"], ["Setup", "7 Tage"]].map((r) => (
                          <div key={r[0]} style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--wl-font-mono)", fontSize: "12px" }}>
                            <span style={{ color: "var(--wl-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{r[0]}</span>
                            <span style={{ color: "var(--wl-text-soft)" }}>{r[1]}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Button variant="ghost" onClick={back}>Zurück</Button>
                        <Button variant="primary" full glow withArrow>Jetzt eintragen</Button>
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
    <footer style={{ position: "relative", background: "rgba(5,5,5,0.7)", padding: "48px 24px", color: "var(--wl-text-dim)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "14px", textTransform: "uppercase", color: "var(--wl-text-soft)" }}>
          Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Lead Engine
        </div>
        <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span>info@wasteland-interactive.de</span>
          <span>Leverkusen · NRW</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

function LeadEngine() {
  const [joinStep, setJoinStep] = React.useState(0);
  const formRef = React.useRef(null);
  const toJoin = () => formRef.current && formRef.current.scrollIntoView({ behavior: "smooth" });
  return (
    <div id="le-scroll" style={{ height: "100vh", overflowY: "auto", background: "var(--wl-bg-pure)" }}>
      <AmbientField scrollTargetId="le-scroll" />
      <TopNav onJoin={toJoin} />
      <Hero onJoin={toJoin} />
      <HowItWorks />
      <Waitlist formRef={formRef} joinStep={joinStep} setJoinStep={setJoinStep} />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LeadEngine />);
