import React from 'react'
import { Steps } from 'antd'
import style from '@/styles/user/register.module.scss'
import { useState } from 'react'
import { DatePicker, Space } from 'antd'

const disabledDate = (current) => {
  return current && current > new Date()
}
const fakeUserData = [
  {
    name: 'AAA',
    account: 'BBB',
    gender: '男',
    address: 'CCC',
    phone: '0912345678',
    birthday: '19930928',
    Email: 'DDD@DD.D',
    password: '12345',
    confirmPassword: '12345',
  },
]

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
  const [stepHash, setStepHash] = useState(-1)
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

  function handleErrMessage(e, mes) {
    setErrMesage({ ...errMesage, [e.target.name]: mes })
  }
  //在這裡~~~
  function handleSetStepState(e, i) {
    setStepState({ ...stepState, [e.target.name]: stepStateArray[i] })
  }
  function handleSetformData(e, mes) {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container">
        <h1 className="mb-5 fw-bolder">填寫基本註冊資料</h1>
        <div className="row ">
          <form action="" className="mb-5 col-md-7 col-10">
            <label htmlFor="name" className="form-label">
              姓名
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onBlur={() => {
                if (errMesage.name === '') {
                  setStepHash(1)
                }
              }}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  let mes = '請填入姓名'
                  handleErrMessage(e, mes)
                  setStepHash(-1)
                } else if (
                  0 < e.target.value.length &&
                  e.target.value.length < 16
                ) {
                  let mes = ''
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(0)
                } else if (e.target.value.length > 16) {
                  let mes = '請輸入16個字以內'
                  handleErrMessage(e, mes)
                  setStepHash(-1)
                }
              }}
            />
            {/*  */}
            <p className={stepHash >= 0 ? 'text-danger' : 'text-danger'}>
              {errMesage.name}
            </p>
            <br />
            <label htmlFor="account" className="form-label">
              帳號
            </label>
            <input
              type="text"
              id="account"
              name="account"
              className="form-control"
              onBlur={() => {
                if (errMesage.account === '') {
                  setStepHash(2)
                }
              }}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  let mes = '請填入帳號'
                  handleErrMessage(e, mes)
                  setStepHash(0)
                } else if (e.target.value.length < 4) {
                  let mes = '請填入4位以上字元'
                  handleErrMessage(e, mes)
                  setStepHash(0)
                } else if (
                  4 <= e.target.value.length &&
                  e.target.value.length < 16
                ) {
                  let mes = ''
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(1)
                } else if (e.target.value.length > 16) {
                  let mes = '請輸入16個字元以內'
                  handleErrMessage(e, mes)
                  setStepHash(0)
                }
              }}
            />
            <p className={stepHash >= 1 ? 'text-danger' : 'text-danger'}>
              {errMesage.account}
            </p>
            <br />
            <label htmlFor="address" className="form-label">
              地址
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              onBlur={() => {
                if (errMesage.address === '') {
                  setStepHash(3)
                }
              }}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  let mes = '請填入地址'
                  handleErrMessage(e, mes)
                } else {
                  let mes = ''
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(2)
                }
              }}
            />
            <p className={stepHash >= 2 ? 'text-danger' : 'text-danger'}>
              {errMesage.address}
            </p>
            <br />
            <label htmlFor="gender" className="form-label">
              性別
            </label>
            <select
              type="text"
              id="gender"
              name="gender"
              className="form-select"
              onBlur={() => {
                if (errMesage.gender === '') {
                  setStepHash(4)
                }
              }}
              onChange={(e) => {
                console.log(e.target.value)
                if (e.target.value !== '1' && e.target.value !== '0') {
                  let mes = '請選擇性別'
                  handleErrMessage(e, mes)
                } else {
                  let mes = ' '
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(3)
                }
              }}
            >
              <option value="" className="">
                請選擇
              </option>
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
            <p className={stepHash >= 3 ? 'text-danger' : 'text-danger'}>
              {errMesage.gender}
            </p>
            <br />
            <label htmlFor="phone" className="form-label">
              手機
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              onBlur={() => {
                if (errMesage.phone === '') {
                  setStepHash(5)
                }
              }}
              onChange={(e) => {
                let phoneReg = /^09\d{8}$/
                if (phoneReg.test(e.target.value)) {
                  let mes = ' '
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(4)
                } else {
                  let mes = '請輸入正確格式的手機號碼'
                  handleErrMessage(e, mes)
                }
              }}
            />
            <p className={stepHash >= 3 ? 'text-danger' : 'text-danger'}>
              {errMesage.phone}
            </p>
            <br />
            <label htmlFor="birthday" className="form-label">
              生日
            </label>
            <br />
            <DatePicker
              id="birthday"
              name="birthday"
              disabledDate={disabledDate}
              placeholder="選擇日期"
              onBlur={() => {
                if (errMesage.birthday === '') {
                  setStepHash(6)
                }
              }}
              onChange={(date, dateString) => {
                if (dateString) {
                  let mes = ''
                  setErrMesage({ ...errMesage, [birthday]: mes })
                  handleSetformData({ ...errMesage, [birthday]: dateString })
                  setStepHash(5)
                } else {
                  let mes = '請填入日期'
                  setErrMesage(birthday, mes)
                }
                ;<p className={stepHash >= 4 ? 'text-danger' : 'text-danger'}>
                  {errMesage.birthday}
                </p>
              }}
              className="form-control"
            />
            <p className={stepHash >= 3 ? 'text-danger' : 'text-danger'}>{}</p>
            <br />

            <label htmlFor="email" className="form-label">
              電子信箱
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              onBlur={() => {
                if (errMesage.email === '') {
                  setStepHash(7)
                }
              }}
              onChange={(e) => {
                const emailReg = /@.*\.com/
                if (emailReg.test(e.target.value)) {
                  console.log(emailReg.test(e.target.value))
                  let mes = ' '
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(6)
                } else if (e.target.value.length === 0) {
                  let mes = '請輸入Email '
                  handleErrMessage(e, mes)
                  setStepHash(5)
                } else {
                  let mes = '請輸入正確格式的Email'
                  handleErrMessage(e, mes)
                  setStepHash(5)
                }
              }}
            />
            <p className={stepHash >= 5 ? 'text-danger' : 'text-danger'}>
              {errMesage.email}
            </p>
            <br />
            <label htmlFor="password" className="form-label">
              設定密碼
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="form-control"
              onBlur={() => {
                if (errMesage.password === '') {
                  setStepHash(8)
                }
              }}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  let mes = '請填入密碼'
                  handleErrMessage(e, mes)
                  setStepHash(7)
                } else if (e.target.value.length < 4) {
                  let mes = '請填入4位以上字元'
                  handleErrMessage(e, mes)
                  setStepHash(7)
                } else if (
                  4 <= e.target.value.length &&
                  e.target.value.length < 16
                ) {
                  let mes = ' '
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)
                  setStepHash(8)
                } else if (e.target.value.length > 16) {
                  let mes = '請輸入16個字元以內'
                  handleErrMessage(e, mes)
                  setStepHash(8)
                }
              }}
            />
            <p className={stepHash >= 8 ? 'text-danger' : 'text-danger'}>
              {errMesage.password}
            </p>
            <br />
            <label htmlFor="confirmPassword" className="form-label">
              確認密碼
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              onBlur={() => {
                if (errMesage.confirmPassword === '') {
                  setStepHash(9)
                }
              }}
              onChange={(e) => {
                if (e.target.value === formData.password) {
                  let mes = ''
                  handleErrMessage(e, mes)
                  handleSetformData(e, mes)

                  setStepHash(8)
                } else {
                  let mes = '密碼不一致'
                  handleErrMessage(e, mes)
                  setStepHash(8)
                }
              }}
            />
            <p className={stepHash >= 9 ? 'text-danger' : 'text-danger'}>
              {errMesage.confirmPassword}
            </p>

            <div className="button-group row justify-content-evenly mt-5  ">
              <button
                className={`${style['none-user']} btn btn-primary col-3 text-white`}
              >
                重填
              </button>
              <button className="btn btn-primary col-sm-3 col-10 text-white ">
                送出
              </button>
            </div>
          </form>

          <Steps
            className={`${style['none-user']} col-2 offset-2`}
            direction="vertical"
            current={stepHash}
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
