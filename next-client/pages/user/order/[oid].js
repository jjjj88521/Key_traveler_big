import React from 'react'

export default function Detail() {
  return (
    <>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="bg-primary text-white">商品明細</th>
                        <th className="bg-primary text-white">單價</th>
                        <th className="bg-primary text-white">數量</th>
                        <th className="bg-primary text-white">小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="d-flex">
                            <div>img</div>
                            <div>123</div>
                        </td>
                        <td>$300</td>
                        <td>1</td>
                        <td>$300 </td>
                    </tr>
                    <tr>總計: $600</tr>
                </tbody>
            </table>
        </div>
    </>
  )
}