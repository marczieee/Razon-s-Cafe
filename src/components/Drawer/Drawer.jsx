import React, { useState } from 'react'
import FOOD_IMGS from '../../data/icons.js'
import { PASTAS } from '../../data/menuData.js'
import { useStore, closeDrawer, addToCart, showToast } from '../../store/useStore.js'

const TABS = ['desc', 'ingredients', 'pairing', 'reviews']
const TAB_LABELS = { desc: 'Description', ingredients: 'Ingredients', pairing: 'Pairing', reviews: 'Reviews' }

export default function Drawer() {
  const { drawerId } = useStore()
  const [activeTab, setActiveTab] = useState({})
  const [spice, setSpice] = useState({})
  const [addons, setAddons] = useState({})
  const [qty, setQty] = useState({})
  const [added, setAdded] = useState(false)

  const p = PASTAS.find(p => p.id === drawerId)
  if (!p || !drawerId) return <><div className="drawer-overlay" id="drawerOverlay" /><div className="drawer" id="drawer" /></>

  const tab = activeTab[drawerId] || 'desc'
  const q = qty[drawerId] || 1
  const currentSpice = spice[drawerId] || 'none'
  const currentAddons = addons[drawerId] || {}
  const photo = p.img && FOOD_IMGS[p.img]

  const addonExtra = p.addons
    ? Object.keys(currentAddons).filter(k => currentAddons[k]).reduce((sum, k) => {
        const a = p.addons.find(a => a.label === k)
        return sum + (a ? a.price : 0)
      }, 0)
    : 0

  const handleAdd = () => {
    for (let i = 0; i < q; i++)
      addToCart(`d${p.id}${i}${Date.now()}`, p.name, p.price + addonExtra, p.img, currentSpice !== 'none' ? currentSpice : '')
    showToast(`🛒 ${p.name} added!`)
    setAdded(true)
    setTimeout(() => { setAdded(false); closeDrawer() }, 1100)
  }

  const SPICE_LABELS = { none: '🌿 None', mild: '🌶 Mild', spicy: '🌶🌶 Spicy', extra: '🌶🌶🌶 Extra' }

  const tabContent = {
    desc: <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--muted)' }}>{p.desc}<br /><br /><span style={{ fontSize: '0.76rem' }}>🍽 {p.portion} · Made fresh daily</span></p>,
    ingredients: <div className="ing-pills">{p.ingredients.map(i => <span key={i} className="ing-pill">{i}</span>)}</div>,
    pairing: <><p style={{ fontSize: '0.84rem', lineHeight: 1.75, color: 'var(--muted)' }}>{p.pairing}</p><br /><div>{['🍵 Fruit Tea', '🍮 Leche Flan', '☕ Any Coffee'].map(t => <span key={t} className="pair-tag">{t}</span>)}</div></>,
    reviews: p.reviews?.map(r => (
      <div key={r.name} className="review-card">
        <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{r.avatar}</div>
        <div>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--muted)' }}>"{r.text}"</p>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--coffee)', marginTop: 6 }}>— {r.name} <span style={{ color: 'var(--gold)' }}>★★★★★</span></p>
        </div>
      </div>
    ))
  }

  return (
    <>
      <div className="drawer-overlay open" id="drawerOverlay" onClick={closeDrawer} />
      <div className="drawer open" id="drawer">
        <div className="drag-bar" />
        <button className="drawer-close" onClick={closeDrawer}>✕</button>

        {/* Food photo */}
        <div className="drawer-food-photo"
          style={photo
            ? { backgroundImage: `url('${photo}')`, backgroundSize: '55%', backgroundPosition: 'center 65%', backgroundRepeat: 'no-repeat', backgroundColor: '#FDF6EC', minHeight: 210 }
            : { minHeight: 210, background: 'var(--parchment)' }} />

        <div className="drawer-body">
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--coffee)', marginBottom: 4 }}>{p.name}</div>
          <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: '1.05rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--terra),#8B3010)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 14 }}>₱{p.price}</div>

          {/* Tabs */}
          <div className="drawer-tabs">
            {TABS.map(t => (
              <button key={t} className={`dtab ${tab === t ? 'on' : ''}`}
                onClick={() => setActiveTab({ ...activeTab, [drawerId]: t })}>
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>{tabContent[tab]}</div>

          {/* Spice */}
          {p.spice && (
            <div style={{ marginTop: 14 }}>
              <div className="modal-sec-lbl">Spice Level</div>
              <div className="spice-grp">
                {Object.entries(SPICE_LABELS).map(([val, label]) => (
                  <button key={val} className={`spice-btn ${currentSpice === val ? 'on' : ''}`}
                    onClick={() => setSpice({ ...spice, [drawerId]: val })}>{label}</button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {p.addons && (
            <div style={{ marginTop: 14 }}>
              <div className="modal-sec-lbl">Add-ons</div>
              {p.addons.map(a => {
                const checked = !!currentAddons[a.label]
                return (
                  <div key={a.label} className={`addon-row ${checked ? 'checked' : ''}`}
                    onClick={() => setAddons({ ...addons, [drawerId]: { ...currentAddons, [a.label]: !checked } })}>
                    <div className="addon-box">{checked ? '✓' : ''}</div>
                    <span style={{ fontSize: '0.84rem' }}>{a.label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 700, marginLeft: 'auto' }}>+₱{a.price}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Qty + Add */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
            <button className="qty-btn" onClick={() => setQty({ ...qty, [drawerId]: Math.max(1, q - 1) })}>−</button>
            <span className="qty-num">{q}</span>
            <button className="qty-btn" onClick={() => setQty({ ...qty, [drawerId]: q + 1 })}>+</button>
          </div>
          <button className={`drawer-add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Added!' : `Add to Cart — ₱${(p.price + addonExtra) * q}`}
          </button>
        </div>
      </div>
    </>
  )
}
