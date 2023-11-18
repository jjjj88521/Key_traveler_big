import React, { useState, useRef } from 'react'
import styles from '@/styles/user/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleLoginJWT from '../google-login-jwt'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '@/redux/actions/user'
import { Button } from 'antd'

export default function LoginForm() {
  // redux
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //存 login 資料
  const [inputAuth, setInputAuth] = useState({
    account: '',
    password: '',
  })

  const handleLogin = () => {
    dispatch(loginAsync(inputAuth))
  }

  return (
    <>
      <div className={`container ${styles['bg-image']}`}>
        <div className="logo mb-3 text-center ">
          <Image
            src="/images/header-logo-desktop.png"
            width={250}
            height={46}
            alt="logo"
            className=""
          />
        </div>
        <form className={`${styles['w-sm-50']} w-100 mx-auto`}>
          <div className="row mb-3  ">
            <label htmlFor="account" className="form-label px-0 mt-3">
              帳號
            </label>
            <input
              type="text"
              name="account"
              id="account"
              className="form-control"
              onBlur={(e) => {
                setInputAuth({ ...inputAuth, [e.target.name]: e.target.value })
                console.log(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="password" className="form-label px-0">
              密碼
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={(e) => {
                setInputAuth({ ...inputAuth, [e.target.name]: e.target.value })
              }}
              // onKeyDown={handleKeyPress}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}
            />
          </div>
          <Button
            type="primary"
            className="w-100 my-5"
            onClick={handleLogin}
            loading={user.isLoading}
          >
            登入
          </Button>
        </form>

        <div className="row mb-2 col-sm-8 offset-sm-2">
          <div className={`mb-3 ${styles['hr-sect']} `}>快速登入</div>
          <div className="col-sm-12 text-start">
            <div className="d-flex justify-content-center my-3">
              <GoogleLoginJWT />
            </div>
          </div>
        </div>
        <div className=" text-center my-3">
          <p className=" ">
            還不是會員嗎?
            <Link href="/user/register" className="text-primary ">
              立刻註冊
            </Link>
          </p>
          <Link href="/forget-password" className="text-primary">
            忘記密碼
          </Link>
        </div>
      </div>
    </>
  )
}
