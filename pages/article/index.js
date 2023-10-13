import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Divider, Space, Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'
import PaginationComponent from '@/components/common/PaginationComponent'
import { useRouter } from 'next/router'
import axios from 'axios'
// import PaginationComponent from '@/components/common/PaginationComponent'

export default function Article() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [data, setData] = useState([])
  const [searchCard, setSearchCard] = useState('')
  const handleSearch = (e) => {
    // console.log('搜尋關鍵字：', e.target.value)
    setSearchCard(e.target.value)
  }
  useEffect(() => {
    axios.get('http://localhost:3005/api/article').then((response) => {
      // console.log(response.data.articles)
      console.log(response.data.articles)
      setData(response.data.articles)
    })
  }, [])

  // 卡片物件
  // const data = [
  //   {
  //     id: '1',
  //     title: 'Card Post',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '公告',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '2',
  //     title: 'Card Post',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '公告',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '3',
  //     title: 'Card Post',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '公告',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '4',
  //     title: 'Card Title',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '公告',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '5',
  //     title: 'Card Title',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '公告',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '6',
  //     title: 'Card Unboxing',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '開箱文',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '7',
  //     title: 'Card Unboxing',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '開箱文',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '8',
  //     title: 'Card Unboxing',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '開箱文',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '9',
  //     title: 'Card Title',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '開箱文',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '10',
  //     title: 'Card Teach',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '組裝教學',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '11',
  //     title: 'Card Act',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '活動',
  //     date: '2023-09-21',
  //   },
  //   {
  //     id: '12',
  //     title: 'Card Title',
  //     img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
  //     cate: '活動',
  //     date: '2023-09-21',
  //   },
  // ]
  //   分頁設定
  const PageSize = 9
  const totalItemsForCategory = data.filter(
    (item) => selectedCategory === null || item.cate === selectedCategory
  )
  const totalPageCount = totalItemsForCategory.length
  console.log(totalPageCount)
  //   const totalPageCount = Math.ceil(totalItemsForCategory.length / PageSize)
  //   console.log(totalPageCount)
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log(page)
  }
  const startIndex = (currentPage - 1) * PageSize
  const endIndex =
    currentPage * PageSize < totalItemsForCategory.length
      ? currentPage * PageSize
      : totalItemsForCategory.length
  return (
    <>
      <div className="container mt-sm-5 mt-3">
        {/* 手機版搜尋欄 */}
        <nav className="navbar navbar-light bg-light d-sm-none mb-4">
          <div className="w-100">
            <form className="d-flex px-2">
              <input
                className="form-control flex-grow-1 me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchCard}
                onChange={handleSearch}
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </nav>
        {/* 手機版分類選單 */}
        <div class="dropdown d-sm-none mb-4">
          <Link
            href={'/article/cate/0'}
            onClick={() => setSelectedCategory(null)}
            className={`${
              selectedCategory === null
                ? 'bg-primary text-white'
                : art_list_style['side_category']
            } btn btn-secondary dropdown-toggle fw-bolder d-flex justify-content-between align-items-center`}
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: '100%', backgroundColor: '#F9F1E7' }}
          >
            所有文章
          </Link>
          <ul
            class="dropdown-menu text-center "
            aria-labelledby="dropdownMenuButton1"
            style={{
              width: '100%',
            }}
          >
            <li>
              <Link
                className={`${
                  selectedCategory === '公告'
                    ? 'bg-primary text-white'
                    : art_list_style['side_category']
                } dropdown-item`}
                href={'/article/cate/1'}
                onClick={() => {
                  setSelectedCategory('公告')
                  const dropdownToggle = document.getElementById(
                    'dropdownMenuButton1'
                  )
                  dropdownToggle.click()
                }}
              >
                公告
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  selectedCategory === '開箱文'
                    ? 'bg-primary text-white'
                    : art_list_style['side_category']
                } dropdown-item`}
                href={'/article/cate/2'}
                onClick={() => setSelectedCategory('開箱文')}
              >
                開箱文
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  selectedCategory === '組裝教學'
                    ? 'bg-primary text-white'
                    : art_list_style['side_category']
                } dropdown-item`}
                href={'/article/cate/3'}
                onClick={() => setSelectedCategory('組裝教學')}
              >
                組裝教學
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  selectedCategory === '活動'
                    ? 'bg-primary text-white'
                    : art_list_style['side_category']
                } dropdown-item`}
                href={'/article/cate/4'}
                onClick={() => setSelectedCategory('活動')}
              >
                活動
              </Link>
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
                    value={searchCard}
                    onChange={handleSearch}
                  />
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </nav>
            {/* 分類表 */}

            {/* <Link href="#" className="text-decoration-none">
              <div className={`bg-primary position-relative p-2`}>
                <h5 className="text-white fw-bolder m-0">所有文章</h5>
                <div className="position-absolute end-0 top-50 translate-middle me-4">
                  <i className="text-white fa-solid fa-circle-chevron-right fa-lg "></i>
                </div>
              </div>
            </Link> */}
            <Link
              href={'/article/cate/0'}
              onClick={() => setSelectedCategory(null)}
            >
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
            <Link
              href={'/article/cate/1'}
              onClick={() => setSelectedCategory('公告')}
            >
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
            <Link
              href={'/article/cate/2'}
              onClick={() => setSelectedCategory('開箱文')}
            >
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
            <Link
              href={'/article/cate/3'}
              onClick={() => setSelectedCategory('組裝教學')}
            >
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
            <Link
              href={'/article/cate/4'}
              onClick={() => setSelectedCategory('活動')}
            >
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
          </div>
          {/* 右側 */}
          <div className="col row row-cols-sm-3 row-cols-2 pe-0">
            {/* map用法類似foreach，將上面陣列中的每個物件(item)列出來 */}
            {data
              .filter(
                (item) =>
                  (selectedCategory === null ||
                    item.cate === selectedCategory) &&
                  (searchCard === '' || item.title.includes(searchCard))
              )
              .slice(startIndex, endIndex)

              .map((item, index) => {
                return (
                  <div className="col mb-4" key={item.id}>
                    <div className={`${art_list_style['list_card']} card`}>
                      {/* 路由名稱 */}
                      <Link href={`/article/${item.id}`}>
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt="..."
                        />
                      </Link>

                      <div className="card-body">
                        <h4 className="card-title mb-3">
                          {item.title.length > 14
                            ? `${item.title.slice(0, 14)}...`
                            : item.title}
                          {/* {item.title + item.id} */}
                        </h4>
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
            <div className="pb-3" style={{ width: '100%' }}>
              <PaginationComponent
                totalItems={totalPageCount}
                pageSize={PageSize}
                //   currentPage={displayedData}
                onPageChange={handlePageChange}
              ></PaginationComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
