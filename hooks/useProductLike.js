import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
export const useProductLike = () => {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()
  const { pid } = router.query

  // 取得該商品是否已被收藏
  const fetchProductLike = async (pid) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/product-like/${pid}`,
        {
          withCredentials: true, // 跨域獲取cookie
        }
      )
      if (response.status === 200) {
        setIsLiked(response.data.is_favorite)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 新增收藏
  const addLike = async (pid) => {
    try {
      const response = await axios.put(
        `http://localhost:3005/api/product-like/${pid}`,
        {},
        {
          withCredentials: true,
        }
      )

      if (response.data.code === '200') {
        setIsLiked(true)
        return true // 或其他適當的回應
      } else {
        throw new Error('發生錯誤')
      }
    } catch (error) {
      console.log(error)
      return false // 或其他適當的回應
    }
  }

  // 刪除收藏
  const deleteLike = async (pid) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/product-like/${pid}`,
        {
          withCredentials: true,
        }
      )

      if (response.data.code === '200') {
        setIsLiked(false)
        return true // 或其他適當的回應
      } else {
        throw new Error('發生錯誤')
      }
    } catch (error) {
      console.log(error)
      return false // 或其他適當的回應
    }
  }

  const toggleLike = async () => {
    try {
      const response = isLiked ? await deleteLike() : await addLike()
      if (response) {
        setIsLiked(!isLiked)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductLike(pid)
  }, [router.isReady])

  return { isLiked, addLike, deleteLike, toggleLike }
}
