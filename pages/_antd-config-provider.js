import { ConfigProvider } from 'antd'
import React from 'react'
import zhTW from 'antd/lib/locale/zh_TW'

export default function AntdConfigProvider({ children }) {
  // 修改 antd 主題
  return (
    <ConfigProvider
      locale={zhTW}
      theme={{
        token: {
          colorPrimary: '#DC9329',
          colorSecondary: '#9F9F9F',
          fontFamily:
            "'Poppins', 'Noto Sans TC', Helvetica, Arial, 'PingFang TC','苹方-繁', 'Heiti TC', '黑體-繁', 'Microsoft JhengHei','微軟正黑體',system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue', Arial,'Noto Sans','Liberation Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
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
          Pagination: {
            // antd 分頁頁碼樣式
            itemActiveBg: '#DC9329',
            itemBg: '#000000',
          },
          Tabs: {
            cardPadding: '10px 20px',
            colorBgContainer: '#DC9329',
            itemSelectedColor: '#ffffff',
            colorText: '#888888',
          },
          List: {
            metaMarginBottom: 8,
          },
          Progress: {
            defaultColor: '#DC9329',
            colorSuccess: '#DC9329',
            colorText: '#DC9329',
          },
          Statistic: {
            contentFontSize: '1.5rem',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
