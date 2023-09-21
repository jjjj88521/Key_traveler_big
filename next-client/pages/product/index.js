import React from 'react'
import styles from './product.module.css'

// <div className="container">
// <div className={styles['banner']}>
// <h1 className={`bootstrap-類別 ${styles['display1']}`}>鍵盤套件</h1>

export default function ProductIndex() {
  return (
    <>
      <div className={styles['banner']}>
        <img src="/images/testBanner.png" alt="預留位子先不放圖" />
        <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>
      </div>

      <div className={styles['spacePadding']}></div>

      <div className="container">
        <div className="cateNav">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  This is the third accordion body.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  This is the third accordion body.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  This is the third accordion body.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
