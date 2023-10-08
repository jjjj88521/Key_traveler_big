import React from 'react'
import styles from '@/styles/user/user-side-bar.module.css'
import Link from 'next/link'
import userSideBarLinks from '../user-side-bar/userSideBarLinks'

export default function UserSideBarMobile() {
  return (
    <>
      <div className="btn-group " style={{ width: '90%' }}>
        <button
          style={{ width: '90%' }}
          className="btn btn-secondary bg-dark text-white dropdown-toggle mx-auto d-flex justify-content-between align-items-center"
          type="button"
          id="dropdownMenuClickableInside"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          會員中心
        </button>
        <ul
          style={{ width: '100%' }}
          className="dropdown-menu"
          aria-labelledby="dropdownMenuClickableInside"
        >
          <div className="accordion" id="userSideBarMobile">
            {userSideBarLinks.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button bg-primary text-center text-light fw-bold fs-6 py-2 d-block text-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordionItem${index}`}
                    aria-expanded="false"
                    aria-controls={`accordionItem${index}`}
                  >
                    {item.name}
                  </button>
                </h2>
                <div
                  id={`accordionItem${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#userSideBarMobile"
                >
                  <div className={`accordion-body ${styles['accBody']}`}>
                    <ul>
                      {item.children.map((subItem, subIndex) => (
                        <li key={subIndex} className="fw-bold">
                          <Link href={subItem.link}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}
