import React, { useEffect, useState, useRef, use } from 'react'
import style from './_carousel-container.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function CarouselContainer({
  hideMouseBall,
  mousePosition,
  mouseTriggerRect,
}) {
  // 取得連結按鈕的位置
  const carouselBoxRef = useRef(null)

  useEffect(() => {
    if (carouselBoxRef.current) {
      if (
        mousePosition.x > carouselBoxRef.current.offsetLeft &&
        mousePosition.x <
          carouselBoxRef.current.offsetLeft +
            carouselBoxRef.current.offsetWidth &&
        mousePosition.y > carouselBoxRef.current.offsetTop &&
        mousePosition.y <
          carouselBoxRef.current.offsetTop + carouselBoxRef.current.offsetHeight
      ) {
        hideMouseBall()
      }
    }
  }, [carouselBoxRef, hideMouseBall, mousePosition])

  return (
    <div className={`${style['carousel-container']} carousel-container`}>
      <Image
        src="/images/product/000-1.jpg"
        alt="example"
        width={600}
        height={400}
      />
      <div
        ref={carouselBoxRef}
        className={`${style['carousel-box']} text-primary carousel-box`}
      >
        <h2 className="fs-1">Title</h2>

        <Link href="#" className="btn btn-primary rounded-0 py-2 px-4">
          buy now
        </Link>
      </div>
    </div>
  )
}