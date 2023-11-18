import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'
import { checkLoginAsync, loginAsync, logoutAsync } from '../actions/user'
import Router from 'next/router'

const initialState = {
  isLoading: false,
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true
        state.user = jwtDecode(action.payload.accessToken)
        const redirect = localStorage.getItem('redirect') || '/'
        showSuccessAlert('登入成功', redirect)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        showErrorAlert('登入失敗', action.error.message)
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuth = false
        state.user = initialState.user
        const redirect = localStorage.getItem('redirect') || '/'
        showSuccessAlert('登出成功', redirect)
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        showErrorAlert('登出失敗', action.error.message)
      })
      .addCase(checkLoginAsync.fulfilled, (state, action) => {
        state.isAuth = true
        state.user = action.payload.user
      })
      .addCase(checkLoginAsync.rejected, (state, action) => {
        state.isAuth = false
        state.user = initialState.user
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/pending') ||
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
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
export const { login } = userSlice.actions

export default userSlice.reducer
