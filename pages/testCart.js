import { getCartAsync } from '@/redux/actions/productCart'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TestCart() {
  const cart = useSelector((state) => state.productCart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCartAsync())
  }, [])
  return (
    <>
      <h1>TestCart</h1>
      {cart.items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <h2>{item.price}</h2>
          <h2>{item.quantity}</h2>
        </div>
      ))}
      <h1>總共{cart.totalQuantity}個商品</h1>
      <h1>總計{cart.totalPrice}元</h1>
    </>
  )
}
