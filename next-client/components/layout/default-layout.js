// import Navbar from './navbar'
import Head from 'next/head'
import Footer from './footer'
import Header from './header'

export default function DefaultLayout({ pageTitle = '', children }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header></Header>
      <main>{children}</main>
      <Footer />
    </>
  )
}
