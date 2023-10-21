import { useEffect, useState, useRef, useReducer } from 'react'
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
import AdSwiperBtn from './ad-swiper-btn'
import useMobile from '@/hooks/useMobile'

const homeAdData = [
  { title: 'QK75', image: '/images/home-ad/qk75.jpg', link: '/product/1/5/1' },
  {
    title: 'WS Stellar',
    image: '/images/home-ad/ws_stellar.jpg',
    link: '/product/3/10/104',
  },
  { title: 'Zoom98', image: '/images/home-ad/zoom98.jpg', link: '/groupbuy/1' },
]

export default function AdCarousel() {
  // 檢測是否為手機版，如果是手機不會有滑鼠按鈕
  const [isMobile] = useMobile()

  // 圖片及文字區塊動畫效果
  const handleAnime = () => {
    anime({
      targets: '.carousel-box',
      opacity: [0, 1],
      translateY: [100, 0],
      easing: 'easeInOutQuad',
      duration: 1000,
      delay: 100,
    })
    // anime({
    //   targets: '.carousel-container img',
    //   scale: [1.05, 1],
    //   // opacity: [0, 1],
    //   easing: 'easeInOutQuad',
    //   duration: 700,
    //   // delay: 100,
    // })
  }

  useEffect(() => {
    handleAnime()
  }, [])

  // 滑鼠移到 swiper，滑鼠變成按鈕
  const mouseInitialState = {
    position: {
      x: 0,
      y: 0,
    },
    isHover: false,
    arrow: '',
  }
  const mouseReducer = (state, action) => {
    switch (action.type) {
      case 'MOUSE_MOVE':
        return {
          ...state,
          position: action.payload,
          isHover: true,
        }
      case 'MOUSE_LEAVE':
        return {
          ...state,
          isHover: false,
        }
      case 'LEFT':
        return {
          ...state,
          arrow: 'left',
        }
      case 'RIGHT':
        return {
          ...state,
          arrow: 'right',
        }
      default:
        return state
    }
  }
  const [mouseState, mouseDispatch] = useReducer(
    mouseReducer,
    mouseInitialState
  )

  // 建立 mouseTrigger 的 Ref (因為不能直接將事件綁在 swiper 上)
  const mouseTriggerRef = useRef(null)
  // const mouseTriggerRect = mouseTriggerRef.current
  //   ? mouseTriggerRef.current.getBoundingClientRect()
  //   : null
  const handleMouseMove = (e) => {
    const mouseTriggerRect = mouseTriggerRef.current.getBoundingClientRect()

    const offsetX = e.clientX - mouseTriggerRect.left // 相對於父元素的水平位置
    const offsetY = e.clientY - mouseTriggerRect.top // 相對於父元素的垂直位置

    // console.log('現在X:', offsetX, '現在Y:', offsetY)

    mouseDispatch({
      type: 'MOUSE_MOVE',
      payload: {
        x: offsetX,
        y: offsetY,
      },
    })

    if (offsetX > mouseTriggerRect.width / 2) {
      mouseDispatch({
        type: 'RIGHT',
      })
    } else {
      mouseDispatch({
        type: 'LEFT',
      })
    }
  }

  const handleMouseLeave = () => {
    mouseDispatch({
      type: 'MOUSE_LEAVE',
    })
  }
  return (
    <section className="home-sec1 bg-dark">
      <div className="">
        <div
          ref={mouseTriggerRef}
          className={`${style['mouse-trigger']}`}
          onMouseMove={isMobile ? null : (e) => handleMouseMove(e)}
          onMouseLeave={isMobile ? null : handleMouseLeave}
        >
          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            effect="fade"
            speed={500}
            modules={[EffectFade, Autoplay, Pagination]}
            style={{
              '--swiper-pagination-color': '#DC9329',
              '--swiper-pagination-bullet-size': '10px',
              '--swiper-pagination-bullet-horizontal-gap': '10px',
              '--swiper-pagination-bullet-inactive-color': '#FFF',
            }}
            onSlideChange={handleAnime}
          >
            {!isMobile && (
              <AdSwiperBtn
                isHover={mouseState.isHover}
                mousePosition={mouseState.position}
                arrow={mouseState.arrow}
              />
            )}
            {homeAdData.map((item, index) => (
              <SwiperSlide key={index}>
                <CarouselContainer
                  hideMouseBall={handleMouseLeave}
                  mousePosition={mouseState.position}
                  title={item.title}
                  image={item.image}
                  link={item.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
