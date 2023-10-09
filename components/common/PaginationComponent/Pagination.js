import React from 'react'

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )
  return (
    <div className="d-flex justify-content-center col-sm-12 col-4">
      <nav aria-label="Page navigation example ">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => {
                onPageChange(currentPage - 1)
              }}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pageNumbers.map((v, i) => {
            return (
              <li className="page-item" key={i}>
                <button
                  className={`page-link ${v === currentPage ? 'active' : ''}`}
                  href="#"
                  onClick={() => {
                    onPageChange(v)
                  }}
                >
                  {v}
                </button>
              </li>
            )
          })}

          <li className="page-item">
            <button
              className={`page-link ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
              href="#"
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
