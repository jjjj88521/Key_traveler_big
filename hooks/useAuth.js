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
      expiry: '',
    },
  })

  const router = useRouter()
  const { asPath } = router

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
    }
  }, [router.isReady, asPath])

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
