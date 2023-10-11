import { React, useEffect } from 'react'
import ListCardForCoupon from '../List-Card'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import CouponFetcher from './CouponFetcher'
import { useRouter } from 'next/router'

export default function CouponAll({
  couponAllData,
  setCouponAllData,
  currentPage,
  pageSize,
  handlePageChange,
  filterExpiredData,
}) {
  console.log(couponAllData)
  const router = useRouter()
  const { isReady, asPath } = router
  // 一個所有的優惠券=>先過濾掉已過期的優惠券
  useEffect(() => {
    if (isReady) {
      // 在组件加载时过滤并设置初始的数据
      const filteredData = Array.isArray(couponAllData)
        ? filterExpiredData(couponAllData)
        : []
      setCouponAllData(filteredData)
    }
  }, [isReady]) // 空数组表示只在组件加载时运行一次

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = Array.isArray(couponAllData)
    ? couponAllData.slice(startIndex, endIndex)
    : []
  // const displayedData = couponAllData.slice(startIndex, endIndex)
  // console.log(displayedData.length)

  return (
    <>
      <div className={`mt-1`}>
        {displayedData.length !== 0 ? (
          <div>
            <ListCardForCoupon data={displayedData} type={'All'} />
            <NewCouponPage
              totalItems={couponAllData.length} // 總項目數量
              pageSize={pageSize} // 每頁顯示的項目數量
              currentPage={currentPage} // 目前頁碼
              onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
            />
          </div>
        ) : (
          <div className="text-danger ms-4">無優惠券</div>
        )}
      </div>
      {/* <CouponFetcher /> */}
    </>
  )
}
