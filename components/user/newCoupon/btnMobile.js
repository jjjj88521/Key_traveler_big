import React from 'react'

export default function BtnMobile({ handleAddCouponMobile }) {
  return (
    <>
      <div className={`my-4 d-sm-none container`}>
        <div className={`row row-cols-2 align-items-center `}>
          <div className="col-4 text-end p-0">
            <p className={`m-0`}>新增優惠券</p>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              id="newCouponMobile"
              maxLength={10}
            ></input>
          </div>
          <div className={`col-4 `}></div>

          <div className={`col-7 text-end mt-2`}>
            <button
              className={`btn btn-primary text-center text-light px-3 py-2 coupon_newCouponBtnMobile`}
              onClick={handleAddCouponMobile}
              // onChange={() => {
              //   couponData.forEach((item) => {
              //     console.log(
              //       `data key: ${item.key}, createDate: ${item.createDate}`
              //     )
              //   })
              //   console.log('=======================================end')
              // }}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
