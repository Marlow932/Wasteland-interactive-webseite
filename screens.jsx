/* Wasteland Interactive — Marketing Website UI Kit
   Interactive homepage recreation. Composes design-system primitives
   from the compiled bundle. Exposes window.WLWebsite for index.html. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const {
  Button, FAB, Label, StatusBadge, Tag, ScannerLog, MotionCard,
  ServiceCard, PricingCard, StatTile, ConnectLink, BenefitCard,
  Input, Textarea, Select, FormField, OptionGrid, SectionShell, SectionHeading,
  Reveal, FunnelStepper, LogoStrip, AmbientField,
} = WL;

/* ── data ─────────────────────────────────────────────────── */
const NAV = ["Leistungen", "Pakete", "Referenzen", "Prozess", "Kontakt"];

const SERVICES = [
  { num: "01", tag: "Conversion-fokussiert", title: "Webseiten", body: "Verkaufsstarke Business-Webseiten mit klarer Positionierung, starken Texten und sauberen Conversion-Pfaden.", bullets: ["Basic 599 €", "Standard 899 €", "Premium 1.299 €"] },
  { num: "02", tag: "Weniger Routine", title: "Automatisierung", body: "Formulare, E-Mail, CRM und interne Routinen verbunden — weniger manuell kopieren, prüfen und nachfassen.", bullets: ["n8n / Make / Zapier", "CRM-Integration", "E-Mail & Lead-Routing"] },
  { num: "03", tag: "Maßgeschneidert", title: "Software & KI", body: "Passgenaue Lösungen für Teams, Datenflüsse und KI-gestützte Prozesse. Wenn Standard nicht mehr reicht.", bullets: ["KI-Agenten & Assistenten", "Interne Tools", "API & Integrationen"] },
  { num: "04", tag: "Transparent & seriös", title: "Drohnen-Service", body: "Luftbilder, Objektübersichten und dokumentarische Aufnahmen für Immobilien, Dächer und PV-Anlagen.", bullets: ["Holystone C0-Klasse", "Foto & Doku-Clips", "A1/A3 zertifiziert · versichert"] },
];

const REFS = [
  { src: "../../assets/ref-musaservice-logo.webp", alt: "MusaService", height: "26px" },
  { src: "../../assets/ref-pzgrenbtl908-logo.webp", alt: "PzGrenBtl 908", height: "48px" },
];

const PACKAGES = [
  { index: "01", name: "Basic", price: "599 €", lead: "Hochwertige Landingpage, mobil optimiert, SSL-verschlüsselt.", features: ["Hochwertige Landingpage", "Mobil optimiert", "SSL-verschlüsselt"], cta: "Basic anfragen", popular: false },
  { index: "02", name: "Standard", price: "899 €", lead: "Corporate Website bis 5 Seiten, mobil optimiert, SEO-Grundsetup.", features: ["Corporate Website bis 5 Seiten", "Mobil optimiert", "SEO-Grundsetup"], cta: "Standard anfragen", popular: true },
  { index: "03", name: "Premium", price: "1.299 €", lead: "High-End Lösung, individuelle Features, maximale Performance.", features: ["Individuelle Features", "Maximale Performance", "Saubere technische Umsetzung"], cta: "Premium anfragen", popular: false },
];

const ADDONS = [
  ["Cloud Hosting inkl. Backups", "+14,99 €/Monat"],
  ["Wartung, Sicherheit & Support", "+19,99 €/Monat"],
  ["SEO Professional", "einmalig 149 €"],
  ["Google My Business Setup", "99 €"],
  ["Content-Erstellung", "ab 99 €"],
];

/* ── shared chrome ────────────────────────────────────────── */
function TopNav({ onContact }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.getElementById("wl-scroll");
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 24);
    root.addEventListener("scroll", onScroll);
    return () => root.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px", height: "72px",
      background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
      borderBottom: `1px solid ${scrolled ? "var(--wl-border)" : "transparent"}`,
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "var(--wl-transition)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "16px", textTransform: "uppercase", letterSpacing: "-0.02em", color: "#fff" }}>
        Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Interactive
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {NAV.map((n) => (
          <a key={n} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wl-cyan)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wl-text-muted)")}>{n}</a>
        ))}
        <a href="/sentinel/" style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-muted)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wl-cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wl-text-muted)")}>Sentinel</a>
        <a href="/lead-engine/" style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-muted)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wl-cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wl-text-muted)")}>Lead Engine</a>
        <a href="/partner/" style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-muted)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wl-cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wl-text-muted)")}>Partner</a>
        <Button size="sm" withArrow onClick={onContact}>Erstgespräch</Button>
      </nav>
    </header>
  );
}

