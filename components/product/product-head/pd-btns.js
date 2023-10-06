import React, { useState } from 'react'

const AddCartBtn = () => {
  return (
    <button className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold hstack gap-3 justify-content-center">
      <i className="fa-solid fa-cart-plus"></i>
      加入購物車
    </button>
  )
}

const BuyBtn = () => {
  return (
    <button className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold">
      直接購買
    </button>
  )
}

const LikeBtn = ({ isLiked = false }) => {
  const [liked, setLiked] = useState(isLiked)
  return (
    <button className={`h4 bg-white border-0`} onClick={() => setLiked(!liked)}>
      <span className={`${liked ? 'text-danger' : ''}`}>
        <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart pe-2`}></i>
        Like
      </span>
    </button>
  )
}

export { AddCartBtn, BuyBtn, LikeBtn }
