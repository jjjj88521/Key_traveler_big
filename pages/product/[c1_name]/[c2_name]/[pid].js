import React, { useEffect, useState } from 'react'
import TabContainer from '@/components/product/ProductTab'
import ProductHead from '@/components/product/product-head'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TabButton from '@/components/product/ProductTab/TabButton'
import PdLoading from '@/components/product/pd-loading'
import axios from 'axios'
import useRecentlyViewed from '@/hooks/useRecentlyViewed'
// 評論假資料
const commentData = Array.from({
  length: 36,
}).map((_, i) => ({
  key: i,
  account: 'account' + i,
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  star: Math.ceil(Math.random() * 5),
  comment: 'comment' + i,
  // 隨機日期2023-01-01 ~ 2023-12-31
  createTime: '2023-01-01',
}))

export default function ProductDetail() {
  const router = useRouter()
  const { isReady } = router
  // 接一般商品 api，後端路由 http://localhost:3005/api/products/[pid]
  const [product, setProduct] = useState({})

  // 存是否正在載入
  const [isLoading, setIsLoading] = useState(true)

  async function fetchProduct(pid) {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/products/${pid}`
      )
      if (response.status !== 200) {
        throw new Error('發生錯誤')
      }
      const productData = response.data // 假設API返回商品信息的數據
      setProduct(productData)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } catch (error) {
      // 處理其他錯誤
      console.error('發生錯誤:', error)
    }
  }

  useEffect(() => {
    if (isReady) {
      const { pid } = router.query
      fetchProduct(pid)
    }
  }, [isReady])

  // 最近瀏覽商品 hooks，傳入 type: 'product'，代表是一般商品
  const [recentlyViewed, addToRecentlyViewed] = useRecentlyViewed({
    type: 'product',
  })
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      addToRecentlyViewed(product)
    }
  }, [product])

  // 商品資料解構，以及將一些數據轉換成物件或陣列
  const { name = '', brand = '', price = '', feature = '' } = product
  const style_select =
    Object.keys(product).length > 0 ? JSON.parse(product.style_select) : []
  const feature_img =
    Object.keys(product).length > 0 ? JSON.parse(product.feature_img) : []
  const spec = Object.keys(product).length > 0 ? JSON.parse(product.spec) : []
  const images =
    Object.keys(product).length > 0 ? JSON.parse(product.images) : []

  const ratingSum = commentData.reduce((acc, cur) => acc + cur.star, 0)
  const avgRating = (ratingSum / commentData.length).toFixed(1)

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      {Object.keys(product).length === 0 || isLoading ? (
        <PdLoading />
      ) : (
        <>
          {/* 商品詳細 head */}
          <ProductHead
            name={name}
            brand={brand}
            price={price}
            images={images}
            rating={avgRating}
            commentCount={commentData.length}
            isLiked={false}
            StyleSelectItems={style_select}
          />
          {/* 商品詳細 tab 切換資訊、規格表、評論 */}
          <TabContainer
            feature={feature}
            featureImgs={feature_img}
            specTable={spec}
            commentData={commentData}
          >
            <TabButton tabName="intro">商品介紹</TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            <TabButton tabName="review">
              商品評價[{commentData.length}]
            </TabButton>
          </TabContainer>
          {/* 喜歡商品 */}
          <section className="">
            <div className="container border-top border-2 py-5">
              <h2 className="fw-bold fs-2 text-center">你可能喜歡的商品</h2>
              <div className="row row-cols-sm-4 row-cols-2">
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
              </div>
            </div>
          </section>
          {/* 瀏覽過商品 */}
          <section className="">
            <div className="container border-top border-2 py-5">
              <h2 className="fw-bold fs-2 text-center">瀏覽過的商品</h2>
              <div className="row row-cols-sm-4 row-cols-2">
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
                <div className="col">
                  <div className="card">card預留</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
