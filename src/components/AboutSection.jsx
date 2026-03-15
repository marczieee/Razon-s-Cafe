import React from 'react'
import LOGO from '../data/logo.js'

export default function AboutSection() {
  return (
    <section className="section section-dark" id="about">
      <div className="about-wrap">
        <div className="about-logo-col">
          <img className="about-logo-img" src={LOGO} alt="Razon's Cafe" />
          <span className="about-tag-text">Est. 2024 · Philippines</span>
          <div className="about-pills">
            <span className="about-pill">☕ Artisan Coffee</span>
            <span className="about-pill">🇵🇭 Filipino Flavors</span>
            <span className="about-pill">❤️ Made with Love</span>
          </div>
        </div>
        <div>
          <div className="about-tagline">Our Story</div>
          <h2 className="about-h2">More than coffee — it's a Filipino experience</h2>
          <p className="about-p">
            Razon's Cafe was born from a simple dream: to create a warm, welcoming space where great
            coffee meets authentic Filipino comfort food. Every cup we brew and every silog we serve
            carries the warmth of Filipino hospitality.
          </p>
          <p className="about-p">
            From our hand-crafted espresso drinks to our beloved silog meals and house-made pasta,
            everything is prepared with fresh ingredients and a whole lot of heart.
          </p>
          <div className="about-pills" style={{ marginTop: 18 }}>
            <span className="about-pill">🌿 Fresh Ingredients</span>
            <span className="about-pill">📍 Open Daily</span>
            <span className="about-pill">🫙 House-Made</span>
          </div>
        </div>
      </div>
    </section>
  )
}
