import { React, useState } from 'react'
import style from './coupon.module.scss'
import { Card, List } from 'antd'

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  // href: `./coupon/${i + 1}`,
  // title: `優惠券 ${i + 1}`,
  title: `周年慶會員禮`,
  description: '周年慶會員禮-當月全館消費滿1500元享85折優惠(限1筆訂單)',
  threshold: '1500',
  endTime: '2023-08-10',
}))
// const data = Array.from({
//   length: db會員優惠券數量(user_coupon.length),
// }).map((_, i) => ({
//   title:  db會員優惠券名稱(user_coupon-coupon_id=>coupon-[coupon_name | coupon_code]),
//   description:  db會員優惠券敘述(user_coupon-coupon_id=>coupon-description),
//   threshold:  db會員優惠券門檻
//   endTime: db會員優惠券有效日期
// }))

export default function Coupon() {
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  // 处理页码变化
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 计算总页数
  const totalPages = Math.ceil(23 / pageSize)

  // 根据当前页码计算当前页要显示的数据范围
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = data.slice(startIndex, endIndex)

  // 创建分页按钮
  const renderPageButtons = () => {
    const buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <>
      {/* <div>Coupon</div> */}
      <main>
        <div className="row">
          <div className="all_coupon container bg-secondary-subtle my-4 py-3 col-7">
            <div className="d-flex align-items-center justify-content-between mt-5">
              <h2 style={{ paddingLeft: '24px' }} className="m-0">
                我的優惠券
              </h2>
              <a
                href="./coupon?page=history"
                style={{ paddingRight: '24px' }}
                onClick={() => {
                  document.querySelector('.all_coupon').classList.add('d-none')
                  document.querySelector('.history').classList.remove('d-none')
                  document.querySelector('.history').classList.add('d-block')
                }}
              >
                <h6 className="m-0">歷史紀錄</h6>
              </a>
            </div>

            <div className="row mb-5 mt-3">
              <div className="d-flex justify-content-center pt-4 align-items-center">
                <p className={`${style['new_text']} mb-0 me-2`}>新增優惠券</p>
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ width: '400px', height: '45px' }}
                ></input>
                <button
                  className="btn btn-primary text-center"
                  style={{ width: '120px', color: '#ffffff', height: '45px' }}
                >
                  儲存
                </button>
              </div>
            </div>
            <div>
              {data.map((item, index) => {
                return (
                  <>
                    <Card>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            width={100}
                            alt="logo"
                            src="https://media.istockphoto.com/id/1261324062/zh/%E5%90%91%E9%87%8F/%E7%A5%A8.jpg?s=612x612&w=0&k=20&c=9JJQjtGTZZ2pSOhD0Hu6CM0tBQNEGdZ6TEbX1hfMHPU="
                          />
                        </div>
                        <div className="ms-2" key={index}>
                          <h5 className="text-primary">{item.title}</h5>
                          <h6 style={{ maxWidth: '300px' }}>
                            {item.description}
                          </h6>
                          <p className="m-0">低消 ${item.threshold} 起</p>
                          <p className="m-0">有效日期：{item.endTime}</p>
                        </div>
                      </div>
                    </Card>
                  </>
                )
              })}
            </div>
            {/* <List
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
                <List.Item key={item.title}>
                  <Card>
                    <div className="d-flex align-items-center">
                      <div>
                        <img
                          width={100}
                          alt="logo"
                          src="https://media.istockphoto.com/id/1261324062/zh/%E5%90%91%E9%87%8F/%E7%A5%A8.jpg?s=612x612&w=0&k=20&c=9JJQjtGTZZ2pSOhD0Hu6CM0tBQNEGdZ6TEbX1hfMHPU="
                        />
                      </div>
                      <div className="ms-2">
                        <h5 className="text-primary">{item.title}</h5>
                        <h6 style={{ maxWidth: '300px' }}>
                          {item.description}
                        </h6>
                        <p className="m-0">低消 ${item.threshold} 起</p>
                        <p className="m-0">有效日期：{item.endTime}</p>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            /> */}
            <div>
              {/* 创建分页按钮 */}
              <div className="pagination">{renderPageButtons()}</div>
            </div>
          </div>
        </div>

        <div className="history container bg-secondary-subtle mb-4 pb-3 d-none">
          <h2>歷史紀錄</h2>
          <hr />
        </div>
      </main>
    </>
  )
}

// const pageSize = 10 // 每页显示的项目数量
// const totalItems = 23 // 总项目数量

function App() {
  return (
    <div>
      {/* 显示当前页的数据列表 */}
      <div>
        {data.map((item, index) => {
          return (
            <>
              <Card className="card">
                <div key={index}>
                  {/* 显示数据项的内容 */}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {/* 其他内容 */}
                </div>
              </Card>
            </>
          )
        })}
      </div>
    </div>
  )
}
