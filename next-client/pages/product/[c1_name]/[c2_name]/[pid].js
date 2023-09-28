import React from 'react'
import TabContainer from '@/components/product/ProductTab'
import ProductHead from '@/components/product/product-head'
import Head from 'next/head'

// 商品假資料
const product = {
  name: '【GB】Shark Studio Shark67 無線三模機械式鍵盤套件',
  brand: 'Shark Studio',
  style_select: {
    配置: [
      '陽極紫+雕刻底殼',
      '陽極紫+PVD銘牌底殼',
      '陽極灰+雕刻底殼',
      '陽極灰+PVD銘牌底殼',
      '靜電噴粉奶白+雕刻底殼',
      '靜電噴粉奶白+PVD銘牌底殼',
      '靜電噴粉奶綠+雕刻底殼',
      '靜電噴粉奶綠+PVD銘牌底殼',
      '電泳淺紫+雕刻底殼',
      '電泳淺紫+PVD銘牌底殼',
      '電泳淺粉+雕刻底殼',
      '電泳淺粉+PVD銘牌底殼',
      '電泳淺藍+雕刻底殼',
      '電泳淺藍+PVD銘牌底殼',
    ],
  },
  price: 3090,
  images: [
    '1685846717544631361.jpg',
    '1685846717503794078.jpg',
    '1685846718425153602.jpg',
    '1685846718519889711.jpg',
    '1685846718391168714.jpg',
    '1685846718522641966.jpg',
    '1685846719931171797.jpg',
    '1685846717544631361.jpg',
  ],
  feature_imgs: [
    'shark67001.jpg',
    'shark67002.jpg',
    'shark67003.jpg',
    'shark67004.jpg',
    'shark67005.jpg',
    'shark67007.jpg',
    'shark67008.jpg',
    'shark67009.jpg',
    'shark67010.jpg',
  ],
  feature: `商品介紹\nShark Studio Shark67\n無線三模機械式鍵盤套件\n【商品特色】\n\n1、6063鋁合金全CNC加工\n2、預設為噴砂開槽PC定位板\n3、有線、藍芽、2.4G，三模連接\n4、Gasket結構\n5、銘牌配重為：黃銅鏡面拋光PVD電鍍後雕刻\n6、下燈位RGB熱插拔1.2mm無開槽PCB\n7、衛星軸僅支援鋼板衛星軸\n8、內容物：\n外殼\n銘牌\nPC定位板\n三模PCB\n分離子板\n夾心棉\n軸下墊\n底棉\n2000mAh電池\n2.4G接收器\nGasket組\n鍵盤腳墊\n螺絲組\n※套件不含Type-C連接線，需另購\n※以上說明僅供參考，若有不符請以原廠官方網站為主，不便之處敬請見諒!!`,
  spec: {
    '品名：': 'Shark Studio Shark67 無線三模機械式鍵盤套件',
    '接頭：': 'Type-C',
    '回報率：': '有線、2.4G：1000 Hz<br>藍芽：125 Hz',
    '連接方式：': '有線 / 藍芽 / 2.4G',
    '藍芽連接數量：': '3',
    '尺寸：': '320 x 110 mm',
    'PCB厚度：': '1.2 mm',
    '材質：':
      '外殼：6063鋁合金<br>銘牌：鏡面PVD電鍍黃銅<br>定位板：PC<br>夾心棉：井上Poron<br>軸下墊：8倍發泡ixpe<br>底棉：井上Poron<br>2000mAh電池',
    '支援軟體：': 'QMK、VIA',
    '包裝內容物：':
      '外殼<br>銘牌<br>PC定位板<br>三模PCB<br>分離子板<br>夾心棉<br>軸下墊<br>底棉<br>2000mAh電池<br>2.4G接收器<br>Gasket組<br>鍵盤腳墊<br>螺絲組',
    '備註：': '開燈效續航約8小時<br>不開燈效續航約200小時',
    '適用軸體：': '3腳/5腳軸',
    '前緣高度：': '20 mm',
    '後緣高度：': '30 mm',
  },
}

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
  // 商品資料解構
  const {
    name,
    brand,
    style_select,
    price,
    images,
    feature_imgs,
    feature,
    spec,
  } = product

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
        featureImgs={feature_imgs}
        specTable={spec}
        commentData={commentData}
        commentCount={commentData.length}
      ></TabContainer>
      {/* 喜歡商品 */}
      <section className="">
        <div className="container border-top border-2 py-5">
          <h2 className="fw-bold fs-1 text-center">你可能喜歡的商品</h2>
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
        <div className="container">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '100px', border: '1px solid' }}
          >
            預留 你可能瀏覽過的產品
          </div>
        </div>
      </section>
    </>
  )
}
