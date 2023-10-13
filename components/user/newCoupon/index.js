import { React, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'

export default function NewCoupon({ changePage }) {
  const { auth, coupon, addCoupon } = useAuth()
  const handleAddCoupon = () => {
    Swal.fire({
      title: '請輸入優惠碼',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: '新增',
      cancelButtonText: '取消',
      showLoaderOnConfirm: true,
      preConfirm: (inputCode) => {
        return addCoupon(inputCode, auth.user.id)
      },
      allowOutsideClick: false,
    })
  }

  return (
    <>
      <a
        className="text-primary"
        onClick={handleAddCoupon}
        style={{ cursor: 'pointer' }}
      >
        新增優惠券
      </a>
    </>
  )
}
