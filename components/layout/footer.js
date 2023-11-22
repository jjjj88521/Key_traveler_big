import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from '@/styles/default-layout/_default-layout.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={`${style['footer']} bg-dark`}>
        <div className="container">
          <div className="row py-3">
            <div className="col-12 col-sm-3 px-5 text-center d-flex align-items-center">
              <div className="w-100 d-flex flex-column align-items-center gap-3">
                <div style={{ width: '150px' }}>
                  <img
                    src="/images/footer-logo-desktop.png"
                    alt="Logo"
                    title="Logo"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-sm px-5 pt-3 pt-sm-0">
              <div className="text-primary fw-semibold">About</div>
              <div className="pt-sm-5 pt-3">
                <p className="text-secondary">
                  鍵之旅人，專注於打造獨一無二的客製化鍵盤，讓您的敲擊體驗成為獨特的旅程。我們的團隊致力於提供高品質、個性化的鍵盤解決方案。我們明白每位鍵盤愛好者的需求獨一無二，因此，我們的產品不僅僅是鍵盤，更是藝術品。歡迎您加入我們的鍵盤旅程，尋找專屬於您的打字樂趣。
                </p>
              </div>
            </div> */}
            <div className="col-12 col-sm px-5 pt-3 pt-sm-0 row justify-content-center gap-4">
              <div className="col-sm-3 col-12 d-flex flex-column gap-2 justify-content-center">
                <h6 className="text-primary fw-semibold">Follow us</h6>
                <div className="d-flex gap-3">
                  <div className="text-primary fs-5">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <div className="text-primary fs-5">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <div className="text-primary fs-5">
                    <i className="fa-brands fa-youtube"></i>
                  </div>
                </div>
              </div>
              <div className="col-sm col-12 d-flex flex-column gap-2 justify-content-center">
                <h6 className="text-primary fw-semibold">Address</h6>
                <p className="text-secondary mb-0">
                  桃園市中壢區新生路二段421號
                </p>
              </div>
              <div className="col-sm col-12 d-flex flex-column gap-2 justify-content-center">
                <h6 className="text-primary fw-semibold">Email</h6>
                <Link
                  className="text-secondary"
                  href={'mailto:ispankeytraveler@gmail.com'}
                >
                  ispankeytraveler@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary py-3">
            <p
              className="text-primary d-flex d-sm-block justify-content-center mb-0"
              style={{ fontSize: '12px' }}
            >
              2023 Key Traveler. 此網站僅供學習使用，無任何商業用途。
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
