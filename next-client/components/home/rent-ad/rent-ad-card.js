import React from 'react'

export default function RentAdCard({ brand, name, img }) {
  return (
    <div className="rent-ad-card">
      <div className="rent-ad-name-box">
        <div className="rent-ad-name">
          <h6 className="mb-0">{brand}</h6>
          <h3 className="fw-bold mb-0">{name}</h3>
        </div>
        <div className="rent-ad-arrow">
          <i className="fa-solid fa-arrow-right fs-4 text-white"></i>
        </div>
      </div>
      <div className="rent-ad-img">
        <img src={img} alt={name} />
      </div>
    </div>
  )
}
