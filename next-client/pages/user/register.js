import React from 'react'
import { Steps } from 'antd'
import style from "@/styles/user/profile.module.scss"

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

  return (
    <>
      <div className="container">
        <div className="row justify-content-evenly">
          <h1 className="mb-5 offset-1">填寫基本註冊資料</h1>
          <form action="" className="mb-5 col-md-8 col-10">
            <label htmlFor="name" className="form-label">
              姓名
            </label>
            <input type="text" id="name" name="name" className="form-control" />
            <br />
            <label htmlFor="acount" className="form-label">
              帳號
            </label>
            <input
              type="text"
              id="acount"
              name="acount"
              className="form-control"
            />
            <br />
            <label htmlFor="gender" className="form-label">
              性別
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              className="form-control"
            />
            <br />
            <label htmlFor="address" className="form-label">
              地址
            </label>
            <select
              type="text"
              id="address"
              name="address"
              className="form-control"
            >
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
            <br />
            <label htmlFor="phone" className="form-label">
              手機
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
            />
            <br />
            <div class="birthday">
              <label htmlFor="birthday" className="form-label">
                生日
              </label>
              <div className="input-group">
                {' '}
                <select
                  type="text"
                  id="year"
                  name="birthday"
                  value="year"
                  className="form-select"
                >
                  <option value="1990">1990</option>
                </select>
                <select
                  type="text"
                  id="month"
                  name="birthday"
                  value="07"
                  className="form-select"
                >
                  <option value="07">07</option>
                </select>
                <select
                  type="text"
                  id="day"
                  name="birthday"
                  value="26"
                  className="form-select"
                >
                  <option value="26">26</option>
                </select>
              </div>
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
              <button className={`${style['none-user']} btn btn-primary col-3`}>
                重填
              </button>
              <button className="btn btn-primary col-sm-3 col-10 ">送出</button>
            </div>
          </form>

          <Steps
            className={`${style['none-user']} col-2`}
            direction="vertical"
            current={3}
            items={[
              {
                title: name,
              },
              {
                title: account,
              },
              {
                title: gender,
              },
              {
                title: address,
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
