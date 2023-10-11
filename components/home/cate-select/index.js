import React from 'react'
import style from '@/styles/home/_cate-select.module.scss'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
// import { Navigation, Pagination, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

import { SwiperPrevBtn, SwiperNextBtn } from '@/components/home/swiper-btns'
import CateCard from './cate-card'

const CateSelect = () => {
  return (
    <section
      className={`bg-primary ${style['home-sec2']}`}
      style={{ '--bs-bg-opacity': '0.2' }}
    >
      <div className="container py-5">
        <div className="pb-3">
          <h2 className="text-center h1 fw-bold">Category</h2>
          <h5 className="text-center fw-medium" style={{ color: '#666666' }}>
            快來進入鍵盤世界吧！
          </h5>
        </div>
        <Swiper
          spaceBetween={20}
          keyboard={true}
          className={`h-100 position-relative ${style['swiper']}`}
          slidesPerView={1.5}
          breakpoints={{
            576: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperPrevBtn
            className={`btn btn-lg bg-white rounded-circle position-absolute start-0 ms-2 top-50 translate-middle-y z-1 d-none d-sm-block`}
          >
            <i className="fa-solid fa-chevron-left text-primary"></i>
          </SwiperPrevBtn>
          <SwiperNextBtn
            className={`btn btn-lg bg-white rounded-circle position-absolute end-0 me-2 top-50 translate-middle-y z-1 d-none d-sm-block`}
          >
            <i className="fa-solid fa-chevron-right text-primary"></i>
          </SwiperNextBtn>
          <SwiperSlide className="h-100">
            <CateCard
              name={'鍵盤套件'}
              img={'/images/home-cate/cate1.png'}
              link={'/product/1'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CateCard
              name={'軸體'}
              img={'/images/home-cate/cate2.png'}
              link={'/product/2'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CateCard
              name={'鍵帽'}
              img={'/images/home-cate/cate3.png'}
              link={'/product/3'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CateCard
              name={'成品鍵盤'}
              img={'/images/home-cate/cate1.png'}
              link={'/product/4'}
            />
          </SwiperSlide>
          <SwiperSlide>
            <CateCard
              name={'鍵盤零件 & 工具'}
              img={'/images/home-cate/cate1.png'}
              link={'/product/5'}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default CateSelect
