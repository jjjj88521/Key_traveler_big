import GbHead from '@/components/groupbuy/gb-head'
import TabContainer from '@/components/product/ProductTab'
import TabButton from '@/components/product/ProductTab/TabButton'
import Head from 'next/head'
import React from 'react'

const GbDetail = {
  id: 1,
  name: '商品名稱',
  brand: '品牌',
  price: 2000,
  images: [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  ],
  style_select: {
    color: ['紅色', '綠色'],
  },
  start: '2023-01-01',
  end: '2023-01-20',
  current_people: 10,
  target_people: 50,
  feature: '特色',
  feature_img: [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  ],
  spec_table: {
    規格: '規格',
    尺寸: '尺寸',
    重量: '重量',
  },
}

export default function GroupbuyDetail() {
  const {
    name,
    brand,
    price,
    images,
    style_select,
    start,
    end,
    current_people,
    target_people,
    feature,
    feature_img,
    spec_table,
  } = GbDetail

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      {/* 團購詳細 head */}
      <GbHead
        name={name}
        brand={brand}
        price={price}
        images={images}
        isLiked={false}
        StyleSelectItems={style_select}
        start={start}
        end={end}
        current_people={current_people}
        target_people={target_people}
      />
      {/* 商品詳細 tab 切換資訊、規格表、團購說明 */}
      <TabContainer
        feature={feature}
        featureImgs={feature_img}
        specTable={spec_table}
      >
        <TabButton tabName="intro">商品介紹</TabButton>
        <TabButton tabName="spec">商品規格</TabButton>
        <TabButton tabName="gb-desc">團購說明</TabButton>
      </TabContainer>
    </>
  )
}
