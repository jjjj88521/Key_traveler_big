// import Navbar from './navbar'
import Head from 'next/head'
import Footer from './footer'
import Header from './header'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header></Header>
      <main>{children}</main>
      <Footer />
    </>
  )
}
