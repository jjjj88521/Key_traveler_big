import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductDataContext = createContext()

export function ProductDataProvider({ children }) {
  const [productData, setProductData] = useState({})
  const [maybeLike, setMaybeLike] = useState([])
  const [commentData, setCommentData] = useState({})
  const [commentCount, setCommentCount] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  return (
    <ProductDataContext.Provider
      value={{
        productData,
        setProductData,
        maybeLike,
        setMaybeLike,
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
