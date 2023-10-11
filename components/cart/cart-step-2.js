import { React, useState, useEffect } from 'react'
import style from './cart2.module.scss'
import { Divider } from 'antd'
import { Radio, List } from 'antd'
import { useAuth } from '@/hooks/useAuth'

export default function CartStep2({ ongotoPage1, ongotoPage3 }) {
  const { auth, coupon, getCoupon } = useAuth()
  useEffect(() => {
    getCoupon()
  }, [])
  console.log(auth.user)
  console.log(coupon)

  const cardListData = [
    {
      value: '1',
      bank: 'xx銀行',
      last4num: auth.user.card_number.slice(12, 16),
    },
    {
      value: '2',
      bank: 'yy銀行',
      last4num: '5678',
    },
    {
      value: '3',
      bank: 'zz銀行',
      last4num: '9012',
    },
  ]
  // {auth.user.card_number.slice(12, 16)}
  // 收件人資料_S
  const [buyerValue, setbuyerValue] = useState(1)
  const buyeronChange = (e) => {
    console.log('buyer checked', e.target.value)
    setbuyerValue(e.target.value)
    if (e.target.value === 1) {
      document.querySelector('.buyerSame').classList.remove('d-none')
      document.querySelector('.buyerSame').classList.add('d-block')
      document.querySelector('.buyerDiff').classList.remove('d-block')
      document.querySelector('.buyerDiff').classList.add('d-none')
    } else if (e.target.value === 2) {
      document.querySelector('.buyerDiff').classList.remove('d-none')
      document.querySelector('.buyerDiff').classList.add('d-block')
      document.querySelector('.buyerSame').classList.remove('d-block')
      document.querySelector('.buyerSame').classList.add('d-none')
    } else {
      alert('error')
      return false
    }
  }
  // 收件人資料_E

  // 宅配方式_S
  const [recProductValue, setRecProductValue] = useState(1)
  const recProductonChange = (e) => {
    console.log('receive product checked', e.target.value)
    setRecProductValue(e.target.value)
  }
  // 宅配方式_E

  // 付款方式_S
  const [paymentValue, setPaymentValue] = useState(1)
  const paymentonChange = (e) => {
    console.log('payment checked', e.target.value)
    setPaymentValue(e.target.value)
    if (e.target.value === 1) {
      document.querySelector('.payForOnline').classList.remove('d-none')
      document.querySelector('.payForOnline').classList.add('d-block')
    } else if (e.target.value === 2) {
      document.querySelector('.payForOnline').classList.remove('d-block')
      document.querySelector('.payForOnline').classList.add('d-none')
    } else {
      alert('error')
      return false
    }
  }
  // 付款方式_E

  // 信用卡新增_S
  const [paymentData, setPaymentData] = useState(cardListData)
  const [newBank, setNewBank] = useState('aa銀行')
  const [newLast4num, setNewLast4num] = useState('')

  const addPaymentOption = () => {
    console.log('newBank is:' + newBank + ',newLast4num is:' + newLast4num)
    if (newBank.trim() !== '' && newLast4num.trim() !== '') {
      // 创建一个新选项并添加到数据源中
      const newItem = {
        value: String(paymentData.length + 1),
        bank: newBank,
        last4num: newLast4num,
      }
      setPaymentData([...paymentData, newItem])

      // 清空输入框
      setNewBank('aa銀行')
      setNewLast4num('')
    }
  }
  // 信用卡新增_E
  // 信用卡選取_S
  const [selectedPayment, setSelectedPayment] = useState(paymentData[0].value)
  const handleRadioChange = (e) => {
    console.log('payment card checked', e.target.value)

    setSelectedPayment(e.target.value)
  }
  // 信用卡選取_E

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 mx-auto">
            <div className="d-flex justify-content-center mb-3"></div>
            <div className="orderInfo">
              <div className={`${style['buyerInfo']}`}>
                <div className={`${style['cart_subtitle']}`}>訂購人資訊</div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    姓名
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    {/* 會員姓名 */}
                    {auth.user.last_name + auth.user.first_name}
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    Email
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    {/* 會員Email */}
                    {auth.user.email}
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    電話
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    {/* 會員電話 */}
                    {auth.user.phone}
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    地址
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    {/* 會員地址 */}
                    {auth.user.address}
                  </div>
                </div>
              </div>
              <div className="buyerInfoMobile mt-4 d-none"></div>
              <div className={`${style['getProductInfo']}`}>
                <div className={`${style['cart_subtitle']}`}>取貨方式</div>
                <Radio.Group
                  onChange={recProductonChange}
                  value={recProductValue}
                  className={`${style['info']}`}
                  style={{ marginRight: '5px', marginLeft: '30px' }}
                >
                  <Radio value={1}>宅配到府</Radio>
                </Radio.Group>
              </div>
              <div className={`${style['receiverInfo']}`}>
                <div
                  className={`${style['cart_subtitle']} d-flex align-items-center`}
                >
                  收件人資訊
                  <Radio.Group
                    onChange={buyeronChange}
                    value={buyerValue}
                    className="ms-3"
                  >
                    <Radio
                      value={1}
                      className={`${style['recRadio']} text-light`}
                    >
                      同訂購人
                    </Radio>
                    <Radio
                      value={2}
                      className={`${style['recRadio']} text-light`}
                    >
                      修改收件人資料
                    </Radio>
                  </Radio.Group>
                </div>
                <div>
                  <div className="buyerSame">
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        姓名
                      </div>
                      <div className={`col-9 border ${style['infoRight']}`}>
                        {/* 會員姓名 */}
                        {auth.user.last_name + auth.user.first_name}
                      </div>
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        電話
                      </div>
                      <div className={`col-9 border ${style['infoRight']}`}>
                        {/* 會員電話 */}
                        {auth.user.phone}
                      </div>
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        地址
                      </div>
                      <div className={`col-9 border ${style['infoRight']}`}>
                        {/* 會員地址 */}
                        {auth.user.address}
                      </div>
                    </div>
                  </div>
                  <div className="buyerDiff d-none">
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        姓名
                      </div>
                      <div
                        className={`col-9 border ${style['infoRight']} h-100 d-flex align-items-center`}
                      >
                        <input
                          type="text"
                          placeholder="memberName"
                          className={`form-control ${style['inputMargin']}`}
                        ></input>
                      </div>
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        電話
                      </div>
                      <div
                        className={`col-9 border ${style['infoRight']} h-100 d-flex align-items-center`}
                      >
                        <input
                          type="text"
                          placeholder="memberTel"
                          className={`form-control ${style['inputMargin']}`}
                        ></input>
                      </div>
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        地址
                      </div>
                      <div
                        className={`col-9 border ${style['infoRight']} h-100 d-flex align-items-center`}
                      >
                        <input
                          type="text"
                          placeholder="memberAddr"
                          className={`form-control ${style['inputMargin']}`}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${style['paymentInfo']}`}>
                <div className={`${style['cart_subtitle']}`}>付款方式</div>
                <Radio.Group
                  onChange={paymentonChange}
                  value={paymentValue}
                  className={`${style['info']}`}
                  style={{ marginRight: '5px', marginLeft: '30px' }}
                >
                  <Radio value={1}>信用卡付款</Radio>
                  <Radio value={2}>貨到付款</Radio>
                </Radio.Group>
                <div className="payForOnline">
                  <Divider style={{ marginTop: '5px' }} />
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedPayment}
                  >
                    <List
                      style={{ marginTop: '-10px', marginBottom: '15px' }}
                      size="small"
                      split={false}
                      dataSource={paymentData}
                      renderItem={(item) => (
                        <List.Item>
                          <Radio
                            value={item.value}
                            style={{ marginLeft: '30px', marginBottom: '5px' }}
                          >
                            <div className="d-flex align-items-center">
                              <div>{item.bank}</div>
                              <div className="ms-5">****{item.last4num}</div>
                            </div>
                          </Radio>
                        </List.Item>
                      )}
                    />
                  </Radio.Group>
                  {/* NewCard Modal_S */}
                  <div
                    className={`${style['payCard']} position-relative`}
                    id="modal"
                  >
                    <div
                      className={`${style['dia']} d-none ps-4 pe-4`}
                      id="dialog"
                      style={{ paddingTop: '35px' }}
                    >
                      <div
                        className={`${style['cardNum']} ${style['newCardInfo']} d-flex align-items-center`}
                      >
                        <span style={{ width: '100px' }}>信用卡號</span>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control"
                            id="newCardFst"
                            maxLength={4}
                          ></input>
                          <p className="mb-0">-</p>
                          <input
                            type="text"
                            className="form-control"
                            id="newCardSec"
                            maxLength={4}
                          ></input>
                          <p className="mb-0">-</p>
                          <input
                            type="text"
                            className="form-control"
                            id="newCardThr"
                            maxLength={4}
                          ></input>
                          <p className="mb-0">-</p>
                          <input
                            type="text"
                            className="form-control"
                            id="newCardLst"
                            maxLength={4}
                            value={newLast4num}
                            onChange={(e) => setNewLast4num(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div
                        className={`${style['newCardInfo']} d-flex justify-content-between align-items-center`}
                      >
                        <div
                          className={`${style['cardDate']} col-7 d-flex justify-content-start align-items-center `}
                        >
                          <span>到期日</span>
                          <div className="d-flex align-items-center">
                            <input type="text" className="form-control"></input>
                            <p className="mb-0">/</p>
                            <input type="text" className="form-control"></input>
                          </div>
                        </div>
                        <div
                          className={`${style['cardCode']} col-auto d-flex justify-content-between align-items-center `}
                          style={{ marginRight: '23px' }}
                        >
                          <span
                            style={{ marginLeft: '-5px', marginRight: '20px' }}
                          >
                            驗證碼
                          </span>
                          <input type="text" className="form-control"></input>
                        </div>
                      </div>
                      <div
                        className={`${style['cardOwner']} ${style['newCardInfo']} d-flex align-items-center`}
                      >
                        <span>持卡人姓名</span>
                        <input type="text" className="form-control"></input>
                      </div>
                      <input
                        type="hidden"
                        value={newBank}
                        id="newBank"
                        onChange={(e) => setNewBank(e.target.value)}
                      ></input>
                      <button
                        className={`btn ${style['button_main']}`}
                        id="newbtn"
                        onClick={addPaymentOption}
                      >
                        新增
                      </button>
                      <button
                        className={`btn ${style['button_reverse']}`}
                        id="closebtn"
                        onClick={() => {
                          document
                            .querySelector('#dialog')
                            .classList.add('d-none')
                        }}
                      >
                        取消
                      </button>
                    </div>
                    <button
                      className={`btn ${style['button_main']} ms-4`}
                      id="show"
                      onClick={() => {
                        document
                          .querySelector('#dialog')
                          .classList.add(`${style['dia']}`)
                        document
                          .querySelector('#dialog')
                          .classList.remove('d-none')
                        document
                          .querySelector('#dialog')
                          .classList.add('d-block')
                      }}
                    >
                      新增信用卡
                    </button>
                  </div>
                  {/* NewCard Modal_E */}
                </div>
              </div>
            </div>
            <div className="stepBtn d-flex justify-content-end">
              <button
                className={`btn ${style['button_reverse']} me-2`}
                id="checkProduct"
                onClick={ongotoPage1}
              >
                上一步
              </button>
              <button
                className={`btn btn-primary px-3 py-2`}
                id="completeOrder"
                onClick={() => {
                  ongotoPage3()
                }}
              >
                送出訂單
              </button>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </>
  )
}
