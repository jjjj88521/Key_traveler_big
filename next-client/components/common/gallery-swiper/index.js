import { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import style from 'components/thumbs/thumbs.scss'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

// modules styles
import style from './_gallery_swiper.module.scss'
import { Image } from 'antd'
import NextImage from 'next/image'

const GallerySwiper = ({ images = [], path = '' }) => {
  // 圖片 slider
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const swiper = useSwiper()

  return (
    <div className={`${style['swiper-container']} gallery-swiper pb-4 pb-sm-0`}>
      {/* 上方大圖 */}
      <Image.PreviewGroup>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${style['swiper-bg']} swiper-bg`}
        >
          {images.map((item, index) => {
            return (
              <SwiperSlide key={index} className={`${style['swiper-slide']}`}>
                <Image src={`${path}${item}`} alt={item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Image.PreviewGroup>
      {/* 下方小圖 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        freeMode={true}
        className={`${style['swiper-sm']} d-none d-sm-flex swiper-sm`}
        loop={false}
        // navigation={{ clickable: true }}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index} className={`${style['swiper-slide']}`}>
              <NextImage src={`${path}${item}`} width={75} height={75} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default GallerySwiper
