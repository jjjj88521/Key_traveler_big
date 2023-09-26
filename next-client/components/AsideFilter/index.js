import React from 'react'
import styles from './index.module.css'

export default function AsideFilter() {
  return (
    <>
      <div className={`mt-4 p-4 ${styles['bdTop']}`}>
        <div>
          <i className="fa-solid fa-filter"> 條件篩選</i>
        </div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            鍵盤
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            鍵帽
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            套件
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            周邊
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            軸體
          </div>
        </div>
      </div>
    </>
  )
}
