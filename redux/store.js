import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import productCartReducer from './reducers/productCart'
import groupBuyCartReducer from './reducers/groupBuyCart'
import rentCartReducer from './reducers/rentCart'

const reducers = combineReducers({
  user: userReducer,
  productCart: productCartReducer,
  groupBuyCart: groupBuyCartReducer,
  rentCart: rentCartReducer,
})

export const store = configureStore({
  reducer: reducers,
})
