import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from 'react'
import { reducer, init } from './cart-reducer'

const CartContext = createContext(null)

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

export const CartProvider = ({
  children,
  initialProducts = [
    {
      id: 5,
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
        外殼: ['EE 耀夜黑', 'EE 細花白', 'EE 細花黃', 'EE 細花成', 'EE 細花紅'],
        '配重/旋鈕': ['陽極 黑', '電泳 白'],
      },
    },
  ], //初始化購物車的加入項目
}) => {
  let items = initialProducts

  // updatedItems之後會撈db，預設就不會是第一個值
  const updatedItems = items.map((item) => {
    // 在每個item中建立一個新屬性 specData
    const specData = Object.keys(item.spec).map((key) => ({
      key,
      value: item.spec[key][0], // 預設為第一個值
    }))

    return {
      ...item, // 複製原始的item物件的屬性
      specData, // 新增新的屬性 specData
    }
  })

  // init state, init來自cartReducer中
  const [state, dispatch] = useReducer(reducer, updatedItems, init)
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
