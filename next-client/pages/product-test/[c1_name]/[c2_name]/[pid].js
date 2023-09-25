import { useEffect, useReducer, useState } from 'react'
import { Rate } from 'antd'
import {
  StyleSelect,
  Item,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import style from './_pd-number-input.module.scss'
import { isNumber, isString } from 'lodash'
import GallerySwiper from '@/components/common/gallery-swiper'

// 樣式選擇假資料
const StyleSelectItems = {
  顏色: ['陽極紅', '陽極藍', '陽極綠'],
  配置: ['陽極紅', '陽極藍', '陽極綠'],
  第三種: ['陽極紅', '陽極藍', '陽極綠'],
}

// 圖片假資料
const images = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
  'https://swiperjs.com/demos/images/nature-8.jpg',
  'https://swiperjs.com/demos/images/nature-9.jpg',
  'https://swiperjs.com/demos/images/nature-10.jpg',
]

export default function ProductDetail() {
  // 使用樣式選擇 hook
  const { selectedStyles, handleStyleSelect } = useStyleSelect()

  // ===== 輸入數量狀態，按 +、- 按鈕，增減數量 =====
  const initialState = {
    quantity: 1,
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'sub':
        return {
          ...state,
          quantity: state.quantity - 1 < 1 ? 1 : state.quantity - 1,
        }
      case 'add':
        return {
          ...state,
          quantity: state.quantity + 1 > 10 ? 10 : state.quantity + 1,
        }
      case 'change':
        // 只能輸入數字，其他會重置為 1，數字不能小於 1，數字不能大於 10
        return {
          ...state,
          quantity: action.payload,
        }
      default:
        return state
    }
  }
  // 處理輸入不能為字串，數字不能小於 1，數字不能大於 10
  const handleChange = (e) => {
    if (isString(e.target.value)) {
      dispatch({ type: 'change', payload: 1 })
    } else if (e.target.value < 1) {
      dispatch({ type: 'change', payload: 1 })
    } else if (e.target.value > 10) {
      dispatch({ type: 'change', payload: 10 })
    } else {
      dispatch({ type: 'change', payload: e.target.value })
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log(selectedStyles)
  }, [selectedStyles])
  return (
    <section className="">
      <div className="container">
        <div className="row px-sm-5 px-0 py-sm-5 py-3">
          <div className="col-sm-7 col-12 left-info px-sm-5">
            <GallerySwiper images={images} path="" />
          </div>
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
              <button
                className="btn btn-outline-secondary border-0"
                onClick={() => {
                  dispatch({ type: 'sub' })
                }}
              >
                -
              </button>
              <input
                type="text"
                className="form-control border-0 text-center w-100 p-0"
                value={state.quantity}
                onChange={(e) => {
                  handleChange(e)
                }}
              />
              <button
                className="btn btn-outline-secondary border-0"
                onClick={() => {
                  dispatch({ type: 'add' })
                }}
              >
                +
              </button>
            </div>
            {/* 加入購物車按鈕、直接購買按鈕，各一半 */}
            <div className="hstack gap-3">
              <button className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold hstack gap-3 justify-content-center">
                <i className="fa-solid fa-cart-plus"></i>
                加入購物車
              </button>
              <button className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold">
                直接購買
              </button>
            </div>
            {/* 喜歡按鈕 */}
            <div className="d-flex justify-content-center">
              <div className="h4">
                <i className="fa-regular fa-heart pe-2"></i>
                Like
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
