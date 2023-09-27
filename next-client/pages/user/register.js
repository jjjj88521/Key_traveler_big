import React from 'react'
import { Steps } from 'antd'
import style from '@/styles/user/register.module.scss'
import { useState } from 'react'

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
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  let mes = '請填入地址'
                  handleErrMessage(e, mes)
                } else {
                  let mes = ''
                  handleErrMessage(e, mes)
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
              onChange={(e) => {
                console.log(e.target.value)
                if (e.target.value !== '1' && e.target.value !== '0') {
                  let mes = '請選擇性別'
                  handleErrMessage(e, mes)
                } else {
                  let mes = ' '
                  handleErrMessage(e, mes)
                  setStepHash(3)
                }
              }}
            >
              <option value="">請選擇</option>
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
              onChange={(e) => {
                let phoneReg = /^09\d{8}$/
                if (phoneReg.test(e.target.value)) {
                  let mes = ' '
                  handleErrMessage(e, mes)
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
            <div className="input-group">
              {/*  */}
              <select
                type="text"
                id="birthday-y"
                name="birthday-y"
                className="form-select"
              ></select>{' '}
              <label
                htmlFor="birthday-y"
                className="form-label my-0 align-middle ms-2 me-4 align-middle"
              >
                年
              </label>{' '}
              {/*               */}{' '}
              <select
                type="text"
                id="birthday-m"
                name="birthday-m"
                className="form-select"
              ></select>
              <label
                htmlFor="birthday-m"
                className="form-label my-0 align-middle  ms-2 me-4 align-middle"
              >
                月
              </label>
              {/*  */}{' '}
              <select
                type="text"
                id="birthday-d"
                name="birthday-d"
                className="form-select"
              ></select>
              <label
                htmlFor="birthday-d"
                className="form-label my-0 align-middle  ms-2 me-4 align-middle"
              >
                日
              </label>
              {/*  */}
            </div>

            <br />
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
            />
            <br />
            <label htmlFor="password" className="form-label">
              設定密碼
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="form-control"
            />
            <br />
            <label htmlFor="confirmPassword" className="form-label">
              確認密碼
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
            />
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
              },
              {
                title: account,
              },
              {
                title: address,
              },
              {
                title: gender,
              },
              {
                title: phone,
              },
              {
                title: birthday,
              },
              {
                title: email,
              },
              {
                title: password,
              },
              {
                title: confirmPassword,
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}
