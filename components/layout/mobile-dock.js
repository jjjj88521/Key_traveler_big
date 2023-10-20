import React from 'react'
import { Badge } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'

export default function MobileDock() {
  const { totalItemsP: pdTotalItems } = useCart()
  const { totalItemsG: gbTotalItems } = useGroupCart()
  const { totalItemsR: rTotalItems } = useRentCart()
  const { auth } = useAuth()
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
              <Link href="/user">
                <i className="fa-regular fa-user text-primary fs-5"></i>
              </Link>
            </div>
            <div className="col text-center">
              <Link href="/user/product-like">
                <i className="fa-regular fa-heart text-primary fs-5"></i>
              </Link>
            </div>
            <div className="col text-center">
              <Link href="/cart">
                {auth.isAuth ? (
                  <Badge
                    count={pdTotalItems + gbTotalItems + rTotalItems}
                    color="#DC9329"
                    size="small"
                    offset={[5, -5]}
                  >
                    <i className="fa-solid fa-cart-shopping text-primary fs-5"></i>
                  </Badge>
                ) : (
                  <Badge count={0} color="#DC9329" showZero>
                    <i className="fa-solid fa-cart-shopping text-primary fs-5"></i>
                  </Badge>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
