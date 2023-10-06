import React from 'react'
import Card from '@/components/product/Card'
import fakeData from './fakeData'

export default function List() {
  // 複製預設數據填滿整個頁面12筆
  const allData = [...fakeData]
  const defaultData = {
    title: 'Default Product',
    brand: 'Meletrix',
    price: 99.99,
    imagePath: './images/card.png',
  }
  while (allData.length < 12) {
    allData.push(defaultData)
  }

  return (
    <>
      <div className="d-flex row row-cols-2 row-cols-md-3 g-4 mb-sm-0 mb-4">
        {allData.map((product, index) => (
          <div className="col" key={index}>
            <div className="col">
              <Card
                title={product.title}
                brand={product.brand}
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
