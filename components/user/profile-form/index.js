import React from 'react'

import dayjs from 'dayjs'
import { DatePicker } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import jwtDecode from 'jwt-decode'
import Router from 'next/router'
import axios from 'axios'
const disabledDate = (current) => {
  return current && current > new Date()
}

export default function ProfileForm() {
  const { auth, setAuth } = useAuth()
  console.log(auth)
  //登出

  // 重新整理後驗證登入狀態
  // useEffect(() => {
  //   if (localStorage.getItem('loginToken')) {
  //     console.log(jwtDecode(localStorage.getItem('loginToken')))
  //     const data = jwtDecode(localStorage.getItem('loginToken'))
  //     setAuth({ ...data })
  //     setformData({ ...data })
  //     console.log(auth)
  //   } else {
  //     Router.push('/user/login')
  //   }
  // }, [])
  //宣告儲存會員資料
  const [formData, setformData] = useState({ ...auth.user })

  //宣告會員填寫狀態
  const [error, setError] = useState('')
  const [errMesage, setErrMesage] = useState({
    name: '',
    account: '',
    address: '',
    gender: '',
    phone: '',
    birthday: '',
    email: '',
  })

  function handleErrMessage(e, mes) {
    setErrMesage({ ...errMesage, [e.target.name]: mes })
  }
  function handleSetformData(e, mes) {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <form action="" className="w-100">
        <label htmlFor="name" className="col-form-label ">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          defaultValue={formData.last_name + formData.first_name}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入姓名'
              handleErrMessage(e, mes)
            } else if (
              0 < e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字以內'
              handleErrMessage(e, mes)
            }
          }}
        />

        <label htmlFor="gender" className="col-form-label mt-3">
          性別
        </label>
        <select
          type="text"
          id="gender"
          name="gender"
          className="form-select"
          defaultValue={formData.gender}
        >
          <option value="1">男</option>
          <option value="0">女</option>
        </select>

        <label htmlFor="address" className="col-form-label mt-3">
          地址
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          defaultValue={formData.address}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入地址'
              handleErrMessage(e, mes)
            } else {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            }
          }}
        />

        <label htmlFor="phone" className="col-form-label mt-3">
          手機
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="form-control"
          defaultValue={formData.phone}
          onChange={(e) => {
            let phoneReg = /^09\d{8}$/
            if (phoneReg.test(e.target.value)) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            } else {
              let mes = '請輸入正確格式的手機號碼'
              handleErrMessage(e, mes)
            }
          }}
        />
        {/* 生日理論上不能改 */}
        {/* <div className="birthday mt-3">
          <label htmlFor="birthday" className="col-form-label">
            生日
          </label>
          <br />
          <DatePicker
            id="birthday"
            name="birthday"
            disabledDate={disabledDate}
            placeholder="選擇日期"
            className="form-control"
            defaultValue={dayjs(formData.birthday, 'YYYY-MM-DD')}
          />
        </div> */}
        <button
          type="button"
          className="btn btn-primary text-white col-sm-5 col-12 offset-sm-7 mt-5"
          onClick={() => {
            if (errMesage.name !== '') {
              setError(errMesage.name)
            } else if (errMesage.address !== '') {
              setError(errMesage.address)
              errMesage.address
            } else if (errMesage.phone !== '') {
              setError(errMesage.phone)
              errMesage.phone
            }

            console.log(error)
          }}
        >
          儲存
        </button>

        <p className="text-end mt-3">{error}</p>
      </form>
    </>
  )
}
