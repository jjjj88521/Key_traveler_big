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

// swiper
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

import { SwiperPrevBtn, SwiperNextBtn } from '@/components/home/swiper-btns'
import Card from '@/components/product/Card'
import { useAuth } from '@/hooks/useAuth'
import anime from 'animejs'
import useHideBtn from '@/hooks/useHideBtn'

export default function ProductDetail() {
  const { auth } = useAuth()
  const router = useRouter()
  const { pid } = router.query
  const { isReady } = router
  // 接一般商品 api，後端路由 http://localhost:3005/api/products/[pid]
  const {
    productData,
    setProductData,
    maybeLike,
    setMaybeLike,
    commentCount,
    setCommentCount,
    setIsLiked,
  } = useProductData()

  // 存是否正在載入
  const [isLoading, setIsLoading] = useLoading(productData.id)

  // 按鈕是否隱藏
  const { hideBtn, handleSwiperBtnHide } = useHideBtn()

  // 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      // 每次獲取資料前都先重設載入中狀態
      setIsLoading(true)
      await fetchProduct(pid)
        .then((product) => {
          if (Object.keys(product).length === 0) {
            throw new Error('沒有此商品')
          }
          setProductData(product)
        })
        .catch((error) => {
          console.log(error)
          router.push('/404')
        })
      await fetchPdCommentCount(pid).then((data) => {
        setCommentCount(data)
      })
      await fetchProductLike('pd', pid)
        .then((like) => {
          setIsLiked(like)
        })
        .catch((error) => {
          setIsLiked(false)
        })
      await fetchMaybeLike(pid).then((products) => {
        setMaybeLike(products)
      })
    }
    if (isReady) {
      fetchData()
    }
  }, [isReady, pid, auth]) // 登出之後也會再觸發重新整理

  // 最近瀏覽商品 hooks，傳入 type: 'product'，代表是一般商品
  const [recentlyViewed, addToRecentlyViewed] = useRecentlyViewed({
    type: 'product',
  })
  useEffect(() => {
    if (Object.keys(productData).length > 0) {
      addToRecentlyViewed(productData)
    }
  }, [productData])

  // 商品名
  const { name = '商品詳細' } = productData

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
          <ProductHead />
          {/* 喜歡商品 */}
          <section className="">
            <div className="container border-top border-2 py-5">
              <h2 className="fs-3 text-center text-secondary pb-4">
                你可能喜歡的商品
              </h2>
              <div className="px-4">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1.5}
                  // centeredSlides={true}
                  breakpoints={{
                    576: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation]}
                  className="mySwiper"
                  onSlideChange={handleSwiperBtnHide}
                >
                  <SwiperPrevBtn
                    className={`swiper-prev-btn btn btn-lg btn-light rounded-circle position-absolute start-0 ms-2 top-50 translate-middle-y z-1 d-none d-sm-block shadow ${
                      hideBtn.prev ? 'opacity-0' : ''
                    }`}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <i className="fa-solid fa-chevron-left text-primary"></i>
                  </SwiperPrevBtn>
                  <SwiperNextBtn
                    className={`swiper-next-btn btn btn-lg btn-light rounded-circle position-absolute end-0 me-2 top-50 translate-middle-y z-1 d-none d-sm-block shadow ${
                      hideBtn.next ? 'opacity-0' : ''
                    }`}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <i className="fa-solid fa-chevron-right text-primary"></i>
                  </SwiperNextBtn>
                  {maybeLike.map((product, index) => {
                    const images = JSON.parse(product.images)
                    return (
                      <SwiperSlide key={index}>
                        <Card
                          id={product.id}
                          cate={'pd'}
                          title={product.name}
                          brand={product.brand}
                          price={product.price}
                          image={`/images/product/${images[0]}`}
                          link={`/product/${product.category_1}/${product.category_2}/${product.id}`}
                          stock={product.stock}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>
          </section>
          {/* 商品詳細 tab 切換資訊、規格表、評論 */}
          <TabContainer pdCate={'product'}>
            <TabButton tabName="intro">商品介紹</TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            <TabButton tabName="review">
              商品評價[{commentCount.total}]
            </TabButton>
          </TabContainer>
          {/* 瀏覽過商品 */}
          <section className="">
            <div className="container border-top border-2 py-5">
              <h2 className="fs-3 text-center text-secondary pb-4">
                瀏覽過的商品
              </h2>
              <div className="px-4">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1.5}
                  breakpoints={{
                    576: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  className="mySwiper"
                >
                  {recentlyViewed.map((product, index) => {
                    const images = JSON.parse(product.images)
                    return (
                      <SwiperSlide key={index}>
                        <Card
                          id={product.id}
                          cate={'pd'}
                          title={product.name}
                          brand={product.brand}
                          price={product.price}
                          image={`/images/product/${images[0]}`}
                          link={`/product/${product.category_1}/${product.category_2}/${product.id}`}
                          stock={product.stock}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
