import { React, useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar, List, Rate, Drawer, Tag } from 'antd'
import style from './comments.module.scss'
import UserLayout from '@/components/layout/user-layout'
import { Radio } from 'antd'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import CommentItem from '@/components/product/ProductTab/review-tab/comment-item'
import PaginationComponent from '@/components/common/PaginationComponent'

const moment = require('moment')

const commentsData = [
  // {
  //   key: 0,
  //   user: 'User',
  //   star: 4.2,
  //   description: '很棒很好用1',
  //   name: '商品名稱1',
  //   category1: '規格1',
  //   category2: '規格2',
  //   createTime: '2023-08-27 16:06:44',
  // },
  // {
  //   key: 1,
  //   user: 'User',
  //   star: 4.5,
  //   description: '很棒很好用2',
  //   name: '商品名稱2',
  //   category1: '規格3',
  //   category2: '規格4',
  //   createTime: '2023-08-26 16:06:44',
  // },
  // {
  //   key: 2,
  //   user: 'User',
  //   star: 4.0,
  //   description: '很棒很好用3',
  //   name: '商品名稱3',
  //   category1: '規格5',
  //   category2: '規格6',
  //   createTime: '2023-08-25 16:06:44',
  // },
  // {
  //   key: 3,
  //   user: 'User',
  //   star: 3.5,
  //   description: '很棒很好用4',
  //   name: '商品名稱4',
  //   category1: '規格7',
  //   category2: '規格8',
  //   createTime: '2023-08-24 16:06:44',
  // },
]
//  Database for commentsData
// const commentsData = [{
//     user:user.account,
//     star:comment.star,
//     description:comment.comment,
//     name:comment.product_id,
//     category1:name.category_1,
//     category2:name.category_2,
//     createTime:comment.create_at,
// }]

//  Database for commentsYetData
// 撈資料表的時候user_order.status成立且user_order_list.is_comment撈尚未評價的
// 新增完評價ser_order_list.is_comment要更新狀態且INSERT資料庫comment內容
// const commentsYetData = [
//     {
//       id:user_order_list.order_id
//       name: name.id,
//       productPic:name.images[0]
//       category1:name.category_1,
//       category2:name.category_2,
//       is_comment: user_order_list.is_comment===false,
//     }]

