import React from 'react'
import styles from '@/styles/user/user-side-bar.module.css'

function UserSideBar() {
  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne1"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            套件
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne1"
          className="accordion-collapse collapse show"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>60%</li>
              <li>65%</li>
              <li>75%</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            // {/* 改這裡~~~ */}
            data-bs-target="#panelsStayOpen-collapseOne2"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            套件
          </button>
        </h2>

        <div
          // {/* 改這裡~~~ */}
          id="panelsStayOpen-collapseOne2"
          className="accordion-collapse collapse show"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>60%</li>
              <li>65%</li>
              <li>75%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSideBar
