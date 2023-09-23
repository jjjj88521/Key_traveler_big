import React from 'react'
import styles from './product.module.css'
import Accordion from '@/components/accordion'

// <div className="container">
// <div className={styles['banner']}>
// <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>

export default function ProductIndex() {
  return (
    <>
      <div className={styles['banner']}>
        <img src="/images/testBanner.png" alt="預留位子先不放圖" />
        <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>
      </div>

      <div className="container pt-5 pb-3">
        <div className="row">
          <div className="col-3">
            <Accordion />
          </div>

          {/* sort btn & card group */}
          <div className="col-9">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <div className={`bg-primary-subtle ${styles['sortBtn']}`}>
                <p className="fs-6">排序</p>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    預設
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由低到高
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由高到低
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由新到舊
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由舊到新
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* product list & card group  */}
            <div className="d-flex justify-content-end row row-cols-2 row-cols-md-3 g-4">
              {Array(12)
                .fill()
                .map((_, index) => (
                  <div className="col " key={index}>
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
                          make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="text-center mb-3">
        <h1 className="text-primary">&lt; 1...4 5 6...10 &gt;</h1>
      </div>
    </>
  )
}