/* ── sections ─────────────────────────────────────────────── */
function Hero({ onContact }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", isolation: "isolate", background: "transparent", padding: "120px 24px 96px", borderBottom: "1px solid var(--wl-border)" }}>
      <span aria-hidden="true" className="wl-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.12 }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }}>
        <div>
          <StatusBadge dot="green">Digital Systems Foundry · 2021</StatusBadge>
          <h1 style={{ margin: "24px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "var(--wl-display-xl)", lineHeight: 1.02, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tighter)", color: "#fff", textWrap: "balance" }}>
            Webseiten, Automatisierung & <span style={{ color: "var(--wl-cyan)" }} className="wl-text-glow">KI-Systeme</span>
          </h1>
          <p style={{ margin: "24px 0 0", maxWidth: "34rem", fontSize: "var(--wl-text-lg)", lineHeight: 1.6, color: "var(--wl-text-muted)" }}>
            Digitale Systeme für Unternehmen, die wachsen wollen. In Tagen, nicht Monaten — sauber umgesetzt, ehrlich beraten.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px" }}>
            <Button variant="primary" glow withArrow onClick={onContact}>Kostenloses Erstgespräch</Button>
            <Button variant="ghost" withArrow onClick={() => document.getElementById("wl-leistungen").scrollIntoView({ behavior: "smooth" })}>Leistungen ansehen</Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", fontFamily: "var(--wl-font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", flexWrap: "wrap" }}>
            <span style={{ color: "var(--wl-emerald)" }}>✓ Kostenlos &amp; unverbindlich</span>
            <span>✓ Antwort in 24h</span>
            <span>✓ Made in NRW</span>
          </div>
        </div>
        <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)" }}>
          <Label tone="cyan">System-Status // Live</Label>
          <div style={{ marginTop: "16px" }}>
            <ScannerLog lines={[
              { text: "Audit-Engine initialisiert", tone: "active" },
              { text: "Performance: 100/100", tone: "success" },
              { text: "DSGVO & BFSG: konform", tone: "success" },
              { text: "Lead-Pipeline V2 aktiv", tone: "muted" },
            ]} />
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            <Tag>React</Tag><Tag>n8n</Tag><Tag>KI-Agenten</Tag><Tag tone="gold">Made in DE</Tag>
          </div>
        </MotionCard>
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--wl-container)", margin: "56px auto 0", paddingTop: "32px", borderTop: "1px solid var(--wl-border)" }}>
        <LogoStrip align="left" label="Im Einsatz bei" logos={REFS} />
      </div>
    </section>
  );
}

