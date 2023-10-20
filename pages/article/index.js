import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'
import Link from 'next/link'
import PaginationComponent from '@/components/common/PaginationComponent'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import axios from 'axios'
export default function ArticleFilter() {
  // 設定路由
  const router = useRouter()
  const { isReady, query } = router
  const cat_id = query.cat_id

  useEffect(() => {
    router.push('/article/cate/0')
  }, [])

  return (
    <>
      <LoadingPage />
    </>
  )
}
