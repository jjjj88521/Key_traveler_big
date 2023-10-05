import React, { createContext, useContext, useState } from 'react'

// 创建一个新的 Context
const cartContext = createContext()

export function CartPriceContext({ children }) {
  const [priceData, setPrice] = useState(null)

  return (
    <cartContext.Provider value={{ priceData, setPrice }}>
      {children}
    </cartContext.Provider>
  )
}
// ==============================
export function useCartContext() {
  return useContext(cartContext)
}
