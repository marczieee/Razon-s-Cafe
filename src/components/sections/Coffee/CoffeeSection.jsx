import React from 'react'
import FlipCard from './FlipCard.jsx'
import { COFFEE, NON_COFFEE } from '../../../data/menuData.js'

export default function CoffeeSection() {
  return (
    <>
      <section className="section section-dark" id="coffee">
        <div className="sec-hdr">
          <div className="sec-tag" style={{ color: 'var(--gold-lt)' }}>
            <span className="sec-tag-line" />Flip to Discover<span className="sec-tag-line" />
          </div>
          <h2 className="sec-title">☕ Coffee <em style={{ fontStyle: 'italic' }}>Selection</em></h2>
          <p className="sec-sub">Single-origin beans, expertly roasted. Tap any card to reveal flavor notes and origins.</p>
        </div>
        <div className="flip-grid">
          {COFFEE.map(item => <FlipCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="section section-parchment" id="noncoffee">
        <div className="sec-hdr">
          <div className="sec-tag" style={{ color: 'var(--gold)' }}>
            <span className="sec-tag-line" />For Everyone<span className="sec-tag-line" />
          </div>
          <h2 className="sec-title">🥤 Non-Coffee <em style={{ fontStyle: 'italic' }}>Drinks</em></h2>
          <p className="sec-sub">Rich, creamy, and absolutely indulgent. Perfect for the whole family.</p>
        </div>
        <div className="flip-grid">
          {NON_COFFEE.map(item => <FlipCard key={item.id} item={item} />)}
        </div>
      </section>
    </>
  )
}
