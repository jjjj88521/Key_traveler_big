import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, List, Space, Input, Tag } from 'antd'
import art_detail_style from '@/styles/article/art_detail_style.module.scss'
import moment from 'moment'
import Link from 'next/link'
import DetailCat from './detail_cat'
import ArticleFilter from './cate/[cat_id]'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import Swal from 'sweetalert2'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Head from 'next/head'

export default function DetailFilter() {
  // 設定路由
  const { auth } = useAuth()
  console.log(auth)
  const router = useRouter()
  const { isReady, query } = router
  const detail_id = query.detail_id
  console.log(router.query.detail_id)

  const [articleContent, setArticleContent] = useState([])
  console.log(articleContent)
  const [CountCate, setCountCate] = useState([])
  const [isLoading, setIsLoading] = useLoading(articleContent)

  // const [artComment, setArtComment] = useState([])
  const [comment, setComment] = useState([])
  const [like, setLike] = useState(false)

  // console.log(comment)
  const getComment = async () => {
    await axios
      .get(`http://localhost:3005/api/article/comment/${detail_id}`)
      .then((response) => {
        console.log('response.data.comments')
        console.log(response.data.comments)
        // setArtComment(response.data.comments)
        setComment(response.data.comments)
      })
    await axios
      .get(`http://localhost:3005/api/article/like/${detail_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('islike', res)
        setLike(res.data.is_liked)
      })
  }
  useEffect(() => {
    if (detail_id === 'cate') {
      router.push('/article/cate/0')
    }
    // useEffect會比前面的21行以前的程式碼都還要早執行 因此我們監控isＲeady的變化
    // 當前面的程式碼都跑完了 這時detail_id才回有值 而isＲeady會是從false變成true
    if (!isReady) return
    axios.get('http://localhost:3005/api/article/').then((response) => {
      console.log('response.data.articles')
      console.log(response.data.articles)
      setArticleContent(response.data.articles)
    })
    axios
      .get('http://localhost:3005/api/article/count_cate')
      .then((response) => {
        console.log('response.data.cates')
        console.log(response.data.cates)
        setCountCate(response.data.cates)
      })

    getComment()
  }, [isReady, auth])
  console.log(auth)

  //對應路由 文章篩選
  const filterArticle = articleContent.find((item) => item.id == detail_id)
  console.log(filterArticle)
  // console.log(filterArticle.article)

  const formatArticle = (article = '') => {
    if (article) {
      const textFormat = article.split('\n').map((v, i) => {
        return <p key={i}>{v}</p>
      })

      return textFormat
    }

    return []
  }
  // console.log(changeFormat)

  //留言顯示功能
  const [displayItemCount, setDisplayItemCount] = useState(3)
  const ShowMore = () => {
    setDisplayItemCount((prevCount) => prevCount + 3)
  }
  // 留言撰寫功能
  const [commentValue, setCommentValue] = useState('')
  // console.log(commentValue)
  // const [creat, setComment] = useState(artComment)
  const { TextArea } = Input
  console.log('creat')
  console.log(comment)

  const handleAddComment = async () => {
    // const newComment = {
    //   user_id: 50,
    //   article_id: detail_id,
    //   comment: commentValue,
    //   create_at: formattedDateTime,
    // }
    const newComment = {
      article_id: detail_id,
      comment: commentValue,
    }
    if (!commentValue) {
      Swal.fire({
        icon: 'warning',
        title: '請填寫評論',
        showConfirmButton: false,
        timer: 1000,
      })
      return
    }

    await axios
      .post(`http://localhost:3005/api/article/addComment`, newComment, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
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
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: '請先登入在評論',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  // 收藏按鈕功能

  const handleAddLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3005/api/article/like/${detail_id}`,
        {},
        { withCredentials: true } // 确保跨域请求时携带凭证信息
      )
      console.log('add', response)
      if (response.data.code === '200') {
        setLike(true)
        Swal.fire({
          icon: 'success',
          title: '成功收藏文章',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '添加失败',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.error('Error adding like:', error)
      Swal.fire({
        icon: 'error',
        title: '请先登入再收藏',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  const handleRemoveLike = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/article/like/${detail_id}`,
        { withCredentials: true } // 确保跨域请求时携带凭证信息
      )

      if (response.data.code === '200') {
        setLike(false)
        Swal.fire({
          icon: 'success',
          title: '成功移除收藏',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '移除失败',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.error('Error adding like:', error)
      Swal.fire({
        icon: 'error',
        title: '请先登入再移除',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  const handleLikeButtonClick = async () => {
    if (!auth.isAuth) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push('/user/login')
      })
      return
    }

    // 判斷是否已收藏
    if (like) {
      // 如果已經收藏，呼叫刪除收藏的函式
      await handleRemoveLike(detail_id)
    } else {
      // 如果尚未收藏，呼叫新增收藏的函式
      await handleAddLike(detail_id)
    }

    // 切換按讚狀態
    // setLike((prevLike) => !prevLike)
  }

  return (
    <>
      <Head>
        <title>{filterArticle ? filterArticle.title : '文章'}</title>
      </Head>
      {/* 手機版分類 */}
      <DetailCat />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="container mb-5  mt-sm-5 mt-3">
          <div className="row">
            {/* 左側欄 */}
            <div className="col-sm-8">
              <div
                className=" border border-1 border-light position-relative"
                style={{
                  padding: '35px 30px',
                  boxShadow: '0 0 0 5px #D9D9D9',
                }}
              >
                {/* 收藏按鈕 */}
                <button
                  // type="button"
                  onClick={handleLikeButtonClick}
                  className="btn border-0"
                >
                  {like ? (
                    <i
                      className="fa-solid fa-heart fa-2xl position-absolute"
                      style={{ top: '20px', right: '10px', color: '#ff0000' }}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart fa-2xl position-absolute"
                      style={{ top: '20px', right: '10px', color: '#D9D9D9' }}
                    ></i>
                  )}
                </button>

                {/* 路由對應文章內容 */}
                {filterArticle ? (
                  <>
                    <h2 className="fw-bolder mt-4">{filterArticle.title}</h2>
                    <h5 className="text-secondary mb-5">
                      <span className="pe-5">by. {auth.user.name}</span>
                      {filterArticle.date}
                    </h5>
                    <p className="">
                      {formatArticle(filterArticle.article)}
                      {/* {changeFormat.map((v) => (
                        <p>{v}</p>
                      ))} */}

                      {/* {filterArticle.img &&
                        filterArticle.img.length > 0 &&
                        JSON.parse(filterArticle.img).map((img, index) => (
                          <img
                            key={index}
                            src={`/article/${img}`}
                            alt={`Image ${index + 1}`}
                            style={{
                              width: '200px',
                              height: '100%',
                              objectFit: 'fill',
                            }}
                          />
                        ))} */}

                      {filterArticle.img &&
                        filterArticle.img.length > 0 &&
                        JSON.parse(filterArticle.img).map((img, index) => (
                          <span key={index} className="image-container p-2">
                            <Image
                              src={`/images/article/${img}`}
                              alt={`Image ${index + 1}`}
                              width={200}
                              height={150}
                              objectFit="cover"
                            />
                          </span>
                        ))}

                      {/* <img
                        className=""
                        src={`/article/${JSON.parse(filterArticle.img)[0]}`}
                        alt="..."
                        style={{
                          width: '200px',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      /> */}
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
                className=""
              >
                <Avatar
                  className="me-2"
                  src={<img src={auth.user.avatar} alt="avatar" />}
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
                dataSource={comment.slice(0, displayItemCount)}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      className="mt-3"
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span className="fs-6">{item.account}</span>
                          <span className="text-secondary fw-light fst-italic fs-6">
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
                    <div
                      className="position-absolute end-0 top-50 translate-middle me-4 "
                      style={{ width: '20px' }}
                    >
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
                    <div
                      className="position-absolute end-0 top-50 translate-middle me-4 "
                      style={{ width: '20px' }}
                    >
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
                    <div
                      className="position-absolute end-0 top-50 translate-middle me-4 "
                      style={{ width: '20px' }}
                    >
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
                    <div
                      className="position-absolute end-0 top-50 translate-middle me-4 "
                      style={{ width: '20px' }}
                    >
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
              <div className="border-bottom border-2 border-dark mt-5 mb-4">
                <h4 className="fw-bold">你可能感興趣的文章</h4>
              </div>
              {/* 卡片與map函式 */}
              {articleContent
                .filter(
                  (item) => parseInt(item.id) >= 24 && parseInt(item.id) <= 28
                )
                .map((item, index) => {
                  const parsedImg = JSON.parse(item.img)

                  return (
                    <>
                      <Link
                        href={`/article/${item.id}`}
                        className="text-decoration-none"
                      >
                        <div
                          className={`${art_detail_style['interest_card']} row py-2 border-bottom border-2 border-dark`}
                          key={index}
                        >
                          <div className="col-4 px-3">
                            <div
                              className=""
                              style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={`/images/article/${parsedImg[0]}`}
                                className="ArticleImg"
                                alt="..."
                                style={{
                                  width: '100px',
                                  height: '100px',
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
                                <h5 className="card-title">
                                  {item.title.length > 14
                                    ? `${item.title.slice(0, 14)}...`
                                    : item.title}
                                </h5>
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
      )}
    </>
  )
}
