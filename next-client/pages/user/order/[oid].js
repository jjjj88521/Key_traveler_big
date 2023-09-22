import React from 'react'

export default function Detail() {
  return (
    <>
      <div className="container">
        <div className="mb-3 text-primary d-flex">
          <div>V</div>
          <div>一般商品</div>
          <div>(2)</div>
        </div>
        <table className="table table-desktop">
          <thead>
            <tr>
              <th className="bg-primary text-white">商品明細</th>
              <th className="bg-primary text-white">單價</th>
              <th className="bg-primary text-white">數量</th>
              <th className="bg-primary text-white">小計</th>
              <th className="bg-primary text-white">評價</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="d-flex">
                <div>
                  <img src="/next-client/public/images/000408000035028.jpg" />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                </div>
              </td>
              <td>$300</td>
              <td>1</td>
              <td>$300</td>
              <td>評價</td>
            </tr>
            <tr>
              <td className="">總計: $600</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-mobile">
          <thead>
            <tr>
              <th className="bg-primary text-white" colSpan={3}>
              <div className='d-flex'>
                <div>一般商品</div>
                <div>(2)</div>
                <div className='ms-auto'>V</div>
                </div>
              </th>
              {/* <th className="bg-primary text-white text-end" colSpan={2}>V</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="/next-client/public/images/000408000035028.jpg" />
              </td>
              <td>
                <div>Qwertykey</div>
                <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                <div>陽極紅</div>
                <div>噴砂銀</div>
                <div className="d-flex">
                  <div>$300</div>
                  <button>1</button>
                </div>
              </td>
                <td>評價</td>
              {/* <td className='d-flex'>
                <div>
                  <img src='/next-client/public/images/000408000035028.jpg' />
                </div>
                <div>
                  <div>Qwertykey</div>
                  <div>QK75鍵盤鍵盤鍵盤鍵盤</div>
                  <div>陽極紅</div>
                  <div>噴砂銀</div>
                  <div className='d-flex'>
                    <div>$300</div>
                    <button>1</button>
                  </div>                  
                </div>
              </td> */}
              {/* <td>1</td>
              <td>$300</td>
              <td>評價</td> */}
            </tr>
            <tr>
              <td className="text-end">總計: $600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
