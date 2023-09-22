import Link from 'next/link'
import React from 'react'
import { Divider, Space, Tag } from 'antd'

export default function Article() {
  // const fontColor = {
  //   color: 'red',
  //   fontSize: '100px',
  // }
  // 卡片物件
  let data = [
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
  ]
  return (
    <>
      {/* <div>Article</div>
      <h1 style={fontColor}>kkkkk</h1>
      <button className="btn text-danger">btn</button> */}
      <div className="container ">
        {/* 手機版搜尋欄 */}
        <nav className="navbar navbar-light bg-light d-sm-none mb-4">
          <div className="container-fluid">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </nav>
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
        <div className="row gx-sm-5">
          {/* 左側 */}
          <div className="col-3  text-center d-sm-block d-none">
            {/* 搜尋欄 */}
            <nav className="navbar navbar-light bg-light mb-4">
              <div className="container-fluid">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </nav>
            {/* 分類表 */}
            <Link href="#" className="text-decoration-none">
              <div className="bg-primary position-relative p-2">
                <h5 className="text-white fw-bolder m-0">所有文章</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg text-white"></i>
                </div>
              </div>
            </Link>
            <Link href="#" className="text-decoration-none">
              <div className="bg-white position-relative p-2">
                <h5 className="text-primary fw-bolder m-0">公告</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
                </div>
              </div>
            </Link>
            <Link href="#" className="text-decoration-none">
              <div className="bg-white position-relative p-2">
                <h5 className="text-primary fw-bolder m-0">開箱文</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
                </div>
              </div>
            </Link>
            <Link href="#" className="text-decoration-none">
              <div className="bg-white position-relative p-2">
                <h5 className="text-primary fw-bolder m-0">組裝教學</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
                </div>
              </div>
            </Link>
            <Link href="#" className="text-decoration-none">
              <div className="bg-white position-relative p-2">
                <h5 className="text-primary fw-bolder m-0">活動</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
                </div>
              </div>
            </Link>
          </div>
          {/* 右側 */}
          <div className="col row row-cols-sm-3 row-cols-2 pe-0">
            {/* map用法類似foreach，將上面陣列中的每個物件(item)列出來 */}
            {data.map((item, index) => {
              return (
                <div className="col mb-4" key={index}>
                  <div className="card">
                    <Link href="#">
                      <img src={item.img} className="card-img-top" alt="..." />
                    </Link>

                    <div className="card-body bg-light">
                      <h3 className="card-title mb-3">{item.title + index}</h3>
                      {/* <a
                      href="#"
                      className="btn btn-sm btn-primary rounded-pill mb-3 text-white fw-bold"
                    ></a> */}
                      <Link href={'#'}>
                        <Tag className="bg-primary text-white fw-bolder mb-3">
                          {item.cate}
                        </Tag>
                      </Link>

                      <p className="card-date">發布日期:{item.date}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
