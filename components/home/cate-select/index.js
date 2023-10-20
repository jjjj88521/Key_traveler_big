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
import useHideBtn from '@/hooks/useHideBtn'

const cateItems = [
  {
    name: '鍵盤套件',
    img: '/images/home-cate/cate1.png',
    link: '/product/1',
  },
  {
    name: '軸體',
    img: '/images/home-cate/cate2.png',
    link: '/product/2',
  },
  {
    name: '鍵帽',
    img: '/images/home-cate/cate3.png',
    link: '/product/3',
  },
  {
    name: '成品鍵盤',
    img: '/images/home-cate/cate4.png',
    link: '/product/4',
  },
  {
    name: '鍵盤配件 & 工具',
    img: '/images/home-cate/cate5.png',
    link: '/product/5',
  },
]

const CateSelect = () => {
  const { hideBtn, handleSwiperBtnHide } = useHideBtn()

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
          spaceBetween={40}
          keyboard={true}
          className={`h-100 position-relative ${style['swiper']}`}
          slidesPerView={1.5}
          breakpoints={{
            576: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          onSlideChange={handleSwiperBtnHide}
        >
          <SwiperPrevBtn
            className={`btn btn-lg bg-white rounded-circle position-absolute start-0 ms-2 top-50 translate-middle-y z-1 d-none d-sm-block ${
              hideBtn.prev ? 'opacity-0' : ''
            }`}
            style={{ transition: 'all 0.3s ease' }}
          >
            <i className="fa-solid fa-chevron-left text-primary"></i>
          </SwiperPrevBtn>
          <SwiperNextBtn
            className={`btn btn-lg bg-white rounded-circle position-absolute end-0 me-2 top-50 translate-middle-y z-1 d-none d-sm-block ${
              hideBtn.next ? 'opacity-0' : ''
            }`}
            style={{ transition: 'all 0.3s ease' }}
          >
            <i className="fa-solid fa-chevron-right text-primary"></i>
          </SwiperNextBtn>
          {cateItems.map((item, index) => (
            <SwiperSlide key={index}>
              <CateCard name={item.name} img={item.img} link={item.link} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default CateSelect
