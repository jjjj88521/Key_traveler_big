import React from 'react'
import { Steps } from 'antd'

export default function CartStep1() {
  // step 1
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
      {/* step 1 */}
      <div>
        <Steps
          current={0}
          labelPlacement="vertical"
          items={items}
          responsive={false}
          className="mt-5 mx-sm-auto ms-4"
          style={{ width: '65%' }}
        />
      </div>
    </>
  )
}
