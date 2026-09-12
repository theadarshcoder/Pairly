import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';

export default function LegalPage() {
  const location = useLocation();
  const path = location.pathname;

  const currentTab = path.includes('terms')
    ? 'terms'
    : path.includes('security')
    ? 'security'
    : 'privacy';

  return (
    <div className="legal-page-wrapper">
      <LandingNav />

      <main className="legal-main">
        <div className="legal-hero">
          <div className="landing-container">
            <span className="legal-eyebrow">Trust, Compliance & Governance</span>
            <h1 className="legal-h1">
              {currentTab === 'privacy' && 'Student & Educator Privacy Policy'}
              {currentTab === 'terms' && 'Terms of Educational Service'}
              {currentTab === 'security' && 'Enterprise Security & Compliance'}
            </h1>
            <p className="legal-subhead">
              Last updated: September 1, 2026 · Pairly Technologies Inc.
            </p>

            {/* Legal Document Navigation Tabs */}
            <div className="legal-tab-pill">
              <Link
                to="/privacy"
                className={`legal-tab-btn ${currentTab === 'privacy' ? 'active' : ''}`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={`legal-tab-btn ${currentTab === 'terms' ? 'active' : ''}`}
              >
                Terms of Service
              </Link>
              <Link
                to="/security"
                className={`legal-tab-btn ${currentTab === 'security' ? 'active' : ''}`}
              >
                Security & SOC 2
              </Link>
            </div>
          </div>
        </div>

        {/* Document Body Card */}
        <section className="legal-document-section">
          <div className="landing-container">
            <div className="legal-card">
              {currentTab === 'privacy' && (
                <div className="legal-prose">
                  <h2>1. Our Fundamental Privacy Pledge to Students</h2>
                  <p>
                    Pairly was engineered from inception to protect students. Unlike commercial survey platforms or ad-supported educational software, <strong>Pairly never sells student data, never serves third-party advertisements, and never tracks student browsing behavior outside active lecture sessions.</strong>
                  </p>

                  <h2>2. FERPA & Student Record Compliance</h2>
                  <p>
                    Under the Family Educational Rights and Privacy Act (34 CFR Part 99), Pairly acts strictly as an authorized "School Official" with legitimate educational interests. Student touch coordinates, responses, and session participation records are encrypted in transit and at rest and remain the exclusive property of your academic institution.
                  </p>

                  <h2>3. Zero Student Account Requirement</h2>
                  <p>
                    Students join live classroom sessions anonymously using a temporary 6-digit PIN code. No account creation, email registration, or phone number verification is required. Participation marks can be routed directly to the professor's LMS gradebook without storing personal identifiers in Pairly databases.
                  </p>

                  <h2>4. Data Retention and Deletion</h2>
                  <p>
                    Individual raw interaction frames are purged 30 days after session termination. Aggregate, anonymized concept retention metrics are retained for curriculum diagnostic analytics and may be purged at any time upon faculty request.
                  </p>

                  <h2>5. Inquiries & Data Protection Officer</h2>
                  <p>
                    For institutional inquiries regarding Data Processing Agreements (DPA) or student records access, contact our compliance team at <code>privacy@pairly.app</code>.
                  </p>
                </div>
              )}

              {currentTab === 'terms' && (
                <div className="legal-prose">
                  <h2>1. Agreement to Terms</h2>
                  <p>
                    By registering for a Pairly Educator account or participating in a Pairly session, you agree to comply with these Terms of Educational Service and all applicable federal and state educational regulations.
                  </p>

                  <h2>2. Permitted Educational Use</h2>
                  <p>
                    Pairly is licensed strictly for pedagogical, classroom inquiry, and cognitive research purposes in accredited secondary and higher-education institutions. Automated scraping, reverse engineering of proprietary spatial coordination algorithms, or commercial resale of session telemetry is strictly prohibited.
                  </p>

                  <h2>3. Faculty Content & Slide Materials</h2>
                  <p>
                    All lecture outlines, syllabi, PDF slides, and examination questions uploaded to Pairly remain the exclusive intellectual property of the educator and their institution. Pairly does not use proprietary institutional curriculum data to train publicly accessible machine learning models.
                  </p>

                  <h2>4. Service Level Agreement (SLA)</h2>
                  <p>
                    For Plus, Pro, and Enterprise institutional contracts, Pairly guarantees 99.95% uptime during standard academic hours (Monday through Friday, 7:00 AM – 10:00 PM local campus time).
                  </p>
                </div>
              )}

              {currentTab === 'security' && (
                <div className="legal-prose">
                  <h2>1. SOC 2 Type II Certified Infrastructure</h2>
                  <p>
                    Pairly’s operational infrastructure is audited annually by independent AICPA-accredited accounting firms under SOC 2 Type II standards covering Security, Availability, and Confidentiality.
                  </p>

                  <h2>2. Cryptographic Protocols</h2>
                  <p>
                    All incoming and outgoing traffic is protected using TLS 1.3 encryption with Perfect Forward Secrecy. Data at rest is encrypted using FIPS 140-2 validated AES-256 with automatically rotated KMS keys.
                  </p>

                  <h2>3. HIPAA & Clinical Research Safeguards</h2>
                  <p>
                    For medical schools, nursing programs, and clinical simulation labs, Pairly offers Business Associate Agreements (BAAs). Diagnostic patient case studies and simulated medical charts remain isolated within HIPAA-compliant tenant enclaves.
                  </p>

                  <h2>4. Vulnerability Disclosure & Pen-Testing</h2>
                  <p>
                    We conduct bi-annual third-party penetration testing and operate a responsible security disclosure program. Report vulnerabilities directly to <code>security@pairly.app</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .legal-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .legal-main {
          flex: 1;
          padding-top: 120px;
        }

        .legal-hero {
          padding: 60px 0 40px 0;
          text-align: center;
        }

        .legal-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 12px;
        }

        .legal-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-weight: 400;
          font-size: clamp(32px, 4.4vw, 50px);
          line-height: 1.15;
          color: #0F172A;
          margin: 0 0 12px 0;
        }

        .legal-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #64748B;
          margin: 0 0 32px 0;
        }

        .legal-tab-pill {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          gap: 4px;
        }

        .legal-tab-btn {
          padding: 8px 20px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .legal-tab-btn:hover {
          color: #0F172A;
        }

        .legal-tab-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        /* ── Card ── */
        .legal-document-section {
          padding: 20px 0 100px 0;
        }

        .legal-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 60px 68px;
          box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.04);
          max-width: 860px;
          margin: 0 auto;
        }

        .legal-prose h2 {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 36px 0 12px 0;
        }

        .legal-prose h2:first-child {
          margin-top: 0;
        }

        .legal-prose p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 15.5px;
          line-height: 1.68;
          color: #475569;
          margin: 0 0 16px 0;
        }

        .legal-prose code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          color: #0F172A;
          font-size: 14px;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .legal-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .legal-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .legal-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .legal-tab-pill {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .legal-tab-btn {
          color: #94A3B8;
        }

        [data-theme="dark"] .legal-tab-btn.active {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .legal-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .legal-prose h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .legal-prose p {
          color: #94A3B8;
        }

        [data-theme="dark"] .legal-prose code {
          background: #1E293B;
          color: #60A5FA;
        }

        @media (max-width: 860px) {
          .legal-card {
            padding: 36px 24px;
          }
          .legal-tab-pill {
            flex-direction: column;
            border-radius: 16px;
          }
          .legal-tab-btn {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
