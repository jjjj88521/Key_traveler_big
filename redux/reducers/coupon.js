import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import {
  getCoupon,
  getCouponExpired,
  getCouponUsed,
  addCoupon,
} from '../actions/coupon'

const initialState = {
  isLoading: false,
  addCouponLoading: false,
  coupon: [],
  couponExpired: [],
  couponUsed: [],
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoupon.pending, (state) => {
        state.addCouponLoading = true
      })
      .addCase(addCoupon.fulfilled, (state) => {
        state.addCouponLoading = false
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.addCouponLoading = false
        Swal.fire({
          icon: 'error',
          title: '新增優惠碼失敗',
          text: action.payload.message,
          timer: 1500,
        })
      })
    createAsyncReducer(builder, getCoupon, 'coupon')
    createAsyncReducer(builder, getCouponExpired, 'couponExpired')
    createAsyncReducer(builder, getCouponUsed, 'couponUsed')
  },
})

// 整理 extraReducers 操作
const createAsyncReducer = (builder, action, stateField) => {
  builder
    .addCase(action.pending, (state) => {
      state.isLoading = true
    })
    .addCase(action.fulfilled, (state, action) => {
      state.isLoading = false
      state[stateField] = action.payload[stateField]
    })
    .addCase(action.rejected, (state) => {
      state.isLoading = false
      state[stateField] = []
    })
}

export default couponSlice.reducer
