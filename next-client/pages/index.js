import Head from 'next/head'
// swiper
import CateSelect from '@/components/home/cate-select'
import AdCarousel from '@/components/home/ad-carousel/ad-carousel'
import RentAd from '@/components/home/rent-ad'
import NewPd from '@/components/home/new-pd'
import LastGallery from '@/components/home/last-gallery'

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
      <LastGallery />
    </>
  )
}
