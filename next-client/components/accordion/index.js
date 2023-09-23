import React from 'react'
import styles from '@/components/accordion/index.module.css'

function Accordion() {
  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-primary text-center text-light fw-bold fs-5 d-block text-center"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            套件
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
        >
          <div className={`accordion-body ${styles['accBody']}`}>
            <ul>
              <li>60%</li>
              <li>65%</li>
              <li>75%</li>
              <li>80%</li>
              <li>98%</li>
              <li>100%</li>
              <li>Num Pad</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Accordion Item #2
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            This is the third accordion body.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            Accordion Item #3
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className="accordion-collapse collapse"
        >
          <div className="accordion-body">
            This is the third accordion body.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
