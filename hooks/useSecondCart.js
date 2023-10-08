import React, { useReducer, useContext, createContext, useEffect } from 'react'
import { reducer, init } from './cart-reducer'

const SecondCartContext = createContext(null)

export const SecondCartProvider = ({
  children,
  initialRentProducts = [
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      name: 'QK75鍵盤鍵盤鍵盤鍵盤',
      price: 300,
      startDate: '2023-10-15',
      endDate: '2023-10-16',
    },
    {
      id: 2,
      check: false,
      img: '/images/1669370674683000804.jpg',
      name: 'QK75鍵盤鍵盤鍵盤鍵盤',
      price: 100,
      startDate: '2023-10-17',
      endDate: '2023-10-18',
    },
  ],
}) => {
  let items = initialRentProducts

  const [state, dispatch] = useReducer(reducer, items, init)

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id,
      },
    })
  }

  const updateItem = (item) => {
    dispatch({
      type: 'UPDATE_ITEM',
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
