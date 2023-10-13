import { React, useState, useEffect } from 'react'
import ListCardForCoupon from '../List-Card'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import { useAuth } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'

export default function CouponAll({ currentPage, pageSize, handlePageChange }) {
  const [couponAllData, setCouponAllData] = useState([])

  const { coupon, getCoupon } = useAuth()
  useEffect(() => {
    getCoupon()
  }, [])
  useEffect(() => {
    // 在这个useEffect中，确保coupon数据已经获取到
    if (Array.isArray(coupon) && coupon.length > 0) {
      setCouponAllData(coupon)
    } else {
      setCouponAllData([])
    }
  }, [coupon])
  const [isLoading, setIsLoading] = useLoading(coupon)

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = Array.isArray(couponAllData)
    ? couponAllData.slice(startIndex, endIndex)
    : []

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={`mt-1`}>
          {displayedData.length !== 0 ? (
            <div>
              <ListCardForCoupon data={displayedData} type={'All'} />
              {couponAllData.length < pageSize ? (
                ''
              ) : (
                <NewCouponPage
                  totalItems={couponAllData.length} // 總項目數量
                  pageSize={pageSize} // 每頁顯示的項目數量
                  currentPage={currentPage} // 目前頁碼
                  onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
                />
              )}
            </div>
          ) : (
            <div className="text-danger ms-4">無優惠券</div>
          )}
        </div>
      )}
    </>
  )
}
