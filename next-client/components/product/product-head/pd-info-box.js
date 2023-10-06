import React from 'react'
import { Rate } from 'antd'

const PdInfoBox = ({ children }) => {
  return <div className="vstack gap-3">{children}</div>
}

const PdBrand = ({ brand }) => {
  return (
    <div className="d-flex justify-content-center d-sm-block">
      <h6 className="text-primary">{brand}</h6>
    </div>
  )
}

const PdName = ({ name }) => {
  return (
    <div className="d-flex justify-content-center d-sm-block">
      <h2 className="h1 fw-semibold text-break">{name}</h2>
    </div>
  )
}

const PdPrice = ({ price }) => {
  return (
    <div className="d-flex justify-content-center d-sm-block">
      <h2 className="fw-bold text-primary">
        $ <span className="price">{price}</span>
      </h2>
    </div>
  )
}

const PdRating = ({ rating, commentCount }) => {
  return (
    <div className="star row px-2">
      <div className="col text-secondary">
        <span className="average-star">{rating}</span>
        <span> / 5</span>
      </div>
      <div className="col-6">
        <Rate disabled defaultValue={rating} allowHalf />
      </div>
      <div className="col border-start border-2">
        <span className="text-secondary">{commentCount} 則評論</span>
      </div>
    </div>
  )
}

export { PdInfoBox, PdBrand, PdName, PdPrice, PdRating }
