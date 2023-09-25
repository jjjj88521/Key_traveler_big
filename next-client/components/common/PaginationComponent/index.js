import React, { useState } from 'react'
import { Pagination } from 'antd'

// 建立 PaginationComponent 组件
export default function PaginationComponent({
  totalItems,
  pageSize,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(1)

  // 頁數變化
  const handlePageChange = (page) => {
    setCurrentPage(page)
    onPageChange(page) // 呼叫傳遞進來的 onPageChange
  }

  const itemRender = (page, type, originalElement) => {
    if (type === 'prev' || type === 'next') {
      return (
        <>
          <div className="bg-primary-subtle text-primary">
            <i
              className={
                type === 'prev'
                  ? 'fa-solid fa-caret-left'
                  : 'fa-solid fa-caret-right'
              }
            ></i>
          </div>
        </>
      )
    }

    return (
      <div
        className={
          currentPage === page ? 'text-light' : 'text-primary bg-primary-subtle'
        }
      >
        {originalElement}
      </div>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
    </>
  )
}
