import { useEffect } from 'react'
import axios from 'axios'

export default function CouponFetcher() {
  useEffect(() => {
    const FetchedProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/coupon')
        console.log(response.data)
      } catch (error) {
        console.log('資料獲取失敗：', error)
      }
    }
    FetchedProduct()
  }, [])
}
