import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入样式
import UserSideBar from '@/components/user/user-side-bar'
import UserSideBarMobile from '@/components/user/user-side-bar-mobile'
import CreditCardForm from '@/components/user/CreditCardForm'
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
    <>
      <div className="container">
        <h1 className="fw-bolder mb-sm-5 mb-4 ms-2 ms-sm-0">信用卡管理</h1>
        <div className="row ">
          <div className="col-sm-2 col-12 px-0 mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block mb-4">
              <UserSideBarMobile className="col-10 w-100" />
            </div>
          </div>

          <CreditCardForm />

          {/* 手機板的按鈕 */}
          <button className="btn btn-primary text-white my-5 mx-auto col-8 d-sm-none d-block">
            儲存
          </button>
        </div>
      </div>
    </>
  )
}
