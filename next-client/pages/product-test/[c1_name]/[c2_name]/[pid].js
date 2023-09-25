import { useEffect, useReducer } from 'react'
import { Rate } from 'antd'
import { StyleSelect, Item } from '@/components/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import style from './_pd-number-input.module.scss'

// 樣式選擇假資料
const StyleSelectItems = {
  顏色: ['陽極紅', '陽極藍', '陽極綠'],
  配置: ['陽極紅', '陽極藍', '陽極綠'],
  第三種: ['陽極紅', '陽極藍', '陽極綠'],
}

export default function ProductDetail() {
  // 使用樣式選擇 hook
  const { selectedStyles, handleStyleSelect } = useStyleSelect()

  // 輸入數量狀態，按 +、- 按鈕，增減數量
  const reducer = (state, action) => {
    if (action.type === 'add') {
      return state + 1
    }
    if (action.type === 'minus') {
      return state - 1
    }
    return state
  }

  useEffect(() => {
    console.log(selectedStyles)
  }, [selectedStyles])
  return (
    <div className="container">
      <div className="row p-sm-5 p-0">
        <div className="col-sm-7 col-12 left-info">圖片slider</div>
        <div className="col-sm-5 col-12 right-info vstack gap-5">
          {/* 文字內容 */}
          <div className="vstack gap-3">
            <h6 className="text-primary">brand</h6>
            <h2 className="h1 fw-semibold text-break">
              【GB】Shark Studio Shark67 無線三模機械式鍵盤套件
            </h2>
            <h3 className="fw-bold text-primary">
              $ <span className="price">4450</span>
            </h3>
            <div className="star row px-2">
              <div className="col text-secondary">
                <span className="average-star">4.5</span>
                <span> / 5</span>
              </div>
              <div className="col-6">
                <Rate disabled defaultValue={4.5} allowHalf />
              </div>
              <div className="col border-start border-2">
                <span className="text-secondary">2 則評論</span>
              </div>
            </div>
          </div>
          {
            // 產品樣式選擇
            Object.keys(StyleSelectItems).map((key) => (
              <StyleSelect key={key} title={key} onSelect={handleStyleSelect}>
                {StyleSelectItems[key].map((value, index) => (
                  <Item key={key + index} value={value} />
                ))}
              </StyleSelect>
            ))
          }
          {/* 數量選擇，輸入框，有加減數量按鈕 */}
          <div className={`${style['number-input-group']}`}>
            <button className="btn btn-outline-secondary border-0">-</button>
            <input
              type="number"
              className="form-control border-0 text-center w-100 p-0"
              min={1}
              max={99}
              value={1}
            />
            <button className="btn btn-outline-secondary border-0">+</button>
          </div>
          {/* 加入購物車按鈕、直接購買按鈕，各一半， */}
        </div>
      </div>
    </div>
  )
}
