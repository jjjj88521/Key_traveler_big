import React from 'react'
import { Rate, Avatar } from 'antd'

export default function CommentItem({
  user_account,
  avatar_img,
  star,
  created_time,
  comment,
}) {
  return (
    <div className="d-flex py-2 w-100">
      <Avatar src={avatar_img} />
      <div className="ms-3 vstack gap-3">
        <div className="d-flex justify-content-between">
          <div className="vstack gap-2">
            <h5 className="fw-bold text-primary">
              {/* // 只保留 account 第一個與最後一個字母，中間每個字母替換成 *，有幾個字母就替換幾次 */}
              {user_account.slice(0, 1) + '*****' + user_account.slice(-1)}
            </h5>
            <Rate value={star} disabled />
          </div>
          <h6 className="text-secondary">{created_time}</h6>
        </div>
        <div className="text-dark fs-6">{comment}</div>
      </div>
    </div>
  )
}
