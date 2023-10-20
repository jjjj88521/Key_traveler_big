import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react'
import { reducer, initRent } from './cart-reducer'
import axios from 'axios'
import { useAuth } from './useAuth'

const RentCartContext = createContext(null)

export const RentCartProvider = ({ children }) => {
  // let items = initialRentProducts
  const { auth } = useAuth()
  // const [state, dispatch] = useReducer(reducer, items, initRent)
  const [state, dispatch] = useReducer(reducer, [], initRent)
  const getCartData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/cart/rent', {
        withCredentials: true,
      })
      // console.log(response.data)
      if (response.data.message === 'authorized') {
        // 將購物車資料設定為初始狀態
        dispatch({ type: 'SET_RENT_CART', payload: response.data.cartR })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth.isAuth) {
      // 只有当 auth.isAuth 为真时才执行以下操作
      const loadingData = async () => {
        await getCartData()
      }
      loadingData()
    }
  }, [auth.isAuth])

  const [cartTotalR, setCartTotalR] = useState(0)
  const [totalItemsR, setTotalItemsR] = useState(0)
  const [selectItemsR, setSelectItemsR] = useState(0)

  useEffect(() => {
    setCartTotalR(state.cartTotal)
    setTotalItemsR(state.totalItems)
    setSelectItemsR(state.selectItems)
  }, [state])

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (id, specData) => {
    dispatch({
      type: 'REMOVE_RENT_ITEM',
      payload: {
        id,
        specData,
      },
    })
  }

  const checkItem = (id, specData) => {
    dispatch({
      type: 'CHECK_RENT_ITEM',
      payload: {
        id,
        specData,
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
  const handleStartDateChange = (id, newStartDate, specData) => {
    return dispatch({
      type: 'Start_Date_Change',
      payload: {
        id,
        newStartDate,
        specData,
      },
    })
  }
  //租用迄日
  const handleEndDateChange = (id, newEndDate, specData) => {
    return dispatch({
      type: 'End_Date_Change',
      payload: {
        id,
        specData,
        newEndDate,
      },
    })
  }
  return (
    <RentCartContext.Provider
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
        cartTotalR,
        totalItemsR,
        selectItemsR,
      }}
    >
      {children}
    </RentCartContext.Provider>
  )
}

export const useRentCart = () => useContext(RentCartContext)
