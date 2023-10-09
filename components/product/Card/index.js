import React, { useState, useEffect } from 'react'
import styles from './card.module.scss'
import ProductFetcher from './ProductFetcher'

export default function Card({ title, brand, price, imagePath }) {
  const [data, setData] = useState(null)
  console.log(data)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  // 截斷過長的文字
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.substring(0, maxLength) + '...'
    }
  }

  return (
    <>
      {data && data.products && data.products.length > 0 ? (
        <div
          className={`card h-auto ${styles['card']} overflow-hidden border-0`}
        >
          <img
            src={imagePath}
            className={`card-img-top ${styles.cardImg}`}
            alt="Product"
          />
          {/* 待完成，判斷有貨or缺貨(outofstock)，判斷是否為新品(ribbon) */}
          <div className={styles['ribbon']}></div>
          {/* <div className={styles['outofstock']}></div> */}
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
                className="fa-solid fa-cart-shopping fa-xl"
                style={{ color: '#F1D6AB' }}
              ></i>
            </button>
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
      ) : (
        <div className="mt-5 mx-auto fs-3">商品準備中,請敬請期待</div>
      )}
      {/*onDataFetched 為第12行定義的 這邊存入onCourseFetched並帶到子元件*/}
      <ProductFetcher onProductFetched={onDataFetched} />
    </>
  )
}
