import { React, useEffect } from 'react'
import { Steps } from 'antd'
import CartStep1 from './cart-step-1'

export default function CartStep3() {
  return (
    <div className="container text-center mt-5" style={{ height: '500px' }}>
      {/* <Steps
        current={2}
        labelPlacement="vertical"
        items={items}
        responsive="false"
      /> */}
      {/* <CartStep /> */}
      <h5 className="mt-4 text-primary">訂單成功</h5>
      <button className="btn btn-primary">查詢訂單</button>
    </div>
  )
}
