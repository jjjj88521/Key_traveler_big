import React from 'react'
import { useSwiper } from 'swiper/react'

const SwiperNextBtn = ({ className, children, style }) => {
  const swiper = useSwiper()
  return (
    <button
      className={className}
      onClick={() => swiper.slideNext()}
      style={style}
    >
      {children}
    </button>
  )
}

const SwiperPrevBtn = ({ className, children, style }) => {
  const swiper = useSwiper()
  return (
    <button
      className={className}
      onClick={() => swiper.slidePrev()}
      style={style}
    >
      {children}
    </button>
  )
}

export { SwiperNextBtn, SwiperPrevBtn }
