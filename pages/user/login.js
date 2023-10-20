import LoginForm from '@/components/user/login-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import UserLayout from '@/components/layout/user-layout'
import LineLoginJWT from '@/components/user/line-login-jwt'
export default function Login() {
  // 用戶直接跳轉，清掉原頁面的 localStorage，以免之後會有問題
  const router = useRouter()
  useEffect(() => {
    // 清除 localStorage 中的資料
    const clearRedirect = () => {
      localStorage.removeItem('redirect')
    }

    // 監聽路由變化
    const handleRouteChange = (url) => {
      if (url !== '/user/login') {
        clearRedirect()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  return (
    <>
      <UserLayout title={''} isLoginPage={true}>
        <LoginForm />
        {/* <LineLoginJWT /> */}
      </UserLayout>
    </>
  )
}
