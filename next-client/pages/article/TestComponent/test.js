import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Divider, Space, Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'

export default function Test() {
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
  const data = [
    {
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      title: 'Card Post',
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
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      title: 'Card Teach',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '組裝教學',
      date: '2023-09-21',
    },
    {
      title: 'Card Act',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
    {
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
  ]

  return (
    <>
      {/* 右側 */}
      <div className="col row row-cols-sm-3 row-cols-2 pe-0">
        {/* map用法類似foreach，將上面陣列中的每個物件(item)列出來 */}
        {data
          .filter(
            (item) =>
              (selectedCategory === null || item.cate === selectedCategory) &&
              (searchCard === '' || item.title.includes(searchCard))
          )

          .map((item, index) => {
            return (
              <div className="col mb-4" key={index}>
                <div className={`${art_list_style['list_card']} card`}>
                  {/* 路由名稱 */}
                  <Link href={`/article/cate/${index}`}>
                    <img src={item.img} className="card-img-top" alt="..." />
                  </Link>

                  <div className="card-body">
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
        {/* 放分頁 */}
        {/* <PaginationComponent
              totalItems={12}
              pageSize={1}
              //onPageChange={2}
            ></PaginationComponent> */}
      </div>
    </>
  )
}
