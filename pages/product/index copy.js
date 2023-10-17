import React, { useState, useEffect } from 'react'
import { Drawer, Button, Spin } from 'antd'
import styles from './product.module.css'
import Accordion from '@/components/product/accordion'
import AsideFilter from '@/components/product/AsideFilter'
import PaginationComponent from '@/components/common/PaginationComponent'
import Card from '@/components/product/Card'
import axios from 'axios'
import { useRouter } from 'next/router'
import useLoading from '@/hooks/useLoading'

// 將 title 傳給 app.js
export async function getStaticProps() {
  const pageTitle = '商品列表'
  return {
    props: { pageTitle },
  }
}

export default function ProductIndex() {
  // 各選項的state
  const [keyword, setKeyword] = useState('')
  const [cate_1, setCate_1] = useState([]) // 數字陣列
  const [cate_2, setCate_2] = useState([]) // 數字陣列
  const [priceRange, setPriceRange] = useState({ min: 10, max: 30000 }) //數字物件

  // 排序(前面為排序欄位，後面參數asc為從小到大，desc為從大到小排序)
  const [orderby, setOrderby] = useState('id,asc')

  // 分頁用
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(10)

  // 最後得到的項目
  const [itemTotal, setItemTotal] = useState(0)
  const [items, setItems] = useState([])

  // 儲存從篩選子元件AsideFilter(component)傳值過來
  //   const [filterProduct, setFilterProduct] = useState(0)

  // 路由相關
  const router = useRouter()

  const [cateProducts, setCateProducts] = useState([])
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`http://localhost:3005/api/products/qs`)
        .then((res) => {
          setCateProducts(res.data)
          //   setFilterProduct(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [router.isReady])
  //   console.log(cateProducts)
  //   console.log(cateProducts.data)

  //   useEffect(() => {
  //     setCateProducts(filterProduct)
  //   }, [filterProduct])
  // console.log(filterProduct)

  // 存是否正在載入
  const [isLoading, setIsLoading] = useLoading(
    Object.keys(cateProducts).length > 0
  )

  // 分頁相關
  const PageSize = 12
  const totalPageCount = cateProducts.total
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    // 創建新的 Axios 請求，包含分頁頁碼
    axios
      .get(`http://localhost:3005/api/products/qs?page=${newPage}`)
      .then((res) => {
        setCateProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getProductsQs = async (params, toFirstPage = false) => {
    // 跳至第一頁
    // 當重新過濾或重置選項，因重新載入資料需要跳至第一頁
    if (toFirstPage) {
      setPage(1)
    }

    // 用URLSearchParams產生查詢字串
    const searchParams = new URLSearchParams(params)
    const url = `http://localhost:3005/api/products/qs?${searchParams.toString()}`
    const res = await axios.get(url)

    // if (Array.isArray(res.data.data)) {
    //   // 設定獲取頁數總合
    //   setItemTotal(res.data.total)
    //   // 設定獲取項目
    //   setItems(res.data)
    //   //   console.log('res.data這是啥', res.data)
    //   setFilterProduct(items)
    // }
  }

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { page, keyword, cat_ids, orderby, perpage, price_range } =
        router.query

      //   console.log(router.query)

      // 設定回所有狀態(注意資料類型，所有從查詢字串來都是字串類型)
      //   setPage(Number(page) || 1)
      //   setKeyword(keyword || '')
      //   setCatIds(cat_ids ? cat_ids.split(',').map((v) => Number(v)) : [])
      //   setOrderby(orderby || 'id,asc')
      //   setPerpage(Number(perpage) || 10)
      setPriceRange(
        price_range
          ? {
              min: Number(price_range.split(',')[0]),
              max: Number(price_range.split(',')[1]),
            }
          : {
              min: 10,
              max: 30000,
            }
      )

      // 載入資料
      getProductsQs(router.query)
    }
  }, [router.query])

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
      <div className={styles.banner}>
        <div className="w-100 h-100 p-4 p-sm-0">
          <img
            className={`w-100 h-100 object-fit-cover ${styles.rounded}`}
            src="/images/testBanner.png"
            alt="banner"
          />
        </div>
        <h1 className={`text-primary ${styles['display1']}`}>全部商品</h1>
      </div>
      <div className="container pt-md-5 ps-4 pe-4 p-sm-0">
        <div className="row">
          <div className="d-none d-sm-block col-12 col-sm-3 pe-md-5 pe-1">
            <Accordion />
            <hr className="text-primary opacity-100"></hr>
            {/* <AsideFilter
              filterProduct={filterProduct}
              setFilterProduct={setFilterProduct}
            /> */}
            {/* AsideFilter，篩選 */}
            <div className="p-4 pt-0">
              <div className="mb-2 fs-5">
                <i className="fa-solid fa-filter"></i> 條件篩選
              </div>
              <div className="d-flex flex-column gap-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  有貨
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  品牌
                </div>
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
                    const params = {
                      page: 1, // 跳至第一頁
                      //   keyword,
                      //   cat_ids: catIds.join(','),
                      //   orderby,
                      //   perpage,
                      price_range: Object.values(priceRange).join(','),
                    }

                    router.push({
                      pathname: router.pathname,
                      query: params,
                    })
                    getProductsQs(params)
                    console.log(priceRange)
                  }}
                >
                  套用
                </button>
              </div>
            </div>
          </div>

          {/* 排序 & card group */}
          <div className="col-12 col-sm-9">
            {/* 排序dropdown */}
            <div className="d-sm-flex d-none justify-content-end align-items-center mb-3">
              <div className={`bg-primary-subtle ${styles['sortBtn']}`}>
                <p className="fs-6">排序</p>
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    預設
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        有貨優先
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由低到高
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        價錢：由高到低
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由新到舊
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        上架日期：由舊到新
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
                  class="fa-solid fa-sliders"
                  style={{ marginRight: '10px' }}
                ></i>{' '}
                篩選
              </Button>
            </div>
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Accordion />
              <hr className="text-primary opacity-100"></hr>
              <AsideFilter />
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
                        image={v.images ? JSON.parse(v.images)[0] : null}
                        stock={v.stock}
                        link={`/product/${v.category_1}/${v.category_2}/${v.id}`}
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
          </div>
        </div>
      </div>

      {/* 分頁頁碼 */}
      <div className="m-5">
        <PaginationComponent
          currentPage={currentPage}
          totalItems={totalPageCount}
          pageSize={PageSize}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>
    </>
  )
}
