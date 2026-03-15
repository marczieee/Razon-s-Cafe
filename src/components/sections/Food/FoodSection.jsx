import React from 'react'
import FOOD_IMGS from '../../../data/icons.js'
import { openModal } from '../../../store/useStore.js'

function FoodCard({ item }) {
  const photo = item.img && FOOD_IMGS[item.img]
  return (
    <div className="food-card" onClick={() => openModal(item.id)}>
      <div className="food-img"
        style={photo ? { backgroundImage: `url('${photo}')`, backgroundSize: '78%', backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat' } : {}}>
        {!photo && <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 2 }}>{item.emoji}</span>}
        {item.badge && <div className="food-bdg">{item.badge}</div>}
      </div>
      <div className="food-body">
        <div className="food-name">{item.name}</div>
        <div className="food-sub">{item.desc.substring(0, 70)}...</div>
        <div className="food-footer">
          <span className="food-price">₱{item.price}</span>
          <span className="food-tap">Tap to order →</span>
        </div>
      </div>
    </div>
  )
}

export default function FoodSection({ id, tag, title, titleEm, sub, items, bg = 'section-parchment' }) {
  return (
    <section className={`section ${bg}`} id={id}>
      <div className="sec-hdr">
        <div className="sec-tag" style={{ color: 'var(--gold)' }}>
          <span className="sec-tag-line" />{tag}<span className="sec-tag-line" />
        </div>
        <h2 className="sec-title">{title} <em style={{ fontStyle: 'italic' }}>{titleEm}</em></h2>
        <p className="sec-sub">{sub}</p>
      </div>
      <div className="food-grid">
        {items.map(item => <FoodCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}
