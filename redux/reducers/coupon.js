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
      // 新增
      .addCase(addCoupon.pending, (state) => {
        state.addCouponLoading = true
      })
      .addCase(addCoupon.fulfilled, (state) => {
        state.addCouponLoading = false
        Swal.fire({
          icon: 'success',
          title: '新增優惠碼成功',
          timer: 1500,
        })
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.addCouponLoading = false
        Swal.fire({
          icon: 'error',
          title: '新增優惠碼失敗',
          text: action.payload,
          timer: 1500,
        })
      })
    createAsyncReducer(builder, getCoupon, 'coupon') // 所有優惠券
    createAsyncReducer(builder, getCouponExpired, 'couponExpired') // 已過期優惠券
    createAsyncReducer(builder, getCouponUsed, 'couponUsed') // 已使用優惠券
  },
})

// 整理獲取優惠券操作
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
