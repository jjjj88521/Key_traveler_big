import { React, useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd'
import Link from 'next/link'
import axios from 'axios'

export default function CartStep3() {
  const removeLocalStorage = () => {
    localStorage.removeItem('product-info')
    localStorage.removeItem('groupbuy-info')
    localStorage.removeItem('rent-info')
    localStorage.removeItem('order-info')
  }
  const buyer = JSON.parse(localStorage.getItem('order-info'))
  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'key',
      key: 'key',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '收件人姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '收件人地址電話',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '收件人地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
    },
  ]
  const [orderNumPd, setOrderNumPd] = useState('')
  const [orderNumGb, setOrderNumGb] = useState('')
  const [orderNumR, setOrderNumR] = useState('')
  const getOrderNum = async () => {
    if (localStorage.getItem('product-info').length > 2) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            '/api/order-test/getOrderListPd',
          {
            withCredentials: true,
          }
        )
        // console.log('優惠券data')
        console.log(response.data)
        if (response.data.message === 'success') {
          // console.log('pd有東西')
          setOrderNumPd(response.data.orderPId)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (localStorage.getItem('groupbuy-info').length > 2) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            '/api/order-test/getOrderListGb',
          {
            withCredentials: true,
          }
        )
        // console.log('優惠券data')
        console.log(response.data)
        if (response.data.message === 'success') {
          // console.log('gb有東西')
          setOrderNumGb(response.data.orderGId)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (localStorage.getItem('rent-info').length > 2) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            '/api/order-test/getOrderListR',
          {
            withCredentials: true,
          }
        )
        // console.log('優惠券data')
        console.log(response.data)
        if (response.data.message === 'success') {
          // console.log('r有東西')
          setOrderNumR(response.data.orderRId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  getOrderNum()
  useEffect(() => {
    console.log(orderNumPd)
    console.log(orderNumGb)
    console.log(orderNumR)
  }, [orderNumPd, orderNumGb, orderNumR])

  console.log(localStorage.getItem('product-info').length)
  console.log(localStorage.getItem('groupbuy-info').length)
  console.log(localStorage.getItem('rent-info').length)
  const data = [
    {
      key:
        (orderNumPd !== '' ? orderNumPd : '') +
        (orderNumGb !== '' ? `, ${orderNumGb}` : '') +
        (orderNumR !== '' ? `, ${orderNumR}` : ''),
      name: buyer['buyer-info'].name,
      phone: buyer['buyer-info'].phone,
      address: buyer['buyer-info'].address,
      status: '已結帳',
    },
  ]
  return (
    <div className="container text-center mt-5" style={{ height: '500px' }}>
      <div className="row mt-5">
        <div className="col-11 mx-auto">
          <h5 className="mt-4 text-primary">訂單成功</h5>
          <Link
            className="btn btn-primary"
            type="button"
            href="/user/order"
            onClick={removeLocalStorage}
          >
            查詢訂單
          </Link>
          {/* 手機版 */}
          <div className="d-sm-none d-block">
            <div className="mt-5"></div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          {/* 電腦版 */}
          <div className="d-none d-sm-block">
            <div className="mt-5"></div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
