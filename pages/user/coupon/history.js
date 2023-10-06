import { React, useState } from 'react'
import style from './coupon.module.scss'
import { Card, List } from 'antd'
import PaginationComponent from '@/components/common/PaginationComponent'
import { Tabs } from 'antd'

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
  }

  return (
    <>
      {console.log('load tabkey:' + tabkey)}
      <div>
        <div className="all_coupon container bg-secondary-subtle my-4 py-3 col-11 col-lg-7 ">
          <div className="d-flex align-items-center justify-content-between mt-5">
            <h2 style={{ paddingLeft: '24px' }} className="m-0">
              歷史紀錄
            </h2>
          </div>
          <div style={{ margin: '20px 25px 5px' }}>
            <Tabs
              defaultActiveKey="1"
              items={items}
              type="card"
              onChange={tabsOnChange}
            />
          </div>
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
              dataSource={
                tabkey === '1' ? displayedExpiredData : displayedUsedData
              }
              renderItem={(item) => (
                <List.Item key={item.key + 1}>
                  <Card
                    className={
                      tabkey === '1'
                        ? `${style['expiredCoupon']}`
                        : `${style['usedCoupon']}`
                    }
                  >
                    <div
                      className={`d-flex align-items-center`}
                      id={
                        tabkey === '1'
                          ? 'expired_' + (item.key + 1)
                          : 'used_' + (item.key + 1)
                      }
                    >
                      {/* <div> */}
                      <img
                        width={100}
                        alt="logo"
                        src="/images/coupon_notUse.png"
                      />
                      {/* </div> */}
                      <div className={`ms-2 text-secondary`}>
                        <h5>{item.title}</h5>
                        <h6 style={{ maxWidth: '300px' }}>
                          {item.description}
                        </h6>
                        <p className="m-0">低消 ${item.threshold} 起</p>
                        <p className="m-0">有效日期：{item.endTime}</p>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
            <PaginationComponent
              totalItems={tabkey === '1' ? expiredData.length : usedData.length} // 总项目数量
              pageSize={pageSize} // 每页显示的项目数量
              currentPage={currentPage} // 当前页码
              onPageChange={handlePageChange} // 处理页码变化事件的回调函数
            />
          </div>
        </div>
      </div>
    </>
  )
}
