import React from 'react'
import { Badge } from 'antd'

export default function MobileDock() {
  return (
    <>
      <div
        className="bg-dark position-fixed fixed-bottom d-block d-sm-none"
        style={{
          height: '60px',
          zIndex: '99',
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col text-center ">
              <i className="fa-solid fa-house text-primary fs-5"></i>
            </div>
            <div className="col text-center">
              <i className="fa-regular fa-user text-primary fs-5"></i>
            </div>
            <div className="col text-center">
              <i className="fa-regular fa-heart text-primary fs-5"></i>
            </div>
            <div className="col text-center">
              <Badge count={2} color="#DC9329">
                <i className="fa-solid fa-cart-shopping text-primary fs-5"></i>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
