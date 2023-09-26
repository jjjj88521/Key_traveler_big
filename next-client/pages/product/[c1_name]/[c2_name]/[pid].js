import React from 'react'
import TabContainer from '@/components/ProductTab'

export default function ProductDetail() {
  return (
    <>
      <div className="container">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '100px', border: '1px solid' }}
        >
          預留 product detail head
        </div>
        <TabContainer></TabContainer>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: '100px', border: '1px solid' }}
        >
          預留 你可能瀏覽過的產品
        </div>
      </div>
    </>
  )
}
