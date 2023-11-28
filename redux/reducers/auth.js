import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'
import {
  checkLoginAsync,
  googleLoginAsync,
  loginAsync,
  logoutAsync,
} from '../actions/auth'
import Router from 'next/router'

const initialState = {
  isLoading: false, // 判斷是否正在登入
  isAuth: false,
  user: {
    id: null,
    name: '',
    account: '',
    gender: '',
    address: '',
    phone: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    cardName: '',
    exp: '',
    vip: '',
    google_uid: '',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true
      state.user = action.payload
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // 登入
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true
        state.user = jwtDecode(action.payload.accessToken)
        const redirect = localStorage.getItem('redirect') || '/'
        showSuccessAlert('登入成功', redirect)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        showErrorAlert('登入失敗', action.payload)
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        if (action.payload.code === '200') {
          state.isAuth = false
          state.user = initialState.user
          let redirect = localStorage.getItem('redirect') || '/'
          redirect =
            redirect.startsWith('/user') || redirect.startsWith('/cart')
              ? '/'
              : redirect
          showSuccessAlert('登出成功', redirect)
        }
      })
      // 登出
      .addCase(logoutAsync.rejected, (state, action) => {
        console.log(action.payload.message)
        showErrorAlert('登出失敗', action.payload)
      })
      .addCase(checkLoginAsync.fulfilled, (state, action) => {
        state.isAuth = true
        state.user = action.payload.user
      })
      .addCase(checkLoginAsync.rejected, (state, action) => {
        state.isAuth = false
        state.user = initialState.user
      })
      // google 登入
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        state.isAuth = true
        state.user = jwtDecode(action.payload.accessToken)
        const redirect = localStorage.getItem('redirect') || '/'
        showSuccessAlert('登入成功', redirect)
      })
      .addCase(googleLoginAsync.rejected, (state, action) => {
        console.log(action.payload)
        showErrorAlert('登入失敗', action.payload)
      })
      // loading，checklogin 不會有 loading
      .addMatcher(
        (action) => !action.type.startsWith('auth/checkLogin'),
        (state, action) => {
          state.isLoading = action.type.endsWith('/pending')
        }
      )
  },
})

// 成功訊息
const showSuccessAlert = (title, redirect) => {
  Swal.fire({
    icon: 'success',
    title: title,
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    Router.push(redirect)
    localStorage.removeItem('redirect')
  })
}

// 失敗訊息
const showErrorAlert = (title, errorMessage) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: errorMessage,
    timer: 1500,
  })
}
export const { setUser, isLoading } = authSlice.actions

export default authSlice.reducer
