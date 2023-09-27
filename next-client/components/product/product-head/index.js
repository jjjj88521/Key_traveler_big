import React, { useEffect, useReducer } from 'react'
import GallerySwiper from '@/components/common/gallery-swiper'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import style from './_pd-number-input.module.scss'
import { Rate } from 'antd'
import { isString } from 'lodash'
import useStyleSelect from '@/hooks/useStyleSelect'
import LikeButton from '../like-button'

export default function ProductHead({
  name,
  brand,
  price,
  images,
  rating,
  commentCount,
  isLiked = false,
  StyleSelectItems,
}) {
  // 使用樣式選擇 hook
  const initStyleSelect = Object.keys(StyleSelectItems).map((key) => ({
    key,
    value: StyleSelectItems[key][0], // 預設為第一個
  }))
  const [selectedStyles, handleStyleSelect] = useStyleSelect(initStyleSelect)

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
            <GallerySwiper images={images} path="/images/product/" />
          </div>
          <div className="col-sm-5 col-12 right-info vstack gap-5">
            {/* 文字內容 */}
            <div className="vstack gap-3">
              <div className="d-flex justify-content-center d-sm-block">
                <h6 className="text-primary">{brand}</h6>
              </div>
              <h2 className="h1 fw-semibold text-break">{name}</h2>
              <div className="d-flex justify-content-center d-sm-block">
                <h2 className="fw-bold text-primary">
                  $ <span className="price">{price}</span>
                </h2>
              </div>
              <div className="star row px-2">
                <div className="col text-secondary">
                  <span className="average-star">{rating}</span>
                  <span> / 5</span>
                </div>
                <div className="col-6">
                  <Rate disabled defaultValue={rating} allowHalf />
                </div>
                <div className="col border-start border-2">
                  <span className="text-secondary">{commentCount} 則評論</span>
                </div>
              </div>
            </div>
            {
              // 產品樣式選擇
              Object.keys(StyleSelectItems).map((key, index) => (
                <StyleSelect key={key} title={key} onSelect={handleStyleSelect}>
                  {StyleSelectItems[key].map((value, index) => (
                    <Item key={key + index}>{value}</Item>
                  ))}
                </StyleSelect>
              ))
            }
            {/* 數量選擇，輸入框，有加減數量按鈕 */}
            <div className="d-flex justify-content-center d-sm-block">
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
              <LikeButton isLiked={isLiked} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
