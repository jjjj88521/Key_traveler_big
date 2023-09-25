import Link from 'next/link'
import React from 'react'
import { Divider, Space, Tag } from 'antd'
import UserSideBar from './user-side-bar'

export default function Article() {
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
      <div className="container">
        <div className="row ">
          <div className="col-sm-3 col-12 px-0 mx-0">
            <UserSideBar />
          </div>

          <div className="col-sm-9 col-12 row  mx-0">
            <nav className="col-12 d-flex justify-content-evenly my-3 mb-5">
              <h3>公告</h3>
              <h3>開箱文</h3>
              <h3>組裝教學</h3>
              <h3>活動</h3>
            </nav>
            <div className="col-sm-4 col-6 mb-4">
              <div className="card">
                <Link href="#">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body bg-light">
                  <h3 className="card-title mb-3">Card Title</h3>

                  <Link href={'#'}>
                    <Tag className="bg-primary text-white fw-bolder mb-3">
                      公告
                    </Tag>
                  </Link>

                  <p className="card-date">發布日期:2023-09-21</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-4">
              <div className="card">
                <Link href="#">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body bg-light">
                  <h3 className="card-title mb-3">Card Title</h3>

                  <Link href={'#'}>
                    <Tag className="bg-primary text-white fw-bolder mb-3">
                      公告
                    </Tag>
                  </Link>

                  <p className="card-date">發布日期:2023-09-21</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-4">
              <div className="card">
                <Link href="#">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body bg-light">
                  <h3 className="card-title mb-3">Card Title</h3>

                  <Link href={'#'}>
                    <Tag className="bg-primary text-white fw-bolder mb-3">
                      公告
                    </Tag>
                  </Link>

                  <p className="card-date">發布日期:2023-09-21</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-4">
              <div className="card">
                <Link href="#">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body bg-light">
                  <h3 className="card-title mb-3">Card Title</h3>

                  <Link href={'#'}>
                    <Tag className="bg-primary text-white fw-bolder mb-3">
                      公告
                    </Tag>
                  </Link>

                  <p className="card-date">發布日期:2023-09-21</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-4">
              <div className="card">
                <Link href="#">
                  <img
                    src="https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body bg-light">
                  <h3 className="card-title mb-3">Card Title</h3>

                  <Link href={'#'}>
                    <Tag className="bg-primary text-white fw-bolder mb-3">
                      公告
                    </Tag>
                  </Link>

                  <p className="card-date">發布日期:2023-09-21</p>
                </div>
              </div>
            </div>

            <div className="my-3 text-center mb-5">我是頁簽</div>
          </div>
        </div>
      </div>
    </>
  )
}
