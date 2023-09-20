import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: '#171717' }}>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-sm px-5 text-center d-flex align-items-center">
              <div className="w-100 text-center pb-5 pb-sm-0">
                <Image
                  src="/images/footer-logo-desktop.png"
                  width={250}
                  height={187}
                  alt="Logo"
                />
              </div>
            </div>
            <div className="col-12 col-sm-2 px-5 pt-3 pt-sm-0">
              <div className="text-primary">Links</div>
              <div className="pt-sm-5 pt-3">
                <Link
                  href="/product"
                  className="text-decoration-none text-secondary"
                >
                  商品
                </Link>
              </div>
              <div className="pt-sm-5 pt-3">
                <Link
                  href="/groupBuy"
                  className="text-decoration-none text-secondary"
                >
                  團購專區
                </Link>
              </div>
              <div className="pt-sm-5 pt-3">
                <Link
                  href="/rent"
                  className="text-decoration-none text-secondary"
                >
                  租用專區
                </Link>
              </div>
              <div className="pt-sm-5 pt-3">
                <Link
                  href="/article"
                  className="text-decoration-none text-secondary"
                >
                  文章
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm px-5 pt-3 pt-sm-0">
              <div className="text-primary">About</div>
              <div className="pt-sm-5 pt-3">
                <p className="text-secondary">
                  鍵之旅人，專注於打造獨一無二的客製化鍵盤，讓您的敲擊體驗成為獨特的旅程。我們的團隊致力於提供高品質、個性化的鍵盤解決方案。我們明白每位鍵盤愛好者的需求獨一無二，因此，我們的產品不僅僅是鍵盤，更是藝術品。歡迎您加入我們的鍵盤旅程，尋找專屬於您的打字樂趣。
                </p>
              </div>
            </div>
            <div className="col-12 col-sm px-5 pt-3 pt-sm-0">
              <div className="text-primary">Address</div>
              <div className="pt-sm-5 pt-3">
                <p className="text-secondary">桃園市中壢區新生路二段421號</p>
              </div>
            </div>
          </div>
          <div className="pt-5 pb-4 border-top border-secondary">
            <p className="text-primary d-flex d-sm-block justify-content-center">
              2023 Key Traveler. All rights reverved
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
