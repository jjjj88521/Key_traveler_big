import { React, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import ListCardHistory from '../List-Card/list-card-history'
import PaginationComponent from '@/components/common/PaginationComponent'

export default function CouponUsed({
  currentPage,
  pageSize,
  handlePageChange,
}) {
  const [usedData, setUsedData] = useState([])
  const { couponUsed, getCouponUsed } = useAuth()
  useEffect(() => {
    getCouponUsed()
  }, [])
  useEffect(() => {
    // 在这个useEffect中，确保coupon数据已经获取到
    if (Array.isArray(couponUsed) && couponUsed.length > 0) {
      setUsedData(couponUsed)
    } else {
      setUsedData([])
    }
  }, [couponUsed]) // 这里将coupon作为依赖项，当coupon数据发生变化时执行
  const [isLoading, setIsLoading] = useLoading(usedData)

  // 根據目前頁和每頁顯示的數量計算要顯示的數據(已使用)
  const usedSIndex = (currentPage - 1) * pageSize
  const usedEIndex = usedSIndex + pageSize
  const displayedUsedData = usedData.slice(usedSIndex, usedEIndex)

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {displayedUsedData.length !== 0 ? (
            <div>
              <ListCardHistory hisTab={'Expired'} hisData={displayedUsedData} />
              {usedData.length < pageSize ? (
                ''
              ) : (
                <PaginationComponent
                  totalItems={usedData.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          ) : (
            <div className="text-danger ms-4">無已使用優惠券</div>
          )}
        </div>
      )}
    </>
  )
}
