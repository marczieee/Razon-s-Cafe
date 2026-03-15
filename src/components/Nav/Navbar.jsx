import React, { useState, useEffect } from 'react'
import LOGO from '../../data/logo.js'
import { useStore, openCart } from '../../store/useStore.js'

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const CATEGORIES = [
  ['coffee', '☕', 'Coffee'], ['noncoffee', '🥤', 'Non-Coffee'], ['tea', '🍹', 'Fruit Tea'],
  ['silog', '🍚', 'Silog Meals'], ['pasta', '🍝', 'Pasta'], ['others', '🍟', 'Others'],
]

export default function Navbar() {
  const { totalItems } = useStore()
  const [mobOpen, setMobOpen] = useState(false)
  const [mobSubOpen, setMobSubOpen] = useState(false)

  const toggleMob = () => { setMobOpen(o => !o); if (mobOpen) setMobSubOpen(false) }

  return (
    <>
      <nav id="navbar">
        <a className="nav-logo" href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src={LOGO} alt="Razon's Cafe" />
          <span className="nav-logo-text">Razon's Cafe</span>
        </a>

        <div className="nav-links">
          <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>🏠 Home</button>
          <div className="nav-menu-wrap">
            <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              🍽️ Menu <span style={{ fontSize: '0.5rem', marginLeft: 1 }}>▼</span>
            </button>
            <div className="nav-dropdown">
              {CATEGORIES.map(([id, emoji, label]) => (
                <button key={id} className="nav-dd-item" onClick={() => goTo(id)}>
                  <span>{emoji}</span>{label}
                </button>
              ))}
            </div>
          </div>
          <button className="nav-link" onClick={() => goTo('about')}>✦ About</button>
          <button className="nav-link" onClick={() => goTo('contact')}>📍 Contact</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="cart-btn" onClick={openCart}>
            🛒<span className="cart-count">{totalItems || ''}</span>
          </button>
          <button className={`nav-ham ${mobOpen ? 'open' : ''}`} onClick={toggleMob} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mob-overlay ${mobOpen ? 'open' : ''}`} onClick={toggleMob} />
      <div className={`nav-mob-panel ${mobOpen ? 'open' : ''}`}>
        <button className="nav-mob-link" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); toggleMob() }}>
          🏠 <span>Home</span>
        </button>
        <button className={`nav-mob-link ${mobSubOpen ? 'sub-open' : ''}`} onClick={() => setMobSubOpen(o => !o)}>
          🍽️ <span>Menu</span><span className="nav-mob-chev">▼</span>
        </button>
        <div className={`nav-mob-sub ${mobSubOpen ? 'open' : ''}`}>
          {CATEGORIES.map(([id, emoji, label]) => (
            <button key={id} className="nav-mob-subitem" onClick={() => { goTo(id); toggleMob() }}>
              {emoji} {label}
            </button>
          ))}
        </div>
        <div className="nav-mob-sep" />
        <button className="nav-mob-link" onClick={() => { goTo('about'); toggleMob() }}>✦ <span>About</span></button>
        <button className="nav-mob-link" onClick={() => { goTo('contact'); toggleMob() }}>📍 <span>Contact</span></button>
      </div>
    </>
  )
}
