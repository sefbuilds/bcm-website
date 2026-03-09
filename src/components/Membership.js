import React from 'react';

function Membership() {
  const plans = [
    {
      tier: 'Starter',
      price: '€495',
      period: 'per jaar',
      features: [
        'Toegang tot maandelijkse netwerkborrels',
        'Ledenprofiel op ons platform',
        'Maandelijkse nieuwsbrief',
        'Toegang tot online community',
        'Korting op evenementen',
      ],
      featured: false,
      buttonClass: 'btn-outline',
      buttonText: 'Kies Starter',
    },
    {
      tier: 'Business',
      price: '€995',
      period: 'per jaar',
      features: [
        'Alle Starter voordelen',
        'Toegang tot alle evenementen',
        'Exclusieve masterclasses',
        'Persoonlijke introducties',
        'Vermelding in ledenbrochure',
        'VIP uitnodigingen',
      ],
      featured: true,
      buttonClass: 'btn-primary',
      buttonText: 'Kies Business',
    },
    {
      tier: 'Prestige',
      price: '€1.995',
      period: 'per jaar',
      features: [
        'Alle Business voordelen',
        'Één-op-één mentoring sessies',
        'Priority partner matching',
        'Exclusieve VIP-evenementen',
        'Gastsprekersmogelijkheden',
        'Directe toegang tot het bestuur',
      ],
      featured: false,
      buttonClass: 'btn-outline',
      buttonText: 'Kies Prestige',
    },
  ];

  return (
    <section className="membership section" id="lidmaatschap">
      <div className="container">
        <div className="membership-header">
          <span className="section-label">Lidmaatschap</span>
          <h2 className="section-title">
            Investeer in Uw <span>Toekomst</span>
          </h2>
          <div className="gold-divider"></div>
          <p>
            Kies het lidmaatschap dat bij uw ambitie past en word onderdeel
            van het meest exclusieve ondernemersnetwerk op Mallorca.
          </p>
        </div>
        <div className="membership-grid">
          {plans.map((plan, index) => (
            <div
              className={`membership-card ${plan.featured ? 'featured' : ''}`}
              key={index}
            >
              <div className="membership-tier">{plan.tier}</div>
              <div className="membership-price">
                {plan.price} <span>/ {plan.period}</span>
              </div>
              <ul className="membership-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <a href="#contact" className={plan.buttonClass}>
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Membership;
