import React, { useState, useEffect } from 'react'

import CartStep from '@/components/cart/cart-step'
import CartStep2 from '@/components/cart/cart-step-2'
import CartStep3 from '@/components/cart/cart-step-3'
import PCartList from '@/components/cart/p-cart-list'
import RCartList from '@/components/cart/r-cart-list'
import GCartList from '@/components/cart/g-cart-list'
import ProceedToCheckout from '@/components/cart/proceed-to-checkout'

export default function Cart() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleStepChange = (step) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
  const items = [
    {
      title: '確認商品',
    },
    {
      title: '填寫訂單資訊',
    },
    {
      title: '完成訂單',
    },
  ]

  const [orderTotalP, setOrderTotalP] = useState() // P總金額的狀態變數
  const [orderAmountP, setOrderAmountP] = useState() // P總件數的狀態變數
  const [orderTotalG, setOrderTotalG] = useState() // P總金額的狀態變數
  const [orderAmountG, setOrderAmountG] = useState() // P總件數的狀態變數
  const [orderTotalR, setOrderTotalR] = useState() // R總金額的狀態變數
  const [orderAmountR, setOrderAmountR] = useState() // R總件數的狀態變數
  const [orderTotalAll, setOrderTotalAll] = useState() // 欲結帳總金額的狀態變數
  const [orderAmountAll, setOrderAmountAll] = useState() // 欲結帳總件數的狀態變數

  useEffect(() => {
    setOrderTotalAll(orderTotalP + orderTotalG + orderTotalR)
    setOrderAmountAll(orderAmountP + orderAmountG + orderAmountR)
  }, [
    orderTotalP,
    orderAmountP,
    orderTotalG,
    orderAmountG,
    orderTotalR,
    orderAmountR,
  ])

  return (
    <>
      <CartStep currentStep={currentStep - 1} itemsStep={items} />
      {currentStep === 1 && (
        <div className="container">
          <h1 className="text-primary fs-3 pt-5 pb-3">購物車清單</h1>
          <PCartList
            setOrderTotalP={setOrderTotalP}
            setOrderAmountP={setOrderAmountP}
          />
          <GCartList
            setOrderTotalG={setOrderTotalG}
            setOrderAmountG={setOrderAmountG}
          />
          <RCartList
            setOrderTotalR={setOrderTotalR}
            setOrderAmountR={setOrderAmountR}
          />
          {/* 去結帳 */}
          <ProceedToCheckout
            orderTotalAll={orderTotalAll}
            orderAmountAll={orderAmountAll}
            onCheckout={() => {
              handleStepChange(2)
            }}
          />
        </div>
      )}

      {currentStep === 2 && (
        <CartStep2
          ongotoPage1={() => {
            handleStepChange(1)
          }}
          ongotoPage3={() => {
            handleStepChange(3)
          }}
        />
      )}

      {currentStep === 3 && <CartStep3 />}
    </>
  )
}
