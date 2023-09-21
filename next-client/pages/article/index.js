import Link from 'next/link'
import React from 'react'
import { Divider, Space, Tag } from 'antd'

export default function Article() {
  const fontColor = {
    color: 'red',
    fontSize: '100px',
  }
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
      <div>Article</div>
      <h1 style={fontColor}>kkkkk</h1>
      <button className="btn text-danger">btn</button>
      <div className="container">
        <div className="row">
          {/* 左側 */}
          <div className="col-3 text-center d-sm-block d-none">
            {/* 搜尋欄 */}
            <nav className="navbar navbar-light bg-light me-">
              <div className="container-fluid">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
            {/* 分類表 */}
            <div className="bg-primary position-relative p-2">
              <h5 className="text-white fw-bolder m-0">所有文章</h5>
              <div className="position-absolute end-0 top-50 translate-middle me-4">
                <i className="fa-solid fa-circle-chevron-right fa-lg text-white"></i>
              </div>
            </div>
            <div className="bg-white position-relative p-2">
              <h5 className="text-primary fw-bolder m-0">公告</h5>
              <div className="position-absolute end-0 top-50 translate-middle me-4">
                <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
              </div>
            </div>
            <div className="bg-white position-relative p-2">
              <h5 className="text-primary fw-bolder m-0">開箱文</h5>
              <div className="position-absolute end-0 top-50 translate-middle me-4">
                <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
              </div>
            </div>
            <div className="bg-white position-relative p-2">
              <h5 className="text-primary fw-bolder m-0">組裝教學</h5>
              <div className="position-absolute end-0 top-50 translate-middle me-4">
                <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
              </div>
            </div>
            <div className="bg-white position-relative p-2">
              <h5 className="text-primary fw-bolder m-0">活動</h5>
              <div className="position-absolute end-0 top-50 translate-middle me-4">
                <i className="fa-solid fa-circle-chevron-right fa-lg text-primary"></i>
              </div>
            </div>
          </div>
          {/* 右側 */}
          <div className="col row row-cols-sm-3 row-cols-2">
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
