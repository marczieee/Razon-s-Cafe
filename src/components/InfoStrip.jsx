import React from 'react'

const ITEMS = [
  '☕ Artisan Coffee', '🍚 Authentic Silog Meals', '🍹 Fresh Fruit Tea — ₱50',
  '🍝 House-Made Pasta', '🇵🇭 Filipino Flavors', '📍 Open Daily',
  '❤️ Made with Love', '🌿 Fresh Ingredients', '🥤 Non-Coffee Drinks'
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function InfoStrip() {
  return (
    <div className="info-strip">
      <div className="info-strip-inner">
        {DOUBLED.map((item, i) => (
          <div className="info-item" key={i}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
