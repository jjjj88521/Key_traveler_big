import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import productCartReducer from './reducers/productCart'
import groupBuyCartReducer from './reducers/groupBuyCart'
import rentCartReducer from './reducers/rentCart'
import couponReducer from './reducers/coupon'

const reducers = combineReducers({
  auth: authReducer,
  productCart: productCartReducer,
  groupBuyCart: groupBuyCartReducer,
  rentCart: rentCartReducer,
  coupon: couponReducer,
})

export const store = configureStore({
  reducer: reducers,
})
