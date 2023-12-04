import request from '@/utils/request'
import { createAsyncThunk } from '@reduxjs/toolkit'

// 所有優惠券
export const getCoupon = createAsyncThunk(
  'coupon/getCouponAsync',
  async (_, thunkAPI) => {
    try {
      const response = await request.get('/api/coupon')
      if (response.data.message !== 'authorized') {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 已過期優惠券
export const getCouponExpired = createAsyncThunk(
  'coupon/getCouponExpiredAsync',
  async (_, thunkAPI) => {
    try {
      const response = await request.get('/api/coupon/couponExpired')
      if (response.data.message !== 'authorized') {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 已使用優惠券
export const getCouponUsed = createAsyncThunk(
  'coupon/getCouponUsedAsync',
  async (_, thunkAPI) => {
    try {
      const response = await request.get('/api/coupon/couponUsed')
      if (response.data.message !== 'authorized') {
        throw new Error(response.data.message)
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 新增優惠券
export const addCoupon = createAsyncThunk(
  'coupon/addCouponAsync',
  async (couponCode, thunkAPI) => {
    try {
      const response = await request.post('/api/coupon', { couponCode })
      if (response.data.message === 'Coupon is expired') {
        throw new Error('優惠碼已過期')
      } else if (response.data.message === 'Coupon has been used') {
        throw new Error('已持有該優惠碼')
      } else if (response.data.code === '400') {
        throw new Error('優惠碼輸入錯誤')
      } else {
        thunkAPI.dispatch(getCoupon())
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
