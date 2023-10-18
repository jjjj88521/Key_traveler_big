import { Steps } from 'antd'
import React from 'react'

export default function RentDesc() {
  return (
    <div className="p-sm-5 p-3 bg-white">
      <Steps
        // current={1}
        items={[
          {
            title: 'Finished',
            description: 'This is a description.',
          },
          {
            title: 'In Progress',
            description: 'This is a description.',
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description: 'This is a description.',
          },
        ]}
      />
    </div>
  )
}
