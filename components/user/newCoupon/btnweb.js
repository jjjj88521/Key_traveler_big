import React from 'react'

export default function BtnWeb({ handleAddCoupon }) {
  return (
    <>
      <div className={`mt-4 mb-5 d-sm-block d-none px-5`}>
        <div className={`row  align-items-center`}>
          <div className="col-3 col-lg-3 text-end">
            <p className={`m-0`}>新增優惠券</p>
          </div>
          <div className="col-6 col-lg-6">
            <input
              type="text"
              className="form-control"
              id="newCoupon"
              maxLength={10}
            ></input>
          </div>
          <div className={`col-3 col-lg-3 `}>
            <button
              className={`btn btn-primary text-center text-light px-4 coupon_newCouponBtn`}
              onClick={handleAddCoupon}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
