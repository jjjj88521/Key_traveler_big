import React from 'react'
import styles from './index.module.css'

export default function AsideFilter() {
  return (
    <>
      <div className="mt-4 p-4 border-top border-primary border-2">
        <div className="mb-2 fs-5">
          <i className="fa-solid fa-filter"></i> 條件篩選
        </div>
        <div className="d-flex flex-column gap-1">
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
          <hr className="opacity-75"></hr>
          <div className="mb-2 fs-5">
            <i class="fa-solid fa-dollar-sign"></i> 價錢篩選
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <input type="number" className="col-5" min="0"></input>
            <div className="col-2 fs-4 d-flex justify-content-center">~</div>
            <input type="number" className="col-5" min="0"></input>
          </div>
          <button type="button" className="btn btn-primary">
            套用
          </button>
        </div>
      </div>
    </>
  )
}
