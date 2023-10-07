import React from 'react'
import UserDropdown from '../user/user-dropdown'
import Head from 'next/head'

export default function UserLayout({ children, isLoginPage = false, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container py-sm-5 py-4 px-sm-5">
        <h2 className="fw-bold">{title}</h2>
        <div className="row gap-sm-5 py-3">
          {isLoginPage || <UserDropdown />}
          <div className="col">{children}</div>
        </div>
      </div>
    </>
  )
}
