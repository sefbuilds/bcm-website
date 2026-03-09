import React from 'react';

function About() {
  return (
    <section className="about section" id="over-ons">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div className="about-image-placeholder">
              <div className="about-image-icon">☀️</div>
              <div className="about-image-text">Mallorca, Spanje</div>
            </div>
            <div className="about-stats">
              <div className="stat-number">150+</div>
              <div className="stat-label">Actieve Leden</div>
            </div>
          </div>
          <div className="about-text">
            <span className="section-label">Over Ons</span>
            <h2 className="section-title">
              Een Exclusief Netwerk van <span>Nederlandse Ondernemers</span> op Mallorca
            </h2>
            <div className="gold-divider"></div>
            <p>
              Business Club Mallorca verenigt ambitieuze Nederlandse en Belgische
              ondernemers die wonen of werken op het prachtige eiland Mallorca.
              Wij geloven dat samenwerking de sleutel is tot succes.
            </p>
            <p>
              Ons netwerk biedt een unieke combinatie van zakelijke kansen,
              kennisdeling en persoonlijke groei in een inspirerende
              Mediterrane omgeving. Van startende ondernemer tot gevestigde
              zakenman — bij BCM vindt iedereen zijn plek.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon"></div>
                <span>Exclusieve Netwerkevenementen</span>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"></div>
                <span>Zakelijke Masterclasses</span>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"></div>
                <span>Persoonlijke Introductie</span>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"></div>
                <span>Leden-exclusieve Deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
