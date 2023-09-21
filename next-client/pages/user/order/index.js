import React from 'react'

export default function order() {
  return (
    <>
    <div className='container'>       
     <table className="table">
          <thead>
            <tr>
              <th className='bg-primary'></th>
              <th className='bg-primary text-white'>訂單編號</th>
              <th className='bg-primary text-white'>訂單日期</th>
              <th className='bg-primary text-white'>訂單金額</th>
              <th className='bg-primary text-white'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>P00001</td>
              <td>2023/08/15</td>
              <td>1800</td>
              <td>
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>G00002</td>
              <td>2023/08/16</td>
              <td>800</td>
              <td>
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>R00003</td>
              <td>2023/08/17</td>
              <td>1000</td>
              <td>
                <button className="btn btn-primary text-light">查看</button>
              </td>
            </tr>
          </tbody>
        </table></div>

    </>
  )
}
