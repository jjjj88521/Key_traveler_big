import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: {
      id: 0,
      name: '',
      account: '',
      gender: '',
      address: '',
      phone: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      cardName: '',
      exp: '',
      vip: '',
    },
  })

  const router = useRouter()
  const { asPath } = router

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

  const getCoupon = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/coupon', {
        withCredentials: true,
      })
      // console.log('優惠券data')
      // console.log(response.data)
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
    if (couponCode === '') {
      return Swal.showValidationMessage(`請輸入內容`)
    }
    try {
      const response = await axios.post(
        'http://localhost:3005/api/coupon',
        codeData,
        {
          withCredentials: true, // save cookie in browser
        }
      )
      // console.log(response.data)
      if (response.data.code !== '200') {
        if (response.data.code === '400') {
          Swal.fire({
            icon: 'error',
            title: '新增優惠碼失敗',
            text: '優惠碼輸入錯誤',
          })
        } else if (response.data.code === '403') {
          Swal.fire({
            icon: 'error',
            title: '新增優惠碼失敗',
            text: '該優惠碼已過期',
          })
        } else if (response.data.code === '402') {
          Swal.fire({
            icon: 'error',
            title: '新增優惠碼失敗',
            text: '已持有該優惠碼',
          })
        }
      } else {
        Swal.fire({
          icon: 'success',
          title: '新增優惠碼成功',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          getCoupon()
          router.push('/user/coupon')
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 讀取已過期優惠券(user_coupon.status = 0)
  const [couponExpired, setCouponExpired] = useState({
    couponExpired: {
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
  const getCouponExpired = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3005/api/coupon/couponExpired',
        {
          withCredentials: true,
        }
      )
      // console.log('已過期優惠券data')
      // console.log(response.data)
      if (response.data.message === 'authorized') {
        // setCoupon(response.data.rows)
        setCouponExpired(response.data.couponExpired)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 讀取已使用優惠券(user_coupon.status =2)
  const [couponUsed, setCouponUsed] = useState({
    couponUsed: {
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
  const getCouponUsed = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3005/api/coupon/couponUsed',
        {
          withCredentials: true,
        }
      )
      // console.log('已使用優惠券data')
      // console.log(response.data)
      if (response.data.message === 'authorized') {
        // setCoupon(response.data.rows)
        setCouponUsed(response.data.couponUsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 檢查會員證證用
  const checkAuth = async () => {
    try {
      await axios
        .get('http://localhost:3005/api/auth-jwt/check-login', {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.message !== 'authorized') {
            throw new Error('請先登入會員')
          }
          setAuth({
            isAuth: true,
            user: response.data.user,
          })
          getCoupon()
          // checkLogin()
        })
        .catch((error) => {
          if (
            asPath.startsWith('/user') &&
            asPath !== '/user/login' &&
            asPath !== '/user/register'
          ) {
            Swal.fire({
              icon: 'error',
              title: error.message,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              router.push('/user/login')
            })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  // 重新讀取資料庫S
  async function checkLogin() {
    try {
      const res = await axios.get(
        'http://localhost:3005/api/auth-jwt/check-login',
        {
          withCredentials: true,
        }
      )
      console.log(`checklogoin:`)
      console.log(res)
      const id = res.data.user.id
      console.log('id')
      console.log(id)

      const userRes = await axios.get(`http://localhost:3005/api/users/${id}`)
      console.log('123123123123')
      console.log(userRes.data.user)

      setAuth({
        isAuth: true,
        user: userRes.data.user,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 重新讀取資料庫E
  useEffect(() => {
    checkLogin()
  }, [router.isReady, asPath])
  useEffect(() => {
    console.log('result')
    console.log(auth)
  }, [auth])
  // 登入
  const login = async (account, password) => {
    // 取得原頁面，登入成功跳轉到原頁面
    const redirect = localStorage.getItem('redirect') || '/user/profile'
    const formData = {
      account: account,
      password: password,
    }
    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        formData,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.code !== 200) {
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: '帳號或密碼錯誤',
          timer: 1500,
        })
      }
      // console.log(response.data)
      setAuth({
        isAuth: true,
        user: jwtDecode(response.data.accessToken),
      })
      getCoupon()
      // setLoginToken(response.data.accessToken)
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.removeItem('redirect')
        router.push(redirect)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 登出
  const logout = async () => {
    // 登出跳轉回原頁面
    const redirect = localStorage.getItem('redirect') || '/'
    try {
      Swal.fire({
        title: '確定要登出嗎？',
        text: '登出後將無法使用會員功能',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              'http://localhost:3005/api/auth-jwt/logout',
              {},
              {
                withCredentials: true, // save cookie in browser
              }
            )
            .then((res) => {
              localStorage.removeItem('loginToken')
              setAuth({
                isAuth: false,
                user: {
                  id: 0,
                  name: '',
                  account: '',
                  gender: '',
                  address: '',
                  phone: '',
                  birthday: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  cardNumber: '',
                  cardName: '',
                  expiry: '',
                },
              })
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

              Swal.fire({
                icon: 'success',
                title: '登出成功',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                // 跳轉回原頁面
                localStorage.removeItem('redirect')
                router.push(redirect.startsWith('/user') ? '/' : redirect)
              })
            })
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '登出失敗',
        text: '發生了一些錯誤，請稍後再試',
      })
    }
  }

  // 當刷新頁面，重新檢查是否登入
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()

      console.log(auth)
    }
  }, [router.isReady, asPath])

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          login,
          logout,
          coupon,
          getCoupon,
          setCoupon,
          addCoupon,
          couponExpired,
          setCouponExpired,
          getCouponExpired,
          couponUsed,
          setCouponUsed,
          getCouponUsed,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
