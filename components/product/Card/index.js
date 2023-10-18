import React from 'react'
import styles from './card.module.scss'
import Link from 'next/link'

export default function Card({ title, brand, price, image, stock, link }) {
  return (
    <>
      <div
        className={`card h-auto border border-1 ${styles['card']} overflow-hidden`}
      >
        <Link className="w-100 h-100" href={link}>
          <img
            src={`/images/product/${image}`}
            className={`${styles.cardImg} card-img-top`}
            alt="Product"
          />
        </Link>

        {/* 待完成，判斷是否為新品(ribbon) */}
        {stock === 0 ? (
          <div className={styles['outofstock']}></div>
        ) : (
          <div className={styles['ribbon']}></div>
        )}
        <div className="card-body w-100 position-relative bg-secondary-subtle py-4 vstack gap-2">
          <h5 className={`${styles['card-title-name']} card-title fw-bold`}>
            {title}
          </h5>
          <h6 className="card-title text-black-50">{brand}</h6>
          <h5 className="card-title">$ {price}</h5>
          <button
            className={`d-sm-none d-block border border-2 border-primary rounded-circle ${styles['cartBtn']}`}
          >
            <i
              className="fa-solid fa-cart-shopping fa-lg"
              style={{ color: '#F1D6AB' }}
            ></i>
          </button>
        </div>
        <div className={`d-flex flex-column gap-3 ${styles['info']}`}>
          <button
            className={`${styles['infoBtn1']} ${
              stock === 0 ? styles['invalidButton'] : ''
            }`}
            disabled={stock === 0} //根據是否缺貨
          >
            加入購物車
          </button>
          <button className={styles['infoBtn2']}>
            <i className="fa-regular fa-heart"></i> Like
          </button>
          <Link className={styles['infoBtn3']} href={link}>
            <i className="fa-solid fa-angles-right"></i> Learn More
          </Link>
        </div>
      </div>
    </>
  )
}
