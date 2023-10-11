import { React, useState } from 'react'
import Link from 'next/link'
import { Tabs, Avatar, List, Rate, Drawer } from 'antd'
import style from './comments.module.scss'
import UserLayout from '@/components/layout/user-layout'
const moment = require('moment')

const commentsData = [
  {
    key: 0,
    user: 'User',
    star: 4.2,
    description: '很棒很好用1',
    product: '商品名稱1',
    category1: '規格1',
    category2: '規格2',
    createTime: '2023-08-27 16:06:44',
  },
  {
    key: 1,
    user: 'User',
    star: 4.5,
    description: '很棒很好用2',
    product: '商品名稱2',
    category1: '規格3',
    category2: '規格4',
    createTime: '2023-08-26 16:06:44',
  },
  {
    key: 2,
    user: 'User',
    star: 4.0,
    description: '很棒很好用3',
    product: '商品名稱3',
    category1: '規格5',
    category2: '規格6',
    createTime: '2023-08-25 16:06:44',
  },
  {
    key: 3,
    user: 'User',
    star: 3.5,
    description: '很棒很好用4',
    product: '商品名稱4',
    category1: '規格7',
    category2: '規格8',
    createTime: '2023-08-24 16:06:44',
  },
]
//  Database for commentsData
// const commentsData = [{
//     user:user.account,
//     star:comment.star,
//     description:comment.comment,
//     product:comment.product_id,
//     category1:product.category_1,
//     category2:product.category_2,
//     createTime:comment.create_at,
// }]

