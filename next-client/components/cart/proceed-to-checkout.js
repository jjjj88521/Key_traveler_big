import React from 'react'

export default function ProceedToCheckout() {
  return (
    <>
      {/* 去結帳 */}
      <div className="my-4">
        <div className="pb-2">
          <span className="fs-6">
            使用優惠券(限一般商品): <span>全站85折</span>
          </span>
          <div class="btn-group ms-3 ">
            <button
              class="btn btn-sm border-primary text-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              選擇優惠券
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="">
                  優惠券
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="">
                  優惠券
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-danger">
          P.S.若商品種類(一般、團購、租用)相同，產品數量多且收件地址不同需分開結帳！！
        </div>
        <div className="text-end">
          <span className="align-middle">
            共<span className="">6</span>件商品, 總金額: $
            <span className="">1800</span>
          </span>
          <a className="btn btn-primary text-white ms-2">去結帳</a>
        </div>
      </div>
    </>
  )
}
