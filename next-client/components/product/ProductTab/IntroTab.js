import React from 'react'
export default function IntroTab({ feature, featureImgs }) {
  return (
    <div className="py-4">
      {/* 文字 */}
      {feature.split('\n').map((text, index) => (
        <React.Fragment key={index}>
          {text}
          <br />
        </React.Fragment>
      ))}
      {/* 圖片 */}
      <div className="text-center w-100">
        {featureImgs.map((img, index) => (
          <img
            key={index}
            src={`/images/product/${img}`}
            className="w-100"
            alt={img}
          />
        ))}
      </div>
    </div>
  )
}
