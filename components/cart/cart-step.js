import React, { useState, useEffect } from 'react'

import { Steps } from 'antd'

export default function CartStep({ currentStep, itemsStep }) {
  return (
    <>
      <div className="container d-sm-none">
        <Steps
          current={currentStep}
          labelPlacement="vertical"
          items={itemsStep}
          responsive={false}
          className="mt-5 mx-auto"
        />
      </div>
      <div className="container d-sm-block d-none">
        <Steps
          current={currentStep}
          labelPlacement="vertical"
          items={itemsStep}
          responsive={false}
          className="mt-5 mx-auto"
          style={{ width: '80%' }}
        />
      </div>
    </>
  )
}
