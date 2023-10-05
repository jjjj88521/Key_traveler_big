import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
// import { useCartContext } from '@/context/cart'

export default function PCartList({ setOrderTotalP, setOrderAmountP }) {
  // const { priceData, setPrice } = useCartContext()
  const initialProducts = [
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 3000,
      quantity: 1,
    },
    {
      id: 2,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 1000,
      quantity: 2,
    },
  ]

  const [products, setProducts] = useState(initialProducts)
  const [checkAll, setCheckAll] = useState(false)
  const [orderTotal, setOrderTotal] = useState(0) // 總金額的狀態變數
  const [orderAmount, setOrderAmount] = useState(0) //總件數的狀態變數

  // console.log('p-cart : ' + priceData)
  //P總金額
  useEffect(() => {
    let orderTotal = 0
    let orderAmount = 0
    products.map((v) => {
      if (v.check) {
        const sum = v.price * v.quantity
        orderTotal += sum
        orderAmount++
      }
    })
    // setPrice(orderTotal)
    setOrderTotal(orderTotal)
    setOrderAmount(orderAmount)
    setOrderTotalP(orderTotal)
    setOrderAmountP(orderAmount)
    // console.log(orderTotal)
    // console.log(orderAmount)
  }, [products])

  // P全選
  const toggleCheckAll = (products, isCheckedAll) => {
    return products.map((v) => {
      return { ...v, check: isCheckedAll }
    })
  }
  //P單選
  const toggleCheck = (products, id) => {
    return products.map((v) => {
      if (v.id === id) return { ...v, check: !v.check }
      else return { ...v }
    })
  }
  // 增減數量
  const upDateQuantity = (products, id, value) => {
    return products.map((v) => {
      if (v.id === id) return { ...v, quantity: v.quantity + value }
      else return { ...v }
    })
  }
  // P移除購物車商品
  const removeProduct = (products, id) => {
    return products.filter((v) => v.id !== id)
  }
  // P總計
  const calculateTotalPrice = (products) => {
    let totalPrice = 0
    for (const v of products) {
      totalPrice += v.price * v.quantity
    }
    return totalPrice
  }
  const totalPrice = calculateTotalPrice(products)
  // P全選
  const handleToggleCheckAll = (isCheckedAll) => {
    setProducts(toggleCheckAll(products, isCheckedAll))
  }
  // P單選
  const handleToggleCheck = (id) => {
    const updateProducts = toggleCheck(products, id)
    setProducts(updateProducts)
    const updateCheckAllRent = updateProducts.every((v) => v.check)
    setCheckAll(updateCheckAllRent)
  }
  // 增減數量
  const handleIncrement = (id) => {
    setProducts(upDateQuantity(products, id, 1))
  }
  const handleDecrement = (id) => {
    setProducts(upDateQuantity(products, id, -1))
  }

  // P移除購物車商品
  const handleRemove = (id) => {
    setProducts(removeProduct(products, id))
  }
  return (
    <>
      {/* 一般商品 */}
      <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
        <div
          className="pe-2"
          data-bs-target="#collapseOne"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className="text-primary"
          />
        </div>
        <div>一般商品</div>
        <div className="ps-1">({products.length})</div>
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
                checked={checkAll}
                onChange={(e) => {
                  setCheckAll(e.target.checked)
                  handleToggleCheckAll(e.target.checked)
                }}
              />
            </th>
            <th className="bg-primary text-white ps-3" style={{ width: '40%' }}>
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
        <tbody className="accordion-collapse collapse show" id="collapseOne">
          {products.map((v) => (
            <tr key={v.id}>
              <td className="text-center align-middle">
                <input
                  type="checkbox"
                  checked={v.check}
                  onChange={() => {
                    handleToggleCheck(v.id)
                  }}
                />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1"
                      style={{ width: 140 }}
                      disabled
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                      disabled
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">${v.price}</td>
              <td className="align-middle ps-4">
                <div className="input-group">
                  <span className="input-group-text p-0">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        if (v.quantity === 1) {
                          handleRemove(v.id)
                        } else {
                          handleDecrement(v.id)
                        }
                      }}
                    >
                      -
                    </button>
                  </span>
                  <input
                    type="text"
                    className="form-control text-center"
                    defaultValue={v.quantity}
                  />
                  <span className="input-group-text p-0">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        handleIncrement(v.id)
                      }}
                    >
                      +
                    </button>
                  </span>
                </div>
              </td>
              <td className="align-middle text-center">
                ${v.price * v.quantity}
              </td>
              <td className="align-middle text-center">
                <button
                  className="btn border-white"
                  type="button"
                  onClick={() => {
                    handleRemove(v.id)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
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
      {/* 一般商品 */}
      {/* 購物車 step1 手機版 */}
      <table className={`table d-table d-sm-none mb-4 accordion`}>
        <thead className="">
          <tr>
            <th
              className="bg-primary text-white text-center align-middle"
              style={{ width: '5%' }}
            >
              <input
                type="checkbox"
                checked={checkAll}
                onChange={(e) => {
                  setCheckAll(e.target.checked)
                  handleToggleCheckAll(e.target.checked)
                }}
              />
            </th>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex">
                <div>一般商品</div>
                <div className="ps-1">({products.length})</div>
                <div
                  className="ms-auto pe-1"
                  data-bs-target="#collapseOne"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseOne">
          {products.map((v) => (
            <tr key={v.id}>
              <td className="text-center align-middle px-1">
                <input
                  type="checkbox"
                  checked={v.check}
                  onChange={() => {
                    handleToggleCheck(v.id)
                  }}
                />
              </td>
              <td className="d-flex px-1">
                <div className="pe-2 pt-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1 py-0"
                      style={{ width: 100 }}
                      disabled
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm py-0"
                      style={{ width: 100 }}
                      disabled
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                  <div className="d-flex pt-1">
                    <div className="pt-2">${v.price * v.quantity}</div>
                    <div
                      className="input-group ms-auto "
                      style={{ width: '50%' }}
                    >
                      <span className="input-group-text p-0 ">
                        <button
                          className="btn btn-sm"
                          type="button"
                          onClick={() => {
                            if (v.quantity === 1) {
                              handleRemove(v.id)
                            } else {
                              handleDecrement(v.id)
                            }
                          }}
                        >
                          -
                        </button>
                      </span>
                      <input
                        type="number"
                        className="form-control py-0 text-center"
                        defaultValue={v.quantity}
                      />
                      <span className="input-group-text p-0">
                        <button
                          className="btn btn-sm"
                          type="button"
                          onClick={() => {
                            handleIncrement(v.id)
                          }}
                        >
                          +
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn border-white ps-1 pe-2"
                  type="button"
                  onClick={() => {
                    handleRemove(v.id)
                  }}
                  style={{ height: 20 }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end" colSpan={2}>
              總計: ${totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
