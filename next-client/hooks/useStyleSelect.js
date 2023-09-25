import { useState } from 'react'

// 自定義 Hook，用於處理樣式選擇
function useStyleSelection() {
  const [selectedStyles, setSelectedStyles] = useState([])

  // 處理樣式選擇的函式
  function handleStyleSelect(key, selectedValue) {
    const hasSelected = selectedStyles.some((item) => item.key === key)
    if (!hasSelected) {
      setSelectedStyles([...selectedStyles, { key, value: selectedValue }])
    } else {
      const newSelectedStyles = selectedStyles.map((item) => {
        if (item.key === key) {
          return { ...item, value: selectedValue }
        }
        return item
      })
      setSelectedStyles(newSelectedStyles)
    }
  }

  return { selectedStyles, handleStyleSelect }
}

export default useStyleSelection
