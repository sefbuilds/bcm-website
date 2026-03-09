import React from 'react';

function Pillars() {
  const pillars = [
    {
      number: '01',
      icon: '🧠',
      title: 'Samen Weten We Meer',
      subtitle: 'Kennis & Expertise',
      description:
        'Deel kennis, ervaring en inzichten met gelijkgestemde ondernemers. Onze masterclasses, workshops en ronde-tafelgesprekken bieden u toegang tot de collectieve wijsheid van ons netwerk.',
    },
    {
      number: '02',
      icon: '🤝',
      title: 'Samen Kunnen We Meer',
      subtitle: 'Samenwerking & Kracht',
      description:
        'Door onze krachten te bundelen bereiken we wat alleen onmogelijk is. Strategische partnerships, gezamenlijke projecten en wederzijdse ondersteuning vormen de kern van onze club.',
    },
    {
      number: '03',
      icon: '💎',
      title: 'Samen Verdienen We Meer',
      subtitle: 'Groei & Welvaart',
      description:
        'Verrijk jezelf, verrijk een ander, verrijk elkaar. BCM opent deuren naar nieuwe zakelijke kansen, waardevolle connecties en duurzame groei voor al onze leden.',
    },
  ];

  return (
    <section className="pillars section" id="pijlers">
      <div className="container">
        <div className="pillars-header">
          <span className="section-label">Onze Pijlers</span>
          <h2 className="section-title">
            Drie Pijlers van <span>Succes</span>
          </h2>
          <div className="gold-divider"></div>
          <p>
            Onze filosofie rust op drie fundamentele pijlers die samen de basis
            vormen voor een bloeiende zakelijke gemeenschap.
          </p>
        </div>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div className="pillar-card" key={pillar.number}>
              <div className="pillar-number">{pillar.number}</div>
              <div className="pillar-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <div className="pillar-subtitle">{pillar.subtitle}</div>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pillars;
