import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, List, Space, Input, Tag } from 'antd'
import art_detail_style from '@/styles/article/art_detail_style.module.scss'
import moment from 'moment'
import Link from 'next/link'
import DetailCat from './detail_cat'
import ArticleFilter from './cate/[cat_id]'
import axios from 'axios'

export default function DetailFilter() {
  // 設定路由
  const router = useRouter()
  const { isReady, query } = router
  const detail_id = query.detail_id
  console.log(router.query.detail_id)

  const [ArticleContent, setArticleContent] = useState([])
  const [CountCate, setCountCate] = useState([])
  // const [artComment, setArtComment] = useState([])
  const [creat, setCreat] = useState([])
  console.log(creat)
  useEffect(() => {
    // useEffect會比前面的21行以前的程式碼都還要早執行 因此我們監控isＲeady的變化
    // 當前面的程式碼都跑完了 這時detail_id才回有值 而isＲeady會是從false變成true
    if (!isReady) return
    axios.get('http://localhost:3005/apitest/aticle/').then((response) => {
      console.log('response.data.articles')
      console.log(response.data.articles)
      setArticleContent(response.data.articles)
    })
    axios
      .get('http://localhost:3005/apitest/aticle/count_cate')
      .then((response) => {
        console.log('response.data.cates')
        console.log(response.data.cates)
        setCountCate(response.data.cates)
      })
    axios
      .get(`http://localhost:3005/apitest/aticle/comment/${detail_id}`)
      .then((response) => {
        console.log('response.data.comments')
        console.log(response.data.comments)
        // setArtComment(response.data.comments)
        setCreat(response.data.comments)
      })
  }, [isReady])

  //對應路由 文章篩選
  const filterArticle = ArticleContent.find((item) => item.id == detail_id)
  console.log(filterArticle)
  // 收藏按鈕功能
  const [like, setLike] = useState(false)

  // 感興趣列表物件
  const interesrData = [
    {
      title: 'interest title',
      img: 'https://keebsforall.com/cdn/shop/products/DSC00941.jpg?v=1689791499&width=1000',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://keebsforall.com/cdn/shop/products/DSC00941.jpg?v=1689791499&width=1000',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://keebsforall.com/cdn/shop/products/DSC00941.jpg?v=1689791499&width=1000',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://keebsforall.com/cdn/shop/products/DSC00941.jpg?v=1689791499&width=1000',
      user: 'by.user_id',
    },
    {
      title: 'interest title',
      img: 'https://keebsforall.com/cdn/shop/products/DSC00941.jpg?v=1689791499&width=1000',
      user: 'by.user_id',
    },
  ]
  // 留言列表物件
  // const formattedDateTime = moment().format('DD/MM/YYYY HH:mm:ss A')
  const formattedDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

  //  留言顯示功能
  //   {
  //     user_id: 'Ant Design Title 1',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 2',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 3',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 4',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 5',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 6',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  //   {
  //     user_id: 'Ant Design Title 7',
  //     create_at: '2023',
  //     comment: '輸入內容',
  //   },
  // ]
  // const artComment = {
  //   1: [
  //     {
  //       title: 'Route1 Title 1',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 2',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 3',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 4',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 5',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 6',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route1 Title 7',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //   ],
  //   2: [
  //     {
  //       title: 'Route2 Title 1',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 2',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 3',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 4',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 5',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 6',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route2 Title 7',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //   ],
  //   3: [
  //     {
  //       title: 'Route3 Title 1',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 2',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 3',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 4',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 5',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 6',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route3 Title 7',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //   ],
  //   4: [
  //     {
  //       title: 'Route4 Title 1',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 2',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 3',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 4',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 5',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 6',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //     {
  //       title: 'Route4 Title 7',
  //       date: '2023',
  //       description: '輸入內容',
  //     },
  //   ],
  // }
  //   console.log(artComment[1])

  // const articleData = artComment[detail_id] || []
  //   console.log(articleData)
  // console.log(artComment[detail_id])
  //留言顯示功能
  const [displayItemCount, setDisplayItemCount] = useState(3)
  const ShowMore = () => {
    setDisplayItemCount((prevCount) => prevCount + 3)
  }
  // 留言撰寫功能
  const [commentValue, setCommentValue] = useState('')
  // console.log(commentValue)
  // const [creat, setCreat] = useState(artComment)
  const { TextArea } = Input
  console.log('creat')
  console.log(creat)

  const handleAddComment = () => {
    const newComment = {
      user_id: 50,
      article_id: detail_id,
      comment: commentValue,
      create_at: formattedDateTime,
    }
    axios
      .post(`http://localhost:3005/apitest/aticle/addComent`, newComment)
      .then((response) => {
        console.log('success add comment')
        setCreat([newComment, ...creat])
        setCommentValue('')
      })
  }

  //   const [cateCount, setCateCount] = useState(0)
  //   useEffect(() => {
  //     const personalCateCount = ArticleFilter.filter(
  //       (item) => item.cate === '公告'
  //     )
  //     setCateCount(personalCateCount)
  //   }, [])

  return (
    <>
      {/* 手機版分類 */}
      <DetailCat />

      <div className="container mb-5  mt-sm-5 mt-3">
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
              {/* 收藏按鈕 */}
              <Link
                href="#"
                // type="button"
                onClick={() => {
                  like ? setLike(false) : setLike(true)
                }}
              >
                {like ? (
                  <i
                    className="fa-solid fa-heart fa-2xl position-absolute"
                    style={{ top: '20px', right: '10px', color: '#ff0000' }}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-heart fa-2xl position-absolute"
                    style={{ top: '20px', right: '10px' }}
                  ></i>
                )}
              </Link>

              {/* 路由對應文章內容 */}
              {filterArticle ? (
                <>
                  <h2 className="fw-bolder mt-4">{filterArticle.title}</h2>
                  <h5 className="text-secondary mb-5">
                    <span className="pe-5">by. {filterArticle.user_id}</span>
                    {filterArticle.date}
                  </h5>
                  <p className="">
                    {filterArticle.article}
                    <img
                      className=""
                      src={filterArticle.img}
                      alt="..."
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </p>
                </>
              ) : (
                <p>No content found for ID {detail_id}</p>
              )}
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
                  value={commentValue}
                  showCount
                  maxLength={200}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Controlled autosize"
                  autoSize={{
                    minRows: 3,
                    maxRows: 6,
                  }}
                  // style={{ margin: '0px 0px 0px 0px' }}
                />
                <button
                  className="btn btn-primary text-white my-4 w-100"
                  // style={ButtonStyle}
                  onClick={handleAddComment}
                >
                  Add comment
                </button>
              </div>
            </div>

            {/* 發佈列表區 */}
            <List
              itemLayout="horizontal"
              dataSource={creat.slice(0, displayItemCount)}
              renderItem={(item, index) => (
                <List.Item>
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
                        <span className="fs-6">{item.account}</span>
                        <span className="text-secondary fw-light fst-italic">
                          {item.create_at}
                        </span>
                      </div>
                    }
                    description={item.comment}
                  />
                </List.Item>
              )}
            />
            {/* show more */}
            <div className="d-flex justify-content-center my-4">
              <button
                className={`${art_detail_style['showMoreBTN']} btn border border-primary`}
                // className="btn border border-primary text-primary"
                style={{ width: '250px' }}
                onClick={ShowMore}
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
              <Link href="/article/cate/1" className="text-decoration-none">
                <div
                  className={`${art_detail_style['category']} position-relative p-2`}
                >
                  <p className=" m-0">公告</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 ">
                    {CountCate.map((item) => {
                      if (item.cate === '公告') {
                        return item.count
                      }
                    })}
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg "></i> */}
                  </div>
                </div>
              </Link>
              <Link href="/article/cate/2" className="text-decoration-none">
                <div
                  className={`${art_detail_style['category']} position-relative p-2`}
                >
                  <p className=" m-0">開箱文</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 ">
                    {CountCate.map((item) => {
                      if (item.cate === '開箱文') {
                        return item.count
                      }
                    })}
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg "></i> */}
                  </div>
                </div>
              </Link>
              <Link href="/article/cate/3" className="text-decoration-none">
                <div
                  className={`${art_detail_style['category']} position-relative p-2`}
                >
                  <p className=" m-0">組裝教學</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 ">
                    {CountCate.map((item) => {
                      if (item.cate === '組裝教學') {
                        return item.count
                      }
                    })}
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg "></i> */}
                  </div>
                </div>
              </Link>
              <Link href="/article/cate/4" className="text-decoration-none">
                <div
                  className={`${art_detail_style['category']} position-relative p-2`}
                >
                  <p className=" m-0">活動</p>
                  <div className="position-absolute end-0 top-50 translate-middle me-4 ">
                    {CountCate.map((item) => {
                      if (item.cate === '活動') {
                        return item.count
                      }
                    })}
                    {/* <i className="fa-solid fa-circle-chevron-right fa-lg "></i> */}
                  </div>
                </div>
              </Link>
            </div>
            {/* 感興趣列表 */}
            <div className="border-bottom border-2 border-dark mt-5 mb-5">
              <h4 className="fw-bold">你可能感興趣的文章</h4>
            </div>
            {/* 卡片與map函式 */}
            {interesrData.map((item, index) => {
              return (
                <>
                  <Link href="#" className="text-decoration-none">
                    <div
                      className={`${art_detail_style['interest_card']} row py-2 border-bottom border-2 border-dark`}
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
                        <div
                          className="card border-0"
                          style={{ backgroundColor: 'transparent' }}
                        >
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
