import { set } from 'lodash'
import { useState, useEffect } from 'react'

export default function useRecentlyViewed({ type }) {
  const storageKey = `recently-viewed-${type}`
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
  })

  // 添加到最近瀏覽
  const addToRecentlyViewed = (productData) => {
    // 檢查是否已經有該商品，如果有就將其換到最前
    const index = recentlyViewed.findIndex((item) => item.id === productData.id)
    if (index !== -1) {
      setRecentlyViewed((prev) => {
        const list = [...prev]
        list.splice(index, 1)
        return [productData, ...list]
      })
    } else {
      // 最多只有四個瀏覽過的商品
      const max = 4
      if (recentlyViewed.length >= max) {
        setRecentlyViewed((prev) => prev.slice(0, 3))
      }
      // 添加商品
      setRecentlyViewed((prev) => [productData, ...prev])
    }
  }

  // 狀態變更，更新 localStorage
  useEffect(() => {
    // 更新 localStorage
    localStorage.setItem(storageKey, JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  return [recentlyViewed, addToRecentlyViewed]
}
