import React from 'react'
import { Steps } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faTrashCan,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'

export default function Cart() {
  const items = [
    {
      title: '確認商品',
    },
    {
      title: '填寫訂單資訊',
    },
    {
      title: '完成訂單',
    },
  ]
  return (
    <>
      <div className="container">
        <Steps current={0} labelPlacement="vertical" items={items} />
        <h1 className="text-primary fs-3 pt-5 pb-3">購物車清單</h1>
        {/* 一般商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
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
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white ">單價</th>
              <th className="bg-primary text-white" style={{ width: '20%' }}>
                數量
              </th>
              <th className="bg-primary text-white ">小計</th>
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
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1"
                      style={{ width: 140 }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle ps-3">
                <div className="input-group w-75">
                  <span className="input-group-text p-0">
                    <button className="btn" type="button">
                      -
                    </button>
                  </span>
                  <input type="number" className="form-control " />
                  <span className="input-group-text p-0">
                    <button className="btn" type="button">
                      +
                    </button>
                  </span>
                </div>
              </td>
              <td className="align-middle">$3000</td>
              <td className="align-middle">
                <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
              </td>
            </tr>
            <tr>
              <td className="pe-3 text-end" colSpan={6}>
                總計: $6000
              </td>
            </tr>
          </tbody>
        </table>
        {/* 租用商品 */}
        <div className="mb-3 text-primary d-none d-sm-block d-sm-flex">
          <div className="pe-2">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-primary"
            />
          </div>
          <div>租用商品</div>
          <div className="ps-1">(2)</div>
        </div>
        {/* 購物車 step1 電腦版 */}
        <table className={`table d-none d-sm-table`}>
          <thead>
            <tr>
              <th
                className="bg-primary text-white text-center align-middle"
                style={{ width: '5%' }}
              >
                <input type="checkbox" />
              </th>
              <th
                className="bg-primary text-white ps-3"
                style={{ width: '40%' }}
              >
                商品明細
              </th>
              <th className="bg-primary text-white" style={{ width: '20%' }}>
                租用日期
              </th>
              {/* <th className="bg-primary text-white">數量</th> */}
              <th className="bg-primary text-white text-center">小計</th>
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
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm mb-1"
                      style={{ width: 140 }}
                    >
                      <option>陽極紅</option>
                    </select>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: 140 }}
                    >
                      <option>噴砂銀</option>
                    </select>
                  </div>
                  {/* <div>
                    <select className="form-select form-select-sm">
                      <option>噴砂銀</option>
                    </select>
                  </div> */}
                </div>
              </td>
              <td className="align-middle">
                <input className="form-control" type="date" />
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="text-secondary"
                  />
                </div>
                <input className="form-control" type="date" />
              </td>
              {/* <td className="align-middle ps-3">
                <div className="input-group">
                  <span className="">
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                  </span>
                  <input type="number" className="form-control" />
                  <span className="">
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </span>
                </div>
              </td> */}
              <td className="align-middle text-center">$3000</td>
              <td className="align-middle">
                <FontAwesomeIcon icon={faTrashCan} className="text-primary" />
              </td>
            </tr>
            <tr>
              <td className="pe-5 text-end" colSpan={6}>
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
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
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
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm  mb-1"
                      style={{ width: '50%' }}
                    >
                      <option>陽極紅</option>
                    </select>  
                      <select
                        className="form-select form-select-sm"
                        style={{ width: '50%' }}
                      >
                        <option>噴砂銀</option>
                      </select>
                    
                  </div>
                  <div className="d-flex pt-1">
                    <div className='pt-2'>$3000</div>
                    <div className="input-group" style={{ width: '60%' }}>
                      {/* <span className="input-group-text p-0"></span> */}
                        <button className="btn btn-outline-secondary rounded-start-4" type="button">
                          -
                        </button>
                      
                      <input type="number" className="form-control border-secondary border-start-0 border-end-0" />
                      <span className="input-group-text p-0"></span>
                        <button className="btn btn-outline-secondary rounded-end-4" type="button">
                          +
                        </button>
                      
                    </div>
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
                  <div className="ms-auto">
                    <FontAwesomeIcon icon={faCircleChevronDown} />
                  </div>
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
                  <div className="pt-1">
                    <select
                      className="form-select form-select-sm  mb-1"
                      style={{ width: '50%' }}
                    >
                      <option>陽極紅</option>
                    </select>  
                      <select
                        className="form-select form-select-sm"
                        style={{ width: '50%' }}
                      >
                        <option>噴砂銀</option>
                      </select>                    
                  </div>
                  <div>8/15 ~ 8/16</div>
                  <div className="d-flex">
                    <div>$300</div>
                    {/* <div className="input-group">
                      <span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          -
                        </button>
                      </span>
                      <input type="number" className="form-control" />
                      <span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          +
                        </button>
                      </span>
                    </div> */}
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
        {/* 去結帳 */}
        <div className="my-3">
          <div>
            使用優惠券(僅限一般商品):{' '}
            <a className="text-primary text-decoration-none">更換優惠券</a>
          </div>
          <div className="text-danger">
            P.S.若商品種類(一般、團購、租用)相同，產品數量多且收件地址不同需分開結帳！！
          </div>
          <div className="text-end">
            <span className="align-middle">
              共<span className="">6</span>件商品, 總金額: $
              <span className="">1800</span>
            </span>
            <a className="btn btn-primary text-white ms-2">去結帳</a>
          </div>
        </div>
      </div>
    </>
  )
}
