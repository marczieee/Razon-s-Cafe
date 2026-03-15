import React from 'react'
import LOGO from '../data/logo.js'

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const LINKS = [
  ['coffee', '☕ Coffee'], ['tea', '🍹 Tea'], ['silog', '🍚 Silog'],
  ['pasta', '🍝 Pasta'], ['others', '🍟 Others'], ['about', '✦ About'], ['contact', '📍 Contact']
]

export default function Footer() {
  return (
    <footer>
      <img className="footer-logo" src={LOGO} alt="Razon's Cafe" />
      <div className="footer-brand">Razon's Cafe</div>
      <p className="footer-tagline">
        Your neighborhood café serving authentic Filipino flavors with artisan coffee.
        Come as you are, stay as long as you like.
      </p>
      <div className="footer-links">
        {LINKS.map(([id, label]) => (
          <button key={id} className="footer-lnk" onClick={() => goTo(id)}>{label}</button>
        ))}
      </div>
      <p className="footer-copy">© 2024 Razon's Cafe · All rights reserved · Made with ❤️ in the Philippines</p>
    </footer>
  )
}
