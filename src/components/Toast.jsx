import React, { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore.js'

export default function Toast() {
  const { toast } = useStore()
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (toast) {
      ref.current.classList.add('show')
    } else {
      ref.current.classList.remove('show')
    }
  }, [toast])

  return (
    <div id="toast" ref={ref}>
      {toast}
    </div>
  )
}
