import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react'
import { reducer, initGroup } from './cart-reducer'
import axios from 'axios'
import { useAuth } from './useAuth'
import { useRouter } from 'next/router'
const GroupCartContext = createContext(null)

// initialState = {
//   items: [],
//   isEmpty: true,
//   totalItems: 0, //商品數量+-
//   cartTotal: 0, //總計
// }

// item = {
//   id: '',
//   img: '',
//   brand: '',
//   name: '',
//   price: 0,
//   quantity: 0,
//   spec: '',
//   specData:{},
// }

export const GroupCartProvider = ({ children }) => {
  const router = useRouter()

  const { auth } = useAuth()
  // // init state, init來自cartReducer中
  // const [state, dispatch] = useReducer(reducer, updatedItems, initGroup)
  const [state, dispatch] = useReducer(reducer, [], initGroup)
  const getCartData = async () => {
    // 先清空再加
    dispatch({ type: 'CLEAR_CART' })
    try {
      const response = await axios.get(
        'http://localhost:3005/api/cart/groupbuy',
        {
          withCredentials: true,
        }
      )
      if (response.data.message === 'authorized') {
        // 將購物車資料設定為初始狀態
        dispatch({ type: 'SET_GROUP_CART', payload: response.data.cartG })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth.isAuth && router.isReady) {
      // 只有当 auth.isAuth 为真时才执行以下操作
      const loadingData = async () => {
        await getCartData()
      }
      loadingData()
    }
  }, [auth.isAuth, router.isReady])

  useEffect(() => {
    if (router.pathname === '/cart') {
      getCartData()
    }
  }, [router.pathname])

  const [cartTotalG, setCartTotalG] = useState(0)
  const [totalItemsG, setTotalItemsG] = useState(0)
  const [selectItemsG, setSelectItemsG] = useState(0)

  useEffect(() => {
    setCartTotalG(state.cartTotal)
    setTotalItemsG(state.totalItems)
    setSelectItemsG(state.selectItems)
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

  const styleSelect = (id, key, value) => {
    return dispatch({
      type: 'STYLE_SELECT',
      payload: {
        id,
        key,
        value,
      },
    })
  }

  return (
    <GroupCartContext.Provider
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
        cartTotalG,
        totalItemsG,
        selectItemsG,
        styleSelect,
        getCartData,
      }}
    >
      {children}
    </GroupCartContext.Provider>
  )
}

export const useGroupCart = () => useContext(GroupCartContext)
