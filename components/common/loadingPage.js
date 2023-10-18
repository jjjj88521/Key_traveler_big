import { Spin } from 'antd'
import React from 'react'

export default function LoadingPage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '500px' }}
    >
      <Spin size="large"></Spin>
    </div>
  )
}
