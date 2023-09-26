import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import '@/node_modules/react-credit-cards-2/dist/es/styles.scss' // 引入样式
import UserSideBar from './user-side-bar'
import UserSideBarMobile from './user-side-bar-mobile'
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
  return (
    <>
      <div className="container">
        <h1 className="fw-bolder mb-sm-5 mb-4 ms-2 ms-sm-0">信用卡管理</h1>
        <div className="row ">
          <div className="col-sm-3 col-12 px-0 mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block mb-4">
              <UserSideBarMobile className="col-10 w-100" />
            </div>
          </div>

          <form className="col-sm-4 col-12 offset-0 offset-sm-1">
            <section className="mb-3">
              <label htmlFor="number" className="mb-0 form-label">
                卡號
              </label>{' '}
              <input
                className="col-8 col-sm-8 col-12 form-control"
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={handleInputChange}
                onFocus={(e) =>
                  setCardData({ ...cardData, focus: e.target.name })
                }
              />
            </section>
            <section className="mb-3">
              <label htmlFor="name" className="mb-0 form-label">
                持卡人姓名
              </label>
              <input
                className="col-sm-8 col-12 form-control"
                type="text"
                name="name"
                placeholder="Card Holder Name"
                onChange={handleInputChange}
                onFocus={(e) =>
                  setCardData({ ...cardData, focus: e.target.name })
                }
              />
            </section>
            <section className="mb-3">
              <label htmlFor="expiry" className="mb-0 form-label">
                信用卡期限
              </label>{' '}
              <input
                className="col-sm-8 col-12 form-control"
                type="tel"
                name="expiry"
                placeholder="MM/YY Expiry"
                onChange={handleInputChange}
                onFocus={(e) =>
                  setCardData({ ...cardData, focus: e.target.name })
                }
              />
            </section>
            {/* 桌機板的按鈕 */}
            <button className="btn btn-primary text-white my-5 col-4 offset-8 d-sm-block d-none">
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

          {/* 手機板的按鈕 */}
          <button className="btn btn-primary text-white my-5 mx-auto col-8 d-sm-none d-block">
            儲存
          </button>
        </div>
      </div>
    </>
  )
}
