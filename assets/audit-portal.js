/**
 * Wasteland Audit Portal - Non-Destructive UI Injection
 * This script safely creates a conversion-optimized overlay outside the React root.
 * Integrated with the native Wasteland Leads API.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Floating Action Button
    const fab = document.createElement('button');
    fab.id = 'wl-audit-fab';
    fab.innerHTML = '>> System Audit';
    document.body.appendChild(fab);

    // 2. Create Modal HTML
    const modalHTML = `
        <div id="wl-audit-modal">
            <div class="wl-modal-content">
                <button class="wl-close-btn">&times;</button>
                
                <div class="wl-modal-header" id="wl-modal-header">
                    <h2>Wasteland System Audits</h2>
                    <p>Identifizieren Sie Conversion-Killer und Sicherheitslücken. B2B-Tech-Audits für KMU.</p>
                </div>

                <div class="wl-packages-container" id="wl-packages">
                    <div class="wl-package">
                        <h3>Starter Check</h3>
                        <div class="wl-price">490 €</div>
                        <ul>
                            <li>Technischer SEO-Scan</li>
                            <li>Performance Benchmark</li>
                            <li>Basic Security Check</li>
                            <li>PDF-Report (3 Quick Wins)</li>
                        </ul>
                        <button class="wl-btn-select" data-pkg="Starter Check Audit">Wählen</button>
                    </div>
                    <div class="wl-package">
                        <h3>Professional</h3>
                        <div class="wl-price">1.490 €</div>
                        <ul>
                            <li>Inklusive Starter Check</li>
                            <li>Conversion (CRO) Audit</li>
                            <li>Local SEO & AI Visibility</li>
                            <li>45-Min Video Walkthrough</li>
                        </ul>
                        <button class="wl-btn-select" data-pkg="Professional Audit">Wählen</button>
                    </div>
                    <div class="wl-package">
                        <h3>Enterprise</h3>
                        <div class="wl-price">3.900 €</div>
                        <ul>
                            <li>Inklusive Professional</li>
                            <li>Deep Frontend Code Review</li>
                            <li>Advanced Lead Funnel Analyse</li>
                            <li>12-Monate Strategie-Roadmap</li>
                        </ul>
                        <button class="wl-btn-select" data-pkg="Enterprise Audit">Wählen</button>
                    </div>
                </div>

                <!-- Micro-Commitment Lead Form -->
                <div class="wl-lead-form" id="wl-lead-form">
                    <div class="wl-form-step active" id="step-1">
                        <h4>[1/3] Welcher Bereich hat Priorität?</h4>
                        <div class="wl-options-grid">
                            <button class="wl-option-btn" onclick="nextStep('focus', 'Lead Generation')">Lead Generation</button>
                            <button class="wl-option-btn" onclick="nextStep('focus', 'SEO / Sichtbarkeit')">SEO / Sichtbarkeit</button>
                            <button class="wl-option-btn" onclick="nextStep('focus', 'Security & Performance')">Security / Performance</button>
                            <button class="wl-option-btn" onclick="nextStep('focus', 'Holistic Upgrade')">Holistisches Upgrade</button>
                        </div>
                    </div>
                    <div class="wl-form-step" id="step-2">
                        <h4>[2/3] Wann soll das Audit starten?</h4>
                        <div class="wl-options-grid">
                            <button class="wl-option-btn" onclick="nextStep('timeline', 'Sofort (ASAP)')">Sofort (ASAP)</button>
                            <button class="wl-option-btn" onclick="nextStep('timeline', 'In 1-2 Wochen')">In 1-2 Wochen</button>
                            <button class="wl-option-btn" onclick="nextStep('timeline', 'Diesen Monat')">Diesen Monat</button>
                            <button class="wl-option-btn" onclick="nextStep('timeline', 'Nur Information')">Nur Information</button>
                        </div>
                    </div>
                    <div class="wl-form-step" id="step-3">
                        <h4>[3/3] Projektdetails & Kontakt</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div class="wl-input-group">
                                <label>Firmenname *</label>
                                <input type="text" id="wl-company" placeholder="GmbH / Agentur / Betrieb">
                            </div>
                            <div class="wl-input-group">
                                <label>Ansprechpartner *</label>
                                <input type="text" id="wl-contact" placeholder="Vorname Nachname">
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div class="wl-input-group">
                                <label>E-Mail Adresse *</label>
                                <input type="email" id="wl-email" placeholder="mail@unternehmen.de">
                            </div>
                            <div class="wl-input-group">
                                <label>Telefonnummer</label>
                                <input type="tel" id="wl-phone" placeholder="Optional">
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div class="wl-input-group">
                                <label>Webseite *</label>
                                <input type="url" id="wl-website" placeholder="https://...">
                            </div>
                            <div class="wl-input-group">
                                <label>Branche *</label>
                                <input type="text" id="wl-industry" placeholder="z.B. Maschinenbau">
                            </div>
                        </div>

                        <div class="wl-input-group">
                            <label>Unternehmensgröße *</label>
                            <select id="wl-size">
                                <option value="1-10">1 - 10 Mitarbeiter</option>
                                <option value="11-50">11 - 50 Mitarbeiter</option>
                                <option value="50+">50+ Mitarbeiter</option>
                            </select>
                        </div>

                        <div class="wl-input-group">
                            <label>Aktuelle Probleme / Ziele *</label>
                            <textarea id="wl-problems" rows="3" placeholder="Wobei brauchen Sie Hilfe? Was funktioniert aktuell nicht?"></textarea>
                        </div>
                        <div style="position: absolute; left: -9999px; top: -9999px; opacity: 0; z-index: -1;">
                            <input type="text" name="website_confirm" id="wl-website-confirm" tabindex="-1" autocomplete="off">
                        </div>
                        <input type="hidden" name="form_token" class="form-token-field" id="wl-form-token">

                        <div id="wl-error-msg" style="color: #ff003c; font-size: 12px; margin-bottom: 10px; display: none;"></div>

                        <button class="wl-submit-btn" id="wl-submit-btn" onclick="submitAuditRequest()">Audit verbindlich anfragen</button>
                    </div>
                    
                    <div class="wl-form-step" id="step-success" style="text-align: center; padding: 40px 0;">
                        <h3 style="color: #00f0ff; font-family: 'Unbounded', sans-serif; font-size: 24px; margin-bottom: 15px;">Audit-Anfrage erfolgreich</h3>
                        <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">Ihre Anfrage wurde erfolgreich an das Wasteland-System übermittelt.<br>Wir melden uns in Kürze bei Ihnen.</p>
                        <button class="wl-btn-select" onclick="document.querySelector('.wl-close-btn').click()" style="width: auto;">Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inject modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Set JS token
    document.getElementById('wl-form-token').value = 'wl-real-user-2026';

    const modal = document.getElementById('wl-audit-modal');
    const closeBtn = document.querySelector('.wl-close-btn');
    const packages = document.getElementById('wl-packages');
    const leadForm = document.getElementById('wl-lead-form');
    const submitBtn = document.getElementById('wl-submit-btn');
    const errorMsg = document.getElementById('wl-error-msg');
    
    let formData = {
        package: '',
        focus: '',
        timeline: ''
    };

    // Toggle Modal
    fab.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        resetForm();
    });

    // Package Selection
    document.querySelectorAll('.wl-btn-select').forEach(btn => {
        btn.addEventListener('click', (e) => {
            formData.package = e.target.getAttribute('data-pkg');
            packages.style.display = 'none';
            document.getElementById('wl-modal-header').style.display = 'none';
            leadForm.classList.add('active');
        });
    });

    // Global Functions for inline onclicks
    window.nextStep = function(key, value) {
        formData[key] = value;
        if(key === 'focus') {
            document.getElementById('step-1').classList.remove('active');
            document.getElementById('step-2').classList.add('active');
        } else if(key === 'timeline') {
            document.getElementById('step-2').classList.remove('active');
            document.getElementById('step-3').classList.add('active');
        }
    };

    window.submitAuditRequest = async function() {
        const company = document.getElementById('wl-company').value.trim();
        const contact = document.getElementById('wl-contact').value.trim();
        const email = document.getElementById('wl-email').value.trim();
        const phone = document.getElementById('wl-phone').value.trim();
        const website = document.getElementById('wl-website').value.trim();
        const industry = document.getElementById('wl-industry').value.trim();
        const size = document.getElementById('wl-size').value;
        const problems = document.getElementById('wl-problems').value.trim();
        
        const websiteConfirm = document.getElementById('wl-website-confirm').value;
        const formToken = document.getElementById('wl-form-token').value;

        // Validating email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            errorMsg.style.display = 'block';
            errorMsg.innerText = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
            return;
        }

        if(!company || !contact || !email || !website || !industry || !problems) {
            errorMsg.style.display = 'block';
            errorMsg.innerText = 'Bitte füllen Sie alle mit * markierten Pflichtfelder aus.';
            return;
        }

        errorMsg.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.innerText = 'Wird gesendet...';
        submitBtn.style.opacity = '0.6';

        // Format message for backend compatibility
        const messagePayload = [
            "--- SYSTEM AUDIT ANFRAGE ---",
            "Webseite: " + website,
            "Telefon: " + (phone || "-"),
            "Branche: " + industry,
            "Unternehmensgröße: " + size,
            "",
            "--- PROBLEME & ZIELE ---",
            problems,
            "",
            "--- MICRO-COMMITMENTS ---",
            "Fokus: " + formData.focus,
            "Zeitraum: " + formData.timeline
        ].join("\\n");

        const payload = {
            name: contact,
            email: email,
            unternehmen: company,
            thema: "System Audit - " + formData.package,
            type: "lead",
            budget: "",
            nachricht: messagePayload,
            website_confirm: websiteConfirm,
            form_token: formToken
        };

        const apiUrl = (window.location.origin.includes('localhost') ? 'https://api.wasteland-interactive.de' : window.location.origin) + '/api/leads';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Success state
            document.getElementById('step-3').classList.remove('active');
            document.getElementById('step-success').classList.add('active');
            
        } catch (error) {
            console.error('Error submitting audit request:', error);
            errorMsg.style.display = 'block';
            errorMsg.innerText = 'Es gab ein Problem bei der Übermittlung. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Audit verbindlich anfragen';
            submitBtn.style.opacity = '1';
        }
    };

    function resetForm() {
        packages.style.display = 'grid';
        document.getElementById('wl-modal-header').style.display = 'block';
        leadForm.classList.remove('active');
        document.getElementById('step-1').classList.add('active');
        document.getElementById('step-2').classList.remove('active');
        document.getElementById('step-3').classList.remove('active');
        document.getElementById('step-success').classList.remove('active');
        errorMsg.style.display = 'none';
        
        // Reset inputs
        document.getElementById('wl-company').value = '';
        document.getElementById('wl-contact').value = '';
        document.getElementById('wl-email').value = '';
        document.getElementById('wl-phone').value = '';
        document.getElementById('wl-website').value = '';
        document.getElementById('wl-industry').value = '';
        document.getElementById('wl-size').value = '1-10';
        document.getElementById('wl-problems').value = '';

        formData = {package: '', focus: '', timeline: ''};
    }
});
