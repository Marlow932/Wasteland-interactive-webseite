/* Wasteland Interactive — Sentinel Home · Content data
   All copy/prices/structure from the client's Content Brief.
   Plain JS (no JSX); loaded with a normal <script src> before screens.jsx
   so window.SENTINEL is ready when React mounts. */
window.SENTINEL = (function () {
  /* Tier accent colors (3 have shields; Pro/Business use brand accents) */
  var C = {
    home: "var(--wl-sentinel-home)",        // green
    pro: "var(--wl-cyan)",                   // cyan
    business: "var(--wl-gold)",              // gold
    server: "var(--wl-sentinel-server)",     // blue
    enterprise: "var(--wl-sentinel-enterprise)", // purple
  };
  var RGB = { home: "70,227,90", pro: "0,240,255", business: "200,169,104", server: "46,197,255", enterprise: "165,103,245" };

  var TIERS = [
    { key: "home", name: "Home", price: 14, devices: "1 Gerät", audience: "Privatnutzer" },
    { key: "pro", name: "Pro", price: 49, devices: "2 Geräte", audience: "Freelancer", popular: true },
    { key: "business", name: "Business", price: 99, devices: "5 Geräte", audience: "Kleine Büros" },
    { key: "server", name: "Server", price: 189, devices: "1 Server + 3 Clients", audience: "KMU" },
    { key: "enterprise", name: "Enterprise", price: 449, devices: "Unbegrenzt", audience: "Unternehmen" },
  ];

  /* feature matrix — order = tiers above; true = enthalten */
  var FEATURES = [
    { label: "AV + Echtzeit-Schutz", v: [true, true, true, true, true] },
    { label: "Honeypot-Erkennung", v: [true, true, true, true, true] },
    { label: "Automatische Netzwerk-Isolation", v: [true, true, true, true, true] },
    { label: "USB-Geräteschutz", v: [true, true, true, true, true] },
    { label: "VirusTotal / MalwareBazaar", v: [false, true, true, true, true] },
    { label: "Netzwerk-IDS (Geräte-Baseline)", v: [false, true, true, true, true] },
    { label: "Forensischer Report (ZIP)", v: [false, true, true, true, true] },
    { label: "Forensik-Report per E-Mail", v: [false, false, true, true, true] },
    { label: "Password Vault", v: [false, true, true, true, true] },
    { label: "Server-Dienst-Monitoring", v: [false, false, false, true, true] },
    { label: "Multi-Device Dashboard", v: [false, false, true, true, true] },
    { label: "API-Zugang", v: [false, false, false, false, true] },
    { label: "SLA + Prioritäts-Support", v: [false, false, false, false, true] },
  ];

  var AUDIENCES = [
    { tag: "Privatnutzer", title: "Schutz ohne Komplexität", body: "Einrichten, läuft. Besser als Norton — und günstiger als ein Anwalt nach dem Hack.", color: C.home, rgb: RGB.home },
    { tag: "Freelancer & Homeoffice", title: "Kundendaten = deine Haftung", body: "Werden Kundendaten gestohlen, haftest du. Sentinel dokumentiert nachweisbar, dass du alles getan hast.", color: C.pro, rgb: RGB.pro },
    { tag: "Praxen & Kanzleien", title: "Hochsensible Akten, keine IT", body: "Patientendaten und Mandantenakten auf Enterprise-Niveau geschützt — ganz ohne eigene IT-Abteilung.", color: C.business, rgb: RGB.business },
    { tag: "KMU mit Server", title: "24/7 unbeaufsichtigt sicher", body: "Ein Angriff = kompletter Betriebsausfall. Sentinel überwacht deinen Server rund um die Uhr und schlägt Alarm, bevor der Schaden passiert.", color: C.server, rgb: RGB.server },
  ];

  var STEPS = [
    { num: "01", title: "Erkennen", body: "Honeypot-Fallen (FTP, SSH, RDP) und Netzwerk-IDS entlarven Angreifer und unbekannte Geräte sofort — noch bevor echter Schaden entsteht." },
    { num: "02", title: "Isolieren", body: "Bei einem echten Angriff kappt Sentinel das Internet in Sekunden und riegelt das Netzwerk ab. Der Angreifer verliert den Zugriff." },
    { num: "03", title: "Dokumentieren", body: "Automatisch erstellter forensischer Bericht als ZIP: Angreifer-IP, GeoIP, Payload, Prozessliste — gerichtsfest aufbereitet und direkt verwertbar für die Strafanzeige." },
  ];

  var COMPARE = {
    cols: ["Sentinel Pro", "Bitdefender Total", "Norton 360", "Bitdefender BOX"],
    highlight: 0,
    rows: [
      { label: "Preis / Monat", v: ["49 €", "~4 €", "~8 €", "~8 € + 99 € HW"] },
      { label: "Honeypot", v: [true, false, false, false] },
      { label: "Auto-Netzwerk-Isolation", v: [true, false, false, "teilweise"] },
      { label: "Forensischer Report", v: [true, false, false, false] },
      { label: "Netzwerk-IDS", v: [true, false, false, true] },
      { label: "Keine Hardware nötig", v: [true, true, true, false] },
    ],
  };

  var TECH = [
    { name: "Phoenix-Watchdog", body: "Startet sich selbst neu, falls ein Angreifer versucht, Sentinel zu beenden." },
    { name: "VirusTotal-Integration", body: "Abgleich jeder Datei gegen 70+ Antiviren-Engines in Echtzeit." },
    { name: "MalwareBazaar", body: "Bekannte Malware-Datenbank von abuse.ch für sofortige Treffer." },
    { name: "GeoIP-Ortung", body: "Angreifer-IP wird automatisch geortet — Land, Stadt, ISP." },
    { name: "Kein Cloud-Zwang", body: "Läuft lokal. Deine Daten bleiben bei dir." },
    { name: "DSGVO-konform", body: "Keine Telemetrie, keine Datenweitergabe. Made in Germany." },
  ];

  var RESELLER = [
    { model: "Affiliate", desc: "Link / Empfehlung", rate: 20, example: "Pro-Kunde = 9,80 € / Monat dauerhaft" },
    { model: "Reseller", desc: "Aktiver Vertrieb", rate: 30, example: "Pro-Kunde = 14,70 € / Monat dauerhaft", featured: true },
    { model: "IT-Dienstleister", desc: "Installiert + betreut", rate: 35, example: "Business-Kunde = 34,65 € / Monat" },
  ];

  var FAQ = [
    { q: "Brauche ich das wirklich?", a: "Wenn du Kundendaten verarbeitest oder einen Server betreibst: ja. Ein Ransomware-Angriff kostet im Schnitt rund 4.500 € Schaden und Wochen Ausfallzeit. Sentinel erkennt, isoliert und dokumentiert — und weist im Ernstfall nach, dass du geschützt warst." },
    { q: "Was passiert genau bei einem Angriff?", a: "Sentinel erkennt den Angriff über Honeypots und Netzwerk-IDS, kappt in Sekunden die Internetverbindung und riegelt das Netzwerk ab. Anschließend erstellt es automatisch einen forensischen Bericht (Angreifer-IP, GeoIP, Payload, Prozessliste) als ZIP — direkt verwertbar für eine Strafanzeige." },
    { q: "Auf welchen Systemen läuft Sentinel?", a: "Aktuell auf Linux und Windows. Eine macOS-Version ist in Arbeit. Sentinel befindet sich in der Beta — über die Warteliste sicherst du dir frühen Zugang." },
    { q: "Werden meine Daten in die Cloud geladen?", a: "Nein. Sentinel läuft lokal auf deinem Gerät, ohne Cloud-Zwang. Es gibt keine Telemetrie und keine Datenweitergabe — DSGVO-konform und Made in Germany." },
    { q: "Ist das nicht zu kompliziert für mich?", a: "Nein. Sentinel ist auf Einrichten-und-läuft ausgelegt — gerade für Nutzer ohne eigene IT. Die Pakete Business und höher bieten zusätzlich ein zentrales Dashboard für mehrere Geräte." },
    { q: "Was kostet der Einstieg?", a: "Sentinel Home startet bei 14 € im Monat für ein Gerät. Pro (49 €) ergänzt Forensik-Report, Netzwerk-IDS und Password Vault — das beliebteste Paket für Freelancer und Homeoffice." },
  ];

  return { C: C, RGB: RGB, TIERS: TIERS, FEATURES: FEATURES, AUDIENCES: AUDIENCES, STEPS: STEPS, COMPARE: COMPARE, TECH: TECH, RESELLER: RESELLER, FAQ: FAQ };
})();
