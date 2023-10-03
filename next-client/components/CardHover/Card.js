import React from 'react'
import styles from './card.module.css'

export default function Card({ title, description, price, imagePath }) {
  // 截斷過長的商品介紹
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.substring(0, maxLength) + '...'
    }
  }

  return (
    <div className={`card h-auto ${styles['card']}`}>
      <img
        src={imagePath}
        className={`card-img-top h-50 ${styles.cardImg}`}
        alt="Product"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{truncateText(description, 50)}</p>
        <h5 className="card-title">$ {price}</h5>
      </div>
      <div className={`d-flex flex-column gap-3 ${styles['info']}`}>
        <button className={styles['infoBtn1']}>加入購物車</button>
        <button className={styles['infoBtn2']}>
          <i className="fa-regular fa-heart"></i> Like
        </button>
        <button className={styles['infoBtn3']}>
          <i className="fa-solid fa-angles-right"></i> Learn More
        </button>
      </div>
    </div>
  )
}
