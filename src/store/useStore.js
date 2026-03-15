// ═══════════════════════════════════════════════════
// Simple global state store (no external dependency)
// ═══════════════════════════════════════════════════
import { useState, useEffect } from 'react'

const state = {
  cart: [], toast: null, cartOpen: false,
  modalId: null, drawerId: null, toastTimer: null,
  listeners: new Set(),
}

function notify() { state.listeners.forEach(fn => fn()) }

export function addToCart(key, name, price, img, extra = '') {
  const ex = state.cart.find(i => i.key === key)
  if (ex) ex.qty++
  else state.cart = [...state.cart, { key, name, price, img, extra, qty: 1 }]
  notify()
}
export function changeQty(key, delta) {
  state.cart = state.cart.map(i => i.key === key ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
  notify()
}
export function clearCart() { state.cart = []; notify() }
export function openCart()  { state.cartOpen = true;  notify() }
export function closeCart() { state.cartOpen = false; notify() }
export function showToast(msg) {
  if (state.toastTimer) clearTimeout(state.toastTimer)
  state.toast = msg; notify()
  state.toastTimer = setTimeout(() => { state.toast = null; notify() }, 3200)
}
export function openModal(id)  { state.modalId  = id;   notify() }
export function closeModal()   { state.modalId  = null; notify() }
export function openDrawer(id) { state.drawerId = id;   notify() }
export function closeDrawer()  { state.drawerId = null; notify() }

export function useStore() {
  const [, rerender] = useState(0)
  useEffect(() => {
    const fn = () => rerender(n => n + 1)
    state.listeners.add(fn)
    return () => state.listeners.delete(fn)
  }, [])
  return {
    cart: state.cart, toast: state.toast,
    cartOpen: state.cartOpen, modalId: state.modalId, drawerId: state.drawerId,
    totalItems: state.cart.reduce((s, i) => s + i.qty, 0),
    totalPrice: state.cart.reduce((s, i) => s + i.price * i.qty, 0),
  }
}
