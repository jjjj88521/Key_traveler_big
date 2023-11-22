import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import request from '@/utils/request'

// 登入
export const loginAsync = createAsyncThunk(
  'user/login',
  async (formData, thunkAPI) => {
    try {
      const response = await request.post('/api/auth-jwt/login', formData)
      if (response.data.code !== '200') {
        throw new Error('帳號或密碼錯誤')
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

// 登出
export const logoutAsync = createAsyncThunk('user/logout', async () => {
  try {
    const response = await request.post('/api/auth-jwt/logout-ssl-proxy')
    if (response.data.code !== '200') {
      throw new Error('登出失敗，請稍後再試')
    }
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

// 檢查登入
export const checkLoginAsync = createAsyncThunk('user/checkLogin', async () => {
  try {
    const response = await request.get('/api/auth-jwt/check-login')
    if (response.data.message !== 'authorized') {
      throw new Error('請重新登入')
    }
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})
