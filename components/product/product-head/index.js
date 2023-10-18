import React, { useEffect } from 'react'
import GallerySwiper from '@/components/common/gallery-swiper'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import PdNumInput from './pd-number-input'
import { PdInfoBox, PdBrand, PdName, PdPrice, PdRating } from './pd-info-box'
import { AddCartBtn, BuyBtn, LikeBtn, OutOfStockBtn } from './pd-btns'
import { useProductData } from '@/context/use-product'
import { addProductLike, deleteProductLike } from '@/libs/productFetcher'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { Select } from 'antd'
import useMobile from '@/hooks/useMobile'

export default function ProductHead() {
  // 判斷手機版
  const [isMobile, setIsMobile] = useMobile()
  const router = useRouter()
  // 獲取商品 context
  const { productData, isLiked, setIsLiked, commentCount } = useProductData()
  const { name, brand, price } = productData
  const { avgStar, total } = commentCount
  const images = JSON.parse(productData.images)
  const style_select = JSON.parse(productData.style_select)
  // 使用樣式選擇 hook
  const initStyleSelect = style_select
    ? Object.keys(style_select).map((key) => ({
        key,
        value: style_select[key][0], // 預設為第一個
      }))
    : []
  const [selectedStyles, handleStyleSelect] = useStyleSelect(initStyleSelect)

  // 收藏商品
  const handleToggleLike = async () => {
    try {
      const response = isLiked
        ? await deleteProductLike('pd', productData.id)
        : await addProductLike('pd', productData.id)

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

  return (
    <section className="">
      <div className="container">
        <div className="row px-sm-5 px-0 py-sm-5 py-3">
          {/* 左邊圖片 */}
          <div className="col-sm-7 col-12 left-info pe-sm-5 position-relative">
            <div className="position-sticky" style={{ top: '100px' }}>
              <GallerySwiper images={images} path="/images/product/" />
            </div>
          </div>
          {/* 右側商品文字內容 */}
          <div className="col-sm-5 col-12 right-info vstack gap-5">
            {/* 商品名稱、品牌、價格、評論數量 */}
            <PdInfoBox>
              <PdBrand brand={brand} />
              <PdName name={name} />
              <PdPrice price={price} />
              <PdRating rating={avgStar} commentCount={total} />
            </PdInfoBox>
            {/* 產品樣式選擇 */}
            {style_select &&
              Object.keys(style_select).map((key, index) =>
                isMobile ? (
                  <div
                    key={key}
                    className="d-flex align-items-center flex-column"
                  >
                    <h5 className="text-secondary">{key}</h5>
                    <Select
                      className="w-100"
                      defaultValue={selectedStyles[index].value}
                      options={style_select[key].map((item, index) => ({
                        key: index,
                        label: item,
                        value: item,
                      }))}
                      onSelect={(value) => handleStyleSelect(key, value)}
                      size={'large'}
                    />
                  </div>
                ) : (
                  <StyleSelect
                    key={key}
                    title={key}
                    onSelect={handleStyleSelect}
                    selectedValue={selectedStyles[index].value}
                  >
                    {style_select[key].map((value, index) => (
                      <Item key={index}>{value}</Item>
                    ))}
                  </StyleSelect>
                )
              )}
            {/* 數量選擇，輸入框，有加減數量按鈕 */}
            {productData.stock > 0 && <PdNumInput />}
            {/* 加入購物車按鈕、直接購買按鈕，各一半 */}
            <div className="hstack gap-3">
              {productData.stock > 0 ? (
                <>
                  <AddCartBtn />
                  <BuyBtn />
                </>
              ) : (
                <OutOfStockBtn />
              )}
            </div>
            {/* 喜歡按鈕 */}
            <div className="d-flex justify-content-center">
              <LikeBtn isLiked={isLiked} onToggleLike={handleToggleLike} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
