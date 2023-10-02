import React, { useState } from 'react'
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
  },
]
export default function Login() {
  const [inputAuth, setInputAuth] = useState({
    account: '',
    password: '',
  })
  //解構
  const { auth, setAuth } = useAuth()
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
            href="/user/profile"
            type="button"
            class="btn btn-primary my-3 w-100"
            onClick={() => {
              if (
                inputAuth.account === fakeUserData[0].account &&
                inputAuth.password === fakeUserData[0].password
              ) {
                console.log(fakeUserData)
                setAuth({ ...fakeUserData[0] })

                console.log(auth)
              }
            }}
          >
            登入
          </Link>
        </form>
        <div className=" text-center my-3">
          <p className=" ">
            還不是會員嗎?<a href=""> 立刻註冊</a>
          </p>
          <a className="  ">回上一頁</a>
        </div>
      </div>
    </>
  )
}