//  Database for commentsYetData
// 撈資料表的時候user_order.status成立且user_order_list.is_comment撈尚未評價的
// 新增完評價ser_order_list.is_comment要更新狀態且INSERT資料庫comment內容
// const commentsYetData = [
//     {
//       id:user_order_list.order_id
//       product: product.id,
//       productPic:product.images[0]
//       category1:product.category_1,
//       category2:product.category_2,
//       isComment: user_order_list.is_comment===false,
//     }]
const commentsYetData = [
  {
    orderId: '20231010001',
    product: 'product1',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格1',
    category2: '規格2',
    isComment: false,
  },
  {
    orderId: '20231010001',
    product: 'product2',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格3',
    category2: '規格4',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product3',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格5',
    category2: '規格6',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product4',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product5',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product5',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product5',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product5',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
  {
    orderId: '20231010003',
    product: 'product5',
    productPic:
      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    category1: '規格7',
    category2: '規格8',
    isComment: false,
  },
]
const items = [
  {
    key: '1',
    label: '待評價',
    // children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: '我的評價',
    // children: 'Content of Tab Pane 2',
  },
]

export default function Comments() {
  const [tabkey, setTabkey] = useState('1')

  const tabsOnChange = (key) => {
    // console.log('tab key:' + key)
    setTabkey(key)
  }

  //   drawer
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const showDrawer = (item) => {
    // console.log('click item' + item.productPic)
    setSelectedItem(item)
    setOpen(true)
  }
  const onClose = () => {
    setSelectedItem(null)
    setStar(0)
    setTextareaValue('')
    setOpen(false)
  }
  //   drawer

  // 新增評價
  const [updateData, setUpdateData] = useState(commentsData)
  const [updateYetData, setUpdateYetData] = useState(commentsYetData)

  // 待評價star
  const [star, setStar] = useState(0)
  const handleSetStar = (value) => {
    console.log(value)
    setStar(value)
  }
  // 評論內容
  const [textareaValue, setTextareaValue] = useState('')
  const handleTextareaChange = (e) => {
    console.log(e.target.value)
    setTextareaValue(e.target.value)
  }

  const handleNewComment = () => {
    console.log('textareaValue' + textareaValue)
    console.log('star' + star)
    console.log(selectedItem.product)

    // 將commentsData新增該筆資料
    const newComment = {
      key: updateData.length, // 为新项分配一个唯一的键
      user: 'User', // 新项的标题
      star: star,
      description: textareaValue,
      product: '商品名稱123',
      category1: '規格321',
      category2: '規格246',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    if (star === 0) {
      alert('請評分(最少為0.5顆星)')
    } else if (textareaValue.length === 0) {
      alert('請輸入評論內容')
    } else {
      setUpdateData([newComment, ...updateData])
      // 將commentsYetData刪除該筆資料
      if (selectedItem) {
        // 更新 isComment 属性为 true
        const updatedData = updateYetData.map((item) =>
          item === selectedItem ? { ...item, isComment: true } : item
        )

        // 刷新渲染
        // 更新 isComment 属性后，您可以选择重新渲染整个组件或仅更新数据源
        // 这里演示重新渲染整个组件的方式
        setUpdateYetData(updatedData)
        onClose()
      }
    }
  }
  let yetcom = 0
  // 检查是否所有数据的 isComment 都为 true
  const allItemsAreComment = updateYetData.every(
    (dataItem) => dataItem.isComment === true
  )
  updateYetData.forEach((itemdata) => {
    itemdata.isComment === false ? yetcom++ : yetcom
    console.log('yetcom=' + yetcom)
  })
  const [visibleItemCount, setVisibleItemCount] = useState(3)
  const handleLoadMore = () => {
    const newVisibleItemCount = visibleItemCount + 3
    setVisibleItemCount(newVisibleItemCount)
  }
  const hasMoreData = updateYetData.length > visibleItemCount

  return (
    <UserLayout title={'商品評價'}>
      <div className="col-10 offset-1 col-sm-9">
        <div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={tabsOnChange}
            type="card"
            style={{ margin: '0 -15px' }}
          />
        </div>
        <div>
          {tabkey === '1' ? (
            allItemsAreComment ? (
              <div className="h3 text-danger">尚無待評價之商品</div>
            ) : (
              <div>
                <List
                  dataSource={updateYetData.slice(0, visibleItemCount)}
                  itemLayout="vertical"
                  renderItem={(item) => {
                    return item.isComment === false ? (
                      <List.Item
                        key={item.key}
                        extra={
                          <div className="h-100">
                            <a
                              href="#"
                              className={`${style['toComment']} text-primary py-3`}
                              onClick={() => showDrawer(item)} // 传递当前 List.Item 作为参数
                            >
                              去評價
                              <i class="fa-regular fa-hand-point-left ms-2"></i>
                            </a>
                            <a
                              href="#"
                              type="button"
                              className={`${style['toCommentMobile']} text-primary `}
                              onClick={() => showDrawer(item)} // 传递当前 List.Item 作为参数
                            >
                              去評價
                            </a>
                          </div>
                        }
                      >
                        <div className={`${style['yet']}`}>
                          <Link href="/" className="d-flex align-items-center">
                            <img height={50} src={item.productPic} />
                            <p className={`mb-0 ms-2 ${style['custom-link']}`}>
                              {item.product}
                            </p>
                          </Link>
                          <a className="ms-4 text-light rounded bg-primary p-1">
                            訂單編號:{item.orderId}
                          </a>
                        </div>
                        <div className={`${style['yetMobile']}`}>
                          <Link href="/" className="d-flex align-items-center">
                            <img height={50} src={item.productPic} />
                            <p className={`mb-0 ms-2 ${style['custom-link']}`}>
                              {item.product}
                            </p>
                          </Link>
                          <a
                            className={`${style['item_order']} mt-3 text-light rounded bg-primary p-1`}
                          >
                            訂單編號:{item.orderId}
                          </a>
                        </div>

                        <Drawer
                          // title="Comment Info"
                          placement="right"
                          open={open}
                          closeIcon={false}
                          keyboard={false}
                          maskClosable={false}
                        >
                          {selectedItem && (
                            <div>
                              <div className="d-flex align-items-center">
                                <img
                                  height={50}
                                  src={selectedItem.productPic}
                                />

                                <p className="my-0 ms-2">
                                  {selectedItem.product}
                                </p>
                                <p className="my-0 ms-1">
                                  {selectedItem.category1}
                                </p>
                                <p className="my-0 ms-1">
                                  {selectedItem.category2}
                                </p>
                                {/* 其他项目的渲染 */}
                              </div>
                              <div className="mt-3">
                                <div className="d-flex align-items-center">
                                  <Rate
                                    allowHalf
                                    onChange={handleSetStar}
                                    style={{ fontSize: '1.2rem' }}
                                    value={star}
                                    defaultValue={0}
                                  />
                                  {star ? (
                                    <p className="ms-2 my-0 starNum">{star}</p>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <div className="mt-3">
                                  <p>評論內容:</p>
                                  <textarea
                                    className="form-control"
                                    id="comment_area"
                                    placeholder="請輸入評價內容"
                                    value={textareaValue}
                                    onChange={handleTextareaChange}
                                  ></textarea>
                                </div>
                                <div className="mt-3">
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleNewComment}
                                  >
                                    新增
                                  </button>
                                  <button
                                    className="btn btn-secondary ms-2"
                                    onClick={onClose}
                                  >
                                    取消
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Drawer>
                      </List.Item>
                    ) : (
                      ''
                    )
                  }}
                />
                {hasMoreData ? (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary px-5"
                      onClick={handleLoadMore}
                    >
                      看更多
                    </button>
                  </div>
                ) : (
                  <div className="text-primary w-100 text-center">
                    已經到底了!
                  </div>
                )}
              </div>
            )
          ) : (
            <List
              dataSource={updateData}
              itemLayout="vertical"
              renderItem={(item) => (
                <List.Item
                  extra={
                    <div className={`text-end ${style['createTime']}`}>
                      {item.createTime}
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=5`}
                      />
                    }
                    title={
                      <div>
                        {item.user}
                        <div className=" mt-1 d-flex align-items-center">
                          <Link href="/" className="d-flex align-items-center">
                            <p className={`mb-0 ${style['custom-link']}`}>
                              {item.product}
                            </p>
                          </Link>
                          <div
                            className="ms-3 bg-primary text-light rounded px-1"
                            style={{
                              fontSize: '0.8rem',
                              paddingTop: '0.1rem',
                              paddingBottom: '0.1rem',
                            }}
                          >
                            {item.category1}
                          </div>
                          <div
                            className="ms-1 bg-primary text-light rounded px-1"
                            style={{
                              fontSize: '0.8rem',
                              paddingTop: '0.1rem',
                              paddingBottom: '0.1rem',
                            }}
                          >
                            {item.category2}
                          </div>
                        </div>
                      </div>
                    }
                    description={
                      <div className="d-flex align-items-center">
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={item.star}
                          style={{ fontSize: '0.9rem' }}
                        />
                        <p className="ms-2 my-0">{item.star}</p>
                      </div>
                    }
                  />
                  <div style={{ marginLeft: '48px' }}>
                    <div className={`${style['createTimeMobile']}`}>
                      {item.createTime}
                    </div>
                    <div className="mt-1">{item.description}</div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </UserLayout>
  )
}
