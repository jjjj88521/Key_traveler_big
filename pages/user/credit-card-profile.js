import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入样式
import UserSideBar from '@/components/user/user-side-bar'
import UserSideBarMobile from '@/components/user/user-side-bar-mobile'
import CreditCardForm from '@/components/user/CreditCardForm'
import UserLayout from '@/components/layout/user-layout'

export default function CreditCardProfile() {
  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardData({
      ...cardData,
      [name]: value,
    })
  }

  return (
    <UserLayout title={'信用卡管理'}>
      <div className="row" style={{ height: '431px' }}>
        <CreditCardForm />

        {/* 手機板的按鈕 */}
        <button className="btn btn-primary text-white my-5 mx-auto col-8 d-sm-none d-block">
          儲存
        </button>
      </div>
    </UserLayout>
  )
}
