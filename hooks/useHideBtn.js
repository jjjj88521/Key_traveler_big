import React, { useState } from 'react'

export default function useHideBtn() {
  // 按鈕是否隱藏
  const [hideBtn, setHideBtn] = useState({
    prev: true,
    next: false,
  })
  const handleSwiperBtnHide = (swiper) => {
    setHideBtn({
      prev: swiper.isBeginning,
      next: swiper.isEnd,
    })
  }
  return { hideBtn, handleSwiperBtnHide, setHideBtn }
}
