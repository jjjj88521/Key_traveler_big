import { useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/globals.scss'
import { ConfigProvider } from 'antd'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // 頁面載入引入 bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#DC9329',
          },
        }}
      >
        <DefaultLayout pageTitle={pageProps.pageTitle}>{page}</DefaultLayout>
      </ConfigProvider>
    ))

  return getLayout(<Component {...pageProps} />)
}
