import React from 'react';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div>
            <span className="section-label">Contact</span>
            <h2 className="section-title">
              Neem <span>Contact</span> Op
            </h2>
            <div className="gold-divider"></div>
            <p style={{ color: 'var(--text-light)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8 }}>
              Geïnteresseerd in een lidmaatschap of heeft u vragen?
              Neem vrijblijvend contact met ons op. Wij reageren binnen
              24 uur.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Adres</h4>
                  <p>Paseo del Borne 15<br />07012 Palma de Mallorca</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>E-mail</h4>
                  <p>info@bcmallorca.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Telefoon</h4>
                  <p>+34 971 000 000</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="naam">Naam</label>
                <input type="text" id="naam" placeholder="Uw volledige naam" />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="uw@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bedrijf">Bedrijf</label>
              <input type="text" id="bedrijf" placeholder="Uw bedrijfsnaam" />
            </div>
            <div className="form-group">
              <label htmlFor="bericht">Bericht</label>
              <textarea id="bericht" placeholder="Vertel ons hoe wij u kunnen helpen..."></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Verstuur Bericht
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
