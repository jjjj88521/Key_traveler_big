import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function ROrderList() {
  const router = useRouter()
  const { query } = router
  const orderId = query.oid
  // console.log(query)
  // console.log(orderId)
  const [rentOrderDetails, setRentOrderDetails] = useState([])

  useEffect(() => {
    // 設置API的URL，替換為實際的後端API端點
    const apiUrl = `http://localhost:3005/api/order/rent/${orderId}`

    // 發送GET請求以獲取訂單詳細資料
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.orderDetails
        setRentOrderDetails(data)
        console.log(data)
      })
      .catch((error) => {
        console.error('獲取訂單詳細資料時出錯：', error)
      })
  }, [orderId])

  console.log(rentOrderDetails)

  // const initialRentOrderLists = [
  //   {
  //     rent_id: 3,
  //     img: '/images/1669370674683000804.jpg',
  //     brand: 'Meletrix',
  //     name: 'Zoom75',
  //     start: '2023-10-02',
  //     end: '2023-10-03',
  //     rental_days:2
  //     price: 300,
  //   },
  //   {
  //     rent_id: 2,
  //     img: '/images/1669370674683000804.jpg',
  //     brand: 'Meletrix',
  //     name: 'Zoom75',
  //     start: '2023-10-04',
  //     end: '2023-10-05',
  //     rental_days:2
  //     price: 100,
  //   },
  // ]

  // const [rentOrderLists, setRentOrderLists] = useState(initialRentOrderLists)

  // R總計
  const calculateTotalPrice = (rentOrderDetails) => {
    let totalPrice = 0
    for (const v of rentOrderDetails) {
      totalPrice += v.price * v.rental_days
    }
    return totalPrice
  }
  const totalPrice = calculateTotalPrice(rentOrderDetails)

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
        <div className="ps-1">({rentOrderDetails.length})</div>
      </div>
      {/* 歷史訂單明細頁 電腦版 */}
      <table className={`table d-none d-sm-table`}>
        <thead>
          <tr>
            <th className="bg-primary text-white ps-3" style={{ width: '40%' }}>
              商品明細
            </th>
            <th className="bg-primary text-white" style={{ width: '25%' }}>
              租用日期
            </th>
            <th className="bg-primary text-white text-center">租用日數</th>
            <th className="bg-primary text-white text-center">數量</th>
            <th className="bg-primary text-white text-center">小計</th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseThree">
          {rentOrderDetails.map((v, i) => (
            <tr key={i}>
              <td className="d-flex ps-3">
                <div className="p-2">
                  {v.images && v.images.length > 0 ? (
                    <Image
                      src={'/product/' + JSON.parse(v.images)[0]} // 加上斜槓來表示相對路徑
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
              <td className="align-middle">
                <span>{v.start}</span>
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-secondary"
                  />
                </span>
                <span>{v.end}</span>
              </td>
              <td className="align-middle ps-3 text-center">{v.rental_days}</td>
              <td className="align-middle ps-3 text-center">1</td>
              <td className="align-middle text-center">
                ${v.rental_days * v.price}
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-5 " colSpan={5}>
              <div className=" ">總計: ${totalPrice}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* 租用商品 */}
      {/* 歷史訂單明細頁 手機版 */}
      <table className={`table d-table d-sm-none`}>
        <thead>
          <tr>
            <th className="bg-primary text-white" colSpan={3}>
              <div className="d-flex px-1">
                <div>租用商品</div>
                <div className="ps-1">({rentOrderDetails.length})</div>
                <div
                  className="ms-auto"
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
          {rentOrderDetails.map((v, i) => (
            <tr key={i}>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  {v.images && v.images.length > 0 ? (
                    <Image
                      src={'/product/' + JSON.parse(v.images)[0]} // 加上斜槓來表示相對路徑
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
                  <div>
                    <span>{v.start}</span>
                    <span className="px-2">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-secondary"
                      />
                    </span>
                    <span>{v.end}</span>
                  </div>
                  <div>${v.rental_days * v.price}</div>
                </div>
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
      </div>
    </>
  )
}
