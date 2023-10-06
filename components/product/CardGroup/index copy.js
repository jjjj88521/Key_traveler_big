import React from 'react'
import styles from './index.module.css'

export default function CardGroup() {
  return (
    <>
      <div className="d-flex justify-content-end row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
        {Array(12)
          .fill()
          .map((_, index) => (
            <div className="col " key={index}>
              <div className="col">
                <div className={`card ${styles['card']}`}>
                  {/* <div className="card"> */}
                  <img
                    src="/images/card.png"
                    className="card-img-top"
                    alt="..."
                  />
                  {/* <div className={`card-body ${styles['card']}`}> */}
                  <div className="card-body">
                    {/* <div className="d-flex justify-content-between"> */}
                    <h5 className="card-title d-block">Card title</h5>
                    <h5 className="card-title d-block">$9999</h5>
                    {/* </div> */}
                    <p className="card-text">開團日期：2023/10/10~2023/10/10</p>
                  </div>
                  <div className={`d-flex flex-column gap-3 ${styles['info']}`}>
                    <button className={styles['infoBtn1']}>加入購物車</button>
                    <button className={styles['infoBtn2']}>
                      <i class="fa-regular fa-heart"></i> Like
                    </button>
                    <button className={styles['infoBtn3']}>
                      <i class="fa-solid fa-angles-right"></i> Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
