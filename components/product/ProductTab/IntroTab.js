import React from 'react'
export default function IntroTab({ pdCate, feature, featureImgs }) {
  // // 使用正則表達式替換多個連續的 \n 為單個 \n
  // const cleanedFeature = feature.replace(/\\n+/g, '\\n')
  // console.log(cleanedFeature)
  return (
    <div className="py-4 px-5 bg-white">
      {/* 文字 */}
      {feature.split('\n').map((text, index) => (
        <p key={index}>
          {text}
          {/* <br /> */}
        </p>
      ))}
      {/* 圖片 */}
      <div className="d-flex justify-content-center">
        <div className="text-center w-75">
          {featureImgs.map((img, index) => (
            <img
              key={index}
              src={`/images/${pdCate}/${img}`}
              className="w-100"
              alt={img}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
