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
import { useAuth } from '@/hooks/useAuth'
import Card from '@/components/product/Card'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

export default function GroupbuyDetail() {
  const { auth } = useAuth()
  const router = useRouter()
  const { gb_id } = router.query
  const { isReady } = router
  const { productData, setProductData, isLiked, setIsLiked } = useProductData()
  const [isLoading, setIsLoading] = useLoading(productData.id)

  // 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      // 每次獲取資料前都先重設載入中狀態
      setIsLoading(true)
      await fetchGB(gb_id)
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
      await fetchProductLike('gb', gb_id).then((like) => {
        setIsLiked(like)
      })
    }
    if (isReady) {
      fetchData()
    }
  }, [isReady, gb_id, auth])

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
          <TabContainer pdCate={'groupbuy'}>
            <TabButton tabName="intro">商品介紹</TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            <TabButton tabName="gb-desc">團購說明</TabButton>
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
                          cate={'gb'}
                          title={product.name}
                          brand={product.brand}
                          price={product.price}
                          image={`/images/product/${images[0]}`}
                          link={`/groupbuy/${product.id}`}
                          // stock={product.stock}
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
