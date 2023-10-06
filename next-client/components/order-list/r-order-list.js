import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'

export default function ROrderList() {
  const initialRentOrderLists = [
    {
      id: 1,
      img: '/images/1669370674683000804.jpg',
      startDate: '2023-10-02',
      endDate: '2023-10-03',
      price: 300,
    },
    {
      id: 2,
      img: '/images/1669370674683000804.jpg',
      startDate: '2023-10-04',
      endDate: '2023-10-05',
      price: 100,
    },
  ]

  const [rentOrderLists, setRentOrderLists] = useState(initialRentOrderLists)
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
        <div className="ps-1">(2)</div>
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
            <th className="bg-primary text-white text-center">數量</th>
            <th className="bg-primary text-white text-center">小計</th>
          </tr>
        </thead>
        <tbody className="accordion-collapse collapse show" id="collapseThree">
          {rentOrderLists.map((v) => (
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
              <td className="align-middle">
                <span>{v.startDate}</span>
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-secondary"
                  />
                </span>
                <span>{v.endDate}</span>
              </td>
              <td className="align-middle ps-3 text-center">1</td>
              <td className="align-middle text-center">${3000}</td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-5 " colSpan={4}>
              <div className="pe-4 ">總計: ${6000}</div>
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
                <div className="ps-1">(2)</div>
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
          {rentOrderLists.map((v) => (
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
                  <div>
                    <span>{v.startDate}</span>
                    <span className="px-2">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-secondary"
                      />
                    </span>
                    <span>{v.endDate}</span>
                  </div>
                  <div>$300</div>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-end pe-3" colSpan={2}>
              總計: $6000
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
