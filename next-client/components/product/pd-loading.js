import React from 'react'
import GallerySwiper from '../common/gallery-swiper'
import { Skeleton } from 'antd'
import { PdInfoBox } from './product-head/pd-info-box'
import { AddCartBtn, BuyBtn, LikeBtn } from './product-head/pd-btns'
import PdNumInput from './product-head/pd-number-input'
import Head from 'next/head'

export default function PdLoading() {
  return (
    <>
      <section className="">
        <div className="container">
          <div className="row px-sm-5 px-0 py-sm-5 py-3">
            {/* 左邊圖片 */}
            <div className="col-sm-7 col-12 left-info pe-sm-5">
              <GallerySwiper isLoading={true} />
            </div>
            {/* 右側商品文字內容 */}
            <div className="col-sm-5 col-12 right-info vstack gap-5">
              {/* 商品名稱、品牌、價格、評論數量 */}
              <PdInfoBox>
                <Skeleton active paragraph={{ rows: 0 }} />
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
                <Skeleton active title={false} paragraph={{ rows: 1 }} block />
              </PdInfoBox>
              {/* 產品樣式選擇 */}
              <Skeleton active paragraph={{ rows: 5 }} />
              {/* 數量選擇，輸入框，有加減數量按鈕 */}
              <PdNumInput />
              {/* 加入購物車按鈕、直接購買按鈕，各一半 */}
              <div className="hstack gap-3">
                <AddCartBtn />
                <BuyBtn />
              </div>
              {/* 喜歡按鈕 */}
              <div className="d-flex justify-content-center">
                <LikeBtn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
