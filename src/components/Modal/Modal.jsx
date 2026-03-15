import React, { useState } from 'react'
import FOOD_IMGS from '../../data/icons.js'
import { allModal, SILOGS } from '../../data/menuData.js'
import { useStore, closeModal, addToCart, showToast } from '../../store/useStore.js'

export default function Modal() {
  const { modalId } = useStore()
  const [sauce, setSauce] = useState({})
  const [protein, setProtein] = useState({})
  const [qty, setQty] = useState({})

  const item = allModal.find(i => i.id === modalId)
  if (!item || !modalId) return <div className="modal-overlay" id="modalOverlay" />

  const isSilog = SILOGS.some(s => s.id === modalId)
  const q = qty[modalId] || 1
  const photo = item.img && FOOD_IMGS[item.img]

  const handleAdd = () => {
    const extra = protein[modalId] || sauce[modalId] || ''
    for (let i = 0; i < q; i++) addToCart(`${modalId}${i}${Date.now()}`, item.name, item.price, item.img, extra)
    showToast(`🛒 ${item.name} added!`)
    setTimeout(closeModal, 1100)
  }

  return (
    <div className="modal-overlay open" id="modalOverlay" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal">
        {/* Hero */}
        <div id="modalHero" style={photo
          ? { backgroundImage: `url('${photo}')`, backgroundSize: '50%', backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat', backgroundColor: '#2A1005', minHeight: 235, borderRadius: '28px 28px 0 0', position: 'relative', overflow: 'hidden' }
          : { minHeight: 235, borderRadius: '28px 28px 0 0', position: 'relative', overflow: 'hidden', background: 'var(--warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {photo && <div className="modal-hero-overlay" />}
          {!photo && <span style={{ fontSize: '5rem' }}>{item.emoji}</span>}
          {item.badge && <div className="modal-hero-badge">{item.badge}</div>}
          <button className="modal-close" onClick={closeModal}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-name">{item.name}</div>
          <div className="modal-price">₱{item.price}<span className="modal-stars">★★★★★</span></div>
          <div className="modal-desc">{item.desc}{item.story && <><br /><br /><em style={{ color: 'var(--coffee)', fontSize: '0.79rem' }}>"{item.story}"</em></>}</div>

          {isSilog && item.variants?.length > 0 && (<>
            <div className="modal-sec-lbl">Protein Choice</div>
            <select className="modal-select" defaultValue={item.variants[0]} onChange={e => setProtein({ ...protein, [modalId]: e.target.value })}>
              {item.variants.map(v => <option key={v}>{v}</option>)}
            </select>
          </>)}

          {isSilog && (<>
            <div className="modal-sec-lbl">Includes</div>
            <div className="inc-tags">
              <span className="inc-tag">🍚 Garlic Rice</span>
              <span className="inc-tag">🍳 Fried Egg</span>
              <span className="inc-tag">🥒 Atchara</span>
            </div>
            <div className="modal-sec-lbl">Sawsawan</div>
            {['Spicy Vinegar', 'Soy + Calamansi', 'Plain'].map(s => (
              <div key={s} className={`saws-row ${sauce[modalId] === s ? 'sel' : ''}`}
                onClick={() => setSauce({ ...sauce, [modalId]: s })}>{s}</div>
            ))}
            <div className="modal-sec-lbl">Upgrades</div>
            <div className="upgrade-row"><span>Extra Egg</span><span style={{ color: 'var(--gold)', fontWeight: 700 }}>+₱20</span></div>
            <div className="upgrade-row"><span>Extra Rice</span><span style={{ color: 'var(--gold)', fontWeight: 700 }}>+₱15</span></div>
            {item.cal && (<>
              <div className="modal-sec-lbl">Nutrition</div>
              <div className="nutri-grid">
                <div className="nutri-cell"><div className="nutri-val">{item.cal}</div><div className="nutri-lbl">Calories</div></div>
                <div className="nutri-cell"><div className="nutri-val">{item.protein}g</div><div className="nutri-lbl">Protein</div></div>
                <div className="nutri-cell"><div className="nutri-val">{item.carbs}g</div><div className="nutri-lbl">Carbs</div></div>
              </div>
            </>)}
          </>)}

          {!isSilog && item.sauces?.length > 0 && (<>
            <div className="modal-sec-lbl">Choose Sauce</div>
            <div className="sauce-grp">
              {item.sauces.map(s => (
                <button key={s} className={`sauce-chip ${sauce[modalId] === s ? 'on' : ''}`}
                  onClick={() => setSauce({ ...sauce, [modalId]: s })}>{s}</button>
              ))}
            </div>
          </>)}
          {!isSilog && item.tags?.length > 0 && (<>
            <div className="modal-sec-lbl">Details</div>
            <div className="inc-tags">{item.tags.map(t => <span key={t} className="inc-tag">{t}</span>)}</div>
          </>)}
          {!isSilog && item.richness && (<>
            <div className="modal-sec-lbl">Richness</div>
            <div className="rich-dots">{[1,2,3,4,5].map(n => <div key={n} className={`rich-dot ${n <= item.richness ? 'on' : ''}`} />)}</div>
          </>)}
          {!isSilog && item.note && <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', marginTop: 12 }}>{item.note}</p>}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="m-qty-btn" onClick={() => setQty({ ...qty, [modalId]: Math.max(1, q - 1) })}>−</button>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', width: 28, textAlign: 'center' }}>{q}</span>
          <button className="m-qty-btn" onClick={() => setQty({ ...qty, [modalId]: q + 1 })}>+</button>
          <button className="m-add-btn" onClick={handleAdd}>Add to Cart — ₱{item.price * q}</button>
        </div>
      </div>
    </div>
  )
}
