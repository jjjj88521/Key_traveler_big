import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'


export default function Detail() {
  return (
    <>
      <div className="container">
      {/* 一般商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div><FontAwesomeIcon icon={faCircleChevronDown} className="text-primary" /></div>
          <div>一般商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 歷史訂單明細頁 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th className="bg-primary text-white ps-3">商品明細</th>
              <th className="bg-primary text-white">單價</th>
              <th className="bg-primary text-white">數量</th>
              <th className="bg-primary text-white">小計</th>
              <th className="bg-primary text-white">評價</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex">
                <div className="p-2">
                  <Image
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3">1</td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3"><FontAwesomeIcon icon={faPencil} className="text-primary" /></td>
            </tr>
            <tr>
              <td className="d-flex">
                <div className="p-2">
                  <Image
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3">1</td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3"><FontAwesomeIcon icon={faPencil} className="text-primary" /></td>
            </tr>
            <tr>
              <td className="text-end" colSpan={5}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div><FontAwesomeIcon icon={faCircleChevronDown} className="text-primary" /></div>
          <div>租用商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 歷史訂單明細頁 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th className="bg-primary text-white ps-3">商品明細</th>
              <th className="bg-primary text-white">租用日期</th>
              <th className="bg-primary text-white">數量</th>
              <th className="bg-primary text-white">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex">
                <div className="p-2">
                  <Image
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td className="align-middle">
              8/15<br/>8/16
              </td>
              <td className="align-middle ps-3">1</td>
              <td className="align-middle">$3000</td>
            </tr>
            <tr>
              <td className="d-flex">
                <div className="p-2">
                  <img
                    src="/images/1669370674683000804.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td className="align-middle">
              8/15<br/>8/16
              </td>
              <td className="align-middle ps-3">1</td>
              <td className="align-middle">$3000</td>
            </tr>
            <tr>
              <td className="text-end" colSpan={5}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 一般商品 */}
        {/* 歷史訂單明細頁 手機版 */}
        <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex px-1">
                  <div>一般商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto"><FontAwesomeIcon icon={faCircleChevronDown} /></div>
                </div>
              </th>
              {/* <th className="bg-primary text-white text-end" colSpan={2}>V</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <Image
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                  <div className="d-flex">
                    <div>$3000</div>
                    <button className="border border-secondary bg-light ms-auto">
                      1
                    </button>
                  </div>
                </div>
              </td>
              {/* <td>
                <div>Qwertykey</div>
                <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                <div>陽極紅</div>
                <div>噴砂銀</div>
                <div className="d-flex">
                  <div>$300</div>
                  <button>1</button>
                </div>
              </td> */}
              <td className='align-middle'><FontAwesomeIcon icon={faPencil} className="text-primary" /></td>
            </tr>
            <tr>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <Image
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div className="">Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                  <div className="d-flex">
                    <div>$3000</div>
                    <button className="border border-secondary bg-light ms-auto">
                      1
                    </button>
                  </div>
                </div>
              </td>
              <td className='align-middle'><FontAwesomeIcon icon={faPencil} className="text-primary" /></td>
            </tr>
            <tr>
              <td className="text-end" colSpan={2}>
                總計: $6000
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
                  <div className="ms-auto"><FontAwesomeIcon icon={faCircleChevronDown} /></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <Image
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                  <div>8/15 ~ 8/16</div>
                  <div className="d-flex">
                    <div>$300</div>
                    <button className="border border-secondary bg-light ms-auto">
                      1
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="d-flex">
                <div className="pe-2 pt-2 ">
                  <Image
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                  <div>8/15 ~ 8/16</div>
                  <div className="d-flex">
                    <div>$300</div>
                    <button className="border border-secondary bg-light ms-auto">
                      1
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-end" colSpan={2}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
