import React, { useEffect, useState } from 'react'
import Cards from 'react-credit-cards-2'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入css
import style from '@/styles/user/register.module.scss'
import { useAuth } from '@/hooks/useAuth'
import jwtDecode from 'jwt-decode'
import Router from 'next/router'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import Swal from 'sweetalert2'
export default function CreditCardForm() {
  const updateUser = (user) => {
    // 更新會員資料
    axios
      .put('http://localhost:3005/api/users/update', user)
      .then((response) => {
        if (response.data.message === 'success') {
          console.log('成功更新')
        } else {
          console.log('更新失敗')
        }
      })
      .catch((error) => {
        console.error('更新失敗:', error)
        console.log('更新發生錯誤')
      })
  }

  const { auth, setAuth } = useAuth()
  const [formData, setformData] = useState({ ...auth.user })
  // 重新整理後驗證登入狀態
  // useEffect(() => {
  //   if (localStorage.getItem('loginToken')) {
  //     console.log(jwtDecode(localStorage.getItem('loginToken')))
  //     const data = jwtDecode(localStorage.getItem('loginToken'))
  //     setAuth({ ...data })
  //     // setCardData({ ...data })
  //     console.log(auth)
  //   } else {
  //     Router.push('/user/login')
  //   }
  // }, [])
  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: `${formData.card_name}`,
    number: `${formData.card_number}`,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardData({
      ...cardData,
      [name]: value,
    })
    // setAuth({ ...auth, user: { ...auth.user, [name]: value } })
    setformData({ ...formData, [name]: value })
    // console.log(auth.user.card_number)
  }
  const [isLoading, setIsLoading] = useLoading(auth.user)
  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <form className="col-sm-6 col-12">
        <section className="mb-3">
          <label htmlFor="cardNumber" className="mb-0 form-label">
            卡號
          </label>{' '}
          <input
            type="text"
            name="card_number"
            pattern="^[0-9]*$"
            maxLength="16"
            defaultValue={auth.user.card_number}
            className={`${style['hide-arrow']} col-8 col-sm-8 col-12 form-control`}
            placeholder="Card Number"
            onChange={handleInputChange}
            // onFocus={(e) => setCardData({ ...cardData, focus: e.target.name })}
          />
        </section>
        <section className="mb-3">
          <label htmlFor="cardName" className="mb-0 form-label">
            持卡人姓名
          </label>
          <input
            className="col-sm-8 col-12 form-control"
            type="text"
            name="card_name"
            defaultValue={auth.user.card_name}
            placeholder="Card Holder Name"
            onChange={handleInputChange}
            // onFocus={(e) => setCardData({ ...cardData, focus: e.target.name })}
          />
        </section>
        {/* <section className="mb-3">
          <label htmlFor="expiry" className="mb-0 form-label">
            信用卡期限
          </label>{' '}
          <input
            className="col-sm-8 col-12 form-control"
            type="tel"
            name="expiry"
            placeholder="MM/YY Expiry"
            maxlength="4"
            defaultValue={auth.expiry}
            onChange={handleInputChange}
            onFocus={(e) => setCardData({ ...cardData, focus: e.target.name })}
          />
        </section> */}
        {/* 桌機板的按鈕 */}
        <button
          type="button"
          className="btn btn-primary text-white my-5 col-4 offset-8 d-sm-block d-none"
          onClick={() => {
            if (!formData.card_number || formData.card_number.length !== 16) {
              Swal.fire({
                icon: 'error',
                title: '請輸入正確的卡號',
                showConfirmButton: false,
                timer: 1500,
              })
              return
            } else if (!formData.card_name) {
              Swal.fire({
                icon: 'error',
                title: '請輸入持卡人姓名',
                showConfirmButton: false,
                timer: 1500,
              })
              return
            }
            delete auth.user.exp
            delete auth.user.iat
            console.log(auth)
            updateUser(formData)
            Swal.fire({
              icon: 'success',
              title: '修改成功',
              showConfirmButton: false,
              timer: 1500,
            })
          }}
        >
          儲存
        </button>
      </form>
      <div className="col-sm-6 col-12">
        <Cards
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          focused={cardData.focus}
          name={formData.card_name}
          number={formData.card_number}
        />
      </div>
    </>
  )
}
