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
import { SwiperNextBtn, SwiperPrevBtn } from '@/components/home/swiper-btns'

const GallerySwiper = ({ images = [], path = '' }) => {
  // 圖片 slider
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className={`${style['swiper-container']} gallery-swiper pb-4 pb-sm-0`}>
      {/* 上方大圖 */}
      <Image.PreviewGroup>
        <Swiper
          loop={true}
          spaceBetween={10}
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
          <SwiperPrevBtn
            className={`btn btn-lg bg-secondary bg-opacity-50 position-absolute start-0 top-50 translate-middle-y z-1 fs-1 text-white`}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </SwiperPrevBtn>
          <SwiperNextBtn
            className={`btn btn-lg bg-secondary bg-opacity-50 position-absolute end-0 top-50 translate-middle-y z-1 fs-1 text-white`}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </SwiperNextBtn>
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
