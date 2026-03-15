import React from 'react'
import LOGO from '../../data/logo.js'

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grain" />
      <div className="hero-dots" />
      <div className="hero-orb" />
      <div className="hero-inner">
        <div className="hero-logo-ring">
          <img src={LOGO} alt="Razon's Cafe" />
        </div>
        <p className="hero-eyebrow">Est. 2024 · Authentic Filipino Café</p>
        <h1 className="hero-title">Razon's<br /><em>Cafe</em></h1>
        <p className="hero-sub">
          Artisan coffee meets authentic Filipino flavors. Every sip, every bite — crafted with
          love and passion in every plate.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => goTo('coffee')}>☕ View Menu</button>
          <button className="btn-ghost" onClick={() => goTo('silog')}>🍚 Silog Meals</button>
        </div>
      </div>
      <div className="hero-scroll"><div className="hero-scroll-line" />Scroll</div>
    </section>
  )
}
