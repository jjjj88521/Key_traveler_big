import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

export default function NewCouponPage({
  totalItems,
  pageSize,
  onPageChange,
  currentPage, // 傳遞當前頁碼
}) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1)

  useEffect(() => {
    // 當傳遞的 currentPage 改變時，更新內部的 currentPage
    setInternalCurrentPage(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    setInternalCurrentPage(page)
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const itemRender = (page, type, originalElement) => {
    if (type === 'prev' || type === 'next') {
      return (
        <>
          <div
            className={`bg-primary-subtle text-primary ${
              page === internalCurrentPage ? 'currentPage' : 'otherPage'
            }`}
            style={{ borderRadius: '6px' }}
          >
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
        className={`${
          page === internalCurrentPage
            ? 'text-light'
            : 'text-primary bg-primary-subtle'
        } ${page === internalCurrentPage ? 'currentPage' : 'otherPage'}`}
        style={{ borderRadius: '6px' }}
      >
        {originalElement}
      </div>
    )
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination
        current={internalCurrentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        itemRender={itemRender}
        showSizeChanger={false}
      />
    </div>
  )
}
