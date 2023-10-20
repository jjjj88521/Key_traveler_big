import { Steps } from 'antd'
import React from 'react'

export default function RentDesc() {
  return (
    <div className="p-sm-5 p-3 bg-white">
      <Steps
        current={-1}
        items={[
          {
            title: '自選規格及軸體',
            description: '',
          },
          {
            title: '選擇你要的日期',
            description: '',
          },
          {
            title: '加入購物車吧！',
          },
        ]}
      />
    </div>
  )
}
