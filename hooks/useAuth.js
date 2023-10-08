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
      } else {
        Swal.fire({
          icon: 'error',
          title: '已登出，請重新登入',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()
    }
  }, [])

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('loginToken')
  //   if (storedToken) {
  //     setAuth({
  //       isAuth: true,
  //       user: jwtDecode(storedToken),
  //     })
  //   }
  // }, [])

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
