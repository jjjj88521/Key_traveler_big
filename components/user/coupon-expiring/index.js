import { React, useState, useEffect } from 'react'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import ListCardForCoupon from '../List-Card'
import { useAuth } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'

const moment = require('moment')

function filterExpiringData(data) {
  const millisecondsInADay = 1000 * 60 * 60 * 24
  const filteredData = data.filter((item) => {
    return (
      Math.floor((moment(item.end_date) - moment()) / millisecondsInADay) <=
        2 &&
      Math.floor((moment(item.end_date) - moment()) / millisecondsInADay) >=
        0 &&
      item.end_date != undefined
    )
  })
  return filteredData
}

export default function CouponExpiring({
  currentPage,
  pageSize,
  handlePageChange,
}) {
  const [couponExpiringData, setCouponExpiringData] = useState([])

  const { coupon, getCoupon } = useAuth()
  useEffect(() => {
    getCoupon()
  }, [])

  useEffect(() => {
    if (Array.isArray(coupon) && coupon.length > 0) {
      const fData = filterExpiringData(coupon)
      console.log(fData)
      setCouponExpiringData(fData)
    } else {
      setCouponExpiringData([])
    }
  }, [coupon])
  const [isLoading, setIsLoading] = useLoading(coupon)

  // 根據目前頁和每頁顯示的數量計算要顯示的數據
  const startEIndex = (currentPage - 1) * pageSize
  const endEIndex = startEIndex + pageSize
  const displayedEData = Array.isArray(couponExpiringData)
    ? couponExpiringData.slice(startEIndex, endEIndex)
    : []

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={`mt-1`}>
          {displayedEData.length !== 0 ? (
            <div>
              <ListCardForCoupon data={displayedEData} type={'Expiring'} />
              {couponExpiringData.length < pageSize ? (
                ''
              ) : (
                <NewCouponPage
                  totalItems={couponExpiringData.length} // 總項目數量
                  pageSize={pageSize} // 每頁顯示的項目數量
                  currentPage={currentPage} // 目前頁碼
                  onPageChange={handlePageChange} // 處理頁碼變化事件的callback funtion
                />
              )}
            </div>
          ) : (
            <div className="text-danger ms-4">尚無即將到期之優惠券</div>
          )}
        </div>
      )}
    </>
  )
}
