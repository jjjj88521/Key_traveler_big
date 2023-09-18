import { useEffect } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import '@/styles/globals.scss'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // 頁面載入引入 bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(<Component {...pageProps} />)
}
