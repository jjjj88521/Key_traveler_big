import React, { useReducer } from 'react'
import style from './_pd-number-input.module.scss'

export default function PdNumInput() {
  // ===== 輸入數量狀態，按 +、- 按鈕，增減數量 =====
  const initialState = {
    quantity: 1,
  }
  const reducer = (state, action) => {
    const regex = /^[1-9][0-9]?$|^99$/ // 1~99
    switch (action.type) {
      case 'sub':
        return {
          ...state,
          quantity: state.quantity - 1 < 1 ? 1 : state.quantity - 1,
        }
      case 'add':
        return {
          ...state,
          quantity: state.quantity + 1 > 99 ? 99 : state.quantity + 1,
        }
      case 'change':
        // 只能輸入數字，其他會重置為 1，數字不能小於 1，數字不能大於 10
        if (action.payload === '') {
          return {
            ...state,
            quantity: null,
          }
        } else if (regex.test(action.payload)) {
          return {
            ...state,
            quantity: action.payload,
          }
        } else {
          return {
            ...state,
          }
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
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
            dispatch({ type: 'change', payload: e.target.value })
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
  )
}
