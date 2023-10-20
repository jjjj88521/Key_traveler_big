import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faCircleChevronUp,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '@/hooks/useCart'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
// import { useCartContext } from '@/context/cart'

export default function PCartList() {
  // const { priceData, setPrice } = useCartContext()
  // 使用hooks 解出所需的狀態與函式(自context)
  const {
    cart,
    items,
    plusOne,
    minusOne,
    removeItem,
    checkItem,
    checkAllItem,
    styleSelect,
  } = useCart()

  const [checkAll, setCheckAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})

  // 全選
  const handleToggleCheckAll = () => {
    const updatedCheckedItems = {}
    setCheckAll(!checkAll)
    if (!checkAll) {
      items.forEach((item) => {
        updatedCheckedItems[item.specData] = true
      })
    } else {
      items.forEach((item) => {
        updatedCheckedItems[item.specData] = false
      })
    }
    setCheckedItems(updatedCheckedItems)
  }

  // 單選
  const handleToggleCheck = (id, specData) => {
    const updatedCheckedItems = {}
    items.map((item) => {
      if (item.specData === specData && item.id === id) {
        updatedCheckedItems[specData] = !updatedCheckedItems[specData]
      }
    })
    // console.log()
    setCheckedItems(updatedCheckedItems)
  }

  useEffect(() => {
    // 單選全勾，全選就勾
    const allChecked =
      items.length > 0 && items.every((item) => checkedItems[item.specData])
    setCheckAll(allChecked)
  }, [items, checkedItems])

  // 後端
  // 數量-1
  const minusPCart = async (id, specData) => {
    const pCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/minusproduct',
        pCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success') {
        console.log('成功更新')
        if (response.data.code === '200') {
          minusOne(id, specData)
        } else if (response.data.code === '201') {
          removeItem(id, specData)
        }
      } else {
        console.log('更新失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 數量+1
  const plusPCart = async (id, specData) => {
    const pCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/plusproduct',
        pCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success') {
        plusOne(id, specData)
      } else {
        console.log('更新失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 刪除
  const deletePCart = async (id, specData) => {
    const pCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/deleteproduct',
        pCart,
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
  const checkPcart = async (id, specData) => {
    const pCart = {
      id: id,
      specData: JSON.stringify(specData),
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/checkproduct',
        pCart,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.message === 'success' && response.data.code === '200') {
        console.log('勾選成功')
        // handleToggleCheck(id, specData)
        checkItem(id, specData)
      } else {
        console.log('勾選失敗')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 勾選全部
  const checkAllPcart = async (checkAll) => {
    const pCart = {
      checkAll: checkAll,
    }

    try {
      const response = await axios.post(
        'http://localhost:3005/api/cart/checkallproduct',
        pCart,
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
    checkAllPcart(checkAll)
    console.log(localStorage.getItem('BuyBtnType'))
    if (localStorage.getItem('BuyBtnType')) {
      if (localStorage.getItem('BuyBtnType') === 'product') {
        const data = JSON.parse(localStorage.getItem('cartPItem'))
        console.log(data)
        checkPcart(data.id, data.specData)
        localStorage.removeItem('BuyBtnType')
      }
    }
  }, [])

  useEffect(() => {
    setCheckAll(true)
    items.map((item) => {
      if (item.check === 0) {
        return setCheckAll(false)
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
          {/* 一般商品 */}
          <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
            <div
              className="pe-2"
              data-bs-target="#collapseOne"
              data-bs-toggle="collapse"
              aria-expanded={isExpanded ? 'true' : 'false'}
              aria-controls="collapseOne"
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
            </div>
            <div>一般商品</div>
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
                      checkAllPcart(!checkAll)
                    }}
                    disabled={items.length === 0 ? true : false}
                  />
                  {/* </div> */}
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
            <tbody
              className="accordion-collapse collapse show"
              id="collapseOne"
            >
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      checked={item.check ? true : false}
                      onChange={() => {
                        checkPcart(item.id, item.specData)
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
                  <td className="align-middle">${item.price}</td>
                  <td className="align-middle ps-4">
                    <div className="input-group">
                      <span className="input-group-text p-0">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            minusPCart(item.id, item.specData)
                          }}
                        >
                          -
                        </button>
                      </span>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                      />
                      <span className="input-group-text p-0">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            plusPCart(item.id, item.specData)
                          }}
                        >
                          +
                        </button>
                      </span>
                    </div>
                  </td>
                  <td className="align-middle text-center">
                    ${item.price * item.quantity}
                  </td>
                  <td className="align-middle text-center">
                    <button
                      className="btn border-white"
                      type="button"
                      onClick={() => {
                        deletePCart(item.id, item.specData)
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
                  總計: ${cart.cartTotal}
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
                    onChange={() => {
                      handleToggleCheckAll()
                      checkAllPcart(!checkAll)
                    }}
                    disabled={items.length === 0 ? true : false}
                  />
                </th>
                <th className="bg-primary text-white" colSpan={3}>
                  <div className="d-flex">
                    <div>一般商品</div>
                    <div className="ps-1">({items.length})</div>
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
            <tbody
              className="accordion-collapse collapse show"
              id="collapseOne"
            >
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle px-1">
                    <input
                      type="checkbox"
                      checked={item.check ? true : false}
                      onChange={() => {
                        checkPcart(item.id, item.specData)
                      }}
                    />
                  </td>
                  <td className="d-flex px-1 align-items-center">
                    <div className="pe-2 pt-2">
                      <Image src={item.img} width={120} height={100} alt="" />
                    </div>
                    <div>
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
                      <div className="d-flex pt-1">
                        <div className="pt-2">
                          ${item.price * item.quantity}
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
                                minusPCart(item.id, item.specData)
                              }}
                            >
                              -
                            </button>
                          </span>
                          <input
                            type="number"
                            className="form-control py-0 text-center"
                            value={item.quantity}
                          />
                          <span className="input-group-text p-0">
                            <button
                              className="btn btn-sm"
                              type="button"
                              onClick={() => {
                                plusPCart(item.id, item.specData)
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
                        deletePCart(item.id, item.specData)
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
                  總計: ${cart.cartTotal}
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
