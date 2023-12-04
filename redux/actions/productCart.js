import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '@/utils/request'

// 取得購物車
export const getCartAsync = createAsyncThunk(
  'productCart/getCart',
  async (_, thunkAPI) => {
    try {
      const response = await request.get('/api/cart/product')
      console.log(response.data)
      if (response.data.message !== 'authorized') {
        throw new Error('取得購物車失敗')
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 加入購物車
export const addItemAsync = createAsyncThunk(
  'productCart/addItem',
  async (data, thunkAPI) => {
    try {
      const response = await request.post('/api/cart/addproduct', data)
      if (response.data.message !== 'success') {
        throw new Error('加入購物車失敗')
      }
      return { ...data, ...response.data }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
