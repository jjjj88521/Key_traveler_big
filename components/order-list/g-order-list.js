import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function GOrderList() {
  const initialOrderLists = [
    {
      id: 1,
      img: '/images/1669370674683000804.jpg',
      price: 3000,
      amount: 1,
    },
    {
      id: 2,
      img: '/images/1669370674683000804.jpg',
      price: 1000,
      amount: 2,
    },
  ]

  const [orderLists, setOrderLists] = useState(initialOrderLists)

  // G總計
  const calculateTotalPrice = (orderLists) => {
    let totalPrice = 0
    for (const orderList of orderLists) {
      totalPrice += orderList.price * orderList.amount
    }
    return totalPrice
  }
  const totalPrice = calculateTotalPrice(orderLists)

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
        <div className="ps-1">(2)</div>
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
          {orderLists.map((v) => (
            <tr key={v.id}>
              <td className="d-flex ps-3">
                <div className="p-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td className="align-middle text-center">${v.price}</td>
              <td className="align-middle ps-3 text-center">{v.amount}</td>
              <td className="align-middle text-center">
                ${v.price * v.amount}
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-5" colSpan={5}>
              <div className="pe-5">總計: ${totalPrice}</div>
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
                <div className="ps-1">(2)</div>
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
          {orderLists.map((v) => (
            <tr key={v.id}>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <Image src={v.img} width={100} height={100} alt="" />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
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
            </tr>
          ))}
          <tr>
            <td className="text-end pe-3" colSpan={2}>
              總計: ${totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
