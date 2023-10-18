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
                <Link href="/product/1">全部套件</Link>
              </li>
              <li>
                <Link href="/product/1/3">60%</Link>
              </li>
              <li>
                <Link href="/product/1/4">65%</Link>
              </li>
              <li>
                <Link href="/product/1/5">75%</Link>
              </li>
              <li>
                <Link href="/product/1/6">80%</Link>
              </li>
              <li>
                <Link href="/product/1/7">98%</Link>
              </li>
              <li>
                <Link href="/product/1/8">100%</Link>
              </li>
              <li>
                <Link href="/product/1/9">Num Pad</Link>
              </li>
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
              <li>
                <Link href="/product/2">全部軸體</Link>
              </li>
              <li>
                <Link href="/product/2/1">段落有聲軸</Link>
              </li>
              <li>
                <Link href="/product/2/2">段落無聲軸</Link>
              </li>
              <li>
                <Link href="/product/2/20">線性軸</Link>
              </li>
              <li>
                <Link href="/product/2/21">提前段落</Link>
              </li>
              <li>
                <Link href="/product/2/22">靜音軸</Link>
              </li>
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
              <li>
                <Link href="/product/3">全部鍵帽</Link>
              </li>
              <li>
                <Link href="/product/3/10">Cerry原廠高</Link>
              </li>
              <li>
                <Link href="/product/3/11">OEM高</Link>
              </li>
              <li>
                <Link href="/product/3/23">SA高</Link>
              </li>
              <li>
                <Link href="/product/3/24">DSA高</Link>
              </li>
              <li>
                <Link href="/product/3/25">XDA高</Link>
              </li>
              <li>
                <Link href="/product/3/26">ADA高</Link>
              </li>
              <li>
                <Link href="/product/3/27">WDA高</Link>
              </li>
              <li>
                <Link href="/product/3/28">KCA高</Link>
              </li>
              <li>
                <Link href="/product/3/29">MDA高</Link>
              </li>
              <li>
                <Link href="/product/3/30">MA高</Link>
              </li>
              <li>
                <Link href="/product/3/31">個性鍵帽</Link>
              </li>
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
              <li>
                <Link href="/product/4">全部成品鍵盤</Link>
              </li>
              <li>
                <Link href="/product/4/13">機械式鍵盤</Link>
              </li>
              <li>
                <Link href="/product/4/14">光軸鍵盤</Link>
              </li>
              <li>
                <Link href="/product/4/15">電容式鍵盤</Link>
              </li>
              <li>
                <Link href="/product/4/16">類機械式鍵盤</Link>
              </li>
              <li>
                <Link href="/product/4/17">薄膜鍵盤</Link>
              </li>
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
              <li>
                <Link href="/product/5">全部周邊</Link>
              </li>
              <li>
                <Link href="/product/5/18">潤滑油</Link>
              </li>
              <li>
                <Link href="/product/5/19">衛星軸</Link>
              </li>
              <li>
                <Link href="/product/5/32">滑鼠墊</Link>
              </li>
              <li>
                <Link href="/product/5/33">鍵盤手托</Link>
              </li>
              <li>
                <Link href="/product/5/34">鍵帽 & 軸體工具</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
