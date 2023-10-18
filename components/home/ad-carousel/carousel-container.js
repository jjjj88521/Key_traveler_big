import React, { useEffect, useState, useRef, use } from 'react'
import style from './_carousel-container.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function CarouselContainer({
  hideMouseBall,
  mousePosition,
  title,
  image,
  link,
}) {
  // 取得連結按鈕的位置
  const carouselBoxRef = useRef(null)

  useEffect(() => {
    if (carouselBoxRef.current) {
      const isMouseInsideCarousel =
        mousePosition.x > carouselBoxRef.current.offsetLeft &&
        mousePosition.x <
          carouselBoxRef.current.offsetLeft +
            carouselBoxRef.current.offsetWidth &&
        mousePosition.y > carouselBoxRef.current.offsetTop &&
        mousePosition.y <
          carouselBoxRef.current.offsetTop + carouselBoxRef.current.offsetHeight

      if (isMouseInsideCarousel) {
        hideMouseBall()
      }
    }
  }, [mousePosition, hideMouseBall])

  return (
    <div className={`${style['carousel-container']} carousel-container`}>
      <Image src={image} alt={title} width={0} height={0} sizes="100vw" />
      <div
        ref={carouselBoxRef}
        className={`${style['carousel-box']} text-primary carousel-box`}
      >
        <h2 className="fs-1">{title}</h2>

        <a href={link} className="btn btn-primary rounded-0 py-2 px-4">
          buy now
        </a>
      </div>
    </div>
  )
}
