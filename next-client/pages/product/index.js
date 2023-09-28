import React from 'react'
import styles from './product.module.css'
import Accordion from '@/components/product/accordion'
import AsideFilter from '@/components/product/AsideFilter'
import CardHover from '@/components/CardHover'

// <div className="container">
// <div className={styles['banner']}>
// <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>

// 將 title 傳給 app.js
export async function getStaticProps() {
  const pageTitle = '商品列表'
  return {
    props: { pageTitle },
  }
}

export default function ProductIndex() {
  return (
    <>
      <div className={styles.banner}>
        <div className="w-100 h-100 p-4 p-sm-0">
          <img
            className={`w-100 h-100 object-fit-cover ${styles.rounded}`}
            src="/images/testBanner.png"
            alt="banner"
          />
        </div>
        <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>
      </div>
      <div className="container pt-5 pb-3">
        <div className="row">
          <div className="col-3 pe-5">
            <Accordion />
            <AsideFilter />
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
            <CardHover></CardHover>
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
