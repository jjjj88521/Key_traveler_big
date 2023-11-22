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
      thunkAPI.rejectWithValue(error.response.data)
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
      thunkAPI.rejectWithValue(error.response.data)
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
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// 新增優惠券
export const addCoupon = createAsyncThunk(
  'coupon/addCouponAsync',
  async (couponCode, thunkAPI) => {
    try {
      const response = await request.post('/api/coupon', { couponCode })
      if (response.data.message === '400') {
        throw new Error('優惠碼輸入錯誤')
      } else if (response.data.message === '403') {
        throw new Error('優惠碼已過期')
      } else if (response.data.message === '402') {
        throw new Error('已持有該優惠碼')
      } else {
        thunkAPI.dispatch(getCoupon())
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
