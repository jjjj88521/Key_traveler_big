import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import LoadingPage from '@/components/common/loadingPage'

export default function User() {
  const { auth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // // 根据用户登录状态自动导航到不同页面
    // if (localStorage.getItem('loginToken')) {
    //   router.push('/user/profile') // 用户已登录，导航到仪表板页面
    // } else {
    //   router.push('/user/login') // 用户未登录，导航到登录页面
    // }
    if (auth.isAuth) {
      router.push('/user/profile')
      // setIsLoading(false)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '請登入會員',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        router.push('/user/login')
      })
    }
  }, [auth, router])

  return (
    <div style={{ height: '580px' }}>
      {/* <div style={{ height: '480px' }}>頁面跳轉中...</div>
      {console.log(auth.isAuth)} */}
      <LoadingPage />
    </div>
  )
}
