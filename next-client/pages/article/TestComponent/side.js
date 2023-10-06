import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import art_list_style from '@/styles/article/art_list_style.module.scss'

export default function Side() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [searchCard, setSearchCard] = useState('')
  const handleSearch = (e) => {
    // console.log('搜尋關鍵字：', e.target.value)
    setSearchCard(e.target.value)
  }
  // const fontColor = {
  //   color: 'red',
  //   fontSize: '100px',
  // }
  // 卡片物件

  return (
    <>
      {/* 手機版分類選單 */}
      <div class="dropdown d-sm-none mb-4">
        <button
          class="btn btn-secondary dropdown-toggle fw-bolder d-flex justify-content-between align-items-center"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ width: '100%', backgroundColor: '#F9F1E7' }}
        >
          所有文章
        </button>
        <ul
          class="dropdown-menu text-center "
          aria-labelledby="dropdownMenuButton1"
          style={{
            width: '100%',
          }}
        >
          <li>
            <a class="dropdown-item" href="#">
              公告
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              開箱文
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              組裝教學
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              活動
            </a>
          </li>
        </ul>
      </div>
      {/* 分類表 */}

      {/* <Link href="#" className="text-decoration-none">
              <div className={`bg-primary position-relative p-2`}>
                <h5 className="text-white fw-bolder m-0">所有文章</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="text-white fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
      <Link href={''} onClick={() => setSelectedCategory(null)}>
        <div
          className={`${
            selectedCategory === null
              ? 'bg-primary text-white'
              : art_list_style['side_category']
          } position-relative p-2`}
        >
          <h5 className=" fw-bolder m-0">所有文章</h5>
          <div className="position-absolute end-0 top-50 translate-middle me-4">
            <i className=" fa-solid fa-circle-chevron-right fa-lg "></i>
          </div>
        </div>
      </Link>

      {/* <Link href="#" className="text-decoration-none">
              <div
                className={`${art_list_style['side_category']} position-relative p-2`}
              >
                <h5 className=" fw-bolder m-0">公告</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
      <Link href={''} onClick={() => setSelectedCategory('公告')}>
        <div
          className={`${
            selectedCategory === '公告'
              ? 'bg-primary text-white'
              : art_list_style['side_category']
          } position-relative p-2`}
        >
          <h5 className=" fw-bolder m-0">公告</h5>
          <div className="position-absolute end-0 top-50 translate-middle me-4">
            <i className=" fa-solid fa-circle-chevron-right fa-lg "></i>
          </div>
        </div>
      </Link>

      {/* <Link href="#" className="text-decoration-none">
              <div
                className={`${art_list_style['side_category']} position-relative p-2`}
              >
                <h5 className=" fw-bolder m-0">開箱文</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
      <Link href={''} onClick={() => setSelectedCategory('開箱文')}>
        <div
          className={`${
            selectedCategory === '開箱文'
              ? 'bg-primary text-white'
              : art_list_style['side_category']
          } position-relative p-2`}
        >
          <h5 className=" fw-bolder m-0">開箱文</h5>
          <div className="position-absolute end-0 top-50 translate-middle me-4">
            <i className=" fa-solid fa-circle-chevron-right fa-lg "></i>
          </div>
        </div>
      </Link>

      {/* <Link href="#" className="text-decoration-none">
              <div
                className={`${art_list_style['side_category']} position-relative p-2`}
              >
                <h5 className=" fw-bolder m-0">組裝教學</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
      <Link href={''} onClick={() => setSelectedCategory('組裝教學')}>
        <div
          className={`${
            selectedCategory === '組裝教學'
              ? 'bg-primary text-white'
              : art_list_style['side_category']
          } position-relative p-2`}
        >
          <h5 className=" fw-bolder m-0">組裝教學</h5>
          <div className="position-absolute end-0 top-50 translate-middle me-4">
            <i className=" fa-solid fa-circle-chevron-right fa-lg "></i>
          </div>
        </div>
      </Link>

      {/* <Link href="#" className="text-decoration-none">
              <div
                className={`${art_list_style['side_category']} position-relative p-2`}
              >
                <h5 className=" fw-bolder m-0">活動</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
      <Link href={''} onClick={() => setSelectedCategory('活動')}>
        <div
          className={`${
            selectedCategory === '活動'
              ? 'bg-primary text-white'
              : art_list_style['side_category']
          } position-relative p-2`}
        >
          <h5 className=" fw-bolder m-0">活動</h5>
          <div className="position-absolute end-0 top-50 translate-middle me-4">
            <i className=" fa-solid fa-circle-chevron-right fa-lg "></i>
          </div>
        </div>
      </Link>
    </>
  )
}
