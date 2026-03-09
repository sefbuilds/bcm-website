import React from 'react';

function Events() {
  const events = [
    {
      day: '15',
      month: 'APR',
      tag: 'Netwerken',
      title: 'Lente Netwerkdiner',
      description:
        'Een exclusief diner in een van Mallorca\'s meest prestigieuze restaurants, waar zakelijke connecties tot stand komen.',
      time: '19:00 - 23:00',
      location: 'Palma de Mallorca',
      icon: '🍷',
    },
    {
      day: '28',
      month: 'MEI',
      tag: 'Masterclass',
      title: 'Internationaal Ondernemen',
      description:
        'Leer van ervaren ondernemers hoe u uw bedrijf succesvol kunt uitbreiden naar de Spaanse en internationale markt.',
      time: '10:00 - 16:00',
      location: 'Port Adriano',
      icon: '📊',
    },
    {
      day: '12',
      month: 'JUN',
      tag: 'Sociaal',
      title: 'Zomer Yacht Evenement',
      description:
        'Geniet van een onvergetelijke dag op het water, terwijl u in ontspannen sfeer nieuwe zakelijke relaties opbouwt.',
      time: '11:00 - 18:00',
      location: 'Puerto Portals',
      icon: '⛵',
    },
  ];

  return (
    <section className="events section" id="evenementen">
      <div className="container">
        <div className="events-header">
          <div>
            <span className="section-label">Evenementen</span>
            <h2 className="section-title">
              Aankomende <span>Evenementen</span>
            </h2>
            <div className="gold-divider"></div>
          </div>
          <a href="#contact" className="btn-outline">
            Alle Evenementen
          </a>
        </div>
        <div className="events-grid">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-image">
                <div className="event-image-icon">{event.icon}</div>
                <div className="event-date">
                  <span className="day">{event.day}</span>
                  <span className="month">{event.month}</span>
                </div>
              </div>
              <div className="event-info">
                <span className="event-tag">{event.tag}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span>🕐 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