function Services({ active, setActive }) {
  return (
    <section id="wl-leistungen" style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Leistungen 01-04" title="Ein Business-Auftritt mit" accent="Wirkung, nicht nur Optik." lead="Vier Kernleistungen. Kombinierbar. Skalierbar. Jede so geplant, dass sie sauber und nachvollziehbar umgesetzt werden kann." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--wl-border)" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 90} style={{ borderRight: i % 2 === 0 ? "1px solid var(--wl-border)" : "none", borderBottom: i < 2 ? "1px solid var(--wl-border)" : "none" }}>
              <div onClick={() => setActive(i)} style={{ cursor: "pointer", height: "100%" }}>
                <ServiceCard {...s} style={{ border: "none", height: "100%", background: active === i ? "var(--wl-surface)" : "transparent" }} />
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid var(--wl-border)", borderTop: "none", marginTop: "48px" }}>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Projekte seit" value="2021" /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Launch-Speed" count={7} suffix=" Tage" /></div>
          <div style={{ borderRight: "1px solid var(--wl-border)" }}><StatTile label="Core Services" count={4} prefix="0" /></div>
          <div><StatTile label="Made in" value="DE" /></div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onContact }) {
  return (
    <section style={{ position: "relative", background: "rgba(3,5,7,0.62)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto" }}>
        <Reveal>
          <SectionHeading label="Pakete // Preislogik" title="Transparente Preise." accent="Klare Pakete, klare Add-ons." lead="Die Website-Pakete sind bewusst einfach gehalten. Zusatzleistungen kommen nur dazu, wenn sie wirklich sinnvoll sind." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: "1px solid var(--wl-border)" }}>
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} style={{ borderRight: i < 2 ? "1px solid var(--wl-border)" : "none" }}>
              <PricingCard {...p} href="#" style={{ border: "none", height: "100%" }} />
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: "48px", border: "1px solid var(--wl-border)" }}>
          <div style={{ borderBottom: "1px solid var(--wl-border)", padding: "16px 24px" }}><Label>Optionale Add-ons</Label></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
            {ADDONS.map((a, i) => (
              <div key={a[0]} style={{ borderRight: i < 4 ? "1px solid var(--wl-border)" : "none", padding: "24px", minHeight: "96px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--wl-text-soft)" }}>{a[0]}</span>
                <span style={{ marginTop: "16px", fontFamily: "var(--wl-font-display)", fontWeight: 700, fontSize: "13px", color: "var(--wl-cyan)" }}>{a[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ formRef }) {
  const STEPS = ["Leistung", "Kontakt", "Projekt"];
  const [step, setStep]       = React.useState(0);
  const [svc, setSvc]         = React.useState("");
  const [name, setName]       = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent]       = React.useState(false);
  const [error, setError]     = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: svc, name, email, company, message }),
      });
      if (res.ok) { setSent(true); }
      else { setError(true); }
    } catch (_) { setError(true); }
    finally { setLoading(false); }
  };

  return (
    <section ref={formRef} style={{ position: "relative", background: "rgba(0,0,0,0.55)", padding: "96px 24px", borderBottom: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: "48px", alignItems: "start" }}>
        <Reveal>
          <SectionHeading label="Kontakt // Erstgespräch" title="Bereit für den nächsten" accent="digitalen Schritt?" lead="Ein ehrliches Erstgespräch: aktuelle Situation, Ziele, sinnvolle nächste Schritte — und welche Lösung wirklich passt." />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            <BenefitCard title="Antwort in 24h">Kein Funnel-Limbo — wir melden uns persönlich, meist am selben Werktag.</BenefitCard>
            <BenefitCard title="Launch in 7 Tagen">Schlanke Einstiege gehen schnell live. Größere Systeme planen wir sauber.</BenefitCard>
          </div>
        </Reveal>
        <Reveal delay={120}>
        <MotionCard pad="lg" active style={{ background: "var(--wl-surface-2)", borderTop: "2px solid var(--wl-cyan)" }}>
          <div style={{ marginBottom: "20px" }}><Label tone="cyan">System-Konfigurator</Label></div>
          {sent ? (
            <div style={{ padding: "32px 0", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "20px", textTransform: "uppercase", color: "var(--wl-emerald)", textShadow: "0 0 18px rgba(16,185,129,0.35)" }}>Anfrage gesendet ✓</div>
              <p style={{ color: "var(--wl-text-muted)", fontSize: "14px", marginTop: "8px" }}>Wir melden uns innerhalb von 24 Stunden — werktags meist schneller.</p>
              <div style={{ marginTop: "16px" }}><Button variant="ghost" onClick={() => { setSent(false); setStep(0); setSvc(""); setName(""); setEmail(""); setCompany(""); setMessage(""); }}>Neue Anfrage</Button></div>
            </div>
          ) : (
            <FunnelStepper steps={STEPS} current={step} onStepClick={setStep}>
              <form onSubmit={submit}>
                {step === 0 ? (
                  <div>
                    <FormField label="Welche Leistung interessiert Sie?" required hint="Ein Klick genügt — Details kommen später.">
                      <OptionGrid value={svc} onChange={(v) => { setSvc(v); setTimeout(next, 180); }} columns={2} options={[
                        { value: "Webseite", label: "Webseite" }, { value: "Automatisierung", label: "Automatisierung" },
                        { value: "Software & KI", label: "Software & KI" }, { value: "Drohnen-Service", label: "Drohnen-Service" },
                      ]} />
                    </FormField>
                    <Button variant="ghost" full withArrow disabled={!svc} onClick={next}>Weiter</Button>
                  </div>
                ) : null}
                {step === 1 ? (
                  <div>
                    <FormField label="Ihr Name" required><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Vorname Nachname" autoFocus required /></FormField>
                    <FormField label="Ihre E-Mail-Adresse" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@firma.de" required /></FormField>
                    <FormField label="Firma (optional)"><Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Firmenname" /></FormField>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <Button variant="ghost" onClick={back}>Zurück</Button>
                      <Button variant="primary" full withArrow disabled={!name || !email} onClick={next}>Weiter</Button>
                    </div>
                  </div>
                ) : null}
                {step === 2 ? (
                  <div>
                    <FormField label="Worum geht es?" required hint="Kurz das Ziel — wir bereiten das Gespräch vor.">
                      <Textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Projektidee, aktueller Stand, Wunschtermin..." autoFocus required />
                    </FormField>
                    {error && <p style={{ color: "var(--wl-red, #f87171)", fontFamily: "var(--wl-font-mono)", fontSize: "11px", marginBottom: "10px" }}>Fehler beim Senden — bitte direkt an info@wasteland-interactive.de schreiben.</p>}
                    <div style={{ display: "flex", gap: "12px" }}>
                      <Button variant="ghost" onClick={back}>Zurück</Button>
                      <Button type="submit" variant="primary" full glow withArrow disabled={!message || loading}>{loading ? "Wird gesendet…" : "Anfrage absenden"}</Button>
                    </div>
                    <p style={{ margin: "12px 0 0", fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.04em", color: "var(--wl-text-dim)", textAlign: "center" }}>
                      ✓ Kostenlos &amp; unverbindlich · keine Verpflichtung
                    </p>
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
  const linkStyle = { color: "var(--wl-text-dim)", textDecoration: "none", transition: "color 0.2s" };
  return (
    <footer style={{ position: "relative", background: "rgba(5,5,5,0.7)", padding: "48px 24px", color: "var(--wl-text-dim)", borderTop: "1px solid var(--wl-border)" }}>
      <div style={{ maxWidth: "var(--wl-container)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Top row: Brand + Produkte + Rechtliches */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <div style={{ fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "16px", textTransform: "uppercase", color: "var(--wl-text-soft)", marginBottom: "12px" }}>
              Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Interactive
            </div>
            <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "11px", lineHeight: "1.8" }}>
              <div>info@wasteland-interactive.de</div>
              <div>Leverkusen · NRW</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--wl-text-muted)", marginBottom: "10px" }}>Produkte</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--wl-font-mono)", fontSize: "12px" }}>
                <a href="/sentinel/" style={linkStyle}>Sentinel Home</a>
                <a href="/lead-engine/" style={linkStyle}>Lead Engine</a>
                <a href="/partner/" style={linkStyle}>Partner werden</a>
                <a href="/connect/" style={linkStyle}>Wasteland Connect</a>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--wl-text-muted)", marginBottom: "10px" }}>Rechtliches</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "var(--wl-font-mono)", fontSize: "12px" }}>
                <a href="/impressum.html" style={linkStyle}>Impressum</a>
                <a href="/datenschutz.html" style={linkStyle}>Datenschutz</a>
                <a href="/agb.html" style={linkStyle}>AGB</a>
                <a href="/widerruf.html" style={linkStyle}>Widerruf</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ borderTop: "1px solid var(--wl-border)", paddingTop: "16px", fontFamily: "var(--wl-font-mono)", fontSize: "11px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span>© 2026 Wasteland Interactive · Alle Rechte vorbehalten</span>
          <span style={{ color: "var(--wl-text-muted)" }}>Leverkusen, NRW</span>
        </div>
      </div>
    </footer>
  );
}

function Website() {
  const [active, setActive] = React.useState(1);
  const formRef = React.useRef(null);
  const toContact = () => formRef.current && formRef.current.scrollIntoView({ behavior: "smooth" });
  return (
    <div id="wl-scroll" style={{ height: "100vh", overflowY: "auto", background: "var(--wl-bg-pure)" }}>
      <AmbientField scrollTargetId="wl-scroll" />
      <TopNav onContact={toContact} />
      <Hero onContact={toContact} />
      <Services active={active} setActive={setActive} />
      <Pricing onContact={toContact} />
      <Contact formRef={formRef} />
      <Footer />
      <FAB label="Audit sichern" href="#" />
    </div>
  );
}

window.WLWebsite = Website;

/* mount */
ReactDOM.createRoot(document.getElementById("root")).render(<Website />);
