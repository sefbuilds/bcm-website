import React, { useState, useEffect } from 'react';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="logo">
          <div className="logo-icon">BCM</div>
          <div className="logo-text">
            Business Club
            <span>Mallorca</span>
          </div>
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#over-ons">Over Ons</a></li>
            <li><a href="#pijlers">Onze Pijlers</a></li>
            <li><a href="#evenementen">Evenementen</a></li>
            <li><a href="#lidmaatschap">Lidmaatschap</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#contact" className="nav-cta">Word Lid</a></li>
          </ul>
        </nav>
        <button className="mobile-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
