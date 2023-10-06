import React from 'react'
import Link from 'next/link'

export default function DetailCat() {
  return (
    <>
      <div className="bg-primary d-flex justify-content-center d-sm-none">
        <Link href="#" className="text-decoration-none">
          <div className="px-3">
            <p className="text-dark my-2 ">公告</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark my-2 ">開箱文</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark my-2 ">組裝教學</p>
          </div>
        </Link>
        <Link href="#" className="text-decoration-none">
          <div className="border-start border-dark border-2 px-3">
            <p className="text-dark my-2 ">活動</p>
          </div>
        </Link>
      </div>
    </>
  )
}
