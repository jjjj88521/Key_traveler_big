import { useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import style from 'components/thumbs/thumbs.scss'

// import required modules
import { Thumbs } from 'swiper/modules'

// modules styles
// import style from './_gallery_swiper.module.scss'
import { Image, Skeleton } from 'antd'
import NextImage from 'next/image'
import { SwiperNextBtn, SwiperPrevBtn } from '@/components/home/swiper-btns'

const GallerySwiper = ({ images = [], path = '', isLoading }) => {
  // 圖片 slider
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className={`gallery-swiper pb-4 pb-sm-0`}>
      {/* 上方大圖 */}
      <Image.PreviewGroup>
        <Swiper
          loop={true}
          spaceBetween={30}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          className={` swiper-bg`}
        >
          {isLoading ? (
            <SwiperSlide>
              <Skeleton.Image className="w-100 h-100" active />
            </SwiperSlide>
          ) : (
            images.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image src={`${path}${item}`} alt={item} />
                </SwiperSlide>
              )
            })
          )}
          <SwiperNextBtn
            className={`btn btn-lg bg-secondary bg-opacity-50 position-absolute end-0 top-50 translate-middle-y z-1 fs-1 text-white`}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </SwiperNextBtn>
          <SwiperPrevBtn
            className={`btn btn-lg bg-secondary bg-opacity-50 position-absolute start-0 top-50 translate-middle-y z-1 fs-1 text-white`}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </SwiperPrevBtn>
        </Swiper>
      </Image.PreviewGroup>
      {/* 下方小圖 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        modules={[Thumbs]}
        className={`d-none d-sm-flex swiper-sm`}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => {
              return (
                <SwiperSlide key={index}>
                  <Skeleton.Image active className="w-100 h-100" />
                </SwiperSlide>
              )
            })
          : images.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <NextImage
                    src={`${path}${item}`}
                    width={75}
                    height={75}
                    alt={item}
                  />
                </SwiperSlide>
              )
            })}
      </Swiper>
    </div>
  )
}

export default GallerySwiper
