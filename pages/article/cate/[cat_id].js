import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'
import Link from 'next/link'
import PaginationComponent from '@/components/common/PaginationComponent'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import axios from 'axios'
import { number } from 'prop-types'
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
      if (selectValue !== cat_id) {
        handlePageChange(1)
      }
    }
  }, [isReady, cat_id])
  // console.log(selectValue)
  //   console.log(selectedCategory)

  const [searchCard, setSearchCard] = useState('')
  const handleSearch = (e) => {
    // console.log('搜尋關鍵字：', e.target.value)
    // console.log(e)
    setSearchCard(e.target.value)
  }
  const [searchResult, setSearchResult] = useState('')
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3005/api/article/').then((response) => {
      // console.log('response.data.articles')
      // console.log(response.data.articles)
      setData(response.data.articles)
    })
  }, [])

  //   分頁設定
  // 根据屏幕宽度动态设置 PageSize
  const getPageSize = () => {
    if (window.innerWidth < 576) {
      return 8 // 手机或小屏幕
    } else {
      return 9 // 大屏幕
    }
  }

  // 在组件加载和窗口大小变化时更新 PageSize
  const [pageSize, setPageSize] = useState(getPageSize)

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // const PageSize = 9
  const totalItemsForCategory = data.filter(
    (item) => selectedCategory === null || item.cate === selectedCategory
  )
  const totalPageCount = totalItemsForCategory.length
  // console.log(totalPageCount)
  //   const totalPageCount = Math.ceil(totalItemsForCategory.length / PageSize)
  //   console.log(totalPageCount)
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log(page)
  }
  const startIndex = (currentPage - 1) * pageSize
  const endIndex =
    currentPage * pageSize < totalItemsForCategory.length
      ? currentPage * pageSize
      : totalItemsForCategory.length
  // console.log(startIndex)
  //   const displayedData = totalItemsForCategory.slice(startIndex, endIndex)
  //   console.log(displayedData)
  const [isLoading, setIsLoading] = useLoading(data)

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
                      onChange={(e) => {
                        // console.log('搜尋關鍵字：', e.target.value)
                        // console.log(e)
                        setSearchCard(e.target.value)
                      }}
                    />
                    <button
                      onClick={() => {
                        setSearchResult(searchCard)
                      }}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
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
                .slice(startIndex, endIndex)
                .map((item, index) => {
                  const parsedImg = JSON.parse(item.img)

                  {
                    /* console.log('item.img:', parsedImg) */
                  }
                  return (
                    <div className="col mb-4" key={item.id}>
                      <div className={`${art_list_style['list_card']} card`}>
                        {/* 路由名稱 */}
                        <Link href={`/article/${item.id}`}>
                          <img
                            src={`/images/article/${parsedImg[0]}`}
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

                          <Link href="">
                            <Tag
                              className="bg-primary text-white fw-bolder mb-3"
                              // 將連結無效
                              onClick={(e) => {
                                e.preventDefault()
                              }}
                            >
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
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                ></PaginationComponent>
              </div>
            </div>
          </div>
          {/* 圖片上傳格式 */}
          {/* <img src={`/images/article/1685846717544631361.jpg`}></img> */}
        </div>
      )}
    </>
  )
}
