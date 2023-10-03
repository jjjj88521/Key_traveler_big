import React, { useEffect } from 'react'
import style from './_carousel-container.module.scss'
import Link from 'next/link'
import anime from 'animejs'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CarouselContainer() {
  useEffect(() => {
    AOS.init({
      duration: 700,
    })
  }, [])
  return (
    <div className={`${style['carousel-container']}`}>
      <img src="" />
      <div className={`${style['carousel-box']} text-primary`}>
        <h2 className="fs-1">Title</h2>
        <Link href="#" className="btn btn-primary rounded-0 py-2 px-4">
          buy now
        </Link>
      </div>
    </div>
  )
}
