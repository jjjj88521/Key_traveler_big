import React from 'react'
import { useSwiper } from 'swiper/react'
import style from './_ad-carousel.module.scss'

export default function AdSwiperBtn({ isHover, mousePosition, arrow }) {
  const swiper = useSwiper()
  return (
    <button
      className={`${style['mouse-ball']} btn btn-secondary`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        opacity: isHover ? 1 : 0,
        visibility: isHover ? 'visible' : 'hidden',
        // display: isHover ? 'flex' : 'none',
      }}
      onClick={() => {
        arrow === 'left' ? swiper.slidePrev() : swiper.slideNext()
      }}
    >
      <i className={`fs-5 fa-solid fa-chevron-${arrow}`}></i>
    </button>
  )
}
