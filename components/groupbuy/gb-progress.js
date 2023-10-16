import React from 'react'
import { Progress } from 'antd'
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import { useProductData } from '@/context/use-product'
import dayjs from 'dayjs'

export default function GbProgressBox({
  // current_people,
  // target_people,
  start,
  end,
  dateRange,
  daysLeft,
}) {
  const { productData } = useProductData()
  const { current_people, target_people, arrival } = productData
  // 人數比例
  const peopleRatio = (current_people / target_people) * 100
  return (
    <div className="d-flex gap-3 flex-sm-row flex-column">
      <Progress
        type="circle"
        percent={peopleRatio}
        format={(percent) => {
          return percent === 100 ? '成團' : `${percent}%`
        }}
        className="text-center"
      />
      <div className="vstack gap-2 text-sm-start text-center">
        <div className="text-secondary">
          <p className="mb-0 fs-5">目標人數：{target_people} 人</p>
          <p className="mb-0 fs-5">
            開團日期：{start} ~ {end}
          </p>
        </div>
        <div className="d-flex gap-4 justify-content-center justify-content-sm-start">
          <div className="fs-4 d-flex gap-3 align-items-center">
            <span className="fs-2">
              <UserOutlined />
            </span>
            <span>{current_people} 人</span>
          </div>
          <div className="fs-4 d-flex gap-3 align-items-center">
            <span className="fs-2">
              <FieldTimeOutlined />
            </span>
            {daysLeft > 0 ? (
              <span>{daysLeft} 天開始</span>
            ) : dateRange > 0 ? (
              <span>{dateRange} 天</span>
            ) : (
              <span className="text-secondary">已結束</span>
            )}
          </div>
        </div>
        <p className="mt-3 text-primary">
          預計到貨日期：{dayjs(arrival).format('YYYY/MM')}
        </p>
      </div>
    </div>
  )
}
