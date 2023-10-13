import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { useRentCart } from '@/hooks/useRentCart'

export default function RCartList() {
  const {
    cart,
    items,
    removeItem,
    checkItem,
    checkAllItem,
    getCurrentDate,
    handleStartDateChange,
    handleEndDateChange,
  } = useRentCart()

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
    const allChecked =
      items.length > 0 && items.every((item) => checkedItems[item.id])
    setCheckAll(allChecked)
  }, [items, checkedItems])

  return (
    <>
      {/* 租用商品 */}
      <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
        <div
          className="pe-2"
          data-bs-target="#collapseTwo"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="collapseTwo"
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
        <tbody className="accordion-collapse collapse show" id="collapseTwo">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="text-center align-middle">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => {
                    handleToggleCheck(item.id)
                    checkItem(item.id)
                  }}
                />
              </td>
              <td className="d-flex">
                <div className="p-2">
                  <Image src={item.img} width={100} height={100} alt="" />
                </div>
                <div className="p-2">
                  <div>{item.brand}</div>
                  <div>{item.name}</div>
                  <div className="pt-1">
                    {Object.keys(item.spec).map((key) => (
                      <select
                        key={key}
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                        disabled
                      >
                        {item.spec[key].map((option, optionIndex) => (
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
                  id={`start_date${item.id}`}
                  value={item.startDate}
                  onChange={(e) =>
                    handleStartDateChange(item.id, e.target.value)
                  }
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
                  id={`end_date${item.id}`}
                  value={item.endDate}
                  onChange={(e) => handleEndDateChange(item.id, e.target.value)}
                  min={getCurrentDate()}
                />
              </td>
              <td className="align-middle text-center">${item.subtotal}</td>
              <td className="align-middle text-center">
                <button
                  className="btn border-white"
                  type="button"
                  onClick={() => {
                    removeItem(item.id)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="pe-5 text-end" colSpan={6}>
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
              />
            </th>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex">
                <div>租用商品</div>
                <div className="ps-1">({items.length})</div>
                <div
                  className="ms-auto pe-1"
                  data-bs-target="#collapseTwo"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseTwo">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="text-center align-middle px-1">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => {
                    handleToggleCheck(item.id)
                    checkItem(item.id)
                  }}
                />
              </td>
              <td className="d-flex px-1">
                <div className="pe-2 pt-2">
                  <Image src={item.img} width={100} height={100} alt="" />
                </div>
                <div>
                  <div className="">{item.brand}</div>
                  <div>{item.name}</div>
                  <div className="p-1">
                    {Object.keys(item.spec).map((key) => (
                      <select
                        key={key}
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                        disabled
                      >
                        {item.spec[key].map((option, optionIndex) => (
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
                      value={item.startDate}
                      onChange={(e) =>
                        handleStartDateChange(item.id, e.target.value)
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
                      value={item.endDate}
                      onChange={(e) =>
                        handleEndDateChange(item.id, e.target.value)
                      }
                      min={getCurrentDate()}
                      style={{ width: 97 }}
                    />
                  </div>
                  <div className="pt-1 ps-1">${item.subtotal}</div>
                </div>
                <button
                  className="btn border-white p-0"
                  type="button"
                  onClick={() => {
                    removeItem(item.id)
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
