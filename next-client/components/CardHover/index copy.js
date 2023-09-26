import React from 'react'
import styles from './index.module.css'

export default function CardHover() {
  return (
    <>
      <div className="d-flex justify-content-end row row-cols-2 row-cols-md-3 g-4">
        {Array(12)
          .fill()
          .map((_, index) => (
            <div className="col " key={index}>
              <div className="col">
                {/* <div className={`card ${styles['card']}`}> */}
                <div className="card">
                  <img
                    src="/images/card.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </p>
                  </div>
                  <div class={styles['info']}>
                    <h1>Mountain</h1>
                    <p>
                      Lorem Ipsum is simply dummy text from the printing and
                      typesetting industry
                    </p>
                    <button>Read More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
