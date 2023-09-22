import { FloatButton } from 'antd'
import React from 'react'

export default function GoTop() {
  return (
    <>
      <FloatButton.BackTop
        shape="circle"
        type="#dc9329"
        style={{ right: 50 }}
        tooltip="回到頂部"
        icon={<i class="fa-solid fa-chevron-up text-white"></i>}
        duration={0}
        className="bg-primary"
      ></FloatButton.BackTop>
    </>
  )
}
