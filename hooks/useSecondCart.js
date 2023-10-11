import React, { useReducer, useContext, createContext, useEffect } from 'react'
import { reducer, initRent } from './cart-reducer'

const SecondCartContext = createContext(null)

export const SecondCartProvider = ({
  children,
  initialRentProducts = [
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      brand: 'Meletrix',
      name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
      price: 300,
      startDate: '2023-10-15',
      endDate: '2023-10-16',
      quantity: 1,
      spec: {
        外殼: ['EE 耀夜黑', 'EE 細花白'],
        '配重/旋鈕': ['電泳 白', '陽極 黑'],
      },
    },
    {
      id: 2,
      check: false,
      img: '/images/1669370674683000804.jpg',
      brand: 'Meletrix',
      name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
      price: 100,
      startDate: '2023-10-17',
      endDate: '2023-10-18',
      quantity: 1,
      spec: {
        外殼: ['EE 耀夜黑', 'EE 細花白'],
        '配重/旋鈕': ['電泳 白', '陽極 黑'],
      },
    },
  ],
}) => {
  let items = initialRentProducts

  const [state, dispatch] = useReducer(reducer, items, initRent)

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_RENT_ITEM',
      payload: {
        id,
      },
    })
  }

  const checkItem = (id) => {
    dispatch({
      type: 'CHECK_RENT_ITEM',
      payload: {
        id,
      },
    })
  }

  const checkAllItem = (checkall) => {
    dispatch({
      type: 'CHECK_ALL_RENT_ITEM',
      payload: { checkall },
    })
  }

  const updateItem = (item) => {
    dispatch({
      type: 'UPDATE_RENT_ITEM',
      payload: item,
    })
  }

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  const isInCart = (id) => {
    return state.items.some((item) => item.id === id)
  }

  const plusOne = (id) => {
    return dispatch({
      type: 'PLUS_ONE',
      payload: {
        id,
      },
    })
  }
  /**
   * @param  {} id
   */
  const minusOne = (id) => {
    return dispatch({
      type: 'MINUS_ONE',
      payload: {
        id,
      },
    })
  }
  // 租用日期不可選已過去日期
  // 獲取當前日期並格式化為 yyyy-MM-dd
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  //租用起日
  const handleStartDateChange = (id, newStartDate) => {
    return dispatch({
      type: 'Start_Date_Change',
      payload: {
        id,
        newStartDate,
      },
    })
  }
  //租用迄日
  const handleEndDateChange = (id, newEndDate) => {
    return dispatch({
      type: 'End_Date_Change',
      payload: {
        id,
        newEndDate,
      },
    })
  }
  return (
    <SecondCartContext.Provider
      value={{
        cart: state,
        items: state.items,
        addItem,
        removeItem,
        checkItem,
        checkAllItem,
        updateItem,
        clearCart,
        isInCart,
        plusOne,
        minusOne,
        getCurrentDate,
        handleStartDateChange,
        handleEndDateChange,
      }}
    >
      {children}
    </SecondCartContext.Provider>
  )
}

export const useSecondCart = () => useContext(SecondCartContext)
