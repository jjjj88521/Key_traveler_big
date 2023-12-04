import { React, useState, useEffect } from 'react'
import style from '@/styles/order.module.scss'
import PaginationComponent from '@/components/common/PaginationComponent'
import Link from 'next/link'
import axios from 'axios'
import UserLayout from '@/components/layout/user-layout'
import { Radio } from 'antd'
import { useSelector } from 'react-redux'

export default function OrderList() {
  const auth = useSelector((state) => state.auth)

  const id = auth.user.id
  // console.log(id)

  const [orderData, setOrderData] = useState([])
  const [groupOrderData, setGroupOrderData] = useState([])
  const [rentOrderData, setRentOrderData] = useState([])

  const getOrderList = async () => {
    // 設置API的URL
    const apiUrl =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/order/user_order' // 將API的URL替換為實際的URL
    const userId = { userId: id }
    // console.log(userId)
    // 發出POST請求
    await axios
      .post(apiUrl, userId)
      .then((res) => {
        // console.log('成功獲取數據：', res.data)
        // console.log(res)
        setOrderData(res.data.data)
        // 在這裡處理從API返回的數據
        // console.log(res.data)
        // console.log(res.data.data)
      })
      .catch((error) => {
        console.error('獲取數據時出錯：', error)
        // 在這裡處理錯誤
      })
  }
  const getGroupOrderList = async () => {
    // 设置API的URL
    const apiUrl =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/order/group_order' // 将API的URL替换为实际的URL
    const userId = { userId: id }
    // console.log(userId)
    // 发出POST请求
    await axios
      .post(apiUrl, userId)
      .then((res) => {
        // console.log('成功获取数据：', res.data)
        // console.log(res)
        setGroupOrderData(res.data.data)
        // 在这里处理从API返回的数据
        // console.log(res.data)
        // console.log(res.data.data)
      })
      .catch((error) => {
        console.error('獲取數據時出錯：', error)
        // 在这里处理错误
      })
  }
  const getRentOrderList = async () => {
    // 設置API的URL
    const apiUrl =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/order/rent_order' // 将API的URL替换为实际的URL
    const userId = { userId: id }
    // console.log(userId)
    // 發出POST請求
    await axios
      .post(apiUrl, userId)
      .then((res) => {
        // console.log('成功獲取數據：', res.data)
        // console.log(res)
        setRentOrderData(res.data.data)
        // 在這裡處理從API返回的數據
        // console.log(res.data)
        // console.log(res.data.data)
      })
      .catch((error) => {
        console.error('獲取數據時出錯：', error)
        // 在這裡處理錯誤
      })
  }
  useEffect(() => {
    getOrderList()
    getGroupOrderList()
    getRentOrderList()
  }, [auth])

  // 將三個數據合併到一個數組中，並添加一個"type"字段來區分它們
  const allOrders = [
    ...orderData.map((order) => ({ ...order, type: 'user_order' })),
    ...groupOrderData.map((order) => ({ ...order, type: 'group_order' })),
    ...rentOrderData.map((order) => ({ ...order, type: 'rent_order' })),
  ]
  // console.log(allOrders)
  // 根據order_date字段降序排序
  // allOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date))

  const [selectedRadio, setSelectedRadio] = useState('1')

  const radioOnChange = (e) => {
    // console.log('radio key:' + key)
    setSelectedRadio(e.target.value)
  }
  if (selectedRadio === '1') {
    allOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
  } else if (selectedRadio === '2') {
    allOrders.sort((a, b) => new Date(a.order_date) - new Date(b.order_date))
  }

  // [
  //   {
  //     id: 'G023',
  //     user_id: 1,
  //     order_date: '2023-06-25 11:54:03',
  //     status: '已送達'
  //   }
  // ]
  // const orders = [
  //   {
  //     id: 'P001',
  //     user_id: 1,
  //     order_date: '2023-08-15',
  //     status: '已送達',
  //   },
  //   {
  //     id: 'G002',
  //     user_id: 2,
  //     order_date: '2023-08-16',
  //     status: '已取貨',
  //   },
  //   {
  //     id: 'R003',
  //     user_id: 3,
  //     order_date: '2023-08-17',
  //     status: '配送中',
  //   },
  // ]

  const [selectedFilter, setSelectedFilter] = useState('全部')

  const filteredOrders = allOrders.filter((v) => {
    if (selectedFilter === '全部') {
      // 顯示所有訂單
      return true
    } else {
      const filterKey =
        selectedFilter === '一般' ? 'P' : selectedFilter === '團購' ? 'G' : 'R'
      return v.id.startsWith(filterKey)
    }
  })
  const handleFilterChange = (value) => {
    setSelectedFilter(value)
    setCurrentPage(1)
  }

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 5

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
  // const calculateOrderNumber = () => {
  //   let count = 0
  //   return () => {
  //     count++
  //     return count
  //   }
  // }
  // const getOrderNumber = calculateOrderNumber()
  return (
    <>
      <UserLayout title={'歷史訂單'}>
        <div className="container" style={{ height: '950px' }}>
          {/* <div className="row my-sm-4 my-2 ">
          <h2 className="fw-bolder text-start col-sm-3 col-12 mt-3 mb-0">
            歷史訂單
          </h2>
        </div> */}
          <div className="row">
            <div className="col-sm-12 col-12">
              <div className="d-flex justify-content-between mb-2">
                <Radio.Group
                  onChange={radioOnChange}
                  value={selectedRadio}
                  style={
                    {
                      // marginBottom: 8,
                    }
                  }
                >
                  <Radio.Button value="1">最新</Radio.Button>
                  <Radio.Button value="2">最舊</Radio.Button>
                </Radio.Group>
                <div className={` ${style['sortBtn']} py-1 px-2`}>
                  {/* <div className="me-2">篩選</div> */}
                  <div className="dropdown">
                    <button
                      className="btn  btn-light dropdown-toggle text-dark px-2 py-1 border border-primary"
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
                    {/* <th className="bg-primary"></th> */}
                    <th className="bg-primary text-white ps-5">訂單編號</th>
                    <th className="bg-primary text-white ps-5">訂單日期</th>
                    <th className="bg-primary text-white ps-5">訂單狀態</th>
                    <th className="bg-primary text-white"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((v, i) => (
                    <tr className="" key={i}>
                      {/* <td className="text-center">{i + 1}</td> */}
                      <td className="ps-5">{v.id}</td>
                      <td className="ps-5">{v.order_date}</td>
                      <td className="ps-5">{v.status}</td>
                      <td className="ps-5">
                        <Link
                          href={`/user/order/${v.id}`}
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
                  key={i}
                >
                  <tbody>
                    {/* <tr>
                    <th className="ps-3">{i + 1}</th>
                    <td></td>
                  </tr> */}
                    <tr>
                      <th>訂單編號</th>
                      <td>{v.id}</td>
                    </tr>
                    <tr>
                      <th>訂單日期</th>
                      <td>{v.order_date}</td>
                    </tr>
                    <tr>
                      <th>訂單狀態</th>
                      <td>{v.status}</td>
                    </tr>
                    <tr>
                      <td className="text-center" colSpan={2}>
                        <Link
                          className="btn btn-primary text-light"
                          href={`/user/order/${v.id}`}
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
      </UserLayout>
    </>
  )
}
