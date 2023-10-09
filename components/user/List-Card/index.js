import React from 'react'
import { Card, List } from 'antd'
import style from './listCardForCoupon.module.scss'

const moment = require('moment')
const millisecondsInADay = 1000 * 60 * 60 * 24

export default function ListCardForCoupon({ data, type }) {
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
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.key}>
            <Card className={`${style['cardStyle']}`}>
              <div className="d-flex align-items-center">
                <div>
                  <img
                    width={100}
                    alt="logo"
                    // src="https://media.istockphoto.com/id/1261324062/zh/%E5%90%91%E9%87%8F/%E7%A5%A8.jpg?s=612x612&w=0&k=20&c=9JJQjtGTZZ2pSOhD0Hu6CM0tBQNEGdZ6TEbX1hfMHPU="
                    src="/images/coupon_pic.jpg"
                  />
                </div>
                <div className="ms-2">
                  <h5 className="text-primary">{item.title}</h5>
                  <h6 className={`${style['couponDesription']}`}>
                    <div>{item.description}</div>
                  </h6>
                  <p
                    className={`m-0 ${
                      item.threshold === 0 ? 'text-danger' : ''
                    }`}
                  >
                    {item.threshold === 0
                      ? '無消費門檻'
                      : `低消 $${item.threshold} 起`}
                  </p>
                  <p>
                    有效日期：
                    {type === 'All' ? (
                      item.endTime
                    ) : (
                      <div className="text-danger">
                        <i className="fa-solid fa-clock me-1"></i>
                        {item.endTime}
                        <br></br>
                        <p className="mb-0 ms-3">
                          (剩餘{' '}
                          {Math.floor(
                            (moment(item.endTime) - moment()) /
                              millisecondsInADay
                          )}{' '}
                          天{' '}
                          {Math.floor(
                            ((moment(item.endTime) - moment()) %
                              millisecondsInADay) /
                              (1000 * 60 * 60)
                          )}{' '}
                          小時)
                        </p>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}
