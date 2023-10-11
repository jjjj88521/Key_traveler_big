import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Empty, Tag } from 'antd'

const ProductLikeContainer = ({ children }) => {
  return (
    <div style={{ minHeight: '700px' }}>
      {children && children.length > 0 ? (
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
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '700px' }}
        >
          <Empty description="尚無收藏商品" />
        </div>
      )}
    </div>
  )
}

const ProductLikeItem = ({
  image,
  name,
  price,
  link,
  handleDeleteLike,
  pid,
  pd_cate,
}) => {
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-auto">
            <Image src={image} width={100} height={100} alt="" />
          </div>
          <div className="col d-flex align-items-center gap-1 flex-column flex-sm-row">
            <Tag
              color="#dc9329"
              className="align-self-start align-self-sm-center"
            >
              {pd_cate}
            </Tag>
            <Link href={link}>{name}</Link>
          </div>
        </div>
      </td>
      <td className="text-center align-middle">${price}</td>
      <td className="text-center align-middle">
        <button className="btn border-0" onClick={() => handleDeleteLike(pid)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export { ProductLikeContainer, ProductLikeItem }
