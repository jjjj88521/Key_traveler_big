import React from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

export default function AdCarousel() {
  return (
    <section className="home-sec1">
      <div style={{ height: '500px' }}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="h-100"
          style={{
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': '#DC9329',
            '--swiper-pagination-bullet-size': '10px',
            '--swiper-pagination-bullet-horizontal-gap': '10px',
          }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}
