import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useAuth } from './useAuth'
const CouponContext = createContext(null)

export default function CouponProvider({ children }) {
  const router = useRouter()
  const { auth, setAuth } = useAuth()

  // 讀取優惠券(user_coupon.status = 1)
  const [coupon, setCoupon] = useState({
    coupon: {
      couponId: '',
      coupon_name: '',
      coupon_code: '',
      description: '',
      threshold: '',
      discount_percent: '',
      discount_value: '',
      end_date: '',
    },
  })

  // 讀取歷史紀錄優惠券(user_coupon.status != 1)
  const [history, setHistory] = useState({
    history: {
      couponId: '',
      coupon_name: '',
      coupon_code: '',
      description: '',
      threshold: '',
      discount_percent: '',
      discount_value: '',
      end_date: '',
    },
  })

  const getCoupon = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/coupon', {
        withCredentials: true,
      })
      console.log('優惠券data')
      console.log(response.data)
      if (response.data.message === 'authorized') {
        // setCoupon(response.data.rows)
        setCoupon(response.data.coupon)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 新增優惠券
  const addCoupon = async (couponCode, userId) => {
    const codeData = {
      couponCode: couponCode,
      userId: userId,
    }
    try {
      const response = await axios.post(
        'http://localhost:3005/api/coupon',
        codeData,
        {
          withCredentials: true, // save cookie in browser
        }
      )
      console.log(response.data)
      if (response.data.code !== '200') {
        Swal.fire({
          icon: 'error',
          title: '新增優惠碼失敗',
          text: '優惠碼輸入錯誤',
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: '新增優惠碼成功',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          router.push('/user/coupon')
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getHistory = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3005/api/coupon/history',
        {
          withCredentials: true,
        }
      )
      console.log('歷史優惠券data')
      console.log(response.data)
      if (response.data.message === 'authorized') {
        // setCoupon(response.data.rows)
        setHistory(response.data.history)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!auth.isAuth) {
      setCoupon({
        coupon: {
          couponId: '',
          coupon_name: '',
          coupon_code: '',
          description: '',
          threshold: '',
          discount_percent: '',
          discount_value: '',
          end_date: '',
        },
      })
    } else {
      getCoupon()
    }
    console.log('useCoupon')
    console.log(coupon)
  }, [])

  return (
    <>
      <CouponContext.Provider
        value={{
          coupon,
          setCoupon,
          getCoupon,
          addCoupon,
          history,
          setHistory,
          getHistory,
        }}
      >
        {children}
      </CouponContext.Provider>
    </>
  )
}
export const useCoupon = () => {
  return useContext(CouponContext)
}
