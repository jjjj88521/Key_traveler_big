import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import ListCardHistory from '../List-Card/list-card-history'
import PaginationComponent from '@/components/common/PaginationComponent'
import { getCouponExpired } from '@/redux/actions/coupon'

export default function CouponExpired({
  currentPage,
  pageSize,
  handlePageChange,
}) {
  // redux
  const dispatch = useDispatch()
  const { couponExpired } = useSelector((state) => state.coupon)
  const [expiredData, setExpiredData] = useState([])
  useEffect(() => {
    dispatch(getCouponExpired())
  }, [])
  useEffect(() => {
    if (Array.isArray(couponExpired) && couponExpired.length > 0) {
      setExpiredData(couponExpired)
    } else {
      setExpiredData([])
    }
  }, [couponExpired])
  const [isLoading, setIsLoading] = useLoading(expiredData)

  // 根據目前頁和每頁顯示的數量計算要顯示的數據(已失效)
  const ExpiredSIndex = (currentPage - 1) * pageSize
  const EcpiredEIndex = ExpiredSIndex + pageSize
  const displayedExpiredData = expiredData.slice(ExpiredSIndex, EcpiredEIndex)
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          {displayedExpiredData.length !== 0 ? (
            <div>
              <ListCardHistory
                hisTab={'Expired'}
                hisData={displayedExpiredData}
              />
              {expiredData.length < pageSize ? (
                ''
              ) : (
                <PaginationComponent
                  totalItems={expiredData.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          ) : (
            <div className="text-danger ms-4">無過期優惠券</div>
          )}
        </div>
      )}
    </>
  )
}
