import React, { useState } from 'react'
import FOOD_IMGS from '../../../data/icons.js'
import { addToCart, showToast } from '../../../store/useStore.js'

const ROAST_LEVELS = { 'Light': 1, 'Light-Medium': 2, 'Medium': 3, 'Medium-Dark': 4, 'Dark': 5 }

export default function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false)
  const [size, setSize] = useState('small')
  const [added, setAdded] = useState(false)

  const price = size === 'small' ? item.small : item.large
  const roastNum = ROAST_LEVELS[item.roast] || 3
  const photo = item.img && FOOD_IMGS[item.img]

  const handleAdd = (e) => {
    e.stopPropagation()
    const key = `${item.id}-${size}-${Date.now()}`
    addToCart(key, item.name, price, item.img, size === 'small' ? 'Small' : 'Large')
    showToast(`🛒 ${item.name} added!`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="flip-card-inner">

        {/* FRONT */}
        <div className="flip-front">
          {photo && (
            <div className="flip-photo" style={{
              backgroundImage: `url('${photo}')`,
              backgroundSize: '75%', backgroundPosition: 'center 55%', backgroundRepeat: 'no-repeat',
            }} />
          )}
          <div className="flip-front-shadow" />
          <div className="flip-front-content">
            <div className="steam-row">
              <span className="steam-bar" /><span className="steam-bar" /><span className="steam-bar" />
            </div>
            <div className="fc-name">{item.name}</div>
            <div className="fc-price">₱{price}</div>
            <div className="size-tog" onClick={e => e.stopPropagation()}>
              <button className={`sz-btn ${size === 'small' ? 'on' : ''}`} onClick={() => setSize('small')}>S</button>
              <button className={`sz-btn ${size === 'large' ? 'on' : ''}`} onClick={() => setSize('large')}>L</button>
            </div>
            <div className="fc-hint">✦ Tap to discover</div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-back">
          {photo && (
            <img src={photo} alt={item.name}
              style={{ width: '100%', height: 70, objectFit: 'contain', borderRadius: 12, marginBottom: 6 }} />
          )}
          <div className="fb-name">{item.name}</div>
          <div className="fb-desc">{item.desc}</div>
          {item.origin && (
            <div className="fb-row">
              <span className="fb-lbl">Origin</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--coffee)' }}>{item.origin}</span>
            </div>
          )}
          {item.roast && (
            <div className="fb-row">
              <span className="fb-lbl">Roast</span>
              <div className="roast-dots">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className="rdot" style={{ opacity: n <= roastNum ? 1 : 0.18 }}>🫘</span>
                ))}
              </div>
            </div>
          )}
          {item.intensity && (
            <div className="fb-row">
              <span className="fb-lbl">Intensity</span>
              <div className="int-dots">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className={`idot ${n <= item.intensity ? 'on' : ''}`} />
                ))}
              </div>
            </div>
          )}
          {item.cocoa !== undefined && (
            <>
              <div className="fb-lbl" style={{ marginTop: 4 }}>Cocoa {item.cocoa}%</div>
              <div className="cocoa-track"><div className="cocoa-fill" style={{ width: `${item.cocoa}%` }} /></div>
            </>
          )}
          {item.flavors && (
            <div className="flavor-wrap">
              {item.flavors.map(f => <span key={f} className="flavor-chip">{f}</span>)}
            </div>
          )}
          {item.tags && (
            <div className="flavor-wrap">
              {item.tags.map(t => <span key={t} className="flavor-chip">{t}</span>)}
            </div>
          )}
          <button className={`fb-add ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Added!' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
