import React from 'react'
import { Tabs } from 'antd'

export default function TabButtonForUser({ tabItems, tabsChange }) {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        type="card"
        onChange={tabsChange}
      />
    </>
  )
}
