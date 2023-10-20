import Link from 'next/link'
import React, { useEffect } from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Pagination } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import { SwiperNextBtn, SwiperPrevBtn } from '../swiper-btns'
import RentAdCard from './rent-ad-card'
import AOS from 'aos'
import 'aos/dist/aos.css'

const rentAdData = [
  {
    name: 'Zoom75',
    brand: 'Metrix',
    image: '/images/rent-ad/zoom75.jpg',
    link: '/rent/2',
  },
  {
    name: 'QK75',
    brand: 'Qwertykeys',
    image: '/images/rent-ad/qk75.jpg',
    link: '/rent/1',
  },
  {
    name: 'QK60 R2',
    brand: 'Qwertykeys',
    image: '/images/rent-ad/qk60_r2.jpg',
    link: '/rent/7',
  },
  {
    name: 'Luminkey75',
    brand: 'createkeebs',
    image: '/images/rent-ad/luminkey75.jpg',
    link: '/rent/3',
  },
]

export default function RentAd() {
  // AOS init
  useEffect(() => {
    AOS.init({
      duration: 700,
    })
    AOS.refresh()
  }, [])
  return (
    <section
      className={`bg-primary bg-opacity-2`}
      style={{ '--bs-bg-opacity': '0.2' }}
    >
      <div className="container py-5">
        <div className="row gap-sm-0 gap-4">
          <div className="col-sm-4 col-12 d-flex flex-column justify-content-center gap-3">
            <h2
              className="h1 fw-bold mb-0"
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-once="true"
            >
              不知道鍵盤手感嗎？
              <br />
              試試租用吧！
            </h2>

            <p
              className="text-secondary mb-0 fw-bold"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-once="true"
            >
              在這裡，我們幫您搭配好的鍵盤，讓您可以盡情試用！
            </p>
            <div
              className="d-sm-block d-none"
              data-aos="fade-in"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <Link
                href="/rent"
                type="button"
                className="btn btn-primary btn-lg text-white w-50 rounded-0"
              >
                Explore more
              </Link>
            </div>
          </div>
          <div className="col-sm-8 col-12">
            <Swiper
              className="rent-ad-swiper"
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={25}
              loop={true}
              style={{
                '--swiper-pagination-color': '#DC9329',
                '--swiper-pagination-bullet-size': '10px',
                '--swiper-pagination-bullet-horizontal-gap': '10px',
              }}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                  spaceBetween: 25,
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
              {rentAdData.map((item, index) =>
                index === 0 ? (
                  <SwiperSlide key={index}>
                    <div
                      data-aos="fade-left"
                      data-aos-delay="300"
                      data-aos-once="true"
                    >
                      <RentAdCard
                        brand={item.brand}
                        name={item.name}
                        img={item.image}
                      />
                    </div>
                  </SwiperSlide>
                ) : (
                  <SwiperSlide key={index}>
                    <RentAdCard
                      brand={item.brand}
                      name={item.name}
                      img={item.image}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          <div className="col justify-content-center d-flex d-sm-none">
            <Link
              href="/rent"
              type="button"
              className="btn btn-primary btn-lg text-white w-50 rounded-0"
            >
              Explore more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
