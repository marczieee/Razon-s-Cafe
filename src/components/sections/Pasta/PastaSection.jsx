import React from 'react'
import FOOD_IMGS from '../../../data/icons.js'
import { PASTAS } from '../../../data/menuData.js'
import { openDrawer } from '../../../store/useStore.js'

export default function PastaSection() {
  return (
    <section className="section section-light" id="pasta">
      <div className="sec-hdr">
        <div className="sec-tag" style={{ color: 'var(--gold)' }}>
          <span className="sec-tag-line" />House Made<span className="sec-tag-line" />
        </div>
        <h2 className="sec-title">🍝 Signature <em style={{ fontStyle: 'italic' }}>Pasta</em></h2>
        <p className="sec-sub">Crafted from scratch, every single day. Tap a card to see full details.</p>
      </div>
      <div className="pasta-grid">
        {PASTAS.map(p => {
          const photo = p.img && FOOD_IMGS[p.img]
          return (
            <div key={p.id} className="pasta-card" onClick={() => openDrawer(p.id)}>
              <div className="pasta-img"
                style={photo ? { backgroundImage: `url('${photo}')`, backgroundSize: '80%', backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat' } : {}}>
                {!photo && <span style={{ fontSize: '3.8rem', position: 'relative', zIndex: 2 }}>{p.emoji}</span>}
              </div>
              <div className="pasta-body">
                <span className="pasta-tag-pill" style={{ background: p.tagColor, color: p.tagText }}>{p.tag}</span>
                <div className="pasta-name">{p.name}</div>
                <div className="pasta-price">₱{p.price}</div>
                <div className="pasta-desc">{p.desc.substring(0, 90)}...</div>
                <div className="pasta-hint">Tap for full details & customization →</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
