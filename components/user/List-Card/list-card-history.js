import React from 'react'
import { Card, List } from 'antd'
import style from './listCardForCoupon.module.scss'

export default function ListCardHistory({ hisTab, hisData }) {
  return (
    <>
      <List
        grid={{
          gutter: 0,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        size="large"
        dataSource={hisData}
        renderItem={(item) => (
          <List.Item key={item.key + 1}>
            <Card
              className={
                hisTab === '1'
                  ? `${style['expiredCoupon']}`
                  : `${style['usedCoupon']}`
              }
            >
              <div
                className={`d-flex align-items-center`}
                id={
                  hisTab === '1'
                    ? 'expired_' + (item.key + 1)
                    : 'used_' + (item.key + 1)
                }
              >
                {/* <div> */}
                <img width={100} alt="logo" src="/images/coupon_notUse.png" />
                {/* </div> */}
                <div className={`ms-2 text-secondary`}>
                  <h5>{item.title}</h5>
                  <h6 style={{ maxWidth: '300px' }}>{item.description}</h6>
                  <p className="m-0">低消 ${item.threshold} 起</p>
                  <p className="m-0">有效日期：{item.endTime}</p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}
