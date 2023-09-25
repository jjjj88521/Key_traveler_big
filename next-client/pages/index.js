import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/home.module.scss'
// import style from './_sec2.module.scss'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import CateSelect from '@/components/home/cate-select'
import AdCarousel from '@/components/home/ad-carousel'
import RentAd from '@/components/home/rent-ad'
import NewPd from '@/components/home/new-pd'

export default function Home() {
  return (
    <>
      <Head>
        <title>鍵之旅人</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <AdCarousel />
      <CateSelect />
      <NewPd />
      <RentAd />
    </>
  )
}
