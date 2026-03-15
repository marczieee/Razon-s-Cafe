import React from 'react'

const CARDS = [
  { icon: '📍', label: 'Location',      value: 'San Jose del Monte', sub: 'Bulacan, Philippines' },
  { icon: '🕐', label: 'Hours',         value: '7AM – 9PM',          sub: 'Open Daily · 7 days' },
  { icon: '📞', label: 'Phone / Viber', value: '+63 912 345 6789',   sub: 'Reservations & Inquiries' },
  { icon: '📱', label: 'Follow Us',     value: '@razons.cafe',        sub: 'Facebook · Instagram' },
]

export default function ContactSection() {
  return (
    <section className="section section-parchment" id="contact">
      <div className="sec-hdr">
        <div className="sec-tag" style={{ color: 'var(--gold)' }}>
          <span className="sec-tag-line" />Find Us<span className="sec-tag-line" />
        </div>
        <h2 className="sec-title">Get in <em style={{ fontStyle: 'italic' }}>Touch</em></h2>
        <p className="sec-sub">We'd love to hear from you — drop by, call us, or say hi online.</p>
      </div>
      <div className="contact-cards">
        {CARDS.map(c => (
          <div className="contact-card" key={c.label}>
            <span className="contact-icon">{c.icon}</span>
            <div className="contact-lbl">{c.label}</div>
            <div className="contact-val">{c.value}</div>
            <div className="contact-sub">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
