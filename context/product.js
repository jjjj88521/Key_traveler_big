import React, { createContext, useContext, useState } from 'react'

const ProductDataContext = createContext()

export function ProductDataProvider({ children }) {
  const [productData, setProductData] = useState({})
  const [commentData, setCommentData] = useState({})
  const [commentCount, setCommentCount] = useState({})
  const [isLiked, setIsLiked] = useState(false)

  return (
    <ProductDataContext.Provider
      value={{
        productData,
        setProductData,
        commentData,
        setCommentData,
        commentCount,
        setCommentCount,
        isLiked,
        setIsLiked,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  )
}

export function useProductData() {
  return useContext(ProductDataContext)
}
