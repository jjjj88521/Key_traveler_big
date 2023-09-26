import React from 'react'
import Image from 'next/image'

export default function Login() {
  return (
    <>
      <div className="container ">
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
            />
          </div>
          <button class="btn btn-primary my-3 w-100">登入</button>
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
