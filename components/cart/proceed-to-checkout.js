import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/use-cart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'

const moment = require('moment')
function filterData(data) {
  const millisecondsInADay = 1000 * 60 * 60 * 24
  // 保留start_date與目前時間相差2天以內的元素
  const filteredData = data.filter((item) => {
    return (
      !(
        Math.floor((moment(item.start_date) - moment()) / millisecondsInADay) >
        2
      ) || item.end_date == undefined
    )
  })
  return filteredData
}

export default function ProceedToCheckout({ onCheckout }) {
  const { coupon, getCoupon } = useAuth()
  useEffect(() => {
    getCoupon()
  }, [])

  const [coupons, setcoupons] = useState([])

  useEffect(() => {
    if (Array.isArray(coupon) && coupon.length > 0) {
      const fData = filterData(coupon)
      setcoupons(fData)
    } else {
      setcoupons([])
    }
  }, [coupon])
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const { cartTotalP: totalPriceP, selectItemsP: totalItemsP } = useCart()
  const { cartTotalG: totalPriceG, selectItemsG: totalItemsG } = useGroupCart()
  const { cartTotalR: totalPriceR, selectItemsR: totalItemsR } = useRentCart()

  const handleCouponDeselect = () => {
    setSelectedCoupon('')
  }

  const [pdTotalPrice, setPdTotalPrice] = useState(totalPriceP)
  useEffect(() => {
    setPdTotalPrice(totalPriceP)
  }, [totalPriceP])

  const handleCouponSelect = (couponName, couponDiscount) => {
    setSelectedCoupon(couponName)
    if (pdTotalPrice) {
      const resultDiscount =
        couponDiscount > 1
          ? pdTotalPrice - couponDiscount
          : pdTotalPrice * couponDiscount
      setPdTotalPrice(resultDiscount)
    }
  }

  return (
    <>
      {/* 去結帳 */}
      <div className="my-4">
        <div className="pb-2">
          <span className="fs-6">
            使用優惠券(限一般商品):
            <span
              className="ps-3"
              style={{ width: '110px', display: 'inline-block' }}
              id="coupon"
            >
              {selectedCoupon}
            </span>
          </span>
          <div className="btn-group ms-3 ">
            <button
              className="btn btn-sm border-primary text-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              選擇優惠券
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="btn dropdown-item"
                  onClick={() => {
                    handleCouponDeselect()
                  }}
                >
                  無
                </button>
              </li>
              {coupons.map((v) => (
                <li key={v.id}>
                  <button
                    className="btn dropdown-item"
                    onClick={() => {
                      handleCouponSelect(
                        v.coupon_name || v.coupon_code,
                        v.discount_value === 0
                          ? v.discount_percent
                          : v.discount_value
                      )
                    }}
                  >
                    {v.coupon_name || v.coupon_code}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-danger">
          P.S.若商品種類(一般、團購、租用)相同，產品數量多且收件地址不同需分開結帳！！
        </div>
        <div className="text-end">
          <span className="align-middle">
            共
            <span className="orderAmount">
              {totalItemsP + totalItemsG + totalItemsR}
            </span>
            件商品, 總金額: $
            <span className="orderTotal">
              {pdTotalPrice + totalPriceG + totalPriceR}
            </span>
          </span>
          <a
            href="#"
            className="btn btn-primary text-white ms-2 px-3 py-2"
            onClick={onCheckout}
          >
            去結帳
          </a>
        </div>
      </div>
    </>
  )
}
