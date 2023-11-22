import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import { getCoupon } from '@/redux/actions/coupon'

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
  // const { coupon, getCoupon } = useAuth()
  // redux
  const dispatch = useDispatch()
  const { coupon } = useSelector((state) => state.coupon)
  useEffect(() => {
    dispatch(getCoupon())
  }, [])

  const [coupons, setcoupons] = useState([])
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const { cartTotalP: totalPriceP, selectItemsP: totalItemsP } = useCart()
  const { cartTotalG: totalPriceG, selectItemsG: totalItemsG } = useGroupCart()
  const { cartTotalR: totalPriceR, selectItemsR: totalItemsR } = useRentCart()

  useEffect(() => {
    setPdTotalPrice(totalPriceP)
    if (Array.isArray(coupon) && coupon.length > 0) {
      const fData = filterData(coupon)
      setcoupons(fData)
      // console.log(fData)
      const conformCoupon = fData.filter((item) => totalPriceP > item.threshold)
      // console.log(conformCoupon)

      setcoupons(conformCoupon)
    } else {
      setcoupons([])
    }
  }, [coupon, totalPriceP])

  const handleCouponDeselect = () => {
    setSelectedCoupon('')
    setSelectedCouponId(0)
    setPdTotalPrice(totalPriceP)
  }

  const [pdTotalPrice, setPdTotalPrice] = useState(totalPriceP)
  // useEffect(() => {
  //   setPdTotalPrice(totalPriceP)
  //   if (Array.isArray(coupon) && coupon.length > 0) {
  //     console.log(coupon)
  //     const conformCoupon = coupon.filter(
  //       (item) => totalPriceP > item.threshold
  //     )
  //     setcoupons(conformCoupon)
  //   }
  // }, [totalPriceP])

  const [selectedCouponId, setSelectedCouponId] = useState(0)
  const handleCouponSelect = (couponName, couponDiscount, couponId) => {
    setSelectedCoupon(couponName)
    if (totalPriceP) {
      const resultDiscount =
        couponDiscount > 1
          ? totalPriceP - couponDiscount
          : totalPriceP * couponDiscount
      setPdTotalPrice(resultDiscount)
      setSelectedCouponId(couponId)
    }
  }

  const [orderInfo, setOrderInfo] = useState(() => {
    const data = localStorage.getItem('order-info')
    return data ? JSON.parse(data) : null
  })

  const setOrderLocalStorage = () => {
    const newData = {
      'coupon-id': selectedCouponId,
      'total-price': pdTotalPrice + totalPriceG + totalPriceR,
    }
    setOrderInfo(newData)
  }
  useEffect(() => {
    console.log(orderInfo)
    localStorage.setItem('order-info', JSON.stringify(orderInfo))
  }, [orderInfo])

  return (
    <>
      {/* 去結帳 */}
      <div className="my-4">
        <div className="pb-2">
          <span className="fs-6 d-flex align-items-center justify-content-between justify-content-sm-start">
            使用優惠券(限一般商品):
            {/* <span
              className="ps-3"
              style={{ width: '180px', display: 'inline-block' }}
              id="coupon"
            >
              {selectedCoupon}
            </span> */}
            <div className="btn-group" style={{ marginLeft: '30px' }}>
              <button
                className="btn btn-sm border-primary text-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={totalPriceP ? false : true}
              >
                {selectedCoupon || '選擇優惠券'}
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
                            : v.discount_value,
                          v.couponId
                        )
                      }}
                    >
                      {v.coupon_name || v.coupon_code}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </span>
        </div>
        <div className="text-danger">P.S.若收件地址不同需分開結帳！！</div>
        <div className="text-end fs-5">
          <span className="align-middle">
            共
            <span className="orderAmount text-primary">
              {totalItemsP + totalItemsG + totalItemsR}
            </span>
            件商品, 總金額：
            <span className="orderTotal text-primary">
              ${pdTotalPrice + totalPriceG + totalPriceR}
            </span>
          </span>
          <button
            href="#"
            className="btn btn-primary text-white ms-2 px-3 py-2"
            disabled={
              pdTotalPrice + totalPriceG + totalPriceR === 0 ? true : false
            }
            onClick={async () => {
              await setOrderLocalStorage()
              onCheckout()
            }}
          >
            去結帳
          </button>
        </div>
      </div>
    </>
  )
}
