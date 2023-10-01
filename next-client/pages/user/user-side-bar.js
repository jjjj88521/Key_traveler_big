import React from 'react'
import styles from '@/styles/user/user-side-bar.module.css'
import Link from 'next/link'

function UserSideBar() {
  return (
    <>
      <div className="accordion " id="accordionPanelsStayOpenExample">
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne1"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseOne"
            >
              我的帳戶
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne1"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6>
                <Link href="/user/profile" className="fw-bold mb-3">
                  個人檔案
                </Link>
              </h6>
              <h6>
                {' '}
                <Link href="/user/credit-card-profile" className="fw-bold mb-3">
                  信用卡
                </Link>
              </h6>
              <h6>
                <Link href="/user/forget-password" className="fw-bold">
                  修改密碼
                </Link>
              </h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne2"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseOne"
            >
              歷史訂單
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne2"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold mb-3">一般商品</h6>
              <h6 className="fw-bold mb-3">團購商品</h6>
              <h6 className="fw-bold">租用商品</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne3"
              aria-expanded="flase"
              aria-controls="panelsStayOpen-collapseOne"
            >
              租用清單
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne3"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold">租用商品</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne4"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseOne"
            >
              我的優惠券
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne4"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold mb-3">1</h6>
              <h6 className="fw-bold mb-3">2</h6>
              <h6 className="fw-bold">3</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne5"
              aria-expanded="flase"
              aria-controls="panelsStayOpen-collapseOne"
            >
              收藏文章
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne5"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold mb-3">公告</h6>
              <h6 className="fw-bold mb-3">開箱文</h6>
              <h6 className="fw-bold">組裝教學</h6>
              <h6 className="fw-bold">活動</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne6"
              aria-expanded="flase"
              aria-controls="panelsStayOpen-collapseOne"
            >
              收藏商品
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne6"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold mb-3">一般商品</h6>
              <h6 className="fw-bold mb-3">團購商品</h6>
              <h6 className="fw-bold">租用商品</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
        {/* 收這裡 */}
        <div className="accordion-item">
          {/* 以下同一組 */}
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
              type="button"
              data-bs-toggle="collapse"
              // {/* 改這裡~~~ */}
              data-bs-target="#panelsStayOpen-collapseOne7"
              aria-expanded="flase"
              aria-controls="panelsStayOpen-collapseOne"
            >
              歷史評價
            </button>
          </h2>
          <div
            // {/* 改這裡~~~ */}
            id="panelsStayOpen-collapseOne7"
            className="accordion-collapse collapse"
          >
            <div className={`accordion-body ${styles['accBody']}`}>
              <h6 className="fw-bold mb-3">1</h6>
              <h6 className="fw-bold mb-3">2</h6>
              <h6 className="fw-bold">3</h6>
            </div>
          </div>
          {/* 以上同一組 */}
        </div>
      </div>
    </>
  )
}

export default UserSideBar
