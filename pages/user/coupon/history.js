import { React, useState } from 'react'
import UserLayout from '@/components/layout/user-layout'
import { Radio } from 'antd'
import CouponUsed from '@/components/user/coupon/coupon-used'
import CouponExpired from '@/components/user/coupon/coupon-expired'

export default function History() {
  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const [tabkey, setTabkey] = useState('Expired')

  const tabsOnChange = (e) => {
    setTabkey(e.target.value)
    setCurrentPage(1)
    window.scrollTo({ top: scrollTo ? scrollTo : 0, behavior: 'auto' })
  }

  return (
    <>
      <UserLayout title={'歷史紀錄'}>
        <Radio.Group
          onChange={tabsOnChange}
          value={tabkey}
          style={{
            marginBottom: 18,
          }}
          className="ms-4"
        >
          <Radio.Button value="Expired">已過期</Radio.Button>
          <Radio.Button value="Used">已使用</Radio.Button>
        </Radio.Group>
        <div className="ms-1" style={{ minHeight: '500px' }}>
          {tabkey === 'Expired' && (
            <CouponExpired
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          )}
          {tabkey === 'Used' && (
            <CouponUsed
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </UserLayout>
    </>
  )
}
