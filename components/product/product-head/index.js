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

export default function ProductHead({
  name,
  brand,
  price,
  images,
  rating,
  commentCount,
  isLiked = false,
  onToggleLike,
  StyleSelectItems,
}) {
  // 獲取商品 context
  const { productData } = useProductData()
  // 使用樣式選擇 hook
  const initStyleSelect = StyleSelectItems
    ? Object.keys(StyleSelectItems).map((key) => ({
        key,
        value: StyleSelectItems[key][0], // 預設為第一個
      }))
    : []
  const [selectedStyles, handleStyleSelect] = useStyleSelect(initStyleSelect)

  useEffect(() => {
    console.log(selectedStyles)
  }, [selectedStyles])
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
              <PdRating rating={rating} commentCount={commentCount} />
            </PdInfoBox>
            {/* 產品樣式選擇 */}
            {StyleSelectItems &&
              Object.keys(StyleSelectItems).map((key, index) => (
                <StyleSelect key={key} title={key} onSelect={handleStyleSelect}>
                  {StyleSelectItems[key].map((value, index) => (
                    <Item key={key + index}>{value}</Item>
                  ))}
                </StyleSelect>
              ))}
            {/* 數量選擇，輸入框，有加減數量按鈕 */}
            <PdNumInput />
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
              <LikeBtn isLiked={isLiked} onToggleLike={onToggleLike} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
