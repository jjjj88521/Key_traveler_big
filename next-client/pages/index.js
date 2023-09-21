import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/home.module.scss'
import style from './_sec2.module.scss'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import { Card } from 'antd'

export default function Home() {
  return (
    <>
      <Head>
        <title>鍵之旅人</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section className="home-sec1">
        <div style={{ height: '300px' }}>
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
            navigation={true}
            keyboard={true}
            modules={[Navigation, Pagination, Keyboard]}
            className="h-100"
            style={{
              '--swiper-navigation-color': '#fff',
            }}
            slidesPerView={1.5}
            breakpoints={{
              576: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide className="h-100">
              {/* <Card>
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  className="img-fluid"
                />
              </Card> */}
              <div
                className={`${style['cate-select']} overflow-hidden rounded-4`}
              >
                <div className="card rounded-4 overflow-hidden">
                  <div className="card-img">
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      className="card-img-top"
                    />
                  </div>
                </div>
                <div className={`py-3 ${style['cate-text']}`}>
                  <h4 className="text-center fw-bolder">鍵盤套件</h4>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              ></Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              ></Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              ></Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              ></Card>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className={style['home-sec3']}>
        <div className="container py-5">
          <h2 className="h1 text-center fw-bolder">New Products</h2>
        </div>
      </section>
    </>
  )
}
