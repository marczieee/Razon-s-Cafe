import React from 'react'
import FOOD_IMGS from '../../data/icons.js'
import { useStore, changeQty, clearCart, closeCart, showToast } from '../../store/useStore.js'

export default function CartSidebar() {
  const { cart, cartOpen, totalPrice } = useStore()

  const checkout = () => {
    clearCart(); closeCart(); showToast('🎉 Order placed! Salamat po!')
  }

  return (
    <>
      <div className={`cart-ov ${cartOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-hdr">
          <h3>Your Order</h3>
          <button className="cart-cls" onClick={closeCart}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">☕</div>
              <p style={{ color: 'var(--muted)', fontSize: '0.86rem' }}>
                Your cart is empty<br /><small>Start adding items!</small>
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div className="c-item" key={item.key}>
                <div
                  className="c-item-thumb"
                  style={item.img && FOOD_IMGS[item.img]
                    ? { backgroundImage: `url('${FOOD_IMGS[item.img]}')`, backgroundSize: '80%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
                    : {}}
                />
                <div style={{ flex: 1 }}>
                  <div className="c-item-name">
                    {item.name}
                    {item.extra && <span className="c-item-extra"> ({item.extra})</span>}
                  </div>
                  <div className="c-item-price">₱{item.price}</div>
                  <div className="c-qty-wrap">
                    <button className="c-qty-btn" onClick={() => changeQty(item.key, -1)}>−</button>
                    <span className="c-qty-num">{item.qty}</span>
                    <button className="c-qty-btn" onClick={() => changeQty(item.key, 1)}>+</button>
                  </div>
                </div>
                <div className="c-item-total">₱{item.price * item.qty}</div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-ftr">
            <div className="cart-total"><span>Total</span><span>₱{totalPrice}</span></div>
            <button className="cart-order-btn" onClick={checkout}>🛒 Place Order</button>
            <button className="cart-clr" onClick={clearCart}>Clear cart</button>
          </div>
        )}
      </div>
    </>
  )
}
