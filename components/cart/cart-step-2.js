import { React, useState, useEffect } from 'react'
import style from './cart2.module.scss'
import { Collapse, Divider } from 'antd'
import { Radio, List } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import Address from './address'
import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import axios from 'axios'
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import useToken from 'antd/es/theme/useToken'
import dayjs from 'dayjs'
const moment = require('moment')

export default function CartStep2({ ongotoPage1, ongotoPage3 }) {
  const { auth, setAuth, coupon, getCoupon } = useAuth()
  const {
    items: pItems,
    getCartData: getPData,
    cartTotalP: totalPriceP,
  } = useCart()
  const {
    items: gItems,
    getCartData: getGData,
    cartTotalG: totalPriceG,
  } = useGroupCart()
  const {
    items: rItems,
    getCartData: getRData,
    cartTotalR: totalPriceR,
  } = useRentCart()
  useEffect(() => {
    getCoupon()
  }, [])
  const pOrderItems = pItems.filter((item) => item.check === 1)
  const gOrderItems = gItems.filter((item) => item.check === 1)
  const rOrderItems = rItems.filter((item) => item.check === 1)
  // 租用總天數
  const rTotalDays = rOrderItems
    .map((item) => {
      const start = dayjs(item.startDate)
      const end = dayjs(item.endDate)
      return end.diff(start, 'day')
    })
    .reduce((a, b) => a + b, 0)
  console.log('一般', pOrderItems)
  console.log('一般總價格', totalPriceP)
  console.log('團購', gOrderItems)
  console.log('團購總價格', totalPriceG)
  console.log('出租', rOrderItems)
  console.log('出租總價格', totalPriceR)
  const totalPrice = totalPriceP + totalPriceG + totalPriceR
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
    name: auth.user.last_name + auth.user.first_name,
    phone: auth.user.phone,
    address: auth.user.address,
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

      const setAuthPhone = async () => {
        await setBuyerInfo((prevBuyInfo) => ({
          ...prevBuyInfo,
          phone: auth.user.phone,
        }))
      }
      setAuthPhone()
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
          // console.log(response.data)
          if (response.data.code === '200') {
            return Swal.fire({
              icon: 'success',
              title: '成功建立訂單',
              // showConfirmButton: false,
              timer: 2500,
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
            return Swal.fire({
              icon: 'success',
              title: '成功建立訂單',
              // showConfirmButton: false,
              timer: 2500,
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
          if (response.data.code !== '200') {
            if (response.data.code === '201') {
              return Swal.fire({
                icon: 'success',
                title: '購物車已有該商品',
                text: '數量+' + response.data.quantity,
              })
            }
          } else {
            return Swal.fire({
              icon: 'success',
              title: '成功建立訂單',
              showConfirmButton: false,
              timer: 1500,
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
  // 結帳商品列表
  const getItems = (panelStyle) => [
    {
      key: '1',
      label: (
        <div className="d-flex justify-content-between">
          <p className="mb-0">一般商品</p>
          <p className="mb-0">
            {pOrderItems.length} 件商品，共計：
            <span className="text-primary">${totalPriceP}</span>
          </p>
        </div>
      ),
      children: (
        <List
          dataSource={pOrderItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div className="row w-100">
                <div className="col-6">
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <div className="d-flex gap-2 flex-sm-row flex-column">
                        {Object.values(item.specData).map((spec, index) => (
                          <span key={index}>{spec}</span>
                        ))}
                      </div>
                    }
                  />
                </div>

                <div className="col-6 row ms-2">
                  <div className="col-sm-6 col-12 d-flex gap-2 justify-content-end px-2">
                    <p>${item.price}</p>
                    <span>x</span>
                    <p>{item.quantity}</p>
                  </div>
                  <p className="col fw-bold px-2 text-end">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: (
        <div className="d-flex justify-content-between">
          <p className="mb-0">團購商品</p>
          <p className="mb-0">
            {gOrderItems.length} 件商品，共計：
            <span className="text-primary">${totalPriceG}</span>
          </p>
        </div>
      ),
      children: (
        <List
          dataSource={gOrderItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div className="row w-100">
                <div className="col-6">
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <div className="d-flex gap-2 flex-sm-row flex-column">
                        {Object.values(item.specData).map((spec, index) => (
                          <span key={index}>{spec}</span>
                        ))}
                      </div>
                    }
                  />
                </div>

                <div className="col-6 row ms-2">
                  <div className="col-sm-6 col-12 d-flex gap-2 justify-content-end px-2">
                    <p>${item.price}</p>
                    <span>x</span>
                    <p>{item.quantity}</p>
                  </div>
                  <p className="col fw-bold px-2 text-end">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
      style: panelStyle,
    },
    {
      key: '3',
      label: (
        <div className="d-flex justify-content-between">
          <p className="mb-0">租用商品</p>
          <p className="mb-0">
            {rOrderItems.length} 件商品，共計：
            <span className="text-primary">${totalPriceR}</span>
          </p>
        </div>
      ),
      children: (
        <List
          dataSource={rOrderItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div className="row w-100">
                <div className="col-6">
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <div className="d-flex gap-2 flex-sm-row flex-column">
                        {Object.values(item.specData).map((spec, index) => (
                          <span key={index}>{spec}</span>
                        ))}
                      </div>
                    }
                  />
                </div>

                <div className="col-6 row ms-2">
                  <div className="col-sm-6 col-12 d-flex gap-2 justify-content-sm-center justify-content-end px-2">
                    <p className="d-flex flex-sm-row flex-column align-items-center">
                      <span className="text-center">{item.startDate}</span>
                      <span className="text-center">
                        {' '}
                        <CaretRightOutlined className="d-sm-block d-none align-middle" />
                        <CaretDownOutlined className="d-sm-none d-block" />{' '}
                      </span>
                      <span className="text-center">{item.endDate}</span>
                    </p>
                  </div>
                  <p className="col fw-bold px-2 text-end">
                    $
                    {item.price *
                      (dayjs(item.endDate).diff(dayjs(item.startDate), 'day') +
                        1)}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
      style: panelStyle,
    },
  ]
  const panelStyle = {
    marginBottom: 24,
    background: '#fff',
    border: 'none',
  }
  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5">
          總金額：<span className="text-primary">${totalPrice}</span>
        </h2>

        <div className="row mt-5">
          <div className="col-11 mx-auto">
            <Collapse
              bordered={false}
              // defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                background: '#00000000',
                color: '#ffffff',
              }}
              items={getItems(panelStyle)}
            />
          </div>
          <div className="col-11 mx-auto">
            <div className="d-flex justify-content-center mb-3"></div>
            <div className="orderInfo">
              <div className={`${style['buyerInfo']} bg-white`}>
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
              <div className="buyerInfoMobile mt-4 d-none bg-white"></div>
              <div className={`${style['getProductInfo']} bg-white`}>
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
              <div className={`${style['receiverInfo']} bg-white`}>
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
                    <div
                      className={`d-flex align-items-center justify-content-between ${style['info']}`}
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
              <div className={`${style['paymentInfo']} bg-white`}>
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
                  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
                  const couponId = JSON.parse(
                    localStorage.getItem('order-info')
                  )['coupon-id']
                  const addToOrderTotal = async () => {
                    await addToOrder('product', pOrderItems, dateTime, couponId)
                    await addToOrder(
                      'groupBuy',
                      gOrderItems,
                      dateTime,
                      couponId
                    )
                    await addToOrder('rent', rOrderItems, dateTime, couponId)
                  }
                  await addToOrderTotal()
                  getPData()
                  getGData()
                  getRData()

                  ongotoPage3()
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
