// CardHover.js
import React from 'react'
import Card from './Card' // 引入新的Card组件

export default function CardHover() {
  return (
    <>
      <div className="d-flex justify-content-end row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
        {Array(12)
          .fill()
          .map((_, index) => (
            <div className="col" key={index}>
              <div className="col">
                <Card />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
