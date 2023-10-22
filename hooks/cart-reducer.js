import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
// 初始化狀態
// isEmpty, totalItems, cartTotal為最後計算得出
export const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0, //商品數量+-
  cartTotal: 0, //總計
  selectItems: 0, //選取數量
}
import axios from 'axios'

const moment = require('moment')
// 置於上述items陣列中的每個項目的物件模型
// id, quantity, price為必要屬性
// const item = {
//   id: '',
//   img: '',
//   brand: '',
//   name: '',
//   price: 0,
//   quantity: 0,
//   spec: '',
// }

const setCartItem = (state, action) => {
  let newState = [...state.items]
  newState = [...newState, ...action.payload]
  return newState
}

/**
 * addItem 加入項目於state中
 * @param  {} state
 * @param  {} action
 */
const addItem = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemStyle = state.items.findIndex(
    (item) =>
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
  )
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const payloadQuantity = action.payload.quantity

  // 如果有存在，加入項目(以給定的quantity，或沒給定時quantity+1)
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const specData = item.specData

    const quantity = payloadQuantity
      ? item.quantity + payloadQuantity
      : item.quantity + 1

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity, specData },
    }

    return updateItem(state, action)
  }
  return [...state.items, action.payload]
}
const addRentItem = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemStyle = state.items.findIndex(
    (item) =>
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
  )
  // console.log('addItem')
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  // 如果有存在，加入項目(以給定的quantity，或沒給定時quantity+1)
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const specData = item.specData
    const startDate = item.startDate
    const endDate = item.endDate
    const action = {
      type: 'UPDATE_RENT_ITEM',
      payload: { id, startDate, endDate, specData },
    }

    return updateItem(state, action)
  }
  return [...state.items, action.payload]
}

const removeItem = (state, action) => {
  return state.items.filter(
    (item) =>
      item.id !== action.payload.id ||
      JSON.stringify(item.specData) !== JSON.stringify(action.payload.specData)
  )
}

const styleSelect = (state, action) => {
  // 尋找是否有已存在的索引值

  const changeKey = action.payload.key
  const changeValue = action.payload.value
  const existingItemStyle = state.items.findIndex(
    (item) =>
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
  )
  // console.log(existingItemStyle)
  // console.log(action.payload.specData)
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  // 如果有存在，改變style的值
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    // console.log(item.specData)
    // console.log(typeof item.specData)

    const newStyleData = Object.keys(item.specData).reduce((acc, style) => {
      if (style === changeKey) {
        acc[changeKey] = changeValue
      } else {
        acc[style] = item.specData[style]
      }
      return acc
    }, {})

    const newState = [...state.items]
    newState.map((i) => {
      i.specData = newStyleData
    })
    return newState
  }
  return [...state.items, action.payload]
}

const checkItem = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })

  // 如果有存在，改變check的值
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id

    const check = item.check ? 0 : 1
    const specData = item.specData
    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, check, specData },
    }

    return updateItem(state, action)
  }
  return [...state.items, action.payload]
}

const checkAllItem = (state, action) => {
  // 獲取要設置的狀態（true 或 false）
  const isChecked = action.payload.checkall ? 1 : 0
  const newState = [...state.items]
  newState.map((i) => {
    i.check = isChecked
  })
  return newState
}

/**
 * upateItem (ex. quantity, color, name, price...)
 * ex. action = {type="UPDATE_ITEM", payload: {id:1, quantity:1, color:'red'}
 * @param  {} state
 * @param  {} action
 */

const updateItem = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })

  if (existingItemStyle > -1) {
    const newState = [...state.items]
    newState[existingItemStyle] = {
      ...newState[existingItemStyle],
      ...action.payload,
    }
    return newState
  }

  return [...state.items]
}

// 類似於addItem，但固定quantity + 1
const plusItemQuantityOnce = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const quantity = item.quantity + 1
    const specData = item.specData
    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity, specData },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}

// 類似於addItem，但固定quantity - 1
const minusItemQuantityOnce = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const quantity = item.quantity > 1 ? item.quantity - 1 : 1
    const specData = item.specData

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity, specData },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}

