import { createAsyncThunk } from '@reduxjs/toolkit'
import request from '@/utils/request'

// 登入
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await request.post('/api/auth-jwt/login', formData)
      if (response.data.code !== '200') {
        throw new Error('帳號或密碼錯誤')
      }
      return response.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// 登出
export const logoutAsync = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    const response = await request.post('/api/auth-jwt/logout-ssl-proxy')
    if (response.data.code !== '200') {
      throw new Error('登出失敗，請稍後再試')
    }
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

// 檢查登入
export const checkLoginAsync = createAsyncThunk(
  'auth/checkLogin',
  async (thunkAPI) => {
    try {
      const response = await request.get('/api/auth-jwt/check-login')
      if (response.data.message !== 'authorized') {
        throw new Error('請重新登入')
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// google 登入
export const googleLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async (providerData, thunkAPI) => {
    try {
      const response = await request.post('/api/google-login/jwt', providerData)
      if (response.data.message !== 'success') {
        throw new Error('登入失敗')
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
