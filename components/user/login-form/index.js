import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  // 戳登入的API讀取資料、存入local Storage
  async function handleLoginApi(inputAuth) {
    // return new Promise((resolve, reject) => {
    //   axios
    //     .post('http://localhost:3005/api/auth-jwt/login', {
    //       account: account,
    //       password: password,
    //     })
    //     .then((res) => {
    //       localStorage.setItem('loginToken', res.data.accessToken)
    //       console.log('loginToken已經成功存在localstorage1')
    //       setAuth({
    //         isAuth: true,
    //         user: jwtDecode(res.data.accessToken),
    //       })
    //       setLoginToken(res.data.accessToken)
    //       console.log(loginToken)
    //       resolve()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       reject(err)
    //     })
    // })
    const formData = {
      account: inputAuth.account,
      password: inputAuth.password,
    }
    console.log(formData)

    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        formData,
        {
          withCredentials: true, // save cookie in browser
        }
      )

      if (response.data.code !== 200) {
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: '帳號或密碼錯誤',
          timer: 1500,
        })
      }
      // console.log(response.data)
      setAuth({
        isAuth: true,
        user: jwtDecode(response.data.accessToken),
      })
      // setLoginToken(response.data.accessToken)
      Swal.fire({
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push('/user/profile')
      })
    } catch (error) {
      console.log(error)
    }
  }

  //解構
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <>
      <div className="container " style={{ width: '50%' }}>
        <div className="logo mb-3 text-center ">
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
              type="password"
              name="password"
              id="password"
              className="form-control"
              onBlur={(e) => {
                setInputAuth({ ...inputAuth, [e.target.name]: e.target.value })
              }}
            />
          </div>
          <button
            type="button"
            class="btn btn-primary my-3 w-100"
            onClick={() => {
              handleLoginApi(inputAuth)
            }}
          >
            登入
          </button>
        </form>
        <div className=" text-center my-3">
          <p className=" ">
            還不是會員嗎?
            <Link href="/user/register" className="text-primary ">
              立刻註冊
            </Link>
          </p>
          <Link href="/user/forget-password" className="text-primary">
            忘記密碼
          </Link>
        </div>
      </div>
    </>
  )
}
