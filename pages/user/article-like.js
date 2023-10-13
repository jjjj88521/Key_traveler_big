import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Divider, Radio, Space, Tag } from 'antd'
import axios from 'axios'
import PaginationComponent from '@/components/common/PaginationComponent'
// import UserDropdown from '@/components/user/user-dropdown'
// import UserSideBar from './user-side-bar'
// import UserSideBarMobile from '../../components/user/user-side-bar-mobile'
import UserLayout from '@/components/layout/user-layout'
import {
  ArticleLikeContainer,
  ArticleLikeItem,
} from '@/components/user/article-like'
import { number } from 'prop-types'

export default function Article() {
  const [total, setTotal] = useState(0)
  const [cate, setCate] = useState('all')
  const [page, setPage] = useState(1)
  const [like, setLike] = useState([])
  const articleLike = async (page) => {
    await axios
      .get(`http://localhost:3005/api/article/like-list?page=${page}`, {
        withCredentials: true, // 跨域獲取cookie
      })
      .then((response) => {
        console.log('response.data.article')
        console.log(response.data)
        setLike(response.data.article)
        setTotal(response.data.total)
        setPage(response.data.page)
      })
  }
  const handlePageChange = (page) => {
    articleLike(page)
  }
  const router = useRouter()
  const { isReady, query } = router
  useEffect(() => {
    if (!isReady) return
    articleLike(1)
  }, [isReady])
  // articleLike()
  return (
    <>
      <UserLayout title={'文章收藏'}>
        <Radio.Group
          // onChange={}
          // value={pdCate}
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
                title={item.title}
                cate={item.cate}
                link={`/article/${item.id}`}
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
    </>
  )
}
