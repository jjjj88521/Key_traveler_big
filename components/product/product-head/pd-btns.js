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

const LikeBtn = ({ isLiked = false, onToggleLike }) => {
  // const [liked, setLiked] = useState(isLiked)
  const handleToggleLike = () => {
    onToggleLike()
  }
  return (
    <button
      className={`h4 bg-white border-0`}
      onClick={() => {
        handleToggleLike()
      }}
    >
      <span className={`${isLiked ? 'text-danger' : ''}`}>
        <i
          className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart pe-2`}
        ></i>
        Like
      </span>
    </button>
  )
}

export { AddCartBtn, BuyBtn, LikeBtn }
