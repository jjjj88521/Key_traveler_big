// 取得登入會員的所有收藏商品 id，並且存成物件，包含三種商品的陣列
import { useSelector } from 'react-redux'
import axios from 'axios'
import React, { useContext, useState, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const AllPdLikeContext = createContext()

export function AllPdLikeProvider({ children }) {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const [allPdLike, setAllPdLike] = useState({ pd: [], gb: [], rt: [] })

  const getAllPdLike = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          '/api/product-like/my-favorite',
        {
          withCredentials: true,
        }
      )
      //   console.log(response)
      if (response.data.message !== 'Forbidden') {
        setAllPdLike(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllPdLike()
    router.events.on('routeChangeStart', getAllPdLike)

    return () => {
      router.events.off('routeChangeStart', getAllPdLike)
    }
  }, [auth, router])
  return (
    <AllPdLikeContext.Provider value={{ allPdLike, setAllPdLike }}>
      {children}
    </AllPdLikeContext.Provider>
  )
}

export function useAllPdLike() {
  return useContext(AllPdLikeContext)
}
