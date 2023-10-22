import { React, useEffect } from 'react'
import { Space, Table, Tag } from 'antd'
import Link from 'next/link'
// import CartStep1 from './cart-step-1'

const columns = [
  {
    title: '訂單編號',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
]

export default function CartStep3() {
  const removeLocalStorage = () => {
    localStorage.removeItem('product-info')
    localStorage.removeItem('groupbuy-info')
    localStorage.removeItem('rent-info')
    localStorage.removeItem('order-info')
  }
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
