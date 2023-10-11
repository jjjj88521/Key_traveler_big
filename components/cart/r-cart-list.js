import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
// import { useCartContext } from '@/context/cart'
import { useSecondCart } from '@/hooks/useSecondCart'

export default function RCartList({ setOrderTotalR, setOrderAmountR }) {
  // const { priceData, setPrice } = useCartContext()
  const {
    cart,
    items,
    removeItem,
    checkItem,
    checkAllItem,
    getCurrentDate,
    handleStartDateChange,
    handleEndDateChange,
  } = useSecondCart()

  // const initialRentProducts = [
  //   {
  //     id: 1,
  //     check: false,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 300,
  //     startDate: '2023-10-15',
  //     endDate: '2023-10-16',
  //   },
  //   {
  //     id: 2,
  //     check: false,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 100,
  //     startDate: '2023-10-17',
  //     endDate: '2023-10-18',
  //   },
  // ]
  // const [rentProducts, setRentProducts] = useState(initialRentProducts)
  // const [checkAllRent, setCheckAllRent] = useState(false)
  // const [totalAmount, setTotalAmount] = useState(0) // 總計的狀態變數
  // const [orderTotal, setOrderTotal] = useState(0) // 總金額的狀態變數
  // const [orderAmount, setOrderAmount] = useState(0) //總件數的狀態變數
  const [checkAll, setCheckAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})

  // 單選
  const handleToggleCheck = (id) => {
    const updatedCheckedItems = { ...checkedItems }
    updatedCheckedItems[id] = !updatedCheckedItems[id]
    setCheckedItems(updatedCheckedItems)
  }

  // 全選
  const handleToggleCheckAll = () => {
    setCheckAll(!checkAll)
    const updatedCheckedItems = {}
    if (!checkAll) {
      items.forEach((item) => {
        updatedCheckedItems[item.id] = true
      })
    }
    setCheckedItems(updatedCheckedItems)
  }

  useEffect(() => {
    // 單選全勾，全選就勾
    const allChecked =
      items.length > 0 && items.every((item) => checkedItems[item.id])
    setCheckAll(allChecked)
  }, [items, checkedItems])
  // //R總計
  // useEffect(() => {
  //   // 計算小計和總計及總金額
  //   let total = 0
  //   let orderTotal = 0
  //   let orderAmount = 0
  //   rentProducts.forEach((v) => {
  //     const start = new Date(v.startDate)
  //     const end = new Date(v.endDate)
  //     const timeDifference = end.getTime() - start.getTime()
  //     const productTotalDays = timeDifference / (1000 * 3600 * 24) + 1
  //     const subtotal = productTotalDays * v.price
  //     total += subtotal
  //     v.subtotal = subtotal
  //     if (v.check) {
  //       const sum = subtotal
  //       orderTotal += sum
  //       orderAmount++
  //     }
  //   })
  //   // setPrice(priceData + orderTotal)
  //   setTotalAmount(total)
  //   setOrderTotal(orderTotal)
  //   setOrderAmount(orderAmount)
  //   setOrderTotalR(orderTotal)
  //   setOrderAmountR(orderAmount)
  //   // console.log(orderTotal)
  //   // console.log(orderAmount)
  //   // setRentProducts([...rentProducts]) // Maximum update depth exceeded.
  // }, [rentProducts])

  // 租用日期不可選已過去日期
  // 獲取當前日期並格式化為 yyyy-MM-dd
  // const getCurrentDate = () => {
  //   const today = new Date()
  //   const year = today.getFullYear()
  //   const month = String(today.getMonth() + 1).padStart(2, '0')
  //   const day = String(today.getDate()).padStart(2, '0')
  //   return `${year}-${month}-${day}`
  // }

  // // R全選
  // const toggleCheckAllRent = (rentProducts, isCheckedAll) => {
  //   return rentProducts.map((v) => {
  //     return { ...v, check: isCheckedAll }
  //   })
  // }
  // //R單選
  // const toggleCheckRent = (rentProducts, id) => {
  //   return rentProducts.map((v) => {
  //     if (v.id === id) return { ...v, check: !v.check }
  //     else return { ...v }
  //   })
  // }
  // // R移除購物車商品
  // const removeRent = (rentProducts, id) => {
  //   return rentProducts.filter((v) => v.id !== id)
  // }
  // // R全選
  // const handleToggleCheckAllRent = (isCheckedAll) => {
  //   setRentProducts(toggleCheckAllRent(rentProducts, isCheckedAll))
  // }
  // // R單選
  // const handleToggleCheckRent = (id) => {
  //   const updateRentProducts = toggleCheckRent(rentProducts, id)
  //   setRentProducts(updateRentProducts)
  //   const updateCheckAll = updateRentProducts.every((v) => v.check)
  //   setCheckAllRent(updateCheckAll)
  // }
  // // R移除購物車商品
  // const handleRemoveRent = (id) => {
  //   setRentProducts(removeRent(rentProducts, id))
  // }

  //租用起日
  // const handleStartDateChange = (id, newStartDate) => {
  //   setRentProducts((rentProducts) =>
  //     rentProducts.map((v) =>
  //       v.id === id ? { ...v, startDate: newStartDate } : v
  //     )
  //   )
  // }
  //租用迄日
  // const handleEndDateChange = (id, newEndDate) => {
  //   setRentProducts((rentProducts) =>
  //     rentProducts.map((v) => (v.id === id ? { ...v, endDate: newEndDate } : v))
  //   )
  // }
  return (
    <>
      {/* 租用商品 */}
      <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
        <div
          className="pe-2"
          data-bs-target="#collapseThree"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="collapseThree"
        >
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className="text-primary"
          />
        </div>
        <div>租用商品</div>
        <div className="ps-1">({items.length})</div>
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
                onChange={() => {
                  handleToggleCheckAll()
                  checkAllItem(checkAll)
                }}
                // checked={checkAllRent}
                // onChange={(e) => {
                //   setCheckAllRent(e.target.checked)
                //   handleToggleCheckAllRent(e.target.checked)
                // }}
              />
            </th>
            <th className="bg-primary text-white ps-3" style={{ width: '40%' }}>
              商品明細
            </th>
            <th className="bg-primary text-white" style={{ width: '25%' }}>
              租用日期
            </th>
            <th className="bg-primary text-white text-center">小計</th>
            <th className="bg-primary text-white"></th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseThree">
          {items.map((v, i) => (
            <tr key={i}>
              <td className="text-center align-middle">
                <input
                  type="checkbox"
                  checked={checkedItems[v.id] || false}
                  onChange={() => {
                    handleToggleCheck(v.id)
                    checkItem(v.id)
                  }}
                  // checked={v.check}
                  // onClick={() => {
                  //   handleToggleCheckRent(v.id)
                  // }}
                />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div className="p-2">
                  <div>{v.brand}</div>
                  <div>{v.name}</div>
                  <div className="pt-1">
                    {Object.keys(v.spec).map((key) => (
                      <select
                        key={key}
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                        disabled
                      >
                        {v.spec[key].map((option, optionIndex) => (
                          <option key={optionIndex}>{option}</option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              </td>
              <td className="align-middle">
                <input
                  className="form-control w-75"
                  type="date"
                  id={`start_date${v.id}`}
                  value={v.startDate}
                  onChange={(e) => handleStartDateChange(v.id, e.target.value)}
                  min={getCurrentDate()}
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
                  id={`end_date${v.id}`}
                  value={v.endDate}
                  onChange={(e) => {
                    // 結束日期不小於開始日期
                    const newEndDate = e.target.value
                    if (newEndDate >= v.startDate) {
                      handleEndDateChange(v.id, newEndDate)
                    }
                  }}
                  min={getCurrentDate()}
                />
              </td>
              <td className="align-middle text-center">${v.subtotal}</td>
              <td className="align-middle text-center">
                <button
                  className="btn border-white"
                  type="button"
                  onClick={() => {
                    removeItem(v.id)
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
              {/* 總計: ${totalAmount} */}
              總計: ${cart.cartTotal}
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
                checked={checkAll}
                onChange={() => {
                  handleToggleCheckAll()
                  checkAllItem(checkAll)
                }}
                // checked={checkAllRent}
                // onChange={(e) => {
                //   setCheckAllRent(e.target.checked)
                //   handleToggleCheckAllRent(e.target.checked)
                // }}
              />
            </th>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex">
                <div>租用商品</div>
                <div className="ps-1">({items.length})</div>
                <div
                  className="ms-auto pe-1"
                  data-bs-target="#collapseThree"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                >
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseThree">
          {items.map((v, i) => (
            <tr key={i}>
              <td className="text-center align-middle px-1">
                <input
                  type="checkbox"
                  checked={checkedItems[v.id] || false}
                  onChange={() => {
                    handleToggleCheck(v.id)
                    checkItem(v.id)
                  }}
                  // checked={v.check}
                  // onClick={() => {
                  //   handleToggleCheckRent(v.id)
                  // }}
                />
              </td>
              <td className="d-flex px-1">
                <div className="pe-2 pt-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div>
                  <div className="">{v.brand}</div>
                  <div>{v.name}</div>
                  <div className="p-1">
                    {Object.keys(v.spec).map((key) => (
                      <select
                        key={key}
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                        disabled
                      >
                        {v.spec[key].map((option, optionIndex) => (
                          <option key={optionIndex}>{option}</option>
                        ))}
                      </select>
                    ))}
                  </div>
                  <div className="input-group ms-1 mt-1">
                    <input
                      className="form-control p-0"
                      type="date"
                      id="start_date"
                      value={v.startDate}
                      onChange={(e) =>
                        handleStartDateChange(v.id, e.target.value)
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
                      value={v.endDate}
                      onChange={(e) => {
                        // 結束日期不小於開始日期
                        const newEndDate = e.target.value
                        if (newEndDate >= v.startDate) {
                          handleEndDateChange(v.id, newEndDate)
                        }
                      }}
                      min={getCurrentDate()}
                      style={{ width: 97 }}
                    />
                  </div>
                  <div className="pt-1 ps-1">${v.subtotal}</div>
                </div>
                <button
                  className="btn border-white p-0"
                  type="button"
                  onClick={() => {
                    removeItem(v.id)
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
              總計: ${cart.cartTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
