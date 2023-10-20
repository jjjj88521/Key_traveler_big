import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faPencil,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function POrderList() {
  const router = useRouter()
  const { query } = router
  const orderId = query.oid
  console.log(query)
  console.log(orderId)
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    // 設置API的URL，替換為實際的後端API端點
    const apiUrl = `http://localhost:3005/api/order/purchase/${orderId}`

    // 發送GET請求以獲取訂單詳細資料
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.orderDetails
        setOrderDetails(data)
        // console.log(data)
      })
      .catch((error) => {
        console.error('獲取訂單詳細資料時出錯：', error)
      })
  }, [orderId])

  // console.log(orderDetails)

  // const images =
  //   Object.keys(orderDetails).length > 0 ? JSON.parse(orderDetails.images) : []
  // console.log(images)
  // const img = JSON.parse(v.images)
  // const initialOrderLists = [
  //   {
  //     id: 5,
  //     img: '/images/1669370674683000804.jpg',
  //     brand: 'Meletrix',
  //     name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
  //     price: 3000,
  //     amount: 1,
  //     spec: {
  //       外殼: ['EE 耀夜黑', 'EE 細花白'],
  //       '配重/旋鈕': ['電泳 白', '陽極 黑'],
  //     },
  //   },
  //   {
  //     id: 2,
  //     img: '/images/1669370674683000804.jpg',
  //     brand: 'Meletrix',
  //     name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
  //     price: 1000,
  //     amount: 2,
  //     spec: {
  //       外殼: ['EE 耀夜黑', 'EE 細花白'],
  //       '配重/旋鈕': ['電泳 白', '陽極 黑'],
  //     },
  //   },
  // ]

  // const [orderLists, setOrderLists] = useState(initialOrderLists)

  // P總計
  const calculateTotalPrice = (orderDetails) => {
    let totalPrice = 0
    for (const orderDetail of orderDetails) {
      totalPrice += orderDetail.price * orderDetail.amount
    }
    return totalPrice
  }
  const totalPrice = calculateTotalPrice(orderDetails)

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
        <div className="ps-1">({orderDetails.length})</div>
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
            <th className="bg-primary text-white text-center">評價</th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseOne">
          {orderDetails.map((v, i) => (
            <tr key={i}>
              <td className="d-flex ps-3">
                <div className="pt-2 px-2">
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
                  <div>
                    {v.spec && (
                      <div>
                        {Object.keys(JSON.parse(v.spec)).map((key) => (
                          <div key={key}>
                            {JSON.parse(v.spec)[key].join(', ')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="align-middle text-center">${v.price}</td>
              <td className="align-middle ps-3 text-center">{v.amount}</td>
              <td className="align-middle text-center">
                ${v.price * v.amount}
              </td>
              <td className="align-middle ps-3 text-center">
                <button className="btn">
                  <FontAwesomeIcon icon={faPencil} className="text-primary" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-4" colSpan={5}>
              <div className="pe-4">總計: ${totalPrice}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* 一般商品 */}
      {/* 歷史訂單明細頁 手機版 */}
      <table className="table d-table d-sm-none">
        <thead>
          <tr>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex px-1">
                <div>一般商品</div>
                <div className="ps-1">({orderDetails.length})</div>
                <div
                  className="ms-auto"
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
          {orderDetails.map((v, i) => (
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
                  <div>
                    {v.spec && (
                      <div>
                        {Object.keys(JSON.parse(v.spec)).map((key) => (
                          <div key={key}>
                            {JSON.parse(v.spec)[key].join(', ')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="d-flex">
                    <div>${v.price}</div>
                    <div
                      className="border rounded-5 ms-auto text-center"
                      style={{ width: 70 }}
                    >
                      {v.amount}
                    </div>
                  </div>
                </div>
              </td>
              <td className="align-middle">
                <button className="btn">
                  <FontAwesomeIcon icon={faPencil} className="text-primary" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-3" colSpan={2}>
              總計: ${totalPrice}
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
        {/* <Link
          href={`http://localhost:3000/user/order`}
          className="btn btn-primary text-light"
        >
          上一頁
        </Link> */}
      </div>
    </>
  )
}
