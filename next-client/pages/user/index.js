import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function User() {
  const { auth, setAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 根据用户登录状态自动导航到不同页面
    if (auth.isAuth) {
      router.push('/user/profile') // 用户已登录，导航到仪表板页面
    } else {
      router.push('/user/login') // 用户未登录，导航到登录页面
    }
  }, [auth, router])

  return (
    <>
      <div style={{ height: '480px' }}>頁面跳轉中...</div>
      {console.log(auth.isAuth)}
    </>
  )
}
