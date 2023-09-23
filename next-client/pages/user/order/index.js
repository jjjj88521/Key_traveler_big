import React from 'react'
// import style from '@/styles/order.module.scss'

export default function Order() {
  return (
    <>
      <div className="container">
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
    </>
  )
}
