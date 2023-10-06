import React from 'react'
import Image from 'next/image'
// import { DatePicker } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronDown,
  faPencil,
  faCaretDown,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import UserSideBar from '@/components/user/user-side-bar'
import UserSideBarMobile from '@/components/user/user-side-bar-mobile'
export default function Detail() {
  // const { RangePicker } = DatePicker
  return (
    <>
      <div className="container">
        <div className="row mb-sm-4 mb-2">
          {' '}
          <h2 className="fw-bolder text-start col-sm-3 col-12 mb-sm-0 mb-3">
            收藏商品
          </h2>
          <nav className=" d-flex justify-content-evenly col-sm-8  offset-sm-1  d-none d-sm-flex">
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4 ">公告</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">開箱文</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">組裝教學</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">活動</h3>
          </nav>
        </div>

        <div className="row">
          <div className="col-sm-3 col-12 px-0 mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block col-12 mb-3">
              <UserSideBarMobile className="col-12 w-100" />
            </div>
          </div>
          <nav className=" d-flex justify-content-evenly col-sm-8  offset-sm-1 col-12 d-block d-sm-none  mt-4 mb-3">
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4 ">公告</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">開箱文</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">組裝教學</h3>
            <h3 className="pb-0 mb-0 fs-sm-3 fs-4">活動</h3>
          </nav>
          <div className="col-sm-8 offset-sm-1 col-12">
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
                  <td className="align-middle ps-3">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </td>
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
                  <td className="align-middle ps-3">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </td>
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
              <div className="pe-2">
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
                  <th
                    className="bg-primary text-white ps-3"
                    style={{ width: '40%' }}
                  >
                    商品明細
                  </th>
                  <th
                    className="bg-primary text-white"
                    style={{ width: '20%' }}
                  >
                    租用日期
                  </th>
                  <th className="bg-primary text-white text-center">數量</th>
                  <th className="bg-primary text-white text-center">小計</th>
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
                    <input className="form-control" type="date" disabled />
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="text-secondary"
                      />
                    </div>
                    <input className="form-control" type="date" disabled />
                  </td>
                  <td className="align-middle ps-3 text-center">1</td>
                  <td className="align-middle text-center">$3000</td>
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
                    <input className="form-control" type="date" disabled />
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="text-secondary"
                      />
                    </div>
                    <input className="form-control" type="date" disabled />
                  </td>
                  <td className="align-middle ps-3 text-center">1</td>
                  <td className="align-middle text-center">$3000</td>
                </tr>
                <tr>
                  <td className="text-end pe-5" colSpan={4}>
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
                        <div
                          className="border rounded-5 ms-auto text-center"
                          style={{ width: 70 }}
                        >
                          1
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
                  <td className="align-middle">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </td>
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
                        <div
                          className="border rounded-5 ms-auto text-center"
                          style={{ width: 70 }}
                        >
                          1
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <FontAwesomeIcon icon={faPencil} className="text-primary" />
                  </td>
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
                      <div className="ms-auto">
                        <FontAwesomeIcon icon={faCircleChevronDown} />
                      </div>
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
                      <div>
                        <span>2023/08/15</span>
                        <span className="px-1">
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="text-secondary"
                          />
                        </span>
                        <span>2023/08/16</span>
                      </div>
                      <div>$300</div>
                      {/* <div>
                    <RangePicker
                      placeholder={''}
                      className="px-1 rounded border border-0"
                      style={{ width: 210 }}
                      disabled
                    />
                  </div> */}
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
                      <div>
                        <span>2023/08/15</span>
                        <span className="px-1">
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="text-secondary"
                          />
                        </span>
                        <span>2023/08/16</span>
                      </div>
                      <div>$300</div>
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
        </div>
      </div>
    </>
  )
}
