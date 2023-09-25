import Link from 'next/link'
import React from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

export default function RentAd() {
  return (
    <section
      className={`bg-primary bg-opacity-2`}
      style={{ '--bs-bg-opacity': '0.2' }}
    >
      <div className="container py-5">
        <div className="row">
          <div className="col-5">
            <h2 className="h1 fw-bold">
              不知道鍵盤手感嗎？
              <br />
              試試租用吧！
            </h2>
            <p className="text-secondary">
              在這裡，我們幫您搭配好的鍵盤，讓您可以盡情試用！
            </p>
            <Link
              href="/rent"
              className="btn btn-primary btn-lg text-white w-50 rounded-0"
            >
              Explore more
            </Link>
          </div>
          <div className="col">
            <Swiper></Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
