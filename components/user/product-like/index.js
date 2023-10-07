import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductLikeContainer = ({ children }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="bg-primary text-white text-center" scope="col">
            商品
          </th>
          <th className="bg-primary text-white text-center" scope="col">
            價格
          </th>
          <th
            className="bg-primary text-white text-center text-nowrap"
            scope="col"
          >
            操作
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

const ProductLikeItem = ({ image, name, price }) => {
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-auto">
            <Image src={image} width={100} height={100} alt="" />
          </div>
          <div className="col d-flex align-items-center">
            <Link href="">{name}</Link>
          </div>
        </div>
      </td>
      <td className="text-center align-middle">${price}</td>
      <td className="text-center align-middle">
        <button className="btn border-0">
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export { ProductLikeContainer, ProductLikeItem }
