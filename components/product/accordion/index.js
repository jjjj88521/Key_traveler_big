import React from 'react'
import styles from './index.module.css'

function Accordion() {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            套件
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>60%</li>
              <li>65%</li>
              <li>75%</li>
              <li>80%</li>
              <li>98%</li>
              <li>100%</li>
              <li>Num Pad</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            軸體
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>段落軸</li>
              <li>線性軸</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            鍵帽
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>Cerry原廠高</li>
              <li>OEM高</li>
              <li>個性鍵帽</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
