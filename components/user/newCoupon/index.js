import React from 'react'
import BtnWeb from './btnweb'
import BtnMobile from './btnMobile'
const moment = require('moment')

export default function NewCoupon({
  couponAllData,
  setCouponAllData,
  changePage,
  filterExpiredData,
}) {
  const handleAddCoupon = (e) => {
    console.log(e.target.className)
    const inputValue = e.target.className.includes('coupon_newCouponBtnMobile')
      ? document.querySelector('#newCouponMobile').value
      : document.querySelector('#newCoupon').value
    console.log('new code:' + inputValue)

    // 撈database(coupon->coupon_code)跟輸入的內容作比較
    if (inputValue !== 'L9O1I4U8Y2') {
      alert('新增優惠碼失敗')
      return false
    }
    // 撈database(coupon)作為新增的優惠碼
    const newCoupon = {
      key: couponAllData.length, // 為新項分配一個唯一的鍵
      title: '新的优惠券', // 新項的標題
      description:
        '新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述新的描述', // 新項的描述
      threshold: '1000', // 新項的門檻
      endTime: '2023-10-05', // 新項的有效日期
      createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    // const newCoupon = {
    //   key: newData.length, // 為新項分配一個唯一的鍵
    //   title:  db會員優惠券名稱(user_coupon-coupon_id=>coupon-[coupon_code]), // 新項的標題
    //   description: db會員優惠券敘述(user_coupon-coupon_id=>coupon-description), // 新項的描述
    //   threshold: db會員優惠券門檻, // 新項的門檻
    //   endTime: db會員優惠券有效日期, // 新項的有效日期
    // }
    // 更新 couponData 并过滤过期数据
    const updatedCouponData = [newCoupon, ...couponAllData]
    const filteredCouponData = filterExpiredData(updatedCouponData)

    // 将过滤后的数据设置为新的 couponData
    setCouponAllData(filteredCouponData)

    // setNewData([newCoupon, ...newData])

    changePage(1)
    // console.log('newData=' + newData.length)
  }
  return (
    <>
      <BtnWeb handleAddCoupon={handleAddCoupon} />
      <BtnMobile handleAddCouponMobile={handleAddCoupon} />
    </>
  )
}
