import { React, useState } from 'react'
import PaginationComponent from '@/components/common/PaginationComponent'
import UserLayout from '@/components/layout/user-layout'
import ListCardHistory from '@/components/user/List-Card/list-card-history'
import TabButtonForUser from '@/components/user/coupon-tabs'

const expiredData = Array.from({
  length: 3,
}).map((_, i) => ({
  key: i,
  title: `全站會員禮${i + 1}`,
  description: '全站會員禮(限1筆訂單)',
  threshold: '0',
  endTime: '2022-12-10',
}))

const usedData = Array.from({
  length: 150,
}).map((_, i) => ({
  key: i,
  title: `周年慶會員禮${i + 1}`,
  description: '周年慶會員禮-當月全館消費滿1500元享85折優惠(限1筆訂單)',
  threshold: '500',
  endTime: '2022-12-10',
}))
// const data = Array.from({
//   length: db會員優惠券數量(user_coupon.length),
// }).map((_, i) => ({
//   title:  db會員優惠券名稱(user_coupon-coupon_id=>coupon-[coupon_name | coupon_code]),
//   description:  db會員優惠券敘述(user_coupon-coupon_id=>coupon-description),
//   threshold:  db會員優惠券門檻
//   endTime: db會員優惠券有效日期
// }))

export default function Coupon() {
  const items = [
    {
      key: '1',
      label: '已過期',
      children: '',
    },
    {
      key: '2',
      label: '已使用',
      children: '',
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 在這裡可以處理分頁後的資料載入或其他操作
  }

  // 根據目前頁和每頁顯示的數量計算要顯示的數據(已失效)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedExpiredData = expiredData.slice(startIndex, endIndex)

  // 根據目前頁和每頁顯示的數量計算要顯示的數據(已使用)
  const usedSIndex = (currentPage - 1) * pageSize
  const usedEIndex = usedSIndex + pageSize
  const displayedUsedData = usedData.slice(usedSIndex, usedEIndex)

  const [tabkey, setTabkey] = useState('1')

  const tabsOnChange = (key) => {
    console.log('tab key:' + key)
    setTabkey(key)
    setCurrentPage(1)
  }

  return (
    <>
      <UserLayout title={'歷史紀錄'}>
        <div>
          <div style={{ margin: '20px 25px 5px' }}>
            <TabButtonForUser tabItems={items} tabsChange={tabsOnChange} />
          </div>
          <div style={{ minHeight: '500px' }}>
            <ListCardHistory
              hisTab={tabkey}
              hisData={tabkey == '1' ? displayedExpiredData : displayedUsedData}
            />
          </div>
          <PaginationComponent
            totalItems={tabkey === '1' ? expiredData.length : usedData.length} // 总项目数量
            pageSize={pageSize} // 每页显示的项目数量
            currentPage={currentPage} // 当前页码
            onPageChange={handlePageChange} // 处理页码变化事件的回调函数
          />
        </div>
      </UserLayout>
    </>
  )
}
