import React from 'react'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入信用卡套件的樣式
import CreditCardForm from '@/components/user/credit-card-form'
import UserLayout from '@/components/layout/user-layout'

export default function CreditCardProfile() {
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
