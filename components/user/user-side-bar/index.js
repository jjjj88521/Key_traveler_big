import React from 'react'
import styles from '@/styles/user/user-side-bar.module.css'
import Link from 'next/link'
import userSideBarLinks from './userSideBarLinks'

function UserSideBar() {
  return (
    <div className="accordion" id="userSideBar">
      {userSideBarLinks.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header">
            <button
              className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
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
            data-bs-parent="#userSideBar"
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
  )
}

export default UserSideBar
