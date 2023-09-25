import { ConfigProvider } from 'antd'
import React from 'react'

export default function AntdConfigProvider({ children }) {
  // 修改 antd 主題
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#DC9329',
          colorSecondary: '#9F9F9F',
        },
        components: {
          // antd 麵包屑樣式
          Breadcrumb: {
            lastItemColor: '#DC9329',
            itemColor: '#9F9F9F',
            linkColor: '#9F9F9F',
            linkHoverColor: '#DC9329',
            separatorColor: '#9F9F9F',
            separatorMargin: '10px 8px',
            fontWeight: 'Medium',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
