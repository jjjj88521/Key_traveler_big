import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

// 登入
export const loginAsync = createAsyncThunk('user/login', async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:3005/api/auth-jwt/login',
      formData,
      {
        withCredentials: true,
      }
    )
    if (response.data.code !== '200') {
      throw new Error('帳號或密碼錯誤')
    }
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

// 登出
export const logoutAsync = createAsyncThunk('user/logout', async () => {
  await Swal.fire({
    title: '確定要登出嗎?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          'http://localhost:3005/api/auth-jwt/logout',
          {},
          {
            withCredentials: true,
          }
        )
        if (response.data.code !== '200') {
          throw new Error('登出失敗')
        }
        return response.data
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  })
})

// 檢查登入
export const checkLoginAsync = createAsyncThunk('user/checkLogin', async () => {
  try {
    const response = await axios.get(
      'http://localhost:3005/api/auth-jwt/check-login',
      {
        withCredentials: true,
      }
    )
    if (response.data.message !== 'authorized') {
      throw new Error('請重新登入')
    }
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})
