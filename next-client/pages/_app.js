import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/globals.scss'
import { ConfigProvider } from 'antd'
import AntdConfigProvider from './_antd-config-provider'
import HomeLayout from '@/components/layout/home-layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // 頁面載入引入 bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  const router = useRouter()
  const { pathname } = router

  const getLayout =
    Component.getLayout ||
    ((page) =>
      // 判斷是否是首頁
      pathname === '/' ? (
        <AntdConfigProvider>
          <HomeLayout pageTitle={pageProps.pageTitle}>{page}</HomeLayout>
        </AntdConfigProvider>
      ) : (
        <AntdConfigProvider>
          <DefaultLayout pageTitle={pageProps.pageTitle}>{page}</DefaultLayout>
        </AntdConfigProvider>
      ))

  return getLayout(<Component {...pageProps} />)
}
