import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react'
import { reducer, init } from './cart-reducer'

const ThirdCartContext = createContext(null)

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
// }

export const ThirdCartProvider = ({
  children,
  initialProducts = [
    {
      id: 1,
      check: false,
      img: '/images/1669370674683000804.jpg',
      brand: 'Meletrix',
      name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
      price: 3000,
      quantity: 1,
      spec: {
        外殼: ['EE 耀夜黑', 'EE 細花白'],
        '配重/旋鈕': ['電泳 白', '陽極 黑'],
      },
      styleSelect: {
        外殼: 'EE 耀夜黑',
        '配重/旋鈕': '電泳 白',
      },
    },
    {
      id: 2,
      check: false,
      img: '/images/1669370674683000804.jpg',
      brand: 'Meletrix',
      name: 'Meletrix ZoomPad 數字鍵盤套件 SP版(左手版)',
      price: 1000,
      quantity: 1,
      spec: {
        外殼: ['EE 耀夜黑', 'EE 細花黑'],
        '配重/旋鈕': ['電泳 綠', '陽極 紅'],
      },
      styleSelect: {
        外殼: ['EE 耀夜黑'],
        '配重/旋鈕': ['電泳 白'],
      },
    },
  ], //初始化購物車的加入項目
}) => {
  let items = initialProducts

  // init state, init來自cartReducer中
  const [state, dispatch] = useReducer(reducer, items, init)
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
  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        id,
      },
    })
  }

  const checkItem = (id) => {
    dispatch({
      type: 'CHECK_ITEM',
      payload: {
        id,
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
  const plusOne = (id) => {
    return dispatch({
      type: 'PLUS_ONE',
      payload: {
        id,
      },
    })
  }

  /**
   * 給定一id值，有尋找到商品時，設定quantity: quantity - 1，但 quantity 最小值為1
   * @param {string} id
   * @returns {void}
   */
  const minusOne = (id) => {
    return dispatch({
      type: 'MINUS_ONE',
      payload: {
        id,
      },
    })
  }

  return (
    <ThirdCartContext.Provider
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
      }}
    >
      {children}
    </ThirdCartContext.Provider>
  )
}

export const useThirdCart = () => useContext(ThirdCartContext)
