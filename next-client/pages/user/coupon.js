import { React, useState } from 'react'
import style from './coupon.module.scss'
import { Card, List } from 'antd'
import PaginationComponent from '@/components/common/PaginationComponent'

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  key: i,
  title: `周年慶會員禮${i + 1}`,
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
  // const [currPage, setCurrPage] = useState(1)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10 // 每页显示的项目数量
  // 处理页码变化事件
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 在这里可以处理分页后的数据加载或其他操作
  }

  // 根据当前页和每页显示的数量计算要显示的数据
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const displayedData = data.slice(startIndex, endIndex)

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
                <h6 className="m-0 text-primary">歷史紀錄</h6>
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
              {/* {data.map((item, index) => {
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
              })} */}
            </div>
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
              dataSource={displayedData}
              // pagination={{
              //   onChange: (page) => {
              //     setCurrPage(page)
              //   },
              //   pageSize: 10,
              //   position: 'bottom',
              //   align: 'center',
              //   current: currPage,
              //   itemRender: (page, type, originalElement) => {
              //     if (type === 'prev' || type === 'next') {
              //       return (
              //         <>
              //           <div className="bg-primary-subtle text-primary">
              //             <i
              //               className={
              //                 type === 'prev'
              //                   ? 'fa-solid fa-caret-left'
              //                   : 'fa-solid fa-caret-right'
              //               }
              //             ></i>
              //           </div>
              //         </>
              //       )
              //     }
              //     // if (type === 'prev') {
              //     //   return (
              //     //     <>
              //     //       <div className="bg-primary-subtle text-primary">
              //     //         <i className="fa-solid fa-caret-left"></i>
              //     //       </div>
              //     //     </>
              //     //   )
              //     // }
              //     // if (type === 'next') {
              //     //   return (
              //     //     <>
              //     //       <div className="bg-primary-subtle text-primary">
              //     //         <i className="fa-solid fa-caret-right"></i>
              //     //       </div>
              //     //     </>
              //     //   )
              //     // }
              //     return (
              //       <div
              //         className={
              //           currPage === page
              //             ? 'text-light'
              //             : 'text-primary bg-primary-subtle'
              //         }
              //       >
              //         {originalElement}
              //       </div>
              //     )
              //   },
              // }}
              renderItem={(item) => (
                <List.Item key={item.key}>
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
            />
            <PaginationComponent
              totalItems={data.length} // 总项目数量
              pageSize={pageSize} // 每页显示的项目数量
              currentPage={currentPage} // 当前页码
              onPageChange={handlePageChange} // 处理页码变化事件的回调函数
            />
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
