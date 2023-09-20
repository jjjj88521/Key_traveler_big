import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>鍵之旅人</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section className="ad-carousel"></section>
    </>
  )
}
