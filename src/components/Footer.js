import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <a href="#home" className="logo">
              <div className="logo-icon">BCM</div>
              <div className="logo-text">
                Business Club
                <span>Mallorca</span>
              </div>
            </a>
            <p>
              Het meest exclusieve Nederlandse ondernemersnetwerk op Mallorca.
              Samen weten we meer, samen kunnen we meer, samen verdienen we meer.
            </p>
          </div>
          <div>
            <h4>Navigatie</h4>
            <ul className="footer-links">
              <li><a href="#over-ons">Over Ons</a></li>
              <li><a href="#pijlers">Onze Pijlers</a></li>
              <li><a href="#evenementen">Evenementen</a></li>
              <li><a href="#lidmaatschap">Lidmaatschap</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Lidmaatschap</h4>
            <ul className="footer-links">
              <li><a href="#lidmaatschap">Starter</a></li>
              <li><a href="#lidmaatschap">Business</a></li>
              <li><a href="#lidmaatschap">Prestige</a></li>
              <li><a href="#contact">Word Lid</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@bcmallorca.com">info@bcmallorca.com</a></li>
              <li><a href="tel:+34971000000">+34 971 000 000</a></li>
              <li><a href="#contact">Palma de Mallorca</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Business Club Mallorca. Alle rechten voorbehouden.</p>
          <div className="footer-social">
            <a href="#home" aria-label="LinkedIn">in</a>
            <a href="#home" aria-label="Instagram">ig</a>
            <a href="#home" aria-label="Facebook">fb</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
