import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/globals.scss'
import AntdConfigProvider from './_antd-config-provider'
import HomeLayout from '@/components/layout/home-layout'
import HydrationFix from './_hydration-fix'

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
    ((page) => (
      // 解決水合作用的問題
      <HydrationFix>
        <AntdConfigProvider>
          {/* 判斷是否為首頁，如果是則顯示 HomeLayout，否則顯示 DefaultLayout */}
          {pathname === '/' ? (
            <HomeLayout>{page}</HomeLayout>
          ) : (
            <DefaultLayout>{page}</DefaultLayout>
          )}
        </AntdConfigProvider>
      </HydrationFix>
    ))

  return getLayout(<Component {...pageProps} />)
}
