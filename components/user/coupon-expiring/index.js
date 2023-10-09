import { React, useEffect } from 'react'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import ListCardForCoupon from '../List-Card'

export default function CouponExpiring({
  couponExpiringData,
  setCouponExpiringData,
  currentPage,
  pageSize,
  handlePageChange,
  filterExpiringData,
}) {
  useEffect(() => {
    // 在组件加载时过滤并设置初始的数据
    const filteredData = filterExpiringData(couponExpiringData)
    setCouponExpiringData(filteredData)
  }, []) // 空数组表示只在组件加载时运行一次

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startEIndex = (currentPage - 1) * pageSize
  const endEIndex = startEIndex + pageSize
  const displayedEData = couponExpiringData.slice(startEIndex, endEIndex)
  console.log(displayedEData.length)
  return (
    <>
      <div className={`mt-1`}>
        {displayedEData.length !== 0 ? (
          <div>
            <ListCardForCoupon data={displayedEData} type={'Expiring'} />
            <NewCouponPage
              totalItems={couponExpiringData.length} // 總項目數量
              pageSize={pageSize} // 每頁顯示的項目數量
              currentPage={currentPage} // 目前頁碼
              onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
            />
          </div>
        ) : (
          <div className="text-danger ms-4">尚無即將到期之優惠券</div>
        )}
      </div>
    </>
  )
}
