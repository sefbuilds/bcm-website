import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      text: 'Sinds ik lid ben van BCM heb ik niet alleen waardevolle zakelijke contacten opgebouwd, maar ook echte vriendschappen gesloten. Het netwerk heeft mijn bedrijf naar een hoger niveau getild.',
      name: 'Jan van der Berg',
      role: 'Vastgoed Ondernemer',
      initials: 'JB',
    },
    {
      text: 'De masterclasses en evenementen zijn van uitzonderlijke kwaliteit. Elke bijeenkomst levert nieuwe inzichten en kansen op. BCM is meer dan een businessclub — het is een familie.',
      name: 'Sophie de Groot',
      role: 'Digital Marketing Bureau',
      initials: 'SG',
    },
    {
      text: 'Dankzij BCM heb ik drie strategische partnerships gesloten die mijn omzet met 40% hebben verhoogd. De investering in het lidmaatschap heeft zich ruimschoots terugbetaald.',
      name: 'Marco Hendriks',
      role: 'Import & Export',
      initials: 'MH',
    },
    {
      text: 'Als nieuwkomer op Mallorca was BCM de perfecte manier om snel een betrouwbaar netwerk op te bouwen. De persoonlijke introducties zijn onbetaalbaar.',
      name: 'Lisa Vermeer',
      role: 'Hospitality Consultant',
      initials: 'LV',
    },
  ];

  return (
    <section className="testimonials section" id="getuigenissen">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Getuigenissen</span>
          <h2 className="section-title">
            Wat Onze Leden <span>Zeggen</span>
          </h2>
          <div className="gold-divider"></div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
