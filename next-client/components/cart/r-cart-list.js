import React, { useState, useEffect } from 'react'
import { Steps, Divider, Radio, List } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'

export default function RCartList() {
  const initialRentProducts = [
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 300,
      startDate: '2023-10-02',
      endDate: '2023-10-03',
    },
    {
      id: 2,
      check: false,
      img: '/images/1669370674683000804.jpg',
      price: 100,
      startDate: '2023-10-04',
      endDate: '2023-10-05',
    },
  ]
  const [rentProducts, setRentProducts] = useState(initialRentProducts)
  const [checkAllRent, setCheckAllRent] = useState(false)

  const [totalAmount, setTotalAmount] = useState(0) // 總金額的狀態變數

  const handleStartDateChange = (id, newStartDate) => {
    setRentProducts((prevRentProducts) =>
      prevRentProducts.map((product) =>
        product.id === id ? { ...product, startDate: newStartDate } : product
      )
    )
  }

  const handleEndDateChange = (id, newEndDate) => {
    setRentProducts((prevRentProducts) =>
      prevRentProducts.map((product) =>
        product.id === id ? { ...product, endDate: newEndDate } : product
      )
    )
  }

  useEffect(() => {
    // 計算小計和總金額的邏輯
    let total = 0
    rentProducts.forEach((product) => {
      const start = new Date(product.startDate)
      const end = new Date(product.endDate)
      const timeDifference = end.getTime() - start.getTime()
      const productTotalDays = timeDifference / (1000 * 3600 * 24) + 1
      const subtotal = productTotalDays * product.price
      total += subtotal
      product.subtotal = subtotal
    })
    setTotalAmount(total)
    setRentProducts([...rentProducts]) // 更新狀態以重新渲染UI
  }, [rentProducts])

  // 獲取當前日期並格式化為 yyyy-MM-dd
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // R全選
  const toggleCheckAllRent = (rentProducts, isCheckedAll) => {
    return rentProducts.map((rentProduct) => {
      return { ...rentProduct, check: isCheckedAll }
    })
  }
  //R單選
  const toggleCheckRent = (rentProducts, id) => {
    return rentProducts.map((rentProduct) => {
      if (rentProduct.id === id)
        return { ...rentProduct, check: !rentProduct.check }
      else return { ...rentProduct }
    })
  }
  // R移除購物車商品
  const removeRent = (rentProducts, id) => {
    return rentProducts.filter((rentProduct) => rentProduct.id !== id)
  }
  // R全選
  const handleToggleCheckAllRent = (isCheckedAll) => {
    setRentProducts(toggleCheckAllRent(rentProducts, isCheckedAll))
  }
  // R單選
  const handleToggleCheckRent = (id) => {
    const updateRentProducts = toggleCheckRent(rentProducts, id)
    setRentProducts(updateRentProducts)
    const updateCheckAll = updateRentProducts.every(
      (rentProduct) => rentProduct.check
    )
    setCheckAllRent(updateCheckAll)
  }
  // R移除購物車商品
  const handleRemoveRent = (id) => {
    setRentProducts(removeRent(rentProducts, id))
  }
  return (
    <>
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
              <input
                type="checkbox"
                checked={checkAllRent}
                onChange={(e) => {
                  setCheckAllRent(e.target.checked)
                  handleToggleCheckAllRent(e.target.checked)
                }}
              />
            </th>
            <th className="bg-primary text-white ps-3" style={{ width: '40%' }}>
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
          {rentProducts.map((rentProduct) => (
            <tr key={rentProduct.id}>
              <td className="text-center align-middle">
                <input
                  type="checkbox"
                  checked={rentProduct.check}
                  onClick={() => {
                    handleToggleCheckRent(rentProduct.id)
                  }}
                />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <img src={rentProduct.img} width={100} height={100} />
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
                <input
                  className="form-control w-75"
                  type="date"
                  id="start_date"
                  value={rentProduct.startDate}
                  onChange={(e) =>
                    handleStartDateChange(rentProduct.id, e.target.value)
                  }
                />
                <div className="text-center pe-5 me-4">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-secondary"
                  />
                </div>
                <input
                  className="form-control w-75"
                  type="date"
                  id="end_date"
                  value={rentProduct.endDate}
                  onChange={(e) =>
                    handleEndDateChange(rentProduct.id, e.target.value)
                  }
                />
              </td>
              <td className="align-middle text-center">
                ${rentProduct.subtotal}
              </td>
              <td className="align-middle text-center">
                <button
                  className="btn border-white"
                  type="button"
                  onClick={() => {
                    handleRemoveRent(rentProduct.id)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="pe-5 text-end" colSpan={6}>
              {/* 總日數: {totalDays} */}
              總計: ${totalAmount}
            </td>
          </tr>
        </tbody>
      </table>
      {/* 租用商品 */}
      {/* 購物車 step1 手機版 */}
      <table className={`table d-table d-sm-none`}>
        <thead>
          <tr>
            <th
              className="bg-primary text-white text-center align-middle"
              style={{ width: '5%' }}
            >
              <input
                type="checkbox"
                checked={checkAllRent}
                onChange={(e) => {
                  setCheckAllRent(e.target.checked)
                  handleToggleCheckAllRent(e.target.checked)
                }}
              />
            </th>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex">
                <div>租用商品</div>
                <div className="ps-1">(2)</div>
                <div className="ms-auto pe-1">
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rentProducts.map((rentProduct) => (
            <tr key={rentProduct.id}>
              <td className="text-center align-middle px-1">
                <input
                  type="checkbox"
                  checked={rentProduct.check}
                  onClick={() => {
                    handleToggleCheckRent(rentProduct.id)
                  }}
                />
              </td>
              <td className="d-flex px-1">
                <div className="pe-2 pt-2">
                  <img src={rentProduct.img} width={100} height={100} />
                </div>
                <div>
                  <div className="">Qwertykey</div>
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
                  <div className="input-group ms-1 mt-1">
                    {/* <RangePicker
                      placeholder={''}
                      className="px-2 ms-1 rounded py-0"
                    /> */}
                    <input
                      className="form-control p-0"
                      type="date"
                      id="start_date"
                      value={rentProduct.startDate}
                      onChange={(e) =>
                        handleStartDateChange(rentProduct.id, e.target.value)
                      }
                      min={getCurrentDate()} // 不能選過去的日期
                      style={{ width: 97 }}
                    />
                    <div className="px-1">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-secondary"
                      />
                    </div>
                    <input
                      className="form-control p-0"
                      type="date"
                      id="end_date"
                      value={rentProduct.endDate}
                      onChange={(e) => {
                        // 結束日期不小於開始日期
                        const newEndDate = e.target.value
                        if (newEndDate >= rentProduct.startDate) {
                          handleEndDateChange(rentProduct.id, newEndDate)
                        }
                      }}
                      min={getCurrentDate()}
                      style={{ width: 97 }}
                    />
                  </div>
                  <div className="pt-1 ps-1">${rentProduct.subtotal}</div>
                </div>
                <button
                  className="btn border-white p-0"
                  type="button"
                  onClick={() => {
                    handleRemoveRent(rentProduct.id)
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
              總計: ${totalAmount}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
