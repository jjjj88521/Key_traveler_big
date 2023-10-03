import React from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import CarouselContainer from './carousel-container'

export default function AdCarousel() {
  return (
    <section className="home-sec1">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Keyboard]}
        style={{
          '--swiper-navigation-color': '#FFF',
          '--swiper-pagination-color': '#DC9329',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-horizontal-gap': '10px',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <CarouselContainer />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
