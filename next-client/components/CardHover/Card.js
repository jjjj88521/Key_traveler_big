// Card.js
import React from 'react'
import styles from './index.module.css'

export default function Card() {
  return (
    <div className={`card ${styles['card']}`}>
      <img src="/images/card.png" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </p>
        <h5 className="card-title">$9999</h5>
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
