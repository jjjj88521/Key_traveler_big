import { React, useState } from 'react'
import style from '@/styles/order.module.scss'
import UserDropdown from '@/components/user/user-dropdown'
import PaginationComponent from '@/components/common/PaginationComponent'
import Link from 'next/link'

export default function OrderList() {
  const orders = [
    {
      id: 1,
      orderId: 'P00001',
      date: '2023-08-15',
      totalPrice: 1800,
    },
    {
      id: 2,
      orderId: 'G00002',
      date: '2023-08-16',
      totalPrice: 800,
    },
    {
      id: 3,
      orderId: 'R00003',
      date: '2023-08-17',
      totalPrice: 1000,
    },
  ]
  const [selectedFilter, setSelectedFilter] = useState('全部')

  const filteredOrders = orders.filter((v) => {
    if (selectedFilter === '全部') {
      // 顯示所有訂單
      return true
    } else {
      const filterKey =
        selectedFilter === '一般' ? 'P' : selectedFilter === '團購' ? 'G' : 'R'
      return v.orderId.startsWith(filterKey)
    }
  })
  const handleFilterChange = (value) => {
    setSelectedFilter(value)
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 2

  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // console.log('currentPage is' + currentPage)
    // 在這裡可以處理分頁後的資料載入或其他操作
  }

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // 依篩選出的訂單數量標示序號
  const calculateOrderNumber = () => {
    let count = 0
    return () => {
      count++
      return count
    }
  }
  const getOrderNumber = calculateOrderNumber()
  return (
    <>
      <div className="container">
        <div className="row my-sm-4 my-2 ">
          <h2 className="fw-bolder text-start col-sm-3 col-12 mt-3 mb-0">
            歷史訂單
          </h2>
        </div>
        <div className="row">
          <UserDropdown />
          {/* <div className="col-sm-3 col-12 px-0 mx-0">         
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block col-12 mb-4">
              <UserSideBarMobile className="col-12 w-100" />
            </div>
          </div> */}
          <div className="col-sm-8 offset-sm-1 col-12">
            <div className="d-flex justify-content-end mb-2">
              <div
                className={`bg-primary-subtle ${style['sortBtn']} py-1 px-2`}
              >
                <div className="me-2">篩選</div>
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-light dropdown-toggle text-dark px-1 py-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedFilter}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link
                        className="dropdown-item"
                        href=""
                        onClick={() => {
                          handleFilterChange('全部')
                        }}
                      >
                        全部
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href=""
                        onClick={() => {
                          handleFilterChange('一般')
                        }}
                      >
                        一般
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href=""
                        onClick={() => {
                          handleFilterChange('團購')
                        }}
                      >
                        團購
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href=""
                        onClick={() => {
                          handleFilterChange('租用')
                        }}
                      >
                        租用
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 歷史訂單列表頁 電腦版 */}
            {/* {`table d-none d-sm-table`} */}
            {/* {`${style['table-desktop']} table`} */}
            <table className={`table d-none d-sm-table`}>
              <thead className="">
                <tr className="">
                  <th className="bg-primary"></th>
                  <th className="bg-primary text-white ps-5">訂單編號</th>
                  <th className="bg-primary text-white ps-5">訂單日期</th>
                  <th className="bg-primary text-white ps-5">訂單金額</th>
                  <th className="bg-primary text-white"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((v, i) => (
                  <tr className="" key={v.id}>
                    <td className="text-center">{i + 1}</td>
                    <td className="ps-5">{v.orderId}</td>
                    <td className="ps-5">{v.date}</td>
                    <td className="ps-5">{v.totalPrice}</td>
                    <td className="ps-5">
                      <Link
                        href={`http://localhost:3000/user/order/${v.orderId}`}
                        className="btn btn-primary text-light"
                      >
                        查看
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* 歷史訂單列表頁 手機版 */}
            {/* {`table table-bordered d-table d-sm-none`} */}
            {/* {`${style['table-mobile']} table table-bordered`} */}
            {currentOrders.map((v, i) => (
              <table
                className={`table table-bordered d-table d-sm-none`}
                key={v.id}
              >
                <tbody>
                  <tr>
                    <th className="ps-3">{i + 1}</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>訂單編號</th>
                    <td>{v.orderId}</td>
                  </tr>
                  <tr>
                    <th>訂單日期</th>
                    <td>{v.date}</td>
                  </tr>
                  <tr>
                    <th>訂單金額</th>
                    <td>{v.totalPrice}</td>
                  </tr>
                  <tr>
                    <td className="text-center" colSpan={2}>
                      <Link
                        className="btn btn-primary text-light"
                        href={`http://localhost:3000/user/order/${v.orderId}`}
                      >
                        查看
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            <div className="my-4">
              <PaginationComponent
                totalItems={filteredOrders.length} // 總項目數量
                pageSize={pageSize} // 每頁顯示的項目數量
                currentPage={currentPage} // 目前頁碼
                onPageChange={handlePageChange} // 處理頁碼變化事件的callback function
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
