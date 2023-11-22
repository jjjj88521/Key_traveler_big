import { React, useState, useEffect } from 'react'
import UserLayout from '@/components/layout/user-layout'
import NewCoupon from '@/components/user/newCoupon'
import CouponAll from '@/components/user/coupon-all'
import CouponExpiring from '@/components/user/coupon-expiring'
import { useDispatch, useSelector } from 'react-redux'
import useLoading from '@/hooks/useLoading'
import { Radio } from 'antd'
import { getCoupon } from '@/redux/actions/coupon'

export default function Coupon() {
  const dispatch = useDispatch()
  const { coupon } = useSelector((state) => state.coupon)
  useEffect(() => {
    dispatch(getCoupon())
  }, [])
  // console.log(coupon)
  const [isLoading, setIsLoading] = useLoading(coupon)

  const [currentPage, setCurrentPage] = useState(1)
  // 每頁顯示的項目數量
  const pageSize = 10
  // 處理頁碼變更事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    setIsLoading(true)
  }
  const [tabkey, setTabkey] = useState('All')

  const tabsOnChange = (e) => {
    // console.log('tab key:' + key)
    setTabkey(e.target.value)
    setCurrentPage(1)
    setIsLoading(true)
    window.scrollTo({ top: scrollTo ? scrollTo : 0, behavior: 'auto' })
  }

  // console.log(couponAllData)

  return (
    <>
      <UserLayout title={'我的優惠券'}>
        <div className="d-flex justify-content-between align-items-center ms-4 me-4 mb-3">
          <Radio.Group onChange={tabsOnChange} value={tabkey} className="">
            <Radio.Button value="All">全部</Radio.Button>
            <Radio.Button value="Expiring">即將到期</Radio.Button>
          </Radio.Group>
          <NewCoupon changePage={handlePageChange} />
        </div>
        <div className="ms-1" style={{ minHeight: '500px' }}>
          {tabkey === 'All' && (
            <CouponAll
              currentPage={currentPage}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
            />
          )}
          {tabkey === 'Expiring' && (
            <CouponExpiring
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
