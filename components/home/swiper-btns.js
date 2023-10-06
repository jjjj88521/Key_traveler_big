import React from 'react'
import { useSwiper } from 'swiper/react'

const SwiperNextBtn = ({ className, children }) => {
  const swiper = useSwiper()
  return (
    <button className={className} onClick={() => swiper.slideNext()}>
      {children}
    </button>
  )
}

const SwiperPrevBtn = ({ className, children }) => {
  const swiper = useSwiper()
  return (
    <button className={className} onClick={() => swiper.slidePrev()}>
      {children}
    </button>
  )
}

export { SwiperNextBtn, SwiperPrevBtn }
