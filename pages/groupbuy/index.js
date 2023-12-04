import React, { useEffect, useState } from 'react'
import { Drawer, Button, Select, Empty } from 'antd'
import styles from './product.module.css'
import AsideFilter from '@/components/product/AsideFilter'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import Card from '@/components/product/Card'
import PaginationComponent from '@/components/common/PaginationComponent'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import Link from 'next/link'
import { useAllPdLike } from '@/context/useAllPdLike'
import Banner from '@/components/product/banner'

// <div className="container">
// <div className={styles['banner']}>
// <h1 className={`text-primary ${styles['display1']}`}>鍵盤套件</h1>

// 將 title 傳給 app.js
// export async function getStaticProps() {
//   const pageTitle = '商品列表'
//   return {
//     props: { pageTitle },
//   }
// }

const sortOptions = [
  {
    value: '',
    label: '預設',
  },
  {
    value: 'price,desc',
    label: '價格高到低',
  },
  {
    value: 'price,asc',
    label: '價格低到高',
  },
  {
    value: 'name,desc',
    label: '名稱降序',
  },
  {
    value: 'name,asc',
    label: '名稱升序',
  },
  {
    value: 'created_time,desc',
    label: '上架時間由新到舊',
  },
  {
    value: 'created_time,asc',
    label: '上架時間由舊到新',
  },
]

