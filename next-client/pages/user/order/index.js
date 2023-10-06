import React from 'react'
// import style from '@/styles/order.module.scss'
import UserSideBar from '../user-side-bar'
import UserSideBarMobile from '../../../components/user/user-side-bar-mobile'

export default function Order() {
  return (
    <>
      <div className="container">
        <div className="row mb-sm-4 mb-2">
          {' '}
          <h2 className="fw-bolder text-start col-sm-3 col-12 mb-sm-0 mb-3">
            歷史訂單
          </h2>
          <nav className=" d-flex justify-content-evenly col-sm-8  offset-sm-1  d-none d-sm-flex"></nav>
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
            
          </nav>
          <div className="col-sm-8 offset-sm-1 col-12">
            {/* 歷史訂單列表頁 電腦版 */}
            {/* {`table d-none d-sm-table`} */}
            {/* {`${style['table-desktop']} table`} */}
            <table className={`table d-none d-sm-table`}>
              <thead className="">
                <tr className="">
                  <th className="bg-primary"></th>
                  <th className="bg-primary text-white ps-5">訂單編號</th>
                  <th className="bg-primary text-white ps-5">訂單日期</th>
                  <th className="bg-primary text-white ps-5">訂單金額</th>
                  <th className="bg-primary text-white"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="text-center">1</td>
                  <td className="ps-5">P00001</td>
                  <td className="ps-5">2023/08/15</td>
                  <td className="ps-5">1800</td>
                  <td className="ps-5">
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr>
                <tr className="">
                  <td className="text-center">2</td>
                  <td className="ps-5">G00002</td>
                  <td className="ps-5">2023/08/16</td>
                  <td className="ps-5">800</td>
                  <td className="ps-5">
                    <button className="btn btn-primary text-light">查看</button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* 歷史訂單列表頁 手機版 */}
            {/* {`table table-bordered d-table d-sm-none`} */}
            {/* {`${style['table-mobile']} table table-bordered`} */}
            <table className={`table table-bordered d-table d-sm-none`}>
              <tbody>
                <tr>
                  <th className="ps-3">1</th>
                  <td></td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>P00001</td>
                </tr>
                <tr>
                  <th>訂單日期</th>
                  <td>2023/08/15</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>1800</td>
                </tr>
                <tr>
                  <td className="text-center" colSpan={2}>
                    <button className="btn btn-primary text-light">查看</button>
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
