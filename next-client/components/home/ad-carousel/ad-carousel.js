import { useEffect, useState, useRef } from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import 'swiper/scss/effect-fade'

import CarouselContainer from './carousel-container'
import anime from 'animejs'
import style from './_ad-carousel.module.scss'

export default function AdCarousel() {
  // 圖片及文字區塊動畫效果
  const handleAnime = () => {
    anime({
      targets: '.carousel-box',
      opacity: [0, 1],
      translateY: [100, 0],
      easing: 'easeInOutQuad',
      duration: 1000,
      delay: 200,
    })
    anime({
      targets: '.carousel-container img',
      scale: [1.05, 1],
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      duration: 500,
      delay: 100,
    })
  }

  useEffect(() => {
    handleAnime()
  }, [])

  // 滑鼠移到 swiper，滑鼠變成按鈕
  const mouseTriggerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })
  const [isHover, setIsHover] = useState(false)
  const handleMouseMove = (e) => {
    const rect = mouseTriggerRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left // 相對於父元素的水平位置
    const offsetY = e.clientY - rect.top // 相對於父元素的垂直位置
    setMousePosition({
      x: offsetX,
      y: offsetY,
    })
    setIsHover(true)
  }
  return (
    <section className="home-sec1 bg-dark pt-3 pb-sm-5 pb-3">
      <div className="container">
        <div
          ref={mouseTriggerRef}
          className={`${style['mouse-trigger']}`}
          onMouseMove={(e) => {
            handleMouseMove(e)
          }}
          onMouseLeave={() => {
            setIsHover(false)
          }}
        >
          <Swiper
            navigation={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            effect="fade"
            speed={400}
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#DC9329',
              '--swiper-pagination-bullet-size': '10px',
              '--swiper-pagination-bullet-horizontal-gap': '10px',
              '--swiper-pagination-bullet-inactive-color': '#FFF',
            }}
            onSlideChange={handleAnime}
          >
            <div
              className={`${style['mouse-ball']}`}
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
                opacity: isHover ? 1 : 0,
              }}
            ></div>
            {Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CarouselContainer
                  hideMouseBall={() => {
                    setIsHover(false)
                    console.log(isHover)
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