export default function ProductIndex() {
  const router = useRouter()
  const { status, page, orderby, price_range } = router.query
  // console.log(typeof status)
  // 開關 Drawer
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  // 篩選條件
  const [filterParams, setFilterParams] = useState({
    status,
    page,
    orderby,
    price_range,
  })
  const [selectedStatus, setSelectedStatus] = useState([])

  const [priceRange, setPriceRange] = useState([0, 99999])
  // const [orderby, setOrderby] = useState('')

  // 取得資料
  const [cateProducts, setCateProducts] = useState(null)

  const [isLoading, setIsLoading] = useLoading(cateProducts)

  useEffect(() => {
    if (status) {
      setSelectedStatus(status.split(','))
    }
    if (price_range) {
      setPriceRange(price_range.split(','))
    }
    const params = {
      ...router.query,
    }
    const fetchGroupbuyList = async () => {
      setIsLoading(true)
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/groupbuy/qs`, {
          params,
        })
        .then((res) => {
          setCateProducts(res.data)
          setFilterParams({ ...params })
        })
    }
    fetchGroupbuyList()
  }, [router.query])
  // console.log(cateProducts)

  // 切分頁
  const handlePageChange = (page) => {
    setFilterParams({ ...filterParams, page: page })
    router.push({
      pathname: '/groupbuy',
      query: {
        ...filterParams,
        page: page,
      },
    })
  }

  // 篩選條件
  const handleStatusChange = (e) => {
    const isChecked = e.target.checked
    const statusValue = e.target.value
    if (isChecked) {
      setSelectedStatus([...selectedStatus, statusValue])
    } else {
      setSelectedStatus(selectedStatus.filter((value) => value !== statusValue))
    }
  }
  // console.log(selectedStatus)
  const submitFilter = (e) => {
    e.preventDefault()

    // 取得篩選條件
    const queryParams = {
      status: selectedStatus.join(','),
      price_range: priceRange.join(','),
    }

    setFilterParams(queryParams)

    // 使用 router.push 更新 URL
    router.push({
      pathname: '/groupbuy',
      query: queryParams,
    })
  }

  // 排序
  const handleOrderbyChange = (value) => {
    // setOrderby(value)
    setFilterParams({ ...filterParams, orderby: value, page: 1 })
    router.push({
      pathname: '/groupbuy',
      query: {
        ...filterParams,
        orderby: value,
        page: 1,
      },
    })
  }

  // 清空篩選條件
  const clearFilter = () => {
    setFilterParams({})
    setSelectedStatus([])
    setPriceRange([0, 99999])
  }

  return (
    <>
      <Head>
        <title>團購專區</title>
      </Head>
      <Banner title="團購專區" image="/images/testbanner.png" />
      <div className="container pt-md-5 ps-4 pe-4 p-sm-0">
        <div className="row">
          {/* 條件篩選 */}
          <form
            className="d-none d-sm-block col-12 col-sm-3 pe-md-5 pe-1"
            onSubmit={submitFilter}
          >
            <div className="border border-1 border-primary pt-4">
              <div className="p-4 pt-0">
                <div className="mb-2 fs-5">
                  <i className="fa-solid fa-filter"></i> 條件篩選
                </div>
                <div className="d-flex flex-column gap-1">
                  <h6 className="border-bottom py-2">團購狀態</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="status"
                      value="wait"
                      id="flexCheckDefault"
                      onChange={(e) => {
                        handleStatusChange(e)
                      }}
                      checked={selectedStatus.includes('wait')}
                    />
                    即將開團
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="status"
                      value="run"
                      id="flexCheckDefault"
                      onChange={(e) => {
                        handleStatusChange(e)
                      }}
                      checked={selectedStatus.includes('run')}
                    />
                    團購中
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="status"
                      value="end"
                      id="flexCheckDefault"
                      onChange={(e) => {
                        handleStatusChange(e)
                      }}
                      checked={selectedStatus.includes('end')}
                    />
                    團購結束
                  </div>
                  <hr className="opacity-75"></hr>
                  <div className="mb-2 fs-5">
                    <i className="fa-solid fa-dollar-sign"></i> 價錢篩選
                  </div>
                  <div className="mb-3 d-flex justify-content-center align-items-center">
                    <input
                      type="number"
                      className="col-5"
                      min="0"
                      max="99999"
                      placeholder="0"
                      value={priceRange[0]}
                      onClick={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        if (e.target.value) {
                          setPriceRange([e.target.value, priceRange[1]])
                        }
                      }}
                    ></input>
                    <div className="col-2 fs-4 d-flex justify-content-center">
                      ~
                    </div>
                    <input
                      type="number"
                      className="col-5"
                      min="0"
                      max="99999"
                      placeholder="99999"
                      value={priceRange[1]}
                      onClick={(e) => {
                        e.target.select()
                      }}
                      onChange={(e) => {
                        if (e.target.value) {
                          setPriceRange([priceRange[0], e.target.value])
                        }
                      }}
                    ></input>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    套用
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={clearFilter}
                  >
                    清除
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* 手機版篩選、排序結合 */}
          <div
            className="d-block d-sm-none bg-primary-subtle mb-3"
            style={{ fontSize: '16px', padding: '5px 20px' }}
          >
            <Button
              type="primary"
              className="bg-transparent text-black p-0 text-end w-100"
              style={{ fontSize: '16px' }}
              onClick={showDrawer}
            >
              <i
                className="fa-solid fa-sliders"
                style={{ marginRight: '10px' }}
              ></i>
              篩選
            </Button>
          </div>
          <div className="col-12 col-sm-9">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <div className={`bg-primary-subtle ${styles['sortBtn']}`}>
                <p className="fs-6">排序</p>
                <div className="dropdown">
                  <Select
                    options={sortOptions.map((item) => ({
                      value: item.value,
                      label: item.label,
                    }))}
                    value={filterParams.orderby || ''}
                    style={{ borderRadius: '0' }}
                    dropdownStyle={{ width: 'auto' }}
                    onSelect={(e) => {
                      handleOrderbyChange(e)
                    }}
                  />
                </div>
              </div>
            </div>

            <Drawer
              // title={
              //   <div className="fs-5">
              //     <i className="fa-solid fa-filter"></i> 條件篩選
              //   </div>
              // }
              placement="right"
              onClose={onClose}
              open={open}
              width="80%"
            >
              <form className="pe-md-5 pe-1" onSubmit={submitFilter}>
                <div className="border border-1 border-primary pt-4">
                  <div className="p-4 pt-0">
                    <div className="mb-2 fs-5">
                      <i className="fa-solid fa-filter"></i> 條件篩選
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <h6 className="border-bottom py-2">團購狀態</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="status"
                          value="wait"
                          id="flexCheckDefault"
                          onChange={(e) => {
                            handleStatusChange(e)
                          }}
                          checked={selectedStatus.includes('wait')}
                        />
                        即將開團
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="status"
                          value="run"
                          id="flexCheckDefault"
                          onChange={(e) => {
                            handleStatusChange(e)
                          }}
                          checked={selectedStatus.includes('run')}
                        />
                        團購中
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="status"
                          value="end"
                          id="flexCheckDefault"
                          onChange={(e) => {
                            handleStatusChange(e)
                          }}
                          checked={selectedStatus.includes('end')}
                        />
                        團購結束
                      </div>
                      <hr className="opacity-75"></hr>
                      <div className="mb-2 fs-5">
                        <i className="fa-solid fa-dollar-sign"></i> 價錢篩選
                      </div>
                      <div className="mb-3 d-flex justify-content-center align-items-center">
                        <input
                          type="number"
                          className="col-5"
                          min="0"
                          max="99999"
                          placeholder="0"
                          value={priceRange[0]}
                          onClick={(e) => {
                            e.target.select()
                          }}
                          onChange={(e) => {
                            if (e.target.value) {
                              setPriceRange([e.target.value, priceRange[1]])
                            }
                          }}
                        ></input>
                        <div className="col-2 fs-4 d-flex justify-content-center">
                          ~
                        </div>
                        <input
                          type="number"
                          className="col-5"
                          min="0"
                          max="99999"
                          placeholder="99999"
                          value={priceRange[1]}
                          onClick={(e) => {
                            e.target.select()
                          }}
                          onChange={(e) => {
                            if (e.target.value) {
                              setPriceRange([priceRange[0], e.target.value])
                            }
                          }}
                        ></input>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={onClose}
                      >
                        套用
                      </button>
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={clearFilter}
                      >
                        清除
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Drawer>

            {/* product list & card group  */}
            <div className="vstack gap-4 pb-3">
              {isLoading ? (
                <LoadingPage />
              ) : cateProducts.data.length === 0 ? (
                <Empty description="暫無商品" />
              ) : (
                <>
                  <div className="d-flex row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
                    {cateProducts.data.map((v, i) => (
                      <div className="col" key={i}>
                        <Card
                          id={v.id}
                          cate={'gb'}
                          title={v.name}
                          brand={v.brand}
                          price={v.price}
                          image={
                            v.images
                              ? `/images/product/${JSON.parse(v.images)[0]}`
                              : null
                          }
                          stock={v.stock}
                          link={`/groupbuy/${v.id}`}
                          current_people={v.current_people}
                          target_people={v.target_people}
                        />
                      </div>
                    ))}
                  </div>
                  <PaginationComponent
                    totalItems={cateProducts.total}
                    currentPage={Number(cateProducts.page)}
                    pageSize={12}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
