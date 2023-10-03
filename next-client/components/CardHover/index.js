// CardHover.js
import React from 'react'
import Card from './Card'
import fakeData from './fakeData'

export default function CardHover() {
  return (
    <>
      <div className="d-flex row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
        {fakeData.map((product, index) => (
          <div className="col" key={index}>
            <div className="col">
              <Card
                title={product.title}
                description={product.description}
                price={product.price}
                imagePath={product.imagePath}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
