import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  return (
    <>
      <div class="container">
        <Image src="" alt="" />
        <section>
          <label htmlFor="account">帳號</label>
          <input type="text" name="account" id="account" />
        </section>
        <section>
          <label htmlFor="password">密碼</label>
          <input type="text" name="password" id="password" />
        </section>
        <button class="btn btn-primary">登入</button>
        <section>
          <p>
            還不是會員嗎?<a href="">立刻註冊</a>
          </p>
          <a>回上一頁</a>
        </section>
      </div>
    </>
  )
}
