import { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

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

const GallerySwiper = ({ images = [], path = '' }) => {
  // 左邊圖片 slider
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className={`${style['swiper-container']}`}>
      {/* 上方大圖 */}
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
        className={`${style['swiper-bg']}`}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index} className={`${style['swiper-slide']}`}>
              <img src={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {/* 下方小圖 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className={`${style['swiper-sm']} d-none d-sm-flex`}
        loop={true}
        navigation={{ clickable: true }}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={`${style['swiper-slide']} ${
                thumbsSwiper ? style['active'] : ''
              }`}
            >
              <img src={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default GallerySwiper
