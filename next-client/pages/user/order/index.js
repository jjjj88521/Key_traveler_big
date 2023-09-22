import React from 'react'
import style from '@/styles/order.module.scss'

export default function Order() {
  return (
    <>
      <div className='container'>
      {/* {`${style['table-desktop']} table`} */}
        <table className={`${style['table-desktop']} table`}>
          <thead className=''>
            <tr className=''>
              <th className='bg-primary'></th>
              <th className='bg-primary text-white'>訂單編號</th>
              <th className='bg-primary text-white'>訂單日期</th>
              <th className='bg-primary text-white'>訂單金額</th>
              <th className='bg-primary text-white'></th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td className=''>1</td>
              <td className=''>P00001</td>
              <td className=''>2023/08/15</td>
              <td className=''>1800</td>
              <td className=''>
                <button className='btn btn-primary text-light'>查看</button>
              </td>
            </tr>
            <tr className=''>
              <td className=''>2</td>
              <td className=''>G00002</td>
              <td className=''>2023/08/16</td>
              <td className=''>800</td>
              <td className=''>
                <button className='btn btn-primary text-light'>查看</button>
              </td>
            </tr>
            {/* <tr>
                <td>3</td>
                <td>R00003</td>
                <td>2023/08/17</td>
                <td>1000</td>
                <td>
                  <button className='btn btn-primary text-light'>查看</button>
                </td>
              </tr> */}
          </tbody>
        </table>
        <div className=''>
        <div className=''>
        {/* {`${style['table-mobile']} table table-bordered`} */}
        {/* {`table table-bordered d-block d-sm-none`} */}
        <table className={`${style['table-mobile']} table table-bordered `}>
          <tbody>
            <tr>
              <th>
                1
              </th>
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
              <td className='text-center' colSpan={2}>
                <button className='btn btn-primary text-light'>查看</button>
              </td>
            </tr>
          </tbody>
        </table> 
        </div>
        </div>
        {/* <table className='table table-bordered table-mobile'>
          <tbody className=''>
            <tr>
              <th >
                2
              </th>
              <td></td>
            </tr>
            <tr>
              <th>訂單編號</th>
              <td>G00002</td>
            </tr>
            <tr>
              <th>訂單日期</th>
              <td>2023/08/16</td>
            </tr>
            <tr>
              <th>訂單金額</th>
              <td>800</td>
            </tr>
            <tr>
              <td className='text-center' colSpan={2}>
                <button className='btn btn-primary text-light'>查看</button>
              </td>
            </tr>
          </tbody>
        </table>    */}
      </div>
    </>
  )
}
