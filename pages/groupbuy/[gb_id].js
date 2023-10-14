import GbHead from '@/components/groupbuy/gb-head'
import TabContainer from '@/components/product/ProductTab'
import TabButton from '@/components/product/ProductTab/TabButton'
import { useProductData } from '@/context/use-product'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchGB, fetchProductLike } from '@/libs/productFetcher'
import useLoading from '@/hooks/useLoading'
import useRecentlyViewed from '@/hooks/useRecentlyViewed'
import PdLoading from '@/components/product/pd-loading'

export default function GroupbuyDetail() {
  const router = useRouter()
  const { gb_id } = router.query
  const { isReady } = router
  const { productData, setProductData, isLiked, setIsLiked } = useProductData()
  const [isLoading, setIsLoading] = useLoading(productData)

  // 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      // 每次獲取資料前都先重設載入中狀態
      setIsLoading(true)
      await fetchGB(gb_id).then((product) => {
        setProductData(product)
      })
      await fetchProductLike('gb', gb_id).then((like) => {
        setIsLiked(like)
      })
    }
    if (isReady) {
      fetchData()
    }
  }, [isReady, gb_id])

  // 最近瀏覽商品 hooks，傳入 type: 'product'，代表是一般商品
  const [recentlyViewed, addToRecentlyViewed] = useRecentlyViewed({
    type: 'groupbuy',
  })
  useEffect(() => {
    if (Object.keys(productData).length > 0) {
      addToRecentlyViewed(productData)
    }
  }, [productData])

  return (
    <>
      <Head>
        <title>{productData.name}</title>
      </Head>
      {isLoading ? (
        <PdLoading />
      ) : (
        <>
          {/* 團購詳細 head */}
          <GbHead />
          {/* 商品詳細 tab 切換資訊、規格表、團購說明 */}
          <TabContainer>
            <TabButton tabName="intro" pdCate={'groupbuy'}>
              商品介紹
            </TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            <TabButton tabName="gb-desc">團購說明</TabButton>
          </TabContainer>
        </>
      )}
    </>
  )
}
