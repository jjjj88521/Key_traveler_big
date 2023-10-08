import React, { useState, useEffect } from 'react'

import { Steps } from 'antd'

export default function CartStep({ currentStep, itemsStep }) {
  return (
    <>
      <div className="container">
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
