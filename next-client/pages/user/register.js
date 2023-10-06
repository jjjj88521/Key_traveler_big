import React from 'react'
import { Steps } from 'antd'
import style from '@/styles/user/register.module.scss'
import { useState } from 'react'
import { DatePicker } from 'antd'
import RegisterForm from '@/components/user/register-form'

const description = [
  '姓名',
  '帳號',
  '性別',
  '地址',
  '手機',
  '生日',
  'E-mail',
  '設定密碼',
  '確認密碼',
]

export default function Profile() {
  //宣告儲存會員資料
  const [formData, setformData] = useState({
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
    expiry: '',
  })
  //宣告會員填寫狀態
  const [errMesage, setErrMesage] = useState({
    name: '',
    account: '',
    address: '',
    gender: '',
    phone: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  //宣告步驟碼
  // const [stepHash, setStepHash] = useState(-1)
  //宣告完成狀態
  const stepStateArray = ['wait', 'process', 'finish', 'error']
  const [stepState, setStepState] = useState({
    name: stepStateArray[0],
    account: stepStateArray[0],
    address: stepStateArray[0],
    gender: stepStateArray[0],
    phone: stepStateArray[0],
    birthday: stepStateArray[0],
    email: stepStateArray[0],
    password: stepStateArray[0],
    confirmPassword: stepStateArray[0],
  })

  // ant design 套件用
  const [
    name,
    account,
    gender,
    address,
    phone,
    birthday,
    email,
    password,
    confirmPassword,
  ] = description

  //處理錯誤訊息
  function handleErrMessage(e, mes) {
    setErrMesage({ ...errMesage, [e.target.name]: mes })
  }
  //處理step狀態碼
  function handleSetStepState(e, i) {
    setStepState({ ...stepState, [e.target.name]: stepStateArray[i] })
  }
  //處理會員儲存資料
  function handleSetformData(e, mes) {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  //傳遞props用
  const registerForm = {
    handleErrMessage,
    handleSetStepState,
    handleSetformData,
    errMesage,
    setErrMesage,
    setformData,
    setStepState,
    formData,
    stepState,
    stepStateArray,
    birthday,
  }
  return (
    <>
      <div className="container">
        <h1 className="mb-5 fw-bolder offset-sm-1">填寫基本註冊資料</h1>
        <div className="row offset-sm-1">
          <RegisterForm {...registerForm} className="" />
          <Steps
            className={`${style['none-user']} col-2 offset-2`}
            direction="vertical"
            items={[
              {
                title: name,
                status: stepState.name,
              },
              {
                title: account,
                status: stepState.account,
              },
              {
                title: address,
                status: stepState.address,
              },
              {
                title: gender,
                status: stepState.gender,
              },
              {
                title: phone,
                status: stepState.phone,
              },
              {
                title: birthday,
                status: stepState.birthday,
              },
              {
                title: email,
                status: stepState.email,
              },
              {
                title: password,
                status: stepState.password,
              },
              {
                title: confirmPassword,
                status: stepState.confirmPassword,
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}
