import React from 'react'
import style from '@/styles/order.module.scss'

export default function Order() {
  return (
    <>
      <div className="container">
        <table className="table">
          <thead className="">
            <tr className="">
              <th className="bg-primary"></th>
              <th className="bg-primary text-white">訂單編號</th>
              <th className="bg-primary text-white">訂單日期</th>
              <th className="bg-primary text-white">訂單金額</th>
              <th className="bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="">1</td>
              <td className="">P00001</td>
              <td className="">2023/08/15</td>
              <td className="">1800</td>
              <td className="">
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
            <tr className="">
              <td className="">2</td>
              <td className="">G00002</td>
              <td className="">2023/08/16</td>
              <td className="">800</td>
              <td className="">
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
            {/* <tr>
                <td>3</td>
                <td>R00003</td>
                <td>2023/08/17</td>
                <td>1000</td>
                <td>
                  <button className="btn btn-primary text-light">查看</button>
                </td>
              </tr> */}
          </tbody>
        </table>
        <table>
          {/* <thead>
              <tr>
                <th>1</th>
                <th>訂單編號</th>
                <th>訂單日期</th>
                <th>訂單金額</th>
                <th></th>
              </tr>
            </thead> */}
          <tbody>
            <tr>
              <tr className="" colspan="2">
                1
              </tr>
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
              <th></th>
              <td>
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
