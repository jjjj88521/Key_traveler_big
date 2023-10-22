import { React, useState, useEffect } from 'react'
import style from './cart2.module.scss'
import { Divider } from 'antd'
import { Radio, List } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import Address from './address'
import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import axios from 'axios'
const moment = require('moment')

export default function CartStep2({ ongotoPage1, ongotoPage3 }) {
  const { auth, setAuth, coupon, getCoupon } = useAuth()
  const { items: pItems, getCartData: getPData } = useCart()
  const { items: gItems, getCartData: getGData } = useGroupCart()
  const { items: rItems, getCartData: getRData } = useRentCart()
  useEffect(() => {
    getCoupon()
  }, [])
  const pOrderItems = pItems.filter((item) => item.check === 1)
  const gOrderItems = gItems.filter((item) => item.check === 1)
  const rOrderItems = rItems.filter((item) => item.check === 1)
  const cardListData = [
    {
      value: '1',
      // bank: 'xx銀行',
      last4num: auth.user.card_number.slice(12, 16),
    },
  ]
  // 收件人資料_S
  const [buyerValue, setbuyerValue] = useState(1)
  const [newName, setNewName] = useState('')
  const [tempName, setTempName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [tempPhone, setTempPhone] = useState('')
  const [buyInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const buyeronChange = (e) => {
    setbuyerValue(e.target.value)
    if (e.target.value === 1) {
      document.querySelector('.buyerSame').classList.remove('d-none')
      document.querySelector('.buyerSame').classList.add('d-block')
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        name: auth.user.last_name + auth.user.first_name,
      }))

      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        phone: auth.user.phone,
      }))
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        address: auth.user.address,
      }))
      document.querySelector('.buyerDiff').classList.remove('d-block')
      document.querySelector('.buyerDiff').classList.add('d-none')
    } else if (e.target.value === 2) {
      document.querySelector('.buyerDiff').classList.remove('d-none')
      document.querySelector('.buyerDiff').classList.add('d-block')
      setBuyerInfo({
        name: '',
        phone: '',
        address: '',
      })

      document.querySelector('.buyerSame').classList.remove('d-block')
      document.querySelector('.buyerSame').classList.add('d-none')
    } else {
      alert('error')
      return false
    }
  }
  // 处理地址变化的回调函数
  const handleAddressChange = (newAddress) => {
    // 在这里更新 buyInfo 的地址信息
    setBuyerInfo((prevBuyInfo) => ({
      ...prevBuyInfo,
      address: newAddress,
    }))
  }
  useEffect(() => {
    if (newName) {
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        name: newName,
      }))
    } else {
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        phone: newPhone.toString(),
      }))
    }
  }, [newName, newPhone])
  useEffect(() => {
    console.log(buyInfo)
    const infoStr = localStorage.getItem('order-info')
    const info = JSON.parse(infoStr)

    info['buyer-info'] = buyInfo

    localStorage.setItem('order-info', JSON.stringify(info))
  }, [buyInfo])
  useEffect(() => {
    if (auth.isAuth) {
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        name: auth.user.last_name + auth.user.first_name,
      }))

      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        phone: auth.user.phone,
      }))
      setBuyerInfo((prevBuyInfo) => ({
        ...prevBuyInfo,
        address: auth.user.address,
      }))
    }
  }, [auth.isAuth])
  // 收件人資料_E

  // 宅配方式_S
  const [recProductValue, setRecProductValue] = useState(1)
  const recProductonChange = (e) => {
    setRecProductValue(e.target.value)
  }
  // 宅配方式_E

  // 付款方式_S
  const [paymentValue, setPaymentValue] = useState(1)

  const [useCard, setUseCard] = useState(true)

  const paymentonChange = (e) => {
    setPaymentValue(e.target.value)
    if (e.target.value === 1) {
      document.querySelector('.payForOnline').classList.remove('d-none')
      document.querySelector('.payForOnline').classList.add('d-block')
      setUseCard(true)
    } else if (e.target.value === 2) {
      document.querySelector('.payForOnline').classList.remove('d-block')
      document.querySelector('.payForOnline').classList.add('d-none')
      setUseCard(false)
    } else {
      alert('error')
      return false
    }
  }

  useEffect(() => {
    // console.log(useCard)
    const infoStr = localStorage.getItem('order-info')
    const info = JSON.parse(infoStr)

    info['use-card'] = useCard ? 'true' : 'false'

    localStorage.setItem('order-info', JSON.stringify(info))
  }, [useCard])
  // 付款方式_E

  // 信用卡新增_S
  const [paymentData, setPaymentData] = useState(cardListData)
  const [newBank, setNewBank] = useState('aa銀行')
  const [newLast4num, setNewLast4num] = useState('')

  const addPaymentOption = () => {
    if (newBank.trim() !== '' && newLast4num.trim() !== '') {
      // 创建一个新选项并添加到数据源中
      const newItem = {
        value: String(paymentData.length + 1),
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
    setSelectedPayment(e.target.value)
  }
  // 信用卡選取_E

  const checkBuyerInfo = () => {
    const toOrderInfo = JSON.parse(localStorage.getItem('order-info'))
    console.log(toOrderInfo)
    if (toOrderInfo['buyer-info'].name === '') {
      return Swal.fire({
        icon: 'error',
        title: '請填寫收件人姓名',
      })
    } else if (toOrderInfo['buyer-info'].address === '') {
      return Swal.fire({
        icon: 'error',
        title: '請填寫收件人地址',
      })
    } else if (toOrderInfo['buyer-info'].phone === '') {
      return Swal.fire({
        icon: 'error',
        title: '請填寫收件人電話',
      })
    }
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    const couponId = JSON.parse(localStorage.getItem('order-info'))['coupon-id']
    const addToOrderTotal = async () => {
      await addToOrder('product', pOrderItems, dateTime, couponId)
      await addToOrder('groupBuy', gOrderItems, dateTime, couponId)
      await addToOrder('rent', rOrderItems, dateTime, couponId)
    }
    addToOrderTotal()
    setLocalstorage()
  }

  const [orderState, setOrderState] = useState({
    pd: '',
    gb: '',
    r: '',
  })
  // 後端
  const addToOrder = async (type, Data, time, couponId) => {
    if (Data.length) {
      const toOrder = {
        couponId: couponId,
        data: Data,
        date: time,
        status: '已結帳',
      }
      if (type === 'product') {
        try {
          const response = await axios.post(
            'http://localhost:3005/api/order-test/addProductOrder',
            toOrder,
            {
              withCredentials: true, // save cookie in browser
            }
          )
          if (response.data.code === '200') {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              pd: 'true', // 設定 pd 的值為 true
            })
          } else {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              pd: 'false', // 設定 pd 的值為 true
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else if (type === 'groupBuy') {
        try {
          const response = await axios.post(
            'http://localhost:3005/api/order-test/addGroupOrder',
            toOrder,
            {
              withCredentials: true, // save cookie in browser
            }
          )
          if (response.data.code === '200') {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              gb: 'true', // 設定 gb 的值為 true
            })
          } else {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              gb: 'false', // 設定 pd 的值為 true
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else if (type === 'rent') {
        try {
          const response = await axios.post(
            'http://localhost:3005/api/order-test/addRentOrder',
            toOrder,
            {
              withCredentials: true, // save cookie in browser
            }
          )
          if (response.data.code === '200') {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              r: 'true', // 設定 gb 的值為 true
            })
          } else {
            return setOrderState({
              ...orderState, // 先複製現有的狀態
              r: 'false', // 設定 pd 的值為 true
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        return Swal.fire({
          icon: 'error',
          title: '頁面錯誤',
        })
      }
    }
  }
  const setLocalstorage = () => {
    console.log(orderState)
    if (
      orderState.pd !== 'false' &&
      orderState.gb !== 'false' &&
      orderState.r !== 'false'
    ) {
      console.log('訂單建立成功')
      if (pOrderItems) {
        localStorage.setItem('product-info', JSON.stringify(pOrderItems))
      }
      if (gOrderItems) {
        localStorage.setItem('groupbuy-info', JSON.stringify(gOrderItems))
      }
      if (rOrderItems) {
        localStorage.setItem('rent-info', JSON.stringify(rOrderItems))
      }
      return Swal.fire({
        icon: 'success',
        title: '成功建立訂單',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        getPData()
        getGData()
        getRData()

        ongotoPage3()
      })
    } else {
      if (orderState.pd === 'false') {
        console.log('一般商品建立訂單失敗')
      }
      if (orderState.gb === 'false') {
        console.log('團購商品建立訂單失敗')
      }
      if (orderState.r === 'false') {
        console.log('租用商品建立訂單失敗')
      }
    }
  }
  useEffect(() => {
    console.log(orderState)
  }, [orderState])

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-11 mx-auto">
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
                  <span style={{ width: '120px' }}>收件人資訊</span>
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
                          placeholder="收件人姓名"
                          className={`form-control ${style['inputMargin']}`}
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={() => setNewName(tempName)}
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
                          placeholder="收件人電話"
                          className={`form-control ${style['inputMargin']}`}
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          onBlur={() => setNewPhone(tempPhone.toString())}
                        ></input>
                      </div>
                    </div>
                    {/* 手機版 */}
                    <div
                      className={`d-sm-none d-flex align-items-center justify-content-between ${style['info']}`}
                      style={{ height: '100px' }}
                    >
                      <div
                        className={`col-3 border ${style['infoLeft']} pt-4`}
                        style={{ height: '100px' }}
                      >
                        地址
                      </div>
                      <div
                        className={`col-9 border ${style['infoRight']} h-100 d-flex align-items-center`}
                      >
                        <Address onAddressChange={handleAddressChange} />
                      </div>
                    </div>
                    {/* 電腦版 */}
                    <div
                      className={`d-sm-flex d-none align-items-center justify-content-between ${style['info']}`}
                    >
                      <div className={`col-3 border ${style['infoLeft']}`}>
                        地址
                      </div>
                      <div
                        className={`col-9 border ${style['infoRight']} h-100 d-flex align-items-center`}
                      >
                        <Address onAddressChange={handleAddressChange} />
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
                              {/* <div>{item.bank}</div> */}
                              <div className="ms-5">****{item.last4num}</div>
                            </div>
                          </Radio>
                        </List.Item>
                      )}
                    />
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="stepBtn d-flex justify-content-end">
              <button
                className={`btn ${style['button_reverse']} me-2`}
                id="checkProduct"
                onClick={() => {
                  localStorage.removeItem('order-info')
                  ongotoPage1()
                }}
              >
                上一步
              </button>
              <button
                className={`btn btn-primary px-3 py-2`}
                id="completeOrder"
                onClick={async () => {
                  checkBuyerInfo()
                }}
              >
                送出訂單
              </button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  )
}
