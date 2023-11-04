import React from 'react'
import { Card, List } from 'antd'
import style from './listCardForCoupon.module.scss'

const moment = require('moment')
const millisecondsInADay = 1000 * 60 * 60 * 24

export default function ListCardForCoupon({ data, type }) {
  return (
    <>
      {/* <div style={{ minHeight: '500px' }}> */}
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
                <div
                  className="ms-2 position-relative w-100"
                  style={{ height: '120px' }}
                >
                  <h5 className="text-primary">
                    {item.coupon_name || item.coupon_code}
                  </h5>
                  <h6 className={`${style['couponDesription']} mb-0 mt-2`}>
                    <div>{item.description}</div>
                  </h6>
                  <div className={`d-sm-block d-none  ${style['cardEnd']}`}>
                    <p
                      className={`mt-4 mb-0 ${
                        item.threshold === 0 ? 'text-primary' : ''
                      }`}
                    >
                      {item.threshold === 0
                        ? '無消費門檻'
                        : `低消 $${item.threshold} 起`}
                    </p>

                    {type === 'All' ? (
                      <div>
                        <p>
                          有效日期：{item.end_date ? item.end_date : '無限期'}
                        </p>
                      </div>
                    ) : (
                      <div className="text-danger d-flex align-items-center">
                        <i className="fa-solid fa-clock me-1"></i>
                        {item.end_date}
                        <p className="mb-0 ms-2">
                          (剩餘{' '}
                          {Math.floor(
                            (moment(item.end_date) - moment()) /
                              millisecondsInADay
                          )}{' '}
                          天{' '}
                          {Math.floor(
                            ((moment(item.end_date) - moment()) %
                              millisecondsInADay) /
                              (1000 * 60 * 60)
                          )}{' '}
                          小時)
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="d-sm-none" style={{ fontSize: '0.9rem' }}>
                    <p
                      className={`m-0 ${
                        item.threshold === 0 ? 'text-primary' : ''
                      }`}
                    >
                      {item.threshold === 0
                        ? '無消費門檻'
                        : `低消 $${item.threshold} 起`}
                    </p>
                    {type === 'All' ? (
                      <div className="mt-1">
                        <p>
                          {item.end_date
                            ? '有效日期：' + item.end_date
                            : '無限期'}
                        </p>
                      </div>
                    ) : (
                      <div className="text-danger">
                        <i className="fa-solid fa-clock me-1"></i>
                        {item.end_date}
                        <p className="mb-0 ms-3">
                          (剩餘{' '}
                          {Math.floor(
                            (moment(item.end_date) - moment()) /
                              millisecondsInADay
                          )}{' '}
                          天{' '}
                          {Math.floor(
                            ((moment(item.end_date) - moment()) %
                              millisecondsInADay) /
                              (1000 * 60 * 60)
                          )}{' '}
                          小時)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
      {/* </div> */}
    </>
  )
}
