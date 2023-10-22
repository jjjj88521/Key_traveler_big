import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function GOrderList() {
  const router = useRouter()
  const { query } = router
  const orderId = query.oid
  // console.log(query)
  // console.log(orderId)
  const [groupOrderDetails, setGroupOrderDetails] = useState([])

  useEffect(() => {
    // 設置API的URL，替換為實際的後端API端點
    const apiUrl = `http://localhost:3005/api/order/group/${orderId}`

    // 發送GET請求以獲取訂單詳細資料
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.orderDetails
        setGroupOrderDetails(data)
        // console.log(data)
      })
      .catch((error) => {
        console.error('獲取訂單詳細資料時出錯：', error)
      })
  }, [orderId])

  // console.log(groupOrderDetails)

  // const initialOrderLists = [
  //   {
  //     id: 1,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 3000,
  //     amount: 1,
  //   },
  //   {
  //     id: 2,
  //     img: '/images/1669370674683000804.jpg',
  //     price: 1000,
  //     amount: 2,
  //   },
  // ]

  // const [orderLists, setOrderLists] = useState(initialOrderLists)

  // G總計
  const calculateTotalPrice = (groupOrderDetails) => {
    let totalPrice = 0
    for (const groupOrderDetail of groupOrderDetails) {
      totalPrice += groupOrderDetail.price * groupOrderDetail.amount
    }
    return totalPrice
  }
  const totalAmount = groupOrderDetails.reduce((acc, v) => acc + v.amount, 0)
  const totalPrice = calculateTotalPrice(groupOrderDetails)

  return (
    <>
      {/* 團購商品 */}
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
        <div>團購商品</div>
        <div className="ps-1">({groupOrderDetails.length})</div>
      </div>
      {/* 歷史訂單明細頁 電腦版 */}
      <table className={`table d-none d-sm-table`}>
        <thead>
          <tr>
            <th className="bg-primary text-white ps-3" style={{ width: '40%' }}>
              商品明細
            </th>
            <th className="bg-primary text-white text-center">單價</th>
            <th className="bg-primary text-white text-center">數量</th>
            <th className="bg-primary text-white text-center">小計</th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseTwo">
          {groupOrderDetails.map((v, i) => (
            <tr key={i}>
              <td className="d-flex ps-3">
                <div className="p-2">
                  {v.images && v.images.length > 0 ? (
                    <Image
                      src={'/images/product/' + JSON.parse(v.images)[0]} // 加上斜槓來表示相對路徑
                      width={100}
                      height={100}
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="p-2">
                  <div>{v.brand}</div>
                  <div>{v.name}</div>
                  {v.spec && (
                    <div className="d-flex gap-2 pt-2">
                      {Object.values(JSON.parse(v.spec)).map((item, index) => (
                        <div key={index} className="text-secondary">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="align-middle text-center">${v.price}</td>
              <td className="align-middle ps-3 text-center">{v.amount}</td>
              <td className="align-middle text-center">
                <span className="text-primary">${v.price * v.amount} </span>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end" colSpan={5}>
              共 <span className="text-primary"> {totalAmount} </span>
              件商品，總計：
              <span className="text-primary">${totalPrice}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {/* 團購商品 */}
      {/* 歷史訂單明細頁 手機版 */}
      <table className="table d-table d-sm-none">
        <thead>
          <tr>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex px-1">
                <div>團購商品</div>
                <div className="ps-1">({groupOrderDetails.length})</div>
                <div
                  className="ms-auto"
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
          {groupOrderDetails.map((v, i) => (
            <tr key={i}>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  {v.images && v.images.length > 0 ? (
                    <Image
                      src={'/images/product/' + JSON.parse(v.images)[0]} // 加上斜槓來表示相對路徑
                      width={100}
                      height={100}
                      alt=""
                    />
                  ) : null}
                </div>
                <div>
                  <div>{v.brand}</div>
                  <div>{v.name}</div>
                  {v.spec && (
                    <div className="d-flex gap-2 flex-column">
                      {Object.values(JSON.parse(v.spec)).map((item, index) => (
                        <div key={index} className="text-secondary">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="d-flex align-items-center justify-content-between">
                    <div>${v.price}</div>
                    <span>x</span>
                    <div
                      className="border rounded-5 text-center"
                      style={{ width: 70 }}
                    >
                      {v.amount}
                    </div>
                  </div>
                  <div>
                    <span className="text-primary">${v.price * v.amount}</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end" colSpan={2}>
              共 <span className="text-primary"> {totalAmount} </span>
              件商品，總計：
              <span className="text-primary">${totalPrice}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-5">
        <button
          className="btn btn-primary mx-3"
          onClick={() => {
            router.push(`http://localhost:3000/user/order`)
          }}
        >
          上一頁
        </button>
      </div>
    </>
  )
}
