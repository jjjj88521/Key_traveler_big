import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

const fakeUserData = [
  {
    isAuth: true,
    name: 'AAA',
    account: 'admin',
    gender: '0',
    address: 'CCC',
    phone: '0912345678',
    birthday: '1993-09-28',
    email: 'DDD@DD.D',
    password: '12345',
    confirmPassword: '12345',
    cardNumber: '1234567891011121',
    cardName: 'AAA',
    expiry: '0426',
  },
]
export default function LoginForm() {
  //存login 資料
  const [inputAuth, setInputAuth] = useState({
    account: '',
    password: '',
  })

  //存Token
  const [loginToken, setLoginToken] = useState('')
  //解析完存資料
  const [profileData, setProfileData] = useState({})
  // 戳登入的API讀取資料、存入local Storage
  function handleLoginApi(account, password) {
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3005/api/auth-jwt/login', {
          account: account,
          password: password,
        })
        .then((res) => {
          localStorage.setItem('loginToken', res.data.accessToken)
          console.log('loginToken已經成功存在localstorage1')
          setLoginToken(res.data.accessToken)
          console.log(loginToken)
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  //取得localStorege，並解析Token，存到profileData
  function loginProfile() {
    return new Promise((resolve) => {
      const localData = localStorage.getItem('loginToken')
      // 檢查是否有資料
      if (localData) {
        setAuth(jwtDecode(localData))
        console.log('成功讀取LocalStorage資料2')
        resolve()
      }
    })
  }

  //解構
  const { auth, setAuth } = useAuth()
  //監聽LoginToken

  return (
    <>
      <div className="container " style={{ width: '50%' }}>
        <div className="logo mb-3 text-center ">
          {' '}
          <Image
            src="/images/header-logo-desktop.png"
            width={250}
            height={46}
            alt="logo"
            className=""
          />
        </div>
        <form className="w-50 mx-auto">
          <div className="row mb-3 ">
            <label htmlFor="account" className="form-label px-0">
              帳號
            </label>
            <input
              type="text"
              name="account"
              id="account"
              className="form-control"
              onBlur={(e) => {
                setInputAuth({ ...inputAuth, [e.target.name]: e.target.value })
              }}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="password" className="form-label px-0">
              密碼
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="form-control "
              onBlur={(e) => {
                setInputAuth({ ...inputAuth, [e.target.name]: e.target.value })
              }}
            />
          </div>
          <Link
            // href=""
            href="/user/profile"
            type="button"
            class="btn btn-primary my-3 w-100"
            onClick={() => {
              const fetchData = async () => {
                await handleLoginApi(inputAuth.account, inputAuth.password)
                await loginProfile()
              }
              fetchData()

              console.log(auth)
            }}
          >
            登入
          </Link>
        </form>
        <div className=" text-center my-3">
          <p className=" ">
            還不是會員嗎?
            <Link href="/user/register" className="text-primary ">
              立刻註冊
            </Link>
          </p>
          <Link href="/forget-password" className=" text-primary  ">
            忘記密碼
          </Link>
        </div>
      </div>
    </>
  )
}
