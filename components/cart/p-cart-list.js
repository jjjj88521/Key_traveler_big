import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '@/hooks/use-cart'
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
        updatedCheckedItems[item.id] = true
      })
    } else {
      items.forEach((item) => {
        updatedCheckedItems[item.id] = false
      })
    }
    setCheckedItems(updatedCheckedItems)
  }

  // 單選
  const handleToggleCheck = (id) => {
    const updatedCheckedItems = { ...checkedItems }
    updatedCheckedItems[id] = !updatedCheckedItems[id]
    setCheckedItems(updatedCheckedItems)
  }

  useEffect(() => {
    // 單選全勾，全選就勾
    const allChecked =
      items.length > 0 && items.every((item) => checkedItems[item.id])
    setCheckAll(allChecked)
  }, [items, checkedItems])

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
                        value={
                          item.specData.find((spec) => spec.key === key)?.value
                        }
                        onChange={(e) =>
                          styleSelect(item.id, key, e.target.value)
                        }
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
                        if (item.quantity === 1) {
                          removeItem(item.id)
                        } else {
                          minusOne(item.id)
                        }
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
                        plusOne(item.id)
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
                  checkAllItem(checkAll)
                }}
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
        <tbody className="accordion-collapse collapse show" id="collapseOne">
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
                  <div>{item.brand}</div>
                  <div>{item.name}</div>
                  <div className="pt-1">
                    {Object.keys(item.spec).map((key) => (
                      <select
                        key={key}
                        className="form-select form-select-sm mb-1"
                        style={{ width: 140 }}
                        value={
                          item.specData.find((spec) => spec.key === key)?.value
                        }
                        onChange={(e) =>
                          styleSelect(item.id, key, e.target.value)
                        }
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
                    <div className="pt-2">${item.price * item.quantity}</div>
                    <div
                      className="input-group ms-auto "
                      style={{ width: '50%' }}
                    >
                      <span className="input-group-text p-0 ">
                        <button
                          className="btn btn-sm"
                          type="button"
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id)
                            } else {
                              minusOne(item.id)
                            }
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
                            plusOne(item.id)
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
