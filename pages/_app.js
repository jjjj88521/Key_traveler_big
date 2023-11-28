import '@/styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/layout/default-layout'
import AntdConfigProvider from './_antd-config-provider'
import HomeLayout from '@/components/layout/home-layout'
import HydrationFix from './_hydration-fix'
// 商品
import { ProductDataProvider } from '@/context/useProduct'
import { AllPdLikeProvider } from '@/context/useAllPdLike'
// 購物車
import { CartProvider } from '@/hooks/useCart'
import { RentCartProvider } from '@/hooks/useRentCart'
import { GroupCartProvider } from '@/hooks/useGroupCart'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/redux/store'
import { checkLoginAsync } from '@/redux/actions/auth'

export default function AppWrapper({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

export function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const dispatch = useDispatch()
  // 頁面載入引入 bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
    dispatch(checkLoginAsync())
  }, [])

  const router = useRouter()
  const { pathname } = router

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
        <AllPdLikeProvider>
          <ProductDataProvider>
            <CartProvider>
              <RentCartProvider>
                <GroupCartProvider>
                  <HydrationFix>
                    <AntdConfigProvider>{layoutComponent}</AntdConfigProvider>
                  </HydrationFix>
                </GroupCartProvider>
              </RentCartProvider>
            </CartProvider>
          </ProductDataProvider>
        </AllPdLikeProvider>
      )
    })
  // AuthProvider 會員登入用
  return getLayout(<Component {...pageProps} />)
}
