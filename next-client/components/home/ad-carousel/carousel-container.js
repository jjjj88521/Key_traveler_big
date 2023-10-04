import React, { useEffect, useState } from 'react'
import style from './_carousel-container.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function CarouselContainer({ hideMouseBall }) {
  const handleMouseEnterLink = () => {
    hideMouseBall()
  }
  return (
    <div className={`${style['carousel-container']} carousel-container`}>
      <Image
        src="/images/product/000-1.jpg"
        alt="example"
        width={600}
        height={400}
      />
      <div className={`${style['carousel-box']} text-primary carousel-box`}>
        <h2 className="fs-1">Title</h2>
        <Link
          href="#"
          className="btn btn-primary rounded-0 py-2 px-4"
          onMouseEnter={() => {
            handleMouseEnterLink()
            console.log('mouse enter')
          }}
        >
          buy now
        </Link>
      </div>
    </div>
  )
}
