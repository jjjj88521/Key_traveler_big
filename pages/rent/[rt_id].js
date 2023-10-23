import Card from '@/components/product/Card'
import TabContainer from '@/components/product/ProductTab'
import TabButton from '@/components/product/ProductTab/TabButton'
import PdLoading from '@/components/product/pd-loading'
import RentHead from '@/components/rent/rent-head'
import { useProductData } from '@/context/use-product'
import { useAuth } from '@/hooks/useAuth'
import useLoading from '@/hooks/useLoading'
import useRecentlyViewed from '@/hooks/useRecentlyViewed'
import { fetchProductLike, fetchRT } from '@/libs/productFetcher'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'

export default function RentDetail() {
  const { auth } = useAuth()
  const router = useRouter()
  const { rt_id } = router.query
  const { isReady } = router
  const { productData, setProductData, isLiked, setIsLiked } = useProductData()
  const [isLoading, setIsLoading] = useLoading(productData.id)
  // console.log(productData)

  // 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      // 每次獲取資料前都先重設載入中狀態
      setIsLoading(true)
      await fetchRT(rt_id)
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
      await fetchProductLike('rt', rt_id).then((like) => {
        setIsLiked(like)
        console.log(like)
      })
    }
    if (isReady) {
      fetchData()
    }
  }, [isReady, rt_id, auth])

  // 最近瀏覽商品 hooks，傳入 type: 'product'，代表是一般商品
  const [recentlyViewed, addToRecentlyViewed] = useRecentlyViewed({
    type: 'rent',
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
          <RentHead />
          {/* 商品詳細 tab 切換資訊、規格表、團購說明 */}
          <TabContainer pdCate={'rent'}>
            <TabButton tabName="intro">商品介紹</TabButton>
            <TabButton tabName="spec">商品規格</TabButton>
            {/* <TabButton tabName="rt-desc">租用說明</TabButton> */}
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
                          cate={'rt'}
                          title={product.name}
                          brand={product.brand}
                          price={product.price}
                          image={`/images/product/${images[0]}`}
                          link={`/rent/${product.id}`}
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