// const commentsYetData = [
//   {
//     order_id: '20231010001',
//     name: 'product1',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格1',
//     category2: '規格2',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010001',
//     name: 'product2',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格3',
//     category2: '規格4',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product3',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格5',
//     category2: '規格6',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product4',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product5',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product5',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product5',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product5',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
//   {
//     order_id: '20231010003',
//     name: 'product5',
//     productPic:
//       'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
//     category1: '規格7',
//     category2: '規格8',
//     is_comment: false,
//   },
// ]
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
  const { auth, setAuth } = useAuth()
  const user_id = auth.user.id
  // console.log(user_id)
  const [commentData, setCommentData] = useState([]) // 獲取還沒評價的商品
  const [allComments, setAllComments] = useState({})
  const [isLoading, setIsLoading] = useLoading(commentData.data)
  const [allCommentLoading, setAllCommentLoading] = useLoading(
    allComments.comments
  )

  const getComment = async (page) => {
    const apiUrl = `http://localhost:3005/api/user_comment/yet_comment`

    await axios
      .get(apiUrl, {
        params: { page },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(true)
          // console.log('成功獲取數據：', response.data)
          const data = res.data
          // console.log(data)
          setCommentData(data)
          // 在這裡處理從API返回的數據
        }
      })
      .catch((error) => {
        console.error('獲取數據時出錯：', error)
        // 在這裡處理错误
      })
  }
  // console.log('還未評價', commentData.data)

  const getAllComments = async (page) => {
    const url = 'http://localhost:3005/api/user_comment/all-comments'

    await axios
      .get(url, { params: { page }, withCredentials: true })
      .then((res) => {
        // console.log(res)
        // setIsLoading(true)
        if (res.status === 200) {
          setAllComments(res.data)
        }
      })
      .catch((err) => {
        console.log('獲取數據出錯：', err)
      })
  }

  useEffect(() => {
    getComment()
    getAllComments()
  }, [])

  // const data = commentData.map((v) => {
  //   // console.log(v)
  //   return {
  //     ...v,
  //     is_comment: v.is_comment === 'false' ? false : true,
  //   }
  // })

  // console.log(data)

  const [tagKey, setTagKey] = useState('1')

  const tagsOnChange = (e) => {
    // console.log('tab key:' + key)
    setTagKey(e.target.value)
    getAllComments()
  }

  //   drawer
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  // console.log('選到的', selectedItem)
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
  const [updateData, setUpdateData] = useState([])
  const [updateYetData, setUpdateYetData] = useState([])

  // useEffect(() => {
  //   data.map((v) => {
  //     if (v.is_comment === false) {
  //       setUpdateYetData(data)
  //       // console.log(data)
  //     }
  //   })
  // }, [auth])

  // 待評價star
  const [star, setStar] = useState(0)
  const handleSetStar = (value) => {
    // console.log(value)
    setStar(value)
  }
  // 評論內容
  const [textareaValue, setTextareaValue] = useState('')
  const handleTextareaChange = (e) => {
    // console.log(e.target.value)
    setTextareaValue(e.target.value)
  }

  const handleAddComment = async () => {
    // console.log('textareaValue' + textareaValue)
    // console.log('star' + star)
    // console.log(selectedItem.name)
    // console.log(Object.values(JSON.parse(selectedItem.spec)))
    const style = selectedItem.spec
      ? Object.values(JSON.parse(selectedItem.spec)).map((item) => item[0])
      : null
    const newComment = {
      order_id: selectedItem.order_id,
      product_id: selectedItem.id,
      user_id: user_id,
      star: star,
      comment: textareaValue,
      style: style ? JSON.stringify(style) : '',
    }

    // console.log('表單', newComment)
    // 將commentsData新增該筆資料
    // const newComment = {
    //   key: updateData.length, // 为新項分配一個唯一的鍵
    //   user: 'User', // 新項的標題
    //   star: star,
    //   description: textareaValue,
    //   name: '商品名稱123',
    //   category1: '規格321',
    //   category2: '規格246',
    //   createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    // }
    if (star === 0) {
      Swal.fire({
        icon: 'error',
        title: '請點星星輸入評分',
        showConfirmButton: false,
        timer: 1500,
      })
    } else if (textareaValue.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '請輸入評論',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      await axios
        .post(`http://localhost:3005/api/user_comment/addComment`, newComment)
        .then((response) => {
          // console.log(response)
          if (response.data.code !== '200') {
            throw new Error('添加失敗')
          }
          Swal.fire({
            icon: 'success',
            title: '添加評論成功',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            getComment()
          })
        })
        .catch((err) => {
          // console.log(err)
          Swal.fire({
            icon: 'error',
            title: '失敗',
            showConfirmButton: false,
            timer: 1500,
          })
          // console.log(newComment)
        })
      setUpdateData([newComment, ...updateData])
      // 將commentsYetData刪除該筆資料
      if (selectedItem) {
        // 更新 is_comment 属性為 true
        const updatedData = updateYetData.map((item) =>
          item === selectedItem ? { ...item, is_comment: true } : item
        )

        // 刷新渲染
        // 更新 is_comment 屬性後，您可以選擇重新渲染整個组件或僅更新數據源
        // 這裡演示重新渲染整個组件的方式
        setUpdateYetData(updatedData)
        onClose()
      }
    }
  }
  let yetcom = 0
  // 檢查是否所有數據的 is_comment 都為 true
  const allItemsAreComment = updateYetData.every(
    (dataItem) => dataItem.is_comment === true
  )
  updateYetData.forEach((itemdata) => {
    itemdata.is_comment === false ? yetcom++ : yetcom
    // console.log('yetcom=' + yetcom)
  })
  const [visibleItemCount, setVisibleItemCount] = useState(4)
  const handleLoadMore = () => {
    const newVisibleItemCount = visibleItemCount + 3
    setVisibleItemCount(newVisibleItemCount)
  }
  const hasMoreData = updateYetData.length > visibleItemCount

  // 我的評價的分頁
  const handlePageChange = (page) => {
    // setAllCommentLoading(true)
    getAllComments(page)
  }
  return (
    <>
      <UserLayout title={'我的評價'}>
        <Radio.Group
          onChange={tagsOnChange}
          value={tagKey}
          style={{
            marginBottom: 8,
          }}
        >
          <Radio.Button value="1">待評價</Radio.Button>
          <Radio.Button value="2">我的評價</Radio.Button>
        </Radio.Group>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="" style={{ height: '1100px' }}>
            <table className="table table-borderless mt-2">
              <thead>
                <tr>
                  <th
                    className="bg-primary text-white"
                    scope="col"
                    height={34}
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {tagKey === '1' ? (
                      commentData.data.length === 0 ? (
                        <div className="h3 text-danger">尚無待評價之商品</div>
                      ) : (
                        <div>
                          <List
                            dataSource={commentData.data}
                            itemLayout="vertical"
                            renderItem={(item) => {
                              const specs = JSON.parse(item.spec)
                              return (
                                <List.Item
                                  key={item.key}
                                  className="border-bottom border-secondary-subtle"
                                  extra={
                                    <div className="h-100">
                                      <a
                                        href="#"
                                        className={`${style['toComment']} text-primary py-3`}
                                        onClick={() => showDrawer(item)} // 傳遞當前 List.Item 作為参數
                                      >
                                        去評價
                                        <i className="fa-regular fa-hand-point-left ms-2"></i>
                                      </a>
                                      <a
                                        href="#"
                                        type="button"
                                        className={`${style['toCommentMobile']} text-primary `}
                                        onClick={() => showDrawer(item)} // 傳遞當前 List.Item 作為参數
                                      >
                                        去評價
                                      </a>
                                    </div>
                                  }
                                >
                                  <div className={`${style['yet']}`}>
                                    <a className="ms-2 text-light rounded bg-primary p-1">
                                      訂單編號: {item.order_id}
                                    </a>
                                    {item && (
                                      <Link
                                        href="/"
                                        className="d-flex align-items-center px-3"
                                      >
                                        <img
                                          width={60}
                                          height={60}
                                          src={`/images/product/${
                                            JSON.parse(item.images)[0]
                                          }`}
                                          alt=""
                                        />
                                        <p
                                          className={`mb-0 ms-2 ${style['custom-link']}`}
                                        >
                                          {item.name}
                                        </p>
                                      </Link>
                                    )}
                                    {item.spec && (
                                      <div className="d-flex justify-content-center">
                                        {Object.values(specs).map(
                                          (item, index) => {
                                            return (
                                              <span
                                                key={index}
                                                className="text-primary pe-3"
                                              >
                                                {item[0]}
                                              </span>
                                            )
                                          }
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className={`${style['yetMobile']}`}>
                                    {item && (
                                      <Link
                                        href="/"
                                        className="d-flex align-items-center ps-2"
                                      >
                                        <img
                                          width={65}
                                          height={65}
                                          src={`/images/product/${
                                            JSON.parse(item.images)[0]
                                          }`}
                                          alt=""
                                        />
                                        <p
                                          className={`mb-0 ${style['custom-link']} ps-3`}
                                        >
                                          {item.name}
                                        </p>
                                      </Link>
                                    )}
                                    <a
                                      className={`${style['item_order']} mt-3 text-light rounded bg-primary p-1`}
                                    >
                                      訂單編號:{item.order_id}
                                    </a>
                                    <div className="mt-3 d-flex">
                                      規格：
                                      {item.spec && (
                                        <div className="d-flex flex-column">
                                          {Object.values(specs).map(
                                            (item, index) => {
                                              return (
                                                <span
                                                  key={index}
                                                  className="text-secondary"
                                                >
                                                  {item}
                                                </span>
                                              )
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
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
                                            src={`/images/product/${
                                              JSON.parse(selectedItem.images)[0]
                                            }`}
                                            alt=""
                                          />
                                          <p className="my-0 ms-2">
                                            {selectedItem.name}
                                          </p>
                                          {/* 其他項目的渲染 */}
                                        </div>
                                        {selectedItem.spec && (
                                          <p className="mt-3">
                                            規格{' '}
                                            {Object.values(
                                              JSON.parse(selectedItem.spec)
                                            ).map((item, index) => {
                                              return (
                                                <span
                                                  key={index}
                                                  className="pe-3 text-primary"
                                                >
                                                  {item[0]}
                                                </span>
                                              )
                                            })}
                                          </p>
                                        )}
                                        <div className="mt-3">
                                          <div className="d-flex align-items-center">
                                            <Rate
                                              // allowHalf
                                              onChange={handleSetStar}
                                              style={{ fontSize: '1.2rem' }}
                                              value={star}
                                              defaultValue={0}
                                            />
                                            {star ? (
                                              <p className="ms-2 my-0 starNum">
                                                {star}
                                              </p>
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
                                              onClick={handleAddComment}
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
                              )
                            }}
                          />
                          <div className="mt-3">
                            <PaginationComponent
                              totalItems={commentData.total}
                              currentPage={Number(commentData.page)}
                              onPageChange={(page) => {
                                getComment(page)
                              }}
                              pageSize={5}
                            />
                          </div>

                          {/* {hasMoreData ? (
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-primary px-5 mt-3"
                                onClick={handleLoadMore}
                              >
                                看更多
                              </button>
                            </div>
                          ) : (
                            <div className="text-primary w-100 text-center p-3">
                              已經到底了!
                            </div>
                          )} */}
                        </div>
                      )
                    ) : allCommentLoading ? (
                      <LoadingPage />
                    ) : (
                      <>
                        <List
                          dataSource={allComments.comments}
                          itemLayout="vertical"
                          renderItem={(item) => (
                            <List.Item
                              className="border-bottom border-secondary-subtle"
                              // extra={
                              //   <div className={`text-end text-secondary`}>
                              //     {item.created_time}
                              //   </div>
                              // }
                            >
                              <List.Item.Meta
                                // avatar={<Avatar src={auth.user.avatar} />}
                                title={
                                  <div>
                                    <div className="d-flex justify-content-between h6">
                                      {/* <h6>{auth.user.account}</h6> */}
                                      <div
                                        className={`text-end text-secondary`}
                                      >
                                        {item.created_time}
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-sm-center gap-2 flex-column flex-sm-row">
                                      <Link
                                        href={`/product/${item.p_cate1}/${item.p_cate2}/${item.product_id}`}
                                        className="d-flex align-items-center"
                                      >
                                        <p
                                          className={`mb-0 ${style['custom-link']} fs-6 fw-bold`}
                                        >
                                          {item.product_name}
                                        </p>
                                      </Link>
                                      <div>
                                        {Object.values(
                                          JSON.parse(item.style).map(
                                            (item, index) => {
                                              return (
                                                <Tag
                                                  key={index}
                                                  color="#dc9329"
                                                >
                                                  {item}
                                                </Tag>
                                              )
                                            }
                                          )
                                        )}
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
                              <div
                                style={{
                                  marginTop: '16px',
                                }}
                              >
                                <div className={`${style['createTimeMobile']}`}>
                                  {item.createTime}
                                </div>
                                <p className="mt-1 h6 fw-bold">
                                  {item.comment}
                                </p>
                              </div>
                            </List.Item>
                            // <CommentItem
                            //   user_account={auth.user.account}
                            //   avatar_img={auth.user.Avatar}
                            //   star={item.star}
                            //   created_time={item.created_time}
                            //   comment={item.comment}
                            //   style={item.style}
                            // />
                          )}
                        />
                        <div className="mt-3">
                          <PaginationComponent
                            totalItems={allComments.total}
                            currentPage={allComments.page}
                            pageSize={5}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </UserLayout>
    </>
  )
}
