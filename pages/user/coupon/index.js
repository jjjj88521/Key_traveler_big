import { React, useState } from 'react'
import UserLayout from '@/components/layout/user-layout'
import NewCoupon from '@/components/user/newCoupon'
import TabButtonForUser from '@/components/user/coupon-tabs'
import CouponAll from '@/components/user/coupon-all'
import CouponExpiring from '@/components/user/coupon-expiring'

// 簡單假資料
// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   key: i,
//   title: `周年慶會員禮${i + 1}`,
//   description: '周年慶會員禮-當月全館消費滿1500元享85折優惠(限1筆訂單)',
//   threshold: 150,
//   endTime: '2023-10-06',
//   createDate: '2023-08-28 16:06:44',
// }))

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

function filterExpiredData(data) {
  const currentDate = new Date() // 取得當前日期和時間
  return data.filter((item) => {
    const endTime = new Date(item.endTime) // 將endTime字串轉換為日期對象
    return endTime > currentDate // 只保留endTime大於目前日期和時間的資料對象
  })
}
function filterExpiringData(data) {
  const millisecondsInADay = 1000 * 60 * 60 * 24
  // 保留endTime與目前時間相差3天以內的元素
  const filteredData = data.filter((item) => {
    return (
      Math.floor((moment(item.endTime) - moment()) / millisecondsInADay) <= 2 &&
      Math.floor((moment(item.endTime) - moment()) / millisecondsInADay) >= 0
    ) // 返回相差2天以上的元素
  })
  return filteredData
}

export default function Coupon() {
  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // console.log('currentPage is:' + currentPage)
  }
  // 一個所有的優惠券=>
  const data = [
    {
      key: 0,
      title: '周年慶會員禮1',
      description: '周年慶會員禮1',
      threshold: '150',
      endTime: '2023-10-11 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 1,
      title: '周年慶會員禮2',
      description: '周年慶會員禮2',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 2,
      title: '周年慶會員禮3',
      description: '周年慶會員禮3',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 3,
      title: '周年慶會員禮4',
      description: '周年慶會員禮4',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 4,
      title: '周年慶會員禮5',
      description: '周年慶會員禮5',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 5,
      title: '周年慶會員禮6',
      description: '周年慶會員禮6',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 6,
      title: '周年慶會員禮7',
      description: '周年慶會員禮7',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 7,
      title: '周年慶會員禮8',
      description: '周年慶會員禮8',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 8,
      title: '周年慶會員禮9',
      description: '周年慶會員禮9',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 9,
      title: '周年慶會員禮10',
      description: '周年慶會員禮10',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 10,
      title: '周年慶會員禮11',
      description: '周年慶會員禮11',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 11,
      title: '周年慶會員禮12',
      description: '周年慶會員禮12',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 12,
      title: '周年慶會員禮13',
      description: '周年慶會員禮13',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 13,
      title: '周年慶會員禮14',
      description: '周年慶會員禮14',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 14,
      title: '周年慶會員禮15',
      description: '周年慶會員禮15',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 15,
      title: '周年慶會員禮16',
      description: '周年慶會員禮16',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 16,
      title: '周年慶會員禮17',
      description: '周年慶會員禮17',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 17,
      title: '周年慶會員禮18',
      description: '周年慶會員禮18',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 18,
      title: '周年慶會員禮19',
      description: '周年慶會員禮19',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 19,
      title: '周年慶會員禮20',
      description: '周年慶會員禮20',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
    {
      key: 20,
      title: '周年慶會員禮21',
      description: '周年慶會員禮21',
      threshold: '150',
      endTime: '2023-10-06 23:59:59',
      createDate: '2023-08-27 16:06:44',
    },
    {
      key: 21,
      title: '周年慶會員禮22',
      description: '周年慶會員禮22',
      threshold: '1500',
      endTime: '2023-10-20 23:59:59',
      createDate: '2023-08-27 16:06:45',
    },
  ]
  // 先過濾掉已過期的優惠券=>分成全部&即將到期
  const [couponAllData, setCouponAllData] = useState(data)
  // 即將到期
  const [couponExpiringData, setCouponExpiringData] = useState(couponAllData)

  const tabsItems = [
    {
      key: 'All',
      label: '全部',
      children: '',
    },
    {
      key: 'Expiring',
      label: '即將到期',
      children: '',
    },
  ]
  const [tabkey, setTabkey] = useState('All')

  const tabsOnChange = (key) => {
    // console.log('tab key:' + key)
    setTabkey(key)
    setCurrentPage(1)
  }

  return (
    <>
      <UserLayout title={'我的優惠券'}>
        <NewCoupon
          couponAllData={couponAllData}
          setCouponAllData={setCouponAllData}
          changePage={handlePageChange}
          filterExpiredData={filterExpiredData}
        />
        <div className="ms-4">
          <TabButtonForUser tabItems={tabsItems} tabsChange={tabsOnChange} />
        </div>
        <div className="ms-1" style={{ minHeight: '1000px' }}>
          {tabkey === 'All' && (
            <CouponAll
              couponAllData={couponAllData}
              setCouponAllData={setCouponAllData}
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              filterExpiredData={filterExpiredData}
            />
          )}
          {tabkey === 'Expiring' && (
            <CouponExpiring
              couponExpiringData={couponExpiringData}
              setCouponExpiringData={setCouponExpiringData}
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              filterExpiringData={filterExpiringData}
            />
          )}
        </div>
      </UserLayout>
    </>
  )
}
