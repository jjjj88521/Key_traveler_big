import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'
import Link from 'next/link'

export default function ArticleFilter() {
  // 設定路由
  const router = useRouter()
  const { isReady, query } = router
  const cat_id = query.cat_id

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (cat_id === '1') {
      return '公告'
    } else if (cat_id === '2') {
      return '開箱文'
    } else if (cat_id === '3') {
      return '組裝教學'
    } else if (cat_id === '4') {
      return '活動'
    } else {
      return null
    }
  })

  const [selectValue, setSelectValue] = useState(null)
  useEffect(() => {
    if (isReady) {
      setSelectValue(cat_id)
      switch (cat_id) {
        case '0':
          setSelectedCategory(null)
          break
        case '1':
          setSelectedCategory('公告')
          break
        case '2':
          setSelectedCategory('開箱文')
          break
        case '3':
          setSelectedCategory('組裝教學')
          break
        case '4':
          setSelectedCategory('活動')
          break
        default:
          break
      }
    }
  }, [isReady, cat_id])
  //   console.log(selectedCategory)

  const [searchCard, setSearchCard] = useState('')
  const handleSearch = (e) => {
    // console.log('搜尋關鍵字：', e.target.value)
    setSearchCard(e.target.value)
  }
  const data = [
    {
      id: '1',
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      id: '2',
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      id: '3',
      title: 'Card Post',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      id: '4',
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      id: '5',
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '公告',
      date: '2023-09-21',
    },
    {
      id: '6',
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      id: '7',
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      id: '8',
      title: 'Card Unboxing',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      id: '9',
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '開箱文',
      date: '2023-09-21',
    },
    {
      id: '10',
      title: 'Card Teach',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '組裝教學',
      date: '2023-09-21',
    },
    {
      id: '11',
      title: 'Card Act',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
    {
      id: '12',
      title: 'Card Title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      cate: '活動',
      date: '2023-09-21',
    },
  ]
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
        <div class="d-sm-none mb-4">
          <select
            className="form-select"
            aria-label="Select category"
            onChange={(e) => {
              //   const selectedValue = e.target.value
              //   setSelectedCategory(
              //     selectedValue === 'all' ? null : selectedValue
              //   )
              router.push(`/article/cate/${e.target.value}`)
            }}
            value={selectValue}
          >
            <option value="0">所有文章</option>
            <option value="1">公告</option>
            <option value="2">開箱文</option>
            <option value="3">組裝教學</option>
            <option value="4">活動</option>
          </select>
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
                        <h3 className="card-title mb-3">
                          {item.title + item.id}
                        </h3>

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
        </div>
      </div>
    </>
  )
}