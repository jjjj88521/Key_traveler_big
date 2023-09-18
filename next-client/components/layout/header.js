import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <>
      <header style={{ backgroundColor: '#171717', height: '100px' }}>
        <div className="container h-100 d-flex align-items-center">
          <div className="row ">
            <div className="col-4">
              <div className="d-flex align-items-center">
                <Link href="/">
                  <Image
                    src="/images/header-logo-desktop.png"
                    width={200}
                    height={40}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
          </div>
        </div>
      </header>
    </>
  )
}
