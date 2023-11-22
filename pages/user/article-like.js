import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Divider, Radio, Space, Tag } from 'antd'
import axios from 'axios'
import PaginationComponent from '@/components/common/PaginationComponent'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
// import UserDropdown from '@/components/user/user-dropdown'
// import UserSideBar from './user-side-bar'
// import UserSideBarMobile from '../../components/user/user-side-bar-mobile'
import UserLayout from '@/components/layout/user-layout'
import {
  ArticleLikeContainer,
  ArticleLikeItem,
} from '@/components/user/article-like'
import { number } from 'prop-types'
import Swal from 'sweetalert2'

export default function Article() {
  const [total, setTotal] = useState(0)
  const [cate, setCate] = useState('all')
  const [page, setPage] = useState(1)
  const [like, setLike] = useState([])
  const articleLike = async (page, cate) => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/article/like-list`,
        {
          params: {
            page,
            cate: cate === 'all' ? null : cate,
          },
          withCredentials: true, // 跨域獲取cookie
        }
      )
      .then((response) => {
        setIsLoading(true)
        console.log('response.data.article')
        console.log(response.data)
        setLike(response.data.article)
        setTotal(response.data.total)
        setPage(response.data.page)
        return response.data.article
      })
  }

  const removeLikeConnect = async (aid) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/article/like/${aid}`,
        { withCredentials: true } // 确保跨域请求时携带凭证信息
      )
      if (response.data.code === '200') {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeLike = async (aid) => {
    try {
      const response = await removeLikeConnect(aid)
      console.log(response)
      if (response.code === '200') {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          await articleLike(page, cate).then(() => {
            if (like.length === 1) {
              handlePageChange(page - 1)
            }
          })
        })
        // .then(async () => {
        //   const orderByArr = orderByMap[orderBy] || ['id', 'asc']
        //   await getProductLikeList(currentPage, pdCate, orderByArr).then(() => {
        //     if (productLikeList.products.length === 1) {
        //       handlePageChange(currentPage - 1)
        //     }
        //   })
        // })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '移除收藏失敗',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const handleDeleteLike = (aid) => {
    console.log('要刪除的文章 ID:', aid)
    Swal.fire({
      title: '確定要移除收藏嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeLike(aid)
      }
    })
  }

  const handlePageChange = (page) => {
    setIsLoading(true)
    articleLike(page, cate)
  }
  const router = useRouter()
  const { isReady, query } = router
  useEffect(() => {
    if (!isReady) return
    articleLike(1)
  }, [isReady])
  // articleLike()

  // 切換分類
  const handleChangeCate = (e) => {
    const newCate = e.target.value
    setCate(newCate)
    setPage(1)
    setIsLoading(true)
    articleLike(1, newCate)
    console.log(newCate)
  }

  // 頁面載入loading設定
  const [isLoading, setIsLoading] = useLoading(like)

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <UserLayout title={'文章收藏'}>
          <Radio.Group
            onChange={handleChangeCate}
            value={cate}
            style={{
              marginBottom: 8,
            }}
          >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="公告">公告</Radio.Button>
            <Radio.Button value="組裝教學">組裝教學</Radio.Button>
            <Radio.Button value="開箱文">開箱文</Radio.Button>
            <Radio.Button value="活動">活動</Radio.Button>
          </Radio.Group>
          <ArticleLikeContainer>
            {like.map((item, index) => {
              return (
                <ArticleLikeItem
                  key={index}
                  aid={item.id}
                  image={item.img}
                  title={item.title}
                  cate={item.cate}
                  link={`/article/${item.id}`}
                  handleDeleteLike={handleDeleteLike}
                />
              )
            })}
            {/* <ArticleLikeItem name={'test'} price={100} link={'#'} /> */}
          </ArticleLikeContainer>
          <PaginationComponent
            totalItems={total}
            pageSize={5}
            currentPage={Number(page)}
            onPageChange={handlePageChange}
          />
        </UserLayout>
      )}
    </>
  )
}
