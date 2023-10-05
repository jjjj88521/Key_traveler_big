import React, { useEffect, useState } from 'react'
import Cards from 'react-credit-cards-2'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入css
import style from '@/styles/user/register.module.scss'
import { useAuth } from '@/hooks/useAuth'
import jwtDecode from 'jwt-decode'
import Router from 'next/router'

export default function CreditCardForm() {
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
  const { auth, setAuth } = useAuth()
  // 重新整理後驗證登入狀態
  useEffect(() => {
    if (localStorage.getItem('loginToken')) {
      console.log(jwtDecode(localStorage.getItem('loginToken')))
      const data = jwtDecode(localStorage.getItem('loginToken'))
      setAuth({ ...data })
      // setCardData({ ...data })
      console.log(auth)
    } else {
      Router.push('/user/login')
    }
  }, [])
  return (
    <>
      <form className="col-sm-4 col-12 offset-0 offset-sm-1">
        <section className="mb-3">
          <label htmlFor="cardNumber" className="mb-0 form-label">
            卡號
          </label>{' '}
          <input
            type="text"
            name="cardNumber"
            pattern="^[0-9]*$"
            maxLength="16"
            defaultValue={auth.card_number}
            className={`${style['hide-arrow']} col-8 col-sm-8 col-12 form-control`}
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={(e) => setCardData({ ...cardData, focus: e.target.name })}
          />
        </section>
        <section className="mb-3">
          <label htmlFor="cardName" className="mb-0 form-label">
            持卡人姓名
          </label>
          <input
            className="col-sm-8 col-12 form-control"
            type="text"
            name="cardName"
            defaultValue={auth.card_name}
            placeholder="Card Holder Name"
            onChange={handleInputChange}
            onFocus={(e) => setCardData({ ...cardData, focus: e.target.name })}
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
            console.log(auth)
          }}
        >
          儲存
        </button>
      </form>
      <div className="col-sm-3 col-12 offset-sm-1 offset-0">
        {' '}
        <Cards
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          focused={cardData.focus}
          name={cardData.name}
          number={cardData.number}
        />
      </div>
    </>
  )
}
