import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Empty, Tag } from 'antd'

const ArticleLikeContainer = ({ children }) => {
  return (
    <div style={{ minHeight: '700px' }}>
      {children ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="bg-primary text-white text-center" scope="col">
                文章內容
              </th>
              <th className="bg-primary text-white text-center" scope="col">
                分類
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
          <Empty description="尚無收藏文章" />
        </div>
      )}
    </div>
  )
}

const ArticleLikeItem = ({
  image,
  title,
  link,
  handleDeleteLike,
  pid,
  cate,
}) => {
  const parsedImg = JSON.parse(image)
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-auto">
            <Image
              src={`/article/${parsedImg[0]}`}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="col d-flex align-items-center gap-1 flex-column flex-sm-row">
            <Link href={link}>{title}</Link>
          </div>
        </div>
      </td>
      <td className="text-center align-middle">
        <Tag color="green" className="align-self-start align-self-sm-center">
          {cate}
        </Tag>
      </td>
      <td className="text-center align-middle">
        <button className="btn border-0" onClick={() => handleDeleteLike(pid)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export { ArticleLikeContainer, ArticleLikeItem }
