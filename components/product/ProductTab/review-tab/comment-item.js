import React from 'react'
import { Rate, Avatar } from 'antd'

export default function CommentItem({
  account,
  avatar,
  star,
  createTime,
  comment,
}) {
  return (
    <div className="d-flex py-3">
      <Avatar src={avatar} />
      <div className="ms-3 vstack gap-3">
        <div className="vstack gap-2">
          <div className="fw-bold text-primary fs-5">
            {/* // 只保留 account 第一個與最後一個字母，中間每個字母替換成 *，有幾個字母就替換幾次 */}
            {account.slice(0, 1) + '*****' + account.slice(-1)}
          </div>
          <Rate value={star} disabled />
          <h6 className="text-secondary">{createTime}</h6>
        </div>
        <div className="text-dark fs-5">{comment}</div>
      </div>
    </div>
  )
}
