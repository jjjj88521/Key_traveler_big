import { useState } from 'react'

export default function LikeButton({ isLiked = false }) {
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
