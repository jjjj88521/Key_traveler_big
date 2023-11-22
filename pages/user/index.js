import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import LoadingPage from '@/components/common/loadingPage'
import { useSelector } from 'react-redux'

export default function User() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    console.log(auth)
    if (auth.isAuth) {
      router.push('/user/profile')
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
