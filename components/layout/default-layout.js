// import Navbar from './navbar'
import Head from 'next/head'
import Footer from './footer'
import Header from './header'
import GoTop from './go-top'
import MobileDock from './mobile-dock'
import MyBreadcrumb from '../breadcrumb'

export default function DefaultLayout({ pageTitle = '', children }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header></Header>
      <MyBreadcrumb />
      <main>
        {children}
        <GoTop />
      </main>
      <Footer />
      <MobileDock />
    </>
  )
}
