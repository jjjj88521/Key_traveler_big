import React, { useEffect, useState } from 'react'
import TabContainer from '@/components/product/ProductTab'
import ProductHead from '@/components/product/product-head'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TabButton from '@/components/product/ProductTab/TabButton'
import PdLoading from '@/components/product/pd-loading'
import axios from 'axios'
import useRecentlyViewed from '@/hooks/useRecentlyViewed'
import Swal from 'sweetalert2'
import useLoading from '@/hooks/useLoading'
import { useProductData } from '@/context/use-product'
import {
  fetchProduct,
  fetchProductLike,
  addProductLike,
  deleteProductLike,
  fetchPdCommentCount,
  fetchMaybeLike,
} from '@/libs/productFetcher'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query
  const { isReady } = router
  // 接一般商品 api，後端路由 http://localhost:3005/api/products/[pid]
  // const [productData, setProductData] = useState({})
  const {
    productData,
    setProductData,
    maybeLike,
    setMaybeLike,
    commentCount,
    setCommentCount,
    isLiked,
    setIsLiked,
  } = useProductData()
  // const [isLiked, setIsLiked] = useState(false)

  // 存是否正在載入
  const [isLoading, setIsLoading] = useLoading(
    Object.keys(productData).length > 0
  )
  const handleToggleLike = async () => {
    try {
      const response = isLiked
        ? await deleteProductLike('pd', pid)
        : await addProductLike('pd', pid)

      console.log(response)

      if (response.code === '200') {
        setIsLiked(!isLiked)
        const successMessage = response.message
        Swal.fire({
          icon: 'success',
          title: successMessage,
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('發生錯誤')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '請先登入',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // 存入登入前的頁面，登入成功就跳轉回來
        localStorage.setItem('redirect', router.asPath)
        router.push('/user/login')
      })
    }
  }
  console.log('maybeLike', maybeLike)
  useEffect(() => {
    if (isReady) {
      ;(async () => {
        await fetchProduct(pid).then((product) => {
          setProductData(product)
        })
        await fetchPdCommentCount(pid).then((data) => {
          setCommentCount(data)
        })
        await fetchProductLike('pd', pid).then((like) => {
          setIsLiked(like)
        })
        await fetchMaybeLike(pid).then((products) => {
          setMaybeLike(products)
        })
      })()
    }
  }, [isReady])

  // 最近瀏覽商品 hooks，傳入 type: 'product'，代表是一般商品
  const [recentlyViewed, addToRecentlyViewed] = useRecentlyViewed({
    type: 'product',
  })
  useEffect(() => {
    if (Object.keys(productData).length > 0) {
      addToRecentlyViewed(productData)
    }
  }, [productData])

  // 商品資料解構，以及將一些數據轉換成物件或陣列
  const { name = '', brand = '', price = '' } = productData
  const style_select =
    Object.keys(productData).length > 0
      ? JSON.parse(productData.style_select)
      : []
  const images =
    Object.keys(productData).length > 0 ? JSON.parse(productData.images) : []

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      {Object.keys(productData).length === 0 || isLoading ? (
        <PdLoading />
      ) : (
        <>
          {/* 商品詳細 head */}
          <ProductHead
            name={name}
            brand={brand}
            price={price}
            images={images}
            rating={commentCount.avgStar}
            commentCount={commentCount.total}
            isLiked={isLiked}
            onToggleLike={handleToggleLike}
            StyleSelectItems={style_select}
          />
          {/* 喜歡商品 */}
          <section className="">
            <div className="container border-top border-2 py-5">
              <h2 className="fs-2 text-center">你可能喜歡的商品</h2>
              <div className="row row-cols-sm-4 row-cols-2 py-3">
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
              <h2 className="fs-2 text-center">瀏覽過的商品</h2>
              <div className="row row-cols-sm-4 row-cols-2 py-3">
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
          {/* 商品詳細 tab 切換資訊、規格表、評論 */}
          <TabContainer>
            <TabButton tabName="intro">商品介紹</TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            <TabButton tabName="review">
              商品評價[{commentCount.total}]
            </TabButton>
          </TabContainer>
        </>
      )}
    </>
  )
}
