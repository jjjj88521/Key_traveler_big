import { FloatButton } from 'antd'
import React from 'react'

export default function GoTop() {
  return (
    <>
      <FloatButton.BackTop
        shape="circle"
        type="primary"
        style={{ right: 30, bottom: 100 }}
        tooltip="回到頂部"
        icon={<i className="fa-solid fa-chevron-up text-white"></i>}
        duration={0}
      ></FloatButton.BackTop>
    </>
  )
}
