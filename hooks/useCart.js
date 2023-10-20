import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react'
import { reducer, init } from './cart-reducer'
import axios from 'axios'
import { useRouter } from 'next/router'
const CartContext = createContext(null)
import { useAuth } from './useAuth'

// initialState = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0, //商品數量+-
//   cartTotal: 0, //總計
// }

// item = {
//   id: '',
//   check:false
//   img: '',
//   brand: '',
//   name: '',
//   price: 0,
//   quantity: 0,
//   spec: '',
//   specData:{},
// }

export const CartProvider = ({ children }) => {
  const router = useRouter()
  const { auth } = useAuth()
  // init state, init來自cartReducer中
  // const [state, dispatch] = useReducer(reducer, items, init)
  const [state, dispatch] = useReducer(reducer, [], init)
  const getCartData = async () => {
    // console.log('useCart')
    try {
      const response = await axios.get(
        'http://localhost:3005/api/cart/product',
        {
          withCredentials: true,
        }
      )
      if (response.data.message === 'authorized') {
        // 將購物車資料設定為初始狀態
        dispatch({ type: 'SET_CART', payload: response.data.cartP })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth.isAuth) {
      const loadingData = async () => {
        await getCartData()
      }
      loadingData()
    }
  }, [auth.isAuth])

  const [cartTotalP, setCartTotalP] = useState(0)
  const [totalItemsP, setTotalItemsP] = useState(0)
  const [selectItemsP, setSelectItemsP] = useState(0)
  useEffect(() => {
    setCartTotalP(state.cartTotal)
    setTotalItemsP(state.totalItems)
    setSelectItemsP(state.selectItems)
  }, [state])

  /**
   * 加入新項目(quantity:1)，重覆項目 quantity: quantity + 1
   * @param  {Object} item
   * @returns {void}
   */
  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  /**
   * 給定一id值，將這商品移出陣列中
   * @param {string} id
   * @returns {void}
   */
  const removeItem = (id, specData) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id,
        specData,
      },
    })
  }

  const checkItem = (id, specData) => {
    dispatch({
      type: 'CHECK_ITEM',
      payload: {
        id,
        specData,
      },
    })
  }

  const checkAllItem = (checkall) => {
    dispatch({
      type: 'CHECK_ALL_ITEM',
      payload: { checkall },
    })
  }
  /**
   * 給定一item物件，依照id尋找後更新其中的屬性值
   * @param {Object} item
   * @returns {void}
   */
  const updateItem = (item) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: item,
    })
  }

  /**
   * 清空整個購物車
   * @returns {void}}
   */
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  /**
   * 給定一id值，回傳是否存在於購物車中
   * @param {string} id
   * @returns {boolean}
   */
  const isInCart = (id) => {
    return state.items.some((item) => item.id === id)
  }

  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity + 1
   * @param {string} id
   * @returns {void}
   */
  const plusOne = (id, specData) => {
    return dispatch({
      type: 'PLUS_ONE',
      payload: {
        id,
        specData,
      },
    })
  }

  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity - 1，但 quantity 最小值為1
   * @param {string} id
   * @returns {void}
   */
  const minusOne = (id, specData) => {
    return dispatch({
      type: 'MINUS_ONE',
      payload: {
        id,
        specData,
      },
    })
  }
  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity - 1，但 quantity 最小值為1
   * @param {string} id
   * @returns {void}
   */
  const styleSelect = (id, key, value, specData) => {
    return dispatch({
      type: 'STYLE_SELECT',
      payload: {
        id,
        key,
        value,
        specData,
      },
    })
  }

  return (
    <CartContext.Provider
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
        cartTotalP,
        totalItemsP,
        selectItemsP,
        styleSelect,
        getCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
