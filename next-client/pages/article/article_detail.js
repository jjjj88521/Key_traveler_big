import Link from 'next/link'
import React, { useState } from 'react'
import { Avatar, List, Space } from 'antd'
import { Input } from 'antd'

const { TextArea } = Input
const ButtonStyle = {
  // 媒體查詢，當視窗寬度達到 576px 時，套用以下樣式
  // '@media (min-width: 576px)': {
  //   width: '200px', // 设置宽度为自动，保持原始宽度
  // },
  backgroundColor: '#198cf8',
}
export default function ArticleDetail() {
  // 感興趣列表物件
  let data = [
    {
      title: 'interest title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg',
      user: 'by.user_id',
    },
  ]
  // 留言列表物件
  const artComment = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]
  const [value, setValue] = useState('')
  // const onChange = (e) => {
  //   console.log('Change:', e.target.value)
  // }
  // const App = () => (
  //   <Space size={16} wrap>
  //     <Avatar icon={<UserOutlined />} />
  //     <Avatar>U</Avatar>
  //     <Avatar size={40}>USER</Avatar>
  //     <Avatar src={url} />
  //     <Avatar src={<img src={url} alt="avatar" />} />
  //     <Avatar
  //       style={{
  //         backgroundColor: '#fde3cf',
  //         color: '#f56a00',
  //       }}
  //     >
  //       U
  //     </Avatar>
  //     <Avatar
  //       style={{
  //         backgroundColor: '#87d068',
  //       }}
  //       icon={<UserOutlined />}
  //     />
  //   </Space>
  // )
  return (
    <>
      <div className="bg-primary d-flex justify-content-center d-sm-none">
        <Link href="#" className="text-decoration-none">
          <div className="px-3">
            <p className="text-dark">公告</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark">開箱文</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark">組裝教學</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark">活動</p>
          </div>
        </Link>
      </div>
      <div className="container mb-5">
        <div className="row">
          {/* 左側欄 */}
          <div className="col-sm-8">
            <div
              className=" border border-1 border-light position-relative"
              style={{
                padding: '35px 30px',
                boxShadow:
                  '0 0 0 5px #171717, 0 2px 8px 10px rgba(0, 0, 0, .6)',
              }}
            >
              <i
                className="fa-regular fa-heart fa-2xl position-absolute btn"
                style={{ top: '20px', right: '10px' }}
              ></i>

              <h2 className="fw-bolder mt-4">資料庫DB-article-title</h2>
              <h5 className="text-secondary mb-5">by.user_id + 發佈時間</h5>
              <p>
                內文 舉例:親愛的用戶們，
                我們非常興奮地宣布，我們的全新鍵盤賣場現已正式上線！無論您是電競愛好者、專業打字者還是追求個性化的用戶，我們將為您提供最優質的鍵盤選擇，以滿足您對極致打字體驗的追求。
                在我們的鍵盤賣場中，您將發現各種類型的鍵盤，包括機械鍵盤、薄膜鍵盤和靜音鍵盤等等。無論您喜歡什麼類型的鍵盤，我們都有合適的選擇，以滿足您的需求。
                我們與頂尖品牌合作，為您提供最優質的產品。您可以找到知名品牌如Cherry、Razer、Corsair和Logitech等等。這些品牌以卓越的品質和出色的性能聞名於世，為您提供最佳的打字體驗。
                我們的鍵盤賣場致力於提供卓越的購物體驗和優質的客戶服務。我們的團隊將竭誠為您提供專業建議和協助，以確保您選擇到最適合您的鍵盤。
                此外，我們還提供各種不同的配件和個性化選項，以讓您的鍵盤獨一無二。您可以選擇各種款式的鍵帽、背光效果和線材，定制您的打字工具，展現您的獨特風格。
                別再猶豫了！立即訪問我們的鍵盤賣場，探索各種精選鍵盤和令人驚嘆的配件。我們保證您將獲得一個超越預期的打字體驗。
                期待為您提供最佳的鍵盤選擇！
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <img
                  src={
                    'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg'
                  }
                  className="ArticleImg"
                  alt="..."
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </p>
            </div>
            {/* 左下側 文章留言區 */}
            {/* 撰寫區 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: '50px',
                marginBottom: '25px',
              }}
            >
              <Avatar
                src={
                  <img
                    src={
                      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    alt="avatar"
                  />
                }
              />
              <div className="w-100">
                <TextArea
                  value={value}
                  showCount
                  maxLength={200}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Controlled autosize"
                  autoSize={{
                    minRows: 3,
                    maxRows: 6,
                  }}
                  // style={{ margin: '0px 0px 0px 0px' }}
                />
                <button
                  className="btn text-white my-4 w-100"
                  style={ButtonStyle}
                >
                  Add comment
                </button>
              </div>
            </div>

            {/* 發佈列表區 */}
            <List
              itemLayout="horizontal"
              dataSource={artComment}
              renderItem={(item, index) => (
                <List.Item>
                  {/* <div>2023.09.26</div> */}

                  <List.Item.Meta
                    className="mt-3"
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span className="fs-6">{item.title}</span>
                        <span className="text-secondary fw-light fst-italic">
                          2023.09.26
                        </span>
                      </div>
                    }
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
            {/* show more */}
            <div className="d-flex justify-content-center my-4">
              <button
                className="btn border border-primary text-primary"
                style={{ width: '250px' }}
              >
                show more
              </button>
            </div>
          </div>

          {/* 右側欄 */}
          <div className="col-sm-4 ps-sm-5">
            <div className="border-bottom border-2 border-dark mb-4 d-none d-sm-block">
              <h4 className="">文章分類</h4>
            </div>
            {/* 分類表 */}
            <div className="pb-5 d-none d-sm-block">
              <Link href="#" className="text-decoration-none">
                <div className="bg-white position-relative p-2">
                  <p className="text-secondary m-0">公告</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 text-secondary">
                    0
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg text-secondary"></i> */}
                  </div>
                </div>
              </Link>
              <Link href="#" className="text-decoration-none">
                <div className="bg-white position-relative p-2">
                  <p className="text-secondary m-0">開箱文</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 text-secondary">
                    0
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg text-secondary"></i> */}
                  </div>
                </div>
              </Link>
              <Link href="#" className="text-decoration-none">
                <div className="bg-white position-relative p-2">
                  <p className="text-secondary m-0">組裝教學</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 text-secondary">
                    0
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg text-secondary"></i> */}
                  </div>
                </div>
              </Link>
              <Link href="#" className="text-decoration-none">
                <div className="bg-white position-relative p-2">
                  <p className="text-secondary m-0">活動</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 text-secondary">
                    0
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg text-secondary"></i> */}
                  </div>
                </div>
              </Link>
            </div>
            {/* 感興趣列表 */}
            <div className="border-bottom border-2 border-dark mt-5 mb-5">
              <h4 className="fw-bold">你可能感興趣的文章</h4>
            </div>
            {/* 卡片與map函式 */}
            {data.map((item, index) => {
              return (
                <>
                  <Link href="#" className="text-decoration-none">
                    <div
                      className="row pb-2  border-bottom border-2 border-dark"
                      key={index}
                    >
                      <div className="col-4 px-0">
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={item.img}
                            className="ArticleImg"
                            alt="..."
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card border-0">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text text-secondary">
                              {item.user}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
