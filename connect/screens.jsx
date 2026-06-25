/* Wasteland Interactive — Connect (link-in-bio / QR landing) UI Kit
   Single-screen scanner page. Self-mounts into #root. */
const WL = window.WastelandInteractiveDesignSystem_24d9fb;
const { ConnectLink, Label } = WL;

const LINKS = [
  { label: "Lead Maschine", text: "Vollautomatische B2B Lead Generierung & KI Outreach", featured: true },
  { label: "Partner", text: "Vertriebspartner werden & gemeinsam wachsen", featured: true },
  { label: "Lösungen NRW", text: "Digitale Lösungen für Unternehmen in NRW" },
  { label: "KI & Tech", text: "KI-Systeme, Automationen & digitale Infrastruktur" },
  { label: "Drohnen", text: "Luftaufnahmen, Immobilien, Inspektionen & Events" },
  { label: "Leistungen", text: "Webseiten, Systeme & digitale Services" },
  { label: "Referenzen", text: "Projekte, Ergebnisse & Kundenbeispiele" },
  { label: "Kontakt", text: "Direkt Anfrage stellen" },
];

function Connect() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "var(--wl-bg-pure)", color: "#fff", padding: "32px 20px" }}>
      {/* atmosphere */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.14), transparent 32%), radial-gradient(circle at 80% 82%, rgba(0,54,74,0.42), transparent 36%)" }} />
      <div aria-hidden="true" className="wl-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />
      <div aria-hidden="true" className="wl-accent-line wl-accent-line--cyan" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <section style={{ position: "relative", zIndex: 1, maxWidth: "36rem", margin: "0 auto", minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <Label tone="cyan" slash={false}>SCAN // CONNECT</Label>
          <h1 style={{ margin: "16px 0 0", fontFamily: "var(--wl-font-display)", fontWeight: 900, fontSize: "2.5rem", lineHeight: 1, textTransform: "uppercase", letterSpacing: "var(--wl-tracking-tight)", color: "#fff" }}>
            Wasteland <span style={{ color: "var(--wl-cyan)" }}>//</span> Interactive
          </h1>
          <p style={{ margin: "16px auto 0", maxWidth: "24rem", fontSize: "var(--wl-text-sm)", lineHeight: 1.625, color: "var(--wl-text-muted)" }}>
            Select your path. Ein Einstieg, alle relevanten Bereiche der Wasteland-Welt.
          </p>
        </header>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {LINKS.map((l, i) => (
            <ConnectLink key={l.label} index={i + 1} label={l.label} text={l.text} featured={l.featured} href="#" />
          ))}
        </nav>

        <footer style={{ marginTop: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingTop: "20px", borderTop: "1px solid var(--wl-border)" }}>
          <span style={{ fontFamily: "var(--wl-font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--wl-text-dim)" }}>wasteland-interactive.de</span>
          <img src="../../assets/wasteland-connect-qr.svg" alt="QR" width="56" height="56" style={{ opacity: 0.9 }} />
        </footer>
      </section>
    </main>
  );
}

window.WLConnect = Connect;
ReactDOM.createRoot(document.getElementById("root")).render(<Connect />);
