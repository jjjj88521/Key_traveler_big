import { Input } from 'antd'
import React from 'react'

export default function Cart() {
  return (
    <>
      <div className="container">
        <h1 className="text-primary">購物車清單</h1>
        {/* 一般商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div>V</div>
          <div>一般商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 購物車 step1 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white ps-3">商品明細</th>
              <th className="bg-primary text-white">單價</th>
              <th className="bg-primary text-white">數量</th>
              <th className="bg-primary text-white">小計</th>
              <th className="bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
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
                  <div className="pb-1">
                    <select className="form-select form-select-sm">
                      <option>陽極紅</option>
                    </select>
                  </div>
                  <div>
                    <select className="form-select form-select-sm">
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3">
                <div>
                  <span>-</span>
                  <input type="text" />
                  <span>+</span>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle">刪除</td>
            </tr>
            <tr>
              <td className="text-end" colSpan={6}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div>V</div>
          <div>租用商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 購物車 step1 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white ps-3">商品明細</th>
              <th className="bg-primary text-white">租用日期</th>
              <th className="bg-primary text-white">數量</th>
              <th className="bg-primary text-white">小計</th>
              <th className="bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
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
                  <div className="pb-1">
                    <select className="form-select form-select-sm">
                      <option>陽極紅</option>
                    </select>
                  </div>
                  <div>
                    <select className="form-select form-select-sm">
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">
                <input className="form-control" type="date" />
                <input className="form-control" type="date" />
              </td>
              <td className="align-middle ps-3">
                <div>
                  <span>-</span>
                  <input type="text" />
                  <span>+</span>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle">刪除</td>
            </tr>
            <tr>
              <td className="text-end" colSpan={6}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 一般商品 */}
        {/* 購物車 step1 手機版 */}
        <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex">
                  <div>一般商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">V</div>
                </div>
              </th>
              {/* <th className="bg-primary text-white text-end" colSpan={2}>V</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <img
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pb-1">
                    <select className="form-select form-select-sm">
                      <option>陽極紅</option>
                    </select>
                  </div>
                  <div>
                    <select className="form-select form-select-sm">
                      <option>噴砂銀</option>
                    </select>
                  </div>
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
            </tr>
            <tr>
              <td className="text-end" colSpan={2}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        {/* 購物車 step1 手機版 */}
        <table className={`table d-table d-sm-none`}>
          <thead>
            <tr>
              <th className="bg-primary text-white text-center align-middle">
                <input type="checkbox" />
              </th>
              <th className="bg-primary text-white" colSpan={3}>
                <div className="d-flex">
                  <div>租用商品</div>
                  <div className="ps-1">(2)</div>
                  <div className="ms-auto">V</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="d-flex">
                <div className="pe-2 pt-2">
                  <img
                    src="/images/000408000035028.jpg"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div className="pb-1">
                    <select className="form-select form-select-sm">
                      <option>陽極紅</option>
                    </select>
                  </div>
                  <div>
                    <select className="form-select form-select-sm">
                      <option>噴砂銀</option>
                    </select>
                  </div>
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
