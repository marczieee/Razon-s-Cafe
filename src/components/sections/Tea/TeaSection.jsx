import React, { useState } from 'react'
import FOOD_IMGS from '../../../data/icons.js'
import { TEAS } from '../../../data/menuData.js'
import { addToCart, showToast } from '../../../store/useStore.js'

function TeaCard({ tea, openId, setOpenId }) {
  const isOpen = openId === tea.id
  const [qty, setQty]       = useState(1)
  const [serve, setServe]   = useState('cold')
  const [added, setAdded]   = useState(false)
  const photo = tea.img && FOOD_IMGS[tea.img]

  const handleAdd = (e) => {
    e.stopPropagation()
    for (let i = 0; i < qty; i++)
      addToCart(`t${tea.id}${serve}${i}${Date.now()}`, tea.name, 50, tea.img, serve === 'hot' ? 'Hot' : 'Iced')
    showToast(`🛒 ${tea.name} added!`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const METERS = [
    ['Sweetness', '#F4A261', tea.sweet],
    ['Tartness',  '#E76F8A', tea.tart],
    ['Refreshment','#4A8FA8', tea.refresh],
  ]

  return (
    <div className={`tea-card ${isOpen ? 'open' : ''}`}>
      <div className="tea-hdr" onClick={() => setOpenId(isOpen ? null : tea.id)}
        style={{ borderLeft: `4px solid ${tea.color}` }}>
        <div className="tea-thumb"
          style={photo
            ? { backgroundImage: `url('${photo}')`, backgroundSize: '80%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', border: `2px solid ${tea.color}` }
            : { background: tea.bg }} />
        <div>
          <div className="tea-name">{tea.name}</div>
          <div className="tea-note">{tea.note}</div>
        </div>
        <div className="tea-badge" style={{ background: tea.color }}>₱50</div>
      </div>

      <div className="tea-expand">
        <div className="tea-body">
          {photo && <img src={photo} alt={tea.name} className="tea-preview" style={{ width: 110, height: 90, objectFit: 'contain', borderRadius: 14, display: 'block', margin: '12px auto 14px' }} />}
          <p style={{ fontSize: '0.76rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>{tea.desc}</p>
          {METERS.map(([label, color, val]) => (
            <div key={label} className="meter-row">
              <span className="meter-lbl">{label}</span>
              <div className="meter-track"><div className="meter-fill" style={{ width: `${val*20}%`, background: color }} /></div>
              <span className="meter-val" style={{ color }}>{val}/5</span>
            </div>
          ))}
          <div className="serve-tog" onClick={e => e.stopPropagation()}>
            {['hot','cold'].map(s => (
              <button key={s} className={`serve-btn ${serve === s ? 'on' : ''}`}
                style={serve === s ? { background: s === 'hot' ? '#C0602A' : '#4A8FA8' } : {}}
                onClick={() => setServe(s)}>
                {s === 'hot' ? '🔥 Hot' : '🧊 Cold'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted)', marginBottom: 4 }}>Sweetness</div>
          <input type="range" min={1} max={5} defaultValue={3} className="sweet-range" onClick={e => e.stopPropagation()} />
          <p style={{ fontSize: '0.66rem', color: 'var(--muted)', marginBottom: 12 }}>🍬 Best paired with Silog Meals or Pasta</p>
          <div className="qty-row" onClick={e => e.stopPropagation()}>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            <button className={`tea-add-btn ${added ? 'added' : ''}`}
              style={added ? {} : { background: `linear-gradient(145deg,${tea.color},${tea.color}CC)` }}
              onClick={handleAdd}>
              {added ? '✓ Added!' : `Add to Cart — ₱${50 * qty}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeaSection() {
  const [openId, setOpenId] = useState(null)
  return (
    <section className="section section-light" id="tea">
      <div className="sec-hdr">
        <div className="sec-tag" style={{ color: 'var(--gold)' }}>
          <span className="sec-tag-line" />Only ₱50<span className="sec-tag-line" />
        </div>
        <h2 className="sec-title">🍹 Fruit <em style={{ fontStyle: 'italic' }}>Teas</em></h2>
        <p className="sec-sub">Handcrafted fruit teas, fresh every day. Tap a card to customize your drink.</p>
      </div>
      <div className="tea-grid">
        {TEAS.map(tea => <TeaCard key={tea.id} tea={tea} openId={openId} setOpenId={setOpenId} />)}
      </div>
    </section>
  )
}
