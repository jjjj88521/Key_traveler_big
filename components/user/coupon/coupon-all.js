import { React, useState, useEffect } from 'react'
import ListCardForCoupon from '../List-Card'
import NewCouponPage from '@/components/common/PaginationComponent/newCouponPage'
import { useSelector, useDispatch } from 'react-redux'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import { getCoupon } from '@/redux/actions/coupon'

const moment = require('moment')

function filterData(data) {
  const millisecondsInADay = 1000 * 60 * 60 * 24
  // 保留start_date與目前時間相差2天以內的元素
  // 1.起始日與現在相差2天以上的 X
  // 2.起始日&結束日沒有被定義的(無限期) O
  // 3.現在日期在結束日以後的 X
  const filteredData = data.filter((item) => {
    return (
      !(
        Math.floor((moment(item.start_date) - moment()) / millisecondsInADay) >
        2
      ) ||
      item.start_date == undefined ||
      item.end_date == undefined ||
      !(Math.floor(moment() - moment(item.end_date) / millisecondsInADay) > 0)
    )
  })
  return filteredData
}

export default function CouponAll({ currentPage, pageSize, handlePageChange }) {
  // redux
  const dispatch = useDispatch()
  const { coupon } = useSelector((state) => state.coupon)

  const [couponAllData, setCouponAllData] = useState([])
  useEffect(() => {
    dispatch(getCoupon())
  }, [])
  useEffect(() => {
    if (Array.isArray(coupon) && coupon.length > 0) {
      const fData = filterData(coupon)
      setCouponAllData(fData)
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
