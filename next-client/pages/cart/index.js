import React, { useState } from 'react'
import style from './cart.module.scss'
import { Steps, DatePicker, Divider, Radio, List } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'

export default function Cart() {
  // step 1
  const { RangePicker } = DatePicker
  const items = [
    {
      title: '確認商品',
    },
    {
      title: '填寫訂單資訊',
    },
    {
      title: '完成訂單',
    },
  ]

  const initialProducts = [
    {
      id: 0,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 3000,
      amount: 1,
    },
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 1000,
      amount: 2,
    },
  ]
  const [products, setProducts] = useState(initialProducts)

  // 全選
  const toggleCheckAll = (products, isCheckedAll) => {
    return products.map((product) => {
      return { ...product, check: isCheckedAll }
    })
  }

  //單選
  const toggleCheck = (products, id) => {
    return products.map((product) => {
      if(product.id === id) return { ...product, check: !product.check }
      else return{...product}
    })
  }

  // 增減數量
  const upDateAmount = (products, id, value) => {
    return products.map((product) => {
      if (product.id === id)
        return { ...product, amount: product.amount + value }
      else return { ...product }
    })
  }

  // 移除購物車商品
  const removeProduct = (products, id) => {
    return products.filter((product) => product.id !== id)
  }

  // 總計
  const calculateTotalPrice = (products) => {
    let totalPrice = 0
    for (const product of products) {
      totalPrice += product.price * product.amount
    }
    return totalPrice
  }

  // 全選
  const handleToggleCheckAll = (isCheckedAll) => {
    setProducts(toggleCheckAll(products, isCheckedAll))
  }

  // 單選
  const handleToggleCheck = (id) => {
    setProducts(toggleCheck(products, id))
  }

  // 增減數量
  const handleIncrement = (id) => {
    setProducts(upDateAmount(products, id, 1))
  }
  const handleDecrement = (id) => {
    setProducts(upDateAmount(products, id, -1))
  }

  // 移除購物車商品
  const handleRemove = (id) => {
    setProducts(removeProduct(products, id))
  }

  // 總計
  const totalPrice = calculateTotalPrice(products)

  const cardListData = [
    {
      value: '1',
      bank: 'xx銀行',
      last4num: '1234',
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

  // 信用卡選取_S
  const [selectedPayment, setSelectedPayment] = useState(1)
  const handleRadioChange = (e) => {
    console.log('payment card checked', e.target.value)

    setSelectedPayment(e.target.value)
  }
  // 信用卡選取_E

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

  return (
    <>
      {/* step 1 */}
      <div className="container">
        <Steps
          current={0}
          labelPlacement="vertical"
          items={items}
          responsive={false}
          className="mt-5"
        />
        <h1 className="text-primary fs-3 pt-5 pb-3">購物車清單</h1>
        {/* 一般商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
          <div>一般商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 購物車 step1 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th
                className="bg-primary text-white text-center align-middle"
                style={{ width: '5%' }}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleToggleCheckAll(e.target.checked)
                  }}
                />
              </th>
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white" style={{ width: '10%' }}>
                單價
              </th>
              <th
                className="bg-primary text-white text-center"
                style={{ width: '15%' }}
              >
                數量
              </th>
              <th className="bg-primary text-white text-center">小計</th>
              <th className="bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <img
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1"
                      style={{ width: 140 }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-4">
                <div className="input-group">
                  <span className="input-group-text p-0">
                    <button className="btn" type="button" onClick={()=>{}}>
                      -
                    </button>
                  </span>
                  <input type="text" className="form-control text-center" value={amount}/>
                  <span className="input-group-text p-0">
                    <button className="btn" type="button" onClick={()=>{
                      handleIncrement(id)
                    }}>
                      +
                    </button>
                  </span>
                </div>
              </td>
              <td className="align-middle text-center">$3000</td>
              <td className="align-middle text-center">
                <button className="btn border-white">
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
                </button>
              </td>
            </tr> */}
            {products.map((product) => (
              <tr key={product.id}>
                <td className="text-center align-middle">
                  <input
                    type="checkbox"
                    checked={product.check}
                    onChange={() => {
                      handleToggleCheck(product.id)
                    }}
                  />
                </td>
                <td className="d-flex">
                  <div className="p-2">
                    <img src={product.img} width={100} height={100} />
                  </div>
                  <div className="p-2">
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div className="pt-1">
                      <select
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                      >
                        <option>陽極紅</option>
                      </select>
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 140 }}
                      >
                        <option>噴砂銀</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td className="align-middle">${product.price}</td>
                <td className="align-middle ps-4">
                  <div className="input-group">
                    <span className="input-group-text p-0">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          if (product.amount === 1) {
                            handleRemove(product.id)
                          } else {
                            handleDecrement(product.id)
                          }
                        }}
                      >
                        -
                      </button>
                    </span>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={product.amount}
                    />
                    <span className="input-group-text p-0">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          handleIncrement(product.id)
                        }}
                      >
                        +
                      </button>
                    </span>
                  </div>
                </td>
                <td className="align-middle text-center">
                  ${product.price * product.amount}
                </td>
                <td className="align-middle text-center">
                  <button
                    className="btn border-white"
                    type="button"
                    onClick={() => {
                      handleRemove(product.id)
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-primary"
                    />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="pe-5 text-end" colSpan={6}>
                總計: ${totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
          <div>租用商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 購物車 step1 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th
                className="bg-primary text-white text-center align-middle"
                style={{ width: '5%' }}
              >
                <input type="checkbox" />
              </th>
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white" style={{ width: '25%' }}>
                租用日期
              </th>
              {/* <th className="bg-primary text-white">數量</th> */}
              <th className="bg-primary text-white text-center">小計</th>
              <th className="bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <img
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1"
                      style={{ width: 140 }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">
                <input className="form-control w-75" type="date" />
                <div className="text-center pe-5 me-4">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-secondary"
                  />
                </div>
                <input className="form-control w-75" type="date" />
              </td>
              <td className="align-middle text-center">$3000</td>
              <td className="align-middle text-center">
                <button
                  className="btn border-white"
                  type="button"
                  onClick={() => {
                    handleRemove(product.id)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="pe-5 text-end" colSpan={6}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 一般商品 */}
        {/* 購物車 step1 手機版 */}
        <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex">
                  <div>一般商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <img
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1 py-0"
                      style={{ width: '45%' }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm py-0"
                      style={{ width: '45%' }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                  <div className="d-flex pt-1">
                    <div className="pt-2">$3000</div>
                    <div
                      className="input-group ms-auto "
                      style={{ width: '50%' }}
                    >
                      <span className="input-group-text p-0 ">
                        <button className="btn btn-sm" type="button">
                          -
                        </button>
                      </span>
                      <input type="number" className="form-control py-0" />
                      <span className="input-group-text p-0">
                        <button className="btn btn-sm" type="button">
                          +
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr> */}
            {products.map((product) => {
              ;<tr key={product.id}>
                <td className="text-center align-middle">
                  <input type="checkbox" />
                </td>
                <td className="d-flex">
                  <div className="pe-2 pt-2">
                    <img src={product.img} width={100} height={100} />
                  </div>
                  <div>
                    <div>Qwertykey</div>
                    <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                    <div className="pt-1">
                      <select
                        className="form-select form-select-sm mb-1 py-0"
                        style={{ width: '45%' }}
                      >
                        <option>陽極紅</option>
                      </select>
                      <select
                        className="form-select form-select-sm py-0"
                        style={{ width: '45%' }}
                      >
                        <option>噴砂銀</option>
                      </select>
                    </div>
                    <div className="d-flex pt-1">
                      <div className="pt-2">
                        ${product.price * product.amount}
                      </div>
                      <div
                        className="input-group ms-auto "
                        style={{ width: '50%' }}
                      >
                        <span className="input-group-text p-0 ">
                          <button
                            className="btn btn-sm"
                            type="button"
                            onClick={() => {
                              if (product.amount === 1) {
                                handleRemove(product.id)
                              } else {
                                handleDecrement(product.id)
                              }
                            }}
                          >
                            -
                          </button>
                        </span>
                        <input
                          type="number"
                          className="form-control py-0"
                          value={product.amount}
                        />
                        <span className="input-group-text p-0">
                          <button
                            className="btn btn-sm"
                            type="button"
                            onClick={() => {
                              handleIncrement(product.id)
                            }}
                          >
                            +
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            })}
            <tr>
              <td className="text-end" colSpan={2}>
                總計: ${totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        {/* 購物車 step1 手機版 */}
        <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex">
                  <div>租用商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <img
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="p-1">
                    <select
                      className="form-select form-select-sm py-0 mb-1"
                      style={{ width: 100 }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm py-0"
                      style={{ width: 100 }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                  <RangePicker
                    placeholder={''}
                    className="px-2 ms-1 rounded py-0"
                  />
                  {/* <input className="form-control" type="date" style={{ width: 100 }}/>
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-secondary"
                    />
                  </div>
                  <input className="form-control" type="date" style={{ width: "30%" }}/> */}
                  <div className="pt-1 ps-1">$300</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-end" colSpan={2}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 去結帳 */}
        <div className="my-4">
          <div className="pb-2">
            <span className="fs-6">
              使用優惠券(限一般商品): <span>全站85折</span>
            </span>
            <div class="btn-group ms-3 ">
              <button
                class="btn btn-sm border-primary text-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                選擇優惠券
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="">
                    優惠券
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="">
                    優惠券
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-danger">
            P.S.若商品種類(一般、團購、租用)相同，產品數量多且收件地址不同需分開結帳！！
          </div>
          <div className="text-end">
            <span className="align-middle">
              共<span className="">6</span>件商品, 總金額: $
              <span className="">1800</span>
            </span>
            <a className="btn btn-primary text-white ms-2">去結帳</a>
          </div>
        </div>
      </div>
      {/* step 2 */}
      {/* 信用卡新增_E */}
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-3">
          <Steps
            current={1}
            labelPlacement="vertical"
            items={items}
            className="d-flex align-self-center"
            style={{ width: '70%' }}
          />
        </div>
        <div className="orderInfo">
          <div className={`${style['buyerInfo']}`}>
            <div className={`${style['cart_subtitle']}`}>訂購人資訊</div>
            <div
              className={`d-flex align-items-center justify-content-between ${style['info']}`}
            >
              <div className={`col-3 border ${style['infoLeft']}`}>姓名</div>
              <div className={`col-9 border ${style['infoRight']}`}>
                會員姓名
              </div>
            </div>
            <div
              className={`d-flex align-items-center justify-content-between ${style['info']}`}
            >
              <div className={`col-3 border ${style['infoLeft']}`}>Email</div>
              <div className={`col-9 border ${style['infoRight']}`}>
                會員Email
              </div>
            </div>
            <div
              className={`d-flex align-items-center justify-content-between ${style['info']}`}
            >
              <div className={`col-3 border ${style['infoLeft']}`}>電話</div>
              <div className={`col-9 border ${style['infoRight']}`}>
                會員電話
              </div>
            </div>
            <div
              className={`d-flex align-items-center justify-content-between ${style['info']}`}
            >
              <div className={`col-3 border ${style['infoLeft']}`}>地址</div>
              <div className={`col-9 border ${style['infoRight']}`}>
                會員地址
              </div>
            </div>
          </div>
          <div className="buyerInfoMobile mt-4 d-none"></div>
          <div className={`${style['getProductInfo']}`}>
            <div className={`${style['cart_subtitle']}`}>取貨方式</div>
            <div className="radioNotUse">
              {/* <div className={`${style['info']}`}>
            <label>
              <input
                type="radio"
                name="radioGroup"
                value="option1"
                checked
                style={{ marginRight: '5px', marginLeft: '30px' }}
              />
              宅配到府
            </label>
          </div> */}
            </div>
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
                <Radio value={1} className="text-light">
                  同訂購人
                </Radio>
                <Radio value={2} className="text-light">
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
                    會員姓名
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    電話
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    會員電話
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center justify-content-between ${style['info']}`}
                >
                  <div className={`col-3 border ${style['infoLeft']}`}>
                    地址
                  </div>
                  <div className={`col-9 border ${style['infoRight']}`}>
                    會員地址
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
              <Radio.Group onChange={handleRadioChange} value={selectedPayment}>
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
                  class={`${style['dia']} d-none ps-4 pe-4`}
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
                      <span style={{ marginLeft: '-5px', marginRight: '20px' }}>
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
                    class={`btn ${style['button_main']}`}
                    id="newbtn"
                    onClick={addPaymentOption}
                  >
                    新增
                  </button>
                  <button
                    class={`btn ${style['button_reverse']}`}
                    id="closebtn"
                    onClick={() => {
                      document.querySelector('#dialog').classList.add('d-none')
                    }}
                  >
                    取消
                  </button>
                </div>
                <button
                  class={`btn ${style['button_main']} ms-4`}
                  id="show"
                  onClick={() => {
                    document
                      .querySelector('#dialog')
                      .classList.add(`${style['dia']}`)
                    document.querySelector('#dialog').classList.remove('d-none')
                    document.querySelector('#dialog').classList.add('d-block')
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
            class={`btn ${style['button_reverse']} me-2`}
            id="checkProduct"
          >
            上一步
          </button>
          <button class={`btn ${style['button_main']}`} id="completeOrder">
            送出訂單
          </button>
        </div>
      </div>
      <Divider />
    </>
  )
}
