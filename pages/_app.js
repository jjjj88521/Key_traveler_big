import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/globals.scss'
import AntdConfigProvider from './_antd-config-provider'
import HomeLayout from '@/components/layout/home-layout'
import { AuthProvider } from '@/hooks/useAuth'
import HydrationFix from './_hydration-fix'
import UserLayout from '@/components/layout/user-layout'
import { ProductDataProvider } from '@/context/product'
import { CartProvider } from '@/hooks/use-cart'
import { SecondCartProvider } from '@/hooks/useSecondCart'
import { ThirdCartProvider } from '@/hooks/useThirdCart'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // 頁面載入引入 bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  const router = useRouter()
  const { pathname } = router
  const [isLoginPage, setIsLoginPage] = useState(false)

  useEffect(() => {
    if (pathname === '/user/login') {
      setIsLoginPage(true)
    } else {
      setIsLoginPage(false)
    }
  }, [])

  const getLayout =
    Component.getLayout ||
    ((page) => {
      // 首頁、會員中心、其他的 layout
      let layoutComponent
      switch (true) {
        case pathname === '/':
          layoutComponent = <HomeLayout>{page}</HomeLayout>
          break
        default:
          layoutComponent = <DefaultLayout>{page}</DefaultLayout>
          break
      }
      return (
        // 會員登入
        <AuthProvider>
          <ProductDataProvider>
            <CartProvider>
              <SecondCartProvider>
                <ThirdCartProvider>
                  <HydrationFix>
                    <AntdConfigProvider>{layoutComponent}</AntdConfigProvider>
                  </HydrationFix>
                </ThirdCartProvider>
              </SecondCartProvider>
            </CartProvider>
          </ProductDataProvider>
        </AuthProvider>
      )
    })
  // AuthProvider 會員登入用
  return getLayout(<Component {...pageProps} />)
}
