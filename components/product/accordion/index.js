import React from 'react'
import styles from './index.module.css'
import Link from 'next/link'

function Accordion() {
  return (
    <div className="accordion" id="accordionExample">
      {/* 套件 */}
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
              <li>
                <Link href="/product/1/3">60%</Link>
              </li>
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
      {/* 軸體 */}
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
              <li>段落有聲軸</li>
              <li>段落無聲軸</li>
              <li>線性軸</li>
              <li>提前段落</li>
              <li>靜音軸</li>
            </ul>
          </div>
        </div>
      </div>
      {/* 鍵帽 */}
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
              <li>SA高</li>
              <li>DSA高</li>
              <li>XDA高</li>
              <li>ADA高</li>
              <li>WDA高</li>
              <li>KCA高</li>
              <li>MDA高</li>
              <li>MA高</li>
              <li>個性鍵帽</li>
            </ul>
          </div>
        </div>
      </div>
      {/* 成品鍵盤 */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            成品鍵盤
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>機械式鍵盤</li>
              <li>光軸鍵盤</li>
              <li>電容式鍵盤</li>
              <li>類機械式鍵盤</li>
              <li>薄膜鍵盤</li>
            </ul>
          </div>
        </div>
      </div>
      {/* 鍵盤工具 & 周邊 */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            鍵盤工具 & 周邊
          </button>
        </h2>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>潤滑油</li>
              <li>衛星軸</li>
              <li>滑鼠墊</li>
              <li>鍵盤手托</li>
              <li>鍵帽 & 軸體工具</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
