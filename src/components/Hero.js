import React from 'react';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-label">Business Club Mallorca</div>
          <h1>
            Waar Ondernemen
            <span className="gold">Samenkomt</span>
          </h1>
          <p className="hero-slogan">
            Samen weten we meer, samen kunnen we meer,
            samen verdienen we meer.
          </p>
          <p className="hero-subslogan">
            Verrijk jezelf, verrijk een ander, verrijk elkaar.
          </p>
          <div className="hero-buttons">
            <a href="#lidmaatschap" className="btn-primary">Ontdek Lidmaatschap</a>
            <a href="#over-ons" className="btn-outline">Meer Informatie</a>
          </div>
        </div>
      </div>
      <div className="hero-decoration">
        <div className="diamond"></div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        Scroll
      </div>
    </section>
  );
}

export default Hero;
