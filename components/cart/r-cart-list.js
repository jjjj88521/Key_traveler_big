import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
  faCaretRight,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { useRentCart } from '@/hooks/useRentCart'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'

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
  // const handleToggleCheck = (id) => {
  //   const updatedCheckedItems = { ...checkedItems }
  //   updatedCheckedItems[id] = !updatedCheckedItems[id]
  //   setCheckedItems(updatedCheckedItems)
  // }

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

  // 後端
  // 更改起訖日
  const dateCart = async (id, startDate, endDate, specData) => {
    const rCart = {
      id,
      startDate,
      endDate,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/rentdate',
        rCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success') {
        console.log('更新成功')
        handleStartDateChange(id, startDate, specData)
        handleEndDateChange(id, endDate, specData)
      } else {
        console.log('更新失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 刪除
  const deleteRCart = async (id, specData) => {
    const rCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/deleterent',
        rCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success' && response.data.code === '200') {
        console.log('刪除成功')
        removeItem(id, specData)
      } else {
        console.log('刪除失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 勾選
  const checkRcart = async (id, specData) => {
    const rCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/checkrent',
        rCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success' && response.data.code === '200') {
        console.log('勾選成功')
        checkItem(id, specData)
      } else {
        console.log('勾選失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 勾選全部
  const checkAllRcart = async (checkAll) => {
    const rCart = {
      checkAll: checkAll,
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/checkallrent',
        rCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success' && response.data.code === '200') {
        console.log('勾選全部成功')

        checkAllItem(checkAll)
      } else {
        console.log('勾選全部失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useLoading(items)
  useEffect(() => {
    checkAllRcart(checkAll)
    if (localStorage.getItem('BuyBtnType')) {
      if (localStorage.getItem('BuyBtnType') === 'rent') {
        const data = JSON.parse(localStorage.getItem('cartRItem'))
        checkRcart(data.id, data.specData)
        localStorage.removeItem('BuyBtnType')
      }
    }
  }, [])

  useEffect(() => {
    setCheckAll(true)
    items.map((item) => {
      if (item.check === 0) {
        setCheckAll(false)
      }
    })
    if (items.length === 0) {
      setCheckAll(false)
    }
  }, [items])

  useEffect(() => {
    console.log(checkAll)
  }, [checkAll])

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : Array.isArray(items) ? (
        <div>
          {/* 租用商品 */}
          {/* <div className="mb-3 text-primary d-none d-sm-block d-sm-flex"> */}
          <button
            className="mb-3 text-primary d-none d-sm-flex btn border-0 text-primary align-items-center gap-2"
            type="button"
            data-bs-target="#collapseTwo"
            data-bs-toggle="collapse"
            aria-expanded={isExpanded ? 'true' : 'false'}
            aria-controls="collapseTwo"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <FontAwesomeIcon
                icon={faCircleChevronUp}
                className="text-primary"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                className="text-primary"
              />
            )}
            <div>租用商品 ({items.length})</div>
          </button>
          {/* </div> */}
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
                      checkAllRcart(!checkAll)
                    }}
                    disabled={items.length === 0 ? true : false}
                  />
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
                <th className="bg-primary text-white text-center">小計</th>
                <th className="bg-primary text-white"></th>
              </tr>
            </thead>
            <tbody
              className="accordion-collapse collapse show"
              id="collapseTwo"
            >
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={item.check ? true : false}
                      onChange={() => {
                        checkRcart(item.id, item.specData)
                      }}
                    />
                  </td>
                  <td className="d-flex align-items-center">
                    <div className="p-2">
                      <Image src={item.img} width={120} height={100} alt="" />
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
                            value={item.specData[key]}
                            disabled
                          >
                            {item.spec[key].map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
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
                        dateCart(
                          item.id,
                          e.target.value,
                          item.endDate,
                          item.specData
                        )
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
                      onChange={(e) =>
                        dateCart(
                          item.id,
                          item.startDate,
                          e.target.value,
                          item.specData
                        )
                      }
                      min={getCurrentDate()}
                    />
                  </td>
                  <td className="align-middle text-center text-primary">
                    ${item.subtotal}
                  </td>
                  <td className="align-middle text-center">
                    <button
                      className="btn border-white"
                      type="button"
                      onClick={() => {
                        deleteRCart(item.id, item.specData)
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
                  總計: <span className="text-primary">${cart.cartTotal}</span>
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
                      checkAllRcart(!checkAll)
                    }}
                    disabled={items.length === 0 ? true : false}
                  />
                </th>
                <th className="bg-primary text-white" colSpan={3}>
                  <div className="d-flex">
                    <div>租用商品</div>
                    <div className="ps-1">({items.length})</div>
                    <button
                      className="ms-auto pe-1 border-0 bg-transparent text-white"
                      type="button"
                      data-bs-target="#collapseTwo"
                      data-bs-toggle="collapse"
                      aria-expanded={isExpanded ? 'true' : 'false'}
                      aria-controls="collapseTwo"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <FontAwesomeIcon icon={faCircleChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCircleChevronDown} />
                      )}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              className="accordion-collapse collapse show"
              id="collapseTwo"
            >
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle px-1">
                    <input
                      type="checkbox"
                      checked={item.check ? true : false}
                      onChange={() => {
                        checkRcart(item.id, item.specData)
                      }}
                    />
                  </td>
                  <td className="d-flex px-1 align-items-center">
                    <div className="pe-2 pt-2">
                      <Image src={item.img} width={120} height={100} alt="" />
                    </div>
                    <div>
                      <div className="">{item.brand}</div>
                      <div>{item.name}</div>
                      <div className="pt-1">
                        {Object.keys(item.spec).map((key) => (
                          <select
                            key={key}
                            className="form-select form-select-sm mb-1"
                            style={{ width: 140 }}
                            value={item.specData[key]}
                            disabled
                          >
                            {item.spec[key].map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                      <div className="d-flex pt-1 flex-column">
                        <input
                          className="form-control p-0"
                          type="date"
                          id="start_date"
                          value={item.startDate}
                          onChange={(e) =>
                            dateCart(
                              item.id,
                              e.target.value,
                              item.endDate,
                              item.specData
                            )
                          }
                          min={getCurrentDate()} // 不能選過去的日期
                          // style={{ width: 97 }}
                        />
                        <div className="px-1 text-center">
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="text-secondary"
                          />
                        </div>
                        <input
                          className="form-control p-0"
                          type="date"
                          id="end_date"
                          value={item.endDate}
                          onChange={(e) =>
                            dateCart(
                              item.id,
                              item.startDate,
                              e.target.value,
                              item.specData
                            )
                          }
                          min={getCurrentDate()}
                          // style={{ width: 97 }}
                        />
                      </div>
                      <div className="pt-1 ps-1 text-primary">
                        ${item.subtotal}
                      </div>
                    </div>
                    <button
                      className="btn border-white w-100"
                      type="button"
                      onClick={() => {
                        deleteRCart(item.id, item.specData)
                      }}
                      style={{ height: 20 }}
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
                <td className="text-end" colSpan={2}>
                  總計: <span className="text-primary">${cart.cartTotal}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
