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

  // 檢查會員證證用
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3005/api/auth-jwt/check-login',
        {
          withCredentials: true,
        }
      )
      console.log(response.data)
      if (response.data.message === 'authorized') {
        setAuth({
          isAuth: true,
          user: response.data.user,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 登入
  const login = async (account, password) => {
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
        router.push('/user/profile')
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 登出
  const logout = async () => {
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
                router.push('/')
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
  }, [])

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