//租用起日
const startDateChange = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )
  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })
  const newStartDate = action.payload.newStartDate
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const specData = item.specData

    const oldStartDate = item.startDate
    const oldEndDate = item.endDate
    const startDate =
      moment(newStartDate) < moment(oldEndDate) ? newStartDate : oldStartDate
    if (moment(newStartDate) > moment(oldEndDate)) {
      Swal.fire({
        icon: 'error',
        title: '請重新選擇日期',
        text: '開始日期須小於結束日期',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    const action = {
      type: 'UPDATE_RENT_ITEM',
      payload: { id, startDate, specData },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}
//租用迄日
const endDateChange = (state, action) => {
  // 尋找是否有已存在的索引值
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  )

  const existingItemStyle = state.items.findIndex((item) => {
    return (
      item.id === action.payload.id &&
      JSON.stringify(item.specData) === JSON.stringify(action.payload.specData)
    )
  })
  const newEndDate = action.payload.newEndDate
  if (existingItemStyle > -1) {
    const item = state.items[existingItemStyle]
    const id = item.id
    const specData = item.specData
    const oldStartDate = item.startDate
    const oldEndDate = item.endDate
    const endDate =
      moment(oldStartDate) < moment(newEndDate) ? newEndDate : oldEndDate
    if (moment(oldStartDate) > moment(newEndDate)) {
      Swal.fire({
        icon: 'error',
        title: '請重新選擇日期',
        text: '開始日期須小於結束日期',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    const action = {
      type: 'UPDATE_RENT_ITEM',
      payload: { id, endDate, specData },
    }

    return updateItem(state, action)
  }

  return [...state.items]
}

// 以下為最後計算三者itemTotal(每項目種小計), totalItems(整體項目), cartTotal(整體總計)
//計算一般商品小計
const calculateItemTotals = (items) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity,
  }))
//計算租用商品小計
const calculateRentItemTotals = (items) => {
  return items.map((item) => {
    const start = new Date(item.startDate)
    const end = new Date(item.endDate)
    const timeDifference = end.getTime() - start.getTime()

    const productTotalDays = timeDifference / (1000 * 3600 * 24) + 1
    const subtotal = productTotalDays * item.price
    return {
      ...item,
      subtotal: subtotal,
    }
  })
}

//計算一般商品總計金額
const calculateTotalPrice = (items) => {
  const total = items.reduce(
    (total, item) => total + (item.check ? item.quantity * item.price : 0),
    0
  )
  return total
}
//計算一般商品總計數量
const calculateSelectItems = (items) => {
  const total = items.reduce(
    (total, item) => total + (item.check ? item.quantity : 0),
    0
  )
  return total
}
// 計算租用商品總計金額
const calculateRentTotalPrice = (items) => {
  // 先計算每個商品的小計
  const itemsWithSubtotals = calculateRentItemTotals(items)
  // 使用 reduce 函數將小計相加起來
  const total = itemsWithSubtotals.reduce(
    (acc, item) => acc + (item.check ? item.subtotal : 0),
    0
  )
  return total
}
// 計算租用商品總計數量
const calculateRentSelectItems = (items) => {
  const total = items.reduce((acc, item) => acc + (item.check ? 1 : 0), 0)
  return total
}

const calculateTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)

// 最後將更新後的state，與initialState整理成新的state
const generateCartState = (state, items) => {
  // isEmpty為布林值
  const isEmpty = items.length === 0
  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    cartTotal: calculateTotalPrice(items),
    selectItems: calculateSelectItems(items),
    isEmpty,
  }
}
const generateGroupCartState = (state, items) => {
  // isEmpty為布林值
  const isEmpty = items.length === 0
  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    cartTotal: calculateTotalPrice(items),
    selectItems: calculateSelectItems(items),
    isEmpty,
  }
}
const generateRentCartState = (state, items) => {
  // isEmpty為布林值
  const isEmpty = items.length === 0

  return {
    ...initialState,
    ...state,
    items: calculateRentItemTotals(items),
    totalItems: calculateTotalItems(items),
    cartTotal: calculateRentTotalPrice(items),
    selectItems: calculateRentSelectItems(items),
    isEmpty,
  }
}

// for useReducer init use
export const init = (items) => {
  return generateCartState({}, items)
}
export const initGroup = (items) => {
  return generateCartState({}, items)
}
export const initRent = (items) => {
  return generateRentCartState({}, items)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return generateCartState(state, addItem(state, action))
    case 'ADD_RENT_ITEM':
      return generateRentCartState(state, addRentItem(state, action))
    case 'REMOVE_ITEM':
      return generateCartState(state, removeItem(state, action))
    case 'REMOVE_RENT_ITEM':
      return generateRentCartState(state, removeItem(state, action))
    case 'CHECK_ITEM':
      return generateCartState(state, checkItem(state, action))
    case 'CHECK_RENT_ITEM':
      return generateRentCartState(state, checkItem(state, action))
    case 'CHECK_ALL_ITEM':
      return generateCartState(state, checkAllItem(state, action))
    case 'CHECK_ALL_RENT_ITEM':
      return generateRentCartState(state, checkAllItem(state, action))
    case 'UPDATE_ITEM':
      return generateCartState(state, updateItem(state, action))
    case 'UPDATE_RENT_ITEM':
      return generateRentCartState(state, updateItem(state, action))
    case 'PLUS_ONE':
      return generateCartState(state, plusItemQuantityOnce(state, action))
    case 'MINUS_ONE':
      return generateCartState(state, minusItemQuantityOnce(state, action))
    case 'Start_Date_Change':
      return generateRentCartState(state, startDateChange(state, action))
    case 'End_Date_Change':
      return generateRentCartState(state, endDateChange(state, action))
    case 'STYLE_SELECT':
      return generateCartState(state, styleSelect(state, action))
    case 'SET_CART':
      return generateCartState(state, setCartItem(state, action))
    case 'SET_GROUP_CART':
      return generateGroupCartState(state, setCartItem(state, action))
    case 'SET_RENT_CART':
      return generateRentCartState(state, setCartItem(state, action))
    case 'CLEAR_CART':
      return initialState

    default:
      throw new Error('No action specified')
  }
}
