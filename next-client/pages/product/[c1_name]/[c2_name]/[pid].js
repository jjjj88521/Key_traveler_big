import React, { useEffect, useState } from 'react'
import TabContainer from '@/components/product/ProductTab'
import ProductHead from '@/components/product/product-head'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TabButton from '@/components/product/ProductTab/TabButton'
import PdLoading from '@/components/product/pd-loading'
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
  const [product, setProduct] = useState(null)

  // 存是否正在載入
  const [isLoading, setIsLoading] = useState(true)

  async function fetchProduct(pid) {
    try {
      const response = await fetch(
        `http://localhost:3005/api/products/${pid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        // 在這裡處理回應的數據
        setProduct(data)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } else {
        // 處理錯誤情況，例如返回狀態碼不是 200
        console.error('發生錯誤:', response.status)
      }
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
  }, [router.query, isReady])

  if (isLoading) {
    return <PdLoading />
  }

  if (Object.keys(product).length === 0) {
    return <div>找不到商品</div>
  }
  // 商品資料解構，以及將一些數據轉換成物件或陣列

  const { name, brand, price, feature } = product
  const style_select = JSON.parse(product.style_select)
  const feature_img = JSON.parse(product.feature_img)
  const spec = JSON.parse(product.spec)
  const images = JSON.parse(product.images)

  const ratingSum = commentData.reduce((acc, cur) => acc + cur.star, 0)
  const avgRating = (ratingSum / commentData.length).toFixed(1)
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
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
        <TabButton tabName="review">商品評價[{commentData.length}]</TabButton>
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
  )
}
