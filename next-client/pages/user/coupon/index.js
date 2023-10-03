import { React, useState, useEffect } from 'react'
import style from './coupon.module.scss'
import { Card, List } from 'antd'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import TabButton from '@/components/product/ProductTab/TabButton'
import UserSideBar from '../user-side-bar'
import UserSideBarMobile from '../user-side-bar-mobile'

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  key: i,
  title: `周年慶會員禮${i + 1}`,
  description: '周年慶會員禮-當月全館消費滿1500元享85折優惠(限1筆訂單)',
  threshold: 150,
  endTime: '2023-10-05',
  createDate: '2023-08-28 16:06:44',
}))
// 一開始先關聯user_coupon找出系統發放的優惠券
// const data = Array.from({
//   length: db會員優惠券數量(user_coupon.length),
// }).map((_, i) => ({
//   title:  db會員優惠券名稱(user_coupon-coupon_id=>coupon-[coupon_name | coupon_code]),
//   description:  db會員優惠券敘述(user_coupon-coupon_id=>coupon-description),
//   threshold:  db會員優惠券門檻
//   endTime: db會員優惠券有效日期
//   createDate: db會員優惠券使用者建立(優惠碼)或系統發放日期(優惠券),
// }))
const moment = require('moment')

export default function Coupon() {
  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件

  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log('currentPage is:' + currentPage)

    // 在這裡可以處理分頁後的資料載入或其他操作
  }

  // 新增優惠碼
  const [couponData, setCouponData] = useState(data)
  // useEffect(() => {
  //   // 當 data 變化時觸發這裡的程式碼
  //   console.log('Data has changed:', couponData)
  // }, [couponData]) // 透過指定依賴項 data 來監聽資料變化

  const handleAddCoupon = (e) => {
    console.log(e.target.className.includes('coupon_newCouponBtnMobile'))
    const inputValue = e.target.className.includes('coupon_newCouponBtnMobile')
      ? document.querySelector('#newCouponMobile').value
      : document.querySelector('#newCoupon').value
    console.log('new code:' + inputValue)

    // 撈database(coupon->coupon_code)跟輸入的內容作比較
    if (inputValue !== 'L9O1I4U8Y2') {
      alert('新增優惠碼失敗')
      return false
    }
    // 撈database(coupon)作為新增的優惠碼
    const newCoupon = {
      key: couponData.length, // 為新項分配一個唯一的鍵
      title: '新的优惠券', // 新項的標題
      description:
        '新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述', // 新項的描述
      threshold: '1000', // 新項的門檻
      endTime: '2023-10-05', // 新項的有效日期
      createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    // const newCoupon = {
    //   key: couponData.length, // 為新項分配一個唯一的鍵
    //   title:  db會員優惠券名稱(user_coupon-coupon_id=>coupon-[coupon_code]), // 新項的標題
    //   description: db會員優惠券敘述(user_coupon-coupon_id=>coupon-description), // 新項的描述
    //   threshold: db會員優惠券門檻, // 新項的門檻
    //   endTime: db會員優惠券有效日期, // 新項的有效日期
    // }

    setCouponData([newCoupon, ...couponData])

    handlePageChange(1)
  }
  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = couponData.slice(startIndex, endIndex)

  // 切換Tab(全部 & 即將到期)
  const [tab, setTab] = useState('All')

  // 檢查是否所有資料的剩餘日期都大於2天
  const allItemsAreNotExpired = couponData.every(
    (dataItem) =>
      moment(dataItem.endTime, 'YYYY-MM-DD').diff(moment(), 'days') > 2
  )

  return (
    <>
      <div className={`container`}>
        <h2 className="fw-bolder">我的優惠券</h2>
        <div className="row my-sm-5 my-3">
          {/* 下拉選單 */}
          <div className="col-sm-2 col-12 px- mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block mb-4">
              <UserSideBarMobile className="col-10 w-100" />
            </div>
          </div>
          <div className="col-10 offset-1 col-sm-9 bg-secondary-subtle pb-3">
            <div
              className={`d-flex align-items-center justify-content-between mt-5 `}
            >
              <div className={`m-0 ${style['pageTitle']}`}>
                <span>我的優惠券</span>
              </div>
              <a
                href="./coupon/history"
                className={`${style['linkToHistory']}`}
              >
                <p className="m-0 text-primary">歷史紀錄</p>
              </a>
            </div>
            <div className={`${style['newCoupon']} mt-4 mb-5`}>
              <div className={`row  align-items-center`}>
                <div className="col-3 col-lg-3 text-end">
                  <p className={`m-0`}>新增優惠券</p>
                </div>
                <div className="col-6 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="newCoupon"
                    maxLength={10}
                  ></input>
                </div>
                <div className={`col-3 col-lg-3 `}>
                  <button
                    className={`btn btn-primary text-center text-light ${style['newCouponBtn']}`}
                    onClick={handleAddCoupon}
                  >
                    儲存
                  </button>
                </div>
              </div>
            </div>
            <div className={`${style['newCouponMobile']} mt-4 mb-4`}>
              <div className={`row row-cols-2 align-items-center`}>
                <div className="col-4 text-end p-0">
                  <p className={`m-0`}>新增優惠券</p>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    id="newCouponMobile"
                    maxLength={10}
                  ></input>
                </div>
                <div className={`col `}></div>

                <div className={`col text-end mt-2`}>
                  <button
                    className={`btn btn-primary text-center text-light ${style['newCouponBtnMobile']}`}
                    onClick={handleAddCoupon}
                    onChange={() => {
                      couponData.forEach((item) => {
                        console.log(
                          `data key: ${item.key}, createDate: ${item.createDate}`
                        )
                      })
                      console.log('=======================================end')
                    }}
                  >
                    儲存
                  </button>
                </div>
              </div>
            </div>
            <div className="ms-4">
              <TabButton isActive={tab === 'All'} onClick={() => setTab('All')}>
                全部
              </TabButton>
              <TabButton
                isActive={tab === 'Expiring'}
                onClick={() => setTab('Expiring')}
              >
                即將到期
              </TabButton>
            </div>
            <div className="ms-1">
              {tab === 'All' && (
                <div className={`mt-1`}>
                  <List
                    grid={{
                      gutter: 0,
                      xs: 1,
                      sm: 1,
                      md: 2,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    size="large"
                    dataSource={displayedData}
                    renderItem={(item) => (
                      <List.Item key={item.key}>
                        <Card className={`${style['cardStyle']}`}>
                          <div className="d-flex align-items-center">
                            <div>
                              <img
                                width={100}
                                alt="logo"
                                // src="https://media.istockphoto.com/id/1261324062/zh/%E5%90%91%E9%87%8F/%E7%A5%A8.jpg?s=612x612&w=0&k=20&c=9JJQjtGTZZ2pSOhD0Hu6CM0tBQNEGdZ6TEbX1hfMHPU="
                                src="/images/coupon_pic.jpg"
                              />
                            </div>
                            <div className="ms-2">
                              <h5 className="text-primary">{item.title}</h5>
                              <h6 className={`${style['couponDesription']}`}>
                                <div>{item.description}</div>
                              </h6>
                              <p
                                className={`m-0 ${
                                  item.threshold === 0 ? 'text-danger' : ''
                                }`}
                              >
                                {item.threshold === 0
                                  ? '無消費門檻'
                                  : `低消 $${item.threshold} 起`}
                              </p>
                              <p className="m-0">有效日期：{item.endTime}</p>
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                  <NewCouponPage
                    totalItems={couponData.length} // 總項目數量
                    pageSize={pageSize} // 每頁顯示的項目數量
                    currentPage={currentPage} // 目前頁碼
                    onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
                  />
                </div>
              )}
              {tab === 'Expiring' && (
                <div className={`mt-1`}>
                  {allItemsAreNotExpired ? (
                    <div className="text-danger h4 ms-4">
                      尚無即將到期之優惠券
                    </div>
                  ) : (
                    <div>
                      <List
                        grid={{
                          gutter: 0,
                          xs: 1,
                          sm: 1,
                          md: 2,
                          lg: 2,
                          xl: 2,
                          xxl: 2,
                        }}
                        size="large"
                        dataSource={displayedData}
                        renderItem={(item) => {
                          // 计算item.endTime与当前日期的差异
                          const now = moment() // 获取当前日期和时间
                          const endDate = moment(item.endTime, 'YYYY-MM-DD') // 解析item.endTime日期字符串
                          const daysDifference = endDate.diff(now, 'days')
                          if (daysDifference <= 2) {
                            return (
                              <List.Item key={item.key}>
                                <Card className={`${style['cardStyle']}`}>
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <img
                                        width={100}
                                        alt="logo"
                                        // src="https://media.istockphoto.com/id/1261324062/zh/%E5%90%91%E9%87%8F/%E7%A5%A8.jpg?s=612x612&w=0&k=20&c=9JJQjtGTZZ2pSOhD0Hu6CM0tBQNEGdZ6TEbX1hfMHPU="
                                        src="/images/coupon_pic.jpg"
                                      />
                                    </div>
                                    <div className="ms-2">
                                      <h5 className="text-primary">
                                        {item.title}
                                      </h5>
                                      <h6
                                        className={`${style['couponDesription']}`}
                                      >
                                        <div>{item.description}</div>
                                      </h6>
                                      <p
                                        className={`m-0 ${
                                          item.threshold === 0
                                            ? 'text-danger'
                                            : ''
                                        }`}
                                      >
                                        {item.threshold === 0
                                          ? '無消費門檻'
                                          : `低消 $${item.threshold} 起`}
                                      </p>

                                      <p className="m-0 text-danger">
                                        有效日期：
                                        <br></br>
                                        <i class="fa-solid fa-clock me-1"></i>
                                        {item.endTime}(剩餘 {daysDifference}
                                        天)
                                      </p>
                                    </div>
                                  </div>
                                </Card>
                              </List.Item>
                            )
                          }
                        }}
                      />
                      <NewCouponPage
                        totalItems={couponData.length} // 總項目數量
                        pageSize={pageSize} // 每頁顯示的項目數量
                        currentPage={currentPage} // 目前頁碼
                        onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
