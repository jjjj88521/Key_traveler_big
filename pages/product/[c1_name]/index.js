import React, { useState, useEffect } from 'react'
import { Drawer, Button, Spin, Switch } from 'antd'
import styles from '@/pages/product/product.module.css'
import Accordion from '@/components/product/accordion'
import AsideFilter from '@/components/product/AsideFilter'
import PaginationComponent from '@/components/common/PaginationComponent'
import Card from '@/components/product/Card'
import axios from 'axios'
import { useRouter } from 'next/router'
import useLoading from '@/hooks/useLoading'
import Head from 'next/head'
import Banner from '@/components/product/banner'

export default function ProductCate1() {
  // 路由相關
  const router = useRouter()
  const { c1_name } = router.query

  // dropdown選單
  const [selectedOption, setSelectedOption] = useState('預設')

  // 篩選用state
  const [priceRange, setPriceRange] = useState({ min: 10, max: 30000 }) //數字物件
  const range = `price_range=${priceRange.min},${priceRange.max}`

  // 抓取DB相關
  const [cateProducts, setCateProducts] = useState([])
  const [cateName, setcateName] = useState([])

  useEffect(() => {
    if (router.isReady) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}`
        )
        .then((res) => {
          setCateProducts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })

      // 抓此類別的名稱，以顯示在banner的文字
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/category/${c1_name}`
        )
        .then((res) => {
          setcateName(res.data.name)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [router.isReady, c1_name])
  //   console.log(cateProducts)
  //   console.log(cateProducts.data)
  //   console.log(cateName)
  //   console.log(c1_name)

  // 抓取路由改變banner圖片
  const bannerImages = {
    1: 'banner1.jpg',
    2: 'banner2.jpg',
    3: 'banner3.jpg',
  }

  const defaultBanner = 'testBanner.png'
  const bannerImage = bannerImages[c1_name] || defaultBanner

  // 篩選價錢範圍
  const filterRange = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}&${range}`
      )
      .then((res) => {
        setCateProducts(res.data)
        // 儲存篩選條件，給分頁功能用
        setFilterRangeValue(range)
        // 回歸第一頁
        setPage(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 排序功能
  const orderProduct = (orderby) => {
    // 建構 Axios 請求，包含分頁頁碼以及篩選條件
    let requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}&orderby=${orderby}`

    // 如果有做過"篩選"或"排序"，就要將其包含在請求中
    if (filterRangeValue) {
      requestUrl += `&${filterRangeValue}`
    }
    axios
      .get(requestUrl)
      .then((res) => {
        setCateProducts(res.data)
        // 儲存篩選條件，給分頁功能用
        setOrderbyValue(orderby)
        // 回歸第一頁
        setPage(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 存是否正在載入
  const [isLoading, setIsLoading] = useLoading(
    Object.keys(cateProducts).length > 0
  )

  // 分頁相關
  const PageSize = 12
  const totalPageCount = cateProducts.total
  const [page, setPage] = useState(1)
  // 用以偵測有沒有"篩選價錢"或"排序"的條件存在
  const [filterRangeValue, setFilterRangeValue] = useState(null)
  const [orderbyValue, setOrderbyValue] = useState(null)
  const handlePageChange = (newPage) => {
    setPage(newPage)

    // 建構 Axios 請求，包含分頁頁碼以及篩選條件
    let requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}&page=${newPage}`

    // 如果有做過"篩選"或"排序"，就要將其包含在請求中
    if (filterRangeValue) {
      requestUrl += `&${filterRangeValue}`
    }
    if (orderbyValue) {
      requestUrl += `&orderby=${orderbyValue}`
    }
    if (showZeroStock === 1) {
      requestUrl += `&stock=1`
    }

    // 創建新的 Axios 請求，包含分頁頁碼
    axios
      .get(requestUrl)
      .then((res) => {
        setCateProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 僅顯示有貨
  const [showZeroStock, setShowZeroStock] = useState(0)
  const checkStock = (checked) => {
    if (checked) {
      setShowZeroStock(1)
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}&stock=1`
        )
        .then((res) => {
          setCateProducts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setShowZeroStock(0)
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products/qs?cate_1=${c1_name}`
        )
        .then((res) => {
          setCateProducts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // Drawer相關
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Head>
        <title>{cateName}</title>
      </Head>
      <Banner title={cateName} image={`/images/${bannerImage}`} />
      <div className="container pt-md-5 ps-4 pe-4 p-sm-0">
        <div className="row">
          <div className="d-none d-sm-block col-12 col-sm-3 pe-md-5 pe-1">
            <Accordion />
            {/* AsideFilter，篩選，不使用component切開 */}
            <div className="mt-4 p-4 border border-primary border-1">
              <div className="mb-2 fs-5">
                <i className="fa-solid fa-filter"></i> 條件篩選
              </div>
              <div className="py-2 d-flex justify-content-between">
                <h5 className="d-inline ms-2">只保留有貨 </h5>
                <Switch onChange={checkStock} />
              </div>
              <div className="d-flex flex-column gap-1">
                <hr className="opacity-75"></hr>
                <div className="mb-2 fs-5">
                  <i className="fa-solid fa-dollar-sign"></i> 價錢範圍
                </div>
                <div className="mb-3 d-flex justify-content-center align-items-center">
                  <input
                    type="number"
                    className="col-5"
                    min="0"
                    value={priceRange.min}
                    onChange={(e) => {
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }}
                  ></input>
                  <div className="col-2 fs-4 d-flex justify-content-center">
                    ~
                  </div>
                  <input
                    type="number"
                    className="col-5"
                    min="0"
                    value={priceRange.max}
                    onChange={(e) => {
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }}
                  ></input>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '60%', margin: 'auto' }}
                  onClick={() => {
                    filterRange()
                  }}
                >
                  套用
                </button>
              </div>
            </div>
          </div>

          {/* sort btn & card group */}
          <div className="col-12 col-sm-9">
            {/* 手機版篩選、排序結合 */}
            <div
              className="d-block d-sm-none bg-primary-subtle mb-3 text-end"
              style={{ fontSize: '16px', padding: '5px 20px' }}
            >
              <Button
                type="primary"
                onClick={showDrawer}
                className="bg-transparent text-black p-0"
                style={{ fontSize: '16px' }}
              >
                <i
                  className="fa-solid fa-sliders"
                  style={{ marginRight: '10px' }}
                ></i>{' '}
                篩選
              </Button>
            </div>
            {/* sort btn */}
            <div className="d-flex justify-content-end align-items-center mb-3">
              <div className={`bg-primary-subtle ${styles['sortBtn']}`}>
                <p className="fs-6">排序</p>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedOption}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          orderProduct('stock,desc')
                          setSelectedOption('有貨優先')
                        }}
                      >
                        有貨優先
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          orderProduct('price,asc')
                          setSelectedOption('價錢：由低到高')
                        }}
                      >
                        價錢：由低到高
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          orderProduct('price,desc')
                          setSelectedOption('價錢：由高到低')
                        }}
                      >
                        價錢：由高到低
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          orderProduct('created_time,desc')
                          setSelectedOption('上架日期：由新到舊')
                        }}
                      >
                        上架日期：由新到舊
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          orderProduct('created_time,asc')
                          setSelectedOption('上架日期：由舊到新')
                        }}
                      >
                        上架日期：由舊到新
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Drawer
              // title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
              width={'80%'}
            >
              <Accordion />
              <hr className="text-primary opacity-100"></hr>
              {/* <AsideFilter /> */}
              <div className="mt-4 p-4 border border-primary border-1">
                <div className="mb-2 fs-5">
                  <i className="fa-solid fa-filter"></i> 條件篩選
                </div>
                <div className="py-2 d-flex justify-content-between">
                  <h5 className="d-inline ms-2">只保留有貨 </h5>
                  <Switch onChange={checkStock} />
                </div>
                <div className="d-flex flex-column gap-1">
                  <hr className="opacity-75"></hr>
                  <div className="mb-2 fs-5">
                    <i className="fa-solid fa-dollar-sign"></i> 價錢範圍
                  </div>
                  <div className="mb-3 d-flex justify-content-center align-items-center">
                    <input
                      type="number"
                      className="col-5"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) => {
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }}
                    ></input>
                    <div className="col-2 fs-4 d-flex justify-content-center">
                      ~
                    </div>
                    <input
                      type="number"
                      className="col-5"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) => {
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }}
                    ></input>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '60%', margin: 'auto' }}
                    onClick={() => {
                      filterRange()
                    }}
                  >
                    套用
                  </button>
                </div>
              </div>
            </Drawer>

            {/* card group  */}
            <div className="d-flex row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
              {cateProducts.data &&
              cateProducts.data.length > 0 &&
              !isLoading ? (
                cateProducts.data.map((v, i) => (
                  <div className="col" key={i}>
                    <div className="col">
                      <Card
                        title={v.name}
                        brand={v.brand}
                        price={v.price}
                        image={
                          v.images
                            ? `/images/product/${JSON.parse(v.images)[0]}`
                            : null
                        }
                        stock={v.stock}
                        link={`/product/${v.category_1}/${v.category_2}/${v.id}`}
                        created_time={v.created_time}
                        id={v.id}
                        cate={'pd'}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="m-auto mt-5">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              )}
            </div>
            {/* 分頁頁碼 */}
            {!isLoading ? (
              <div className="m-5">
                {totalPageCount < PageSize ? (
                  ''
                ) : (
                  <PaginationComponent
                    currentPage={page}
                    totalItems={cateProducts.total}
                    pageSize={PageSize}
                    onPageChange={handlePageChange}
                  ></PaginationComponent>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
