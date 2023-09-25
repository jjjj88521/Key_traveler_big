import React from 'react'
import Link from 'next/link'
import style from '@/styles/home/_cate-select.module.scss'

export default function CateCard({ name, img }) {
  return (
    <Link href="/product" className="text-decoration-none">
      <div className={`${style['cate-select']} overflow-hidden rounded-4`}>
        <div className="card rounded-4 border-0 bg-transparent">
          <div className="card-img overflow-hidden rounded-4">
            <img alt="example" src={img} className="card-img-top" />
          </div>
        </div>
        <div className={`${style['overlay']} rounded-4`}>
          <h4 className="text-center fw-bolder py-3">{name}</h4>
        </div>
      </div>
    </Link>
  )
}
