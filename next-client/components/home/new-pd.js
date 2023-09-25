import Link from 'next/link'
import React from 'react'

export default function NewPd() {
  return (
    <section className={''}>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center">
          <h2 className="h1 text-center fw-bolder">New Products</h2>
          <div className="row w-100 py-3 row-cols-2 row-cols-sm-4">
            <div className="col py-2">
              <div className="card">卡片</div>
            </div>
            <div className="col py-2">
              <div className="card">卡片</div>
            </div>
            <div className="col py-2">
              <div className="card">卡片</div>
            </div>
            <div className="col py-2">
              <div className="card">卡片</div>
            </div>
          </div>
          <div className="w-50 py-3">
            <Link
              href={'/product'}
              className="btn btn-outline-primary btn-lg rounded-0 w-100"
              type="button"
            >
              Show more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
