import { useEffect } from 'react'
import axios from 'axios'

export default function ProductFetcher({ onProductFetched }) {
  useEffect(() => {
    const FetchedProduct = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/products'
        )
        // console.log(response.data)
        onProductFetched(response.data)
      } catch (error) {
        console.log('資料獲取失敗：', error)
      }
    }
    FetchedProduct()
  }, [])
}
