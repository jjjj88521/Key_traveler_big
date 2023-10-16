import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/user/member.module.css'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import GoogleLogo from '@/components/icons/google-logo'
import LineLogo from '@/components/icons/line-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import useFirebase from '@/hooks/use-firebase'
export default function LoginForm() {
  //google第三方登入用S
  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { logoutFirebase, loginGoogleRedirect, initApp } = useFirebase()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/api/google-login/session',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuth({
        isAuth: true,
        userData: res.data.user,
      })
    } else {
      alert('有錯誤')
    }
  }

  //google第三方登入用E
  //enter登入
  const loginButtonRef = useRef(null)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loginButtonRef.current.click()
    }
  }

  //存login 資料
  const [inputAuth, setInputAuth] = useState({
    account: '',
    password: '',
  })

  const router = useRouter()
  // 戳登入的API讀取資料、存入local Storage
  // async function handleLoginApi(inputAuth) {
  //   // return new Promise((resolve, reject) => {
  //   //   axios
  //   //     .post('http://localhost:3005/api/auth-jwt/login', {
  //   //       account: account,
  //   //       password: password,
  //   //     })
  //   //     .then((res) => {
  //   //       localStorage.setItem('loginToken', res.data.accessToken)
  //   //       console.log('loginToken已經成功存在localstorage1')
  //   //       setAuth({
  //   //         isAuth: true,
  //   //         user: jwtDecode(res.data.accessToken),
  //   //       })
  //   //       setLoginToken(res.data.accessToken)
  //   //       console.log(loginToken)
  //   //       resolve()
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err)
  //   //       reject(err)
  //   //     })
  //   // })
  //   const formData = {
  //     account: inputAuth.account,
  //     password: inputAuth.password,
  //   }
  //   console.log(formData)

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3005/api/auth-jwt/login',
  //       formData,
  //       {
  //         withCredentials: true, // save cookie in browser
  //       }
  //     )

  //     if (response.data.code !== 200) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: '登入失敗',
  //         text: '帳號或密碼錯誤',
  //         timer: 1500,
  //       })
  //     }
  //     // console.log(response.data)
  //     setAuth({
  //       isAuth: true,
  //       user: jwtDecode(response.data.accessToken),
  //     })
  //     // setLoginToken(response.data.accessToken)
  //     Swal.fire({
  //       icon: 'success',
  //       title: '登入成功',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {
  //       router.push('/user/profile')
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // 引入 auth context，登入的操作也寫在裡面了，拿出來用就好
  const { auth, setAuth, login } = useAuth()
  // google 快速登入API
  // function googleLogin() {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post('http://localhost:3005/api/google-login/jwt')
  //       .then((res) => {
  //         if (res.data.code === 200) {
  //           console.log('成功讀取')
  //           console.log(res)
  //         } else {
  //           console.log('讀取失敗1')
  //           console.log(res)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('讀取失敗2')
  //         console.log(err)
  //       })
  //   })
  // }

  useEffect(() => {
    console.log(auth)
  }, [auth])

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
        <form className={`${styles['w-sm-50']}  w-100  mx-auto`}>
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
              onKeyDown={handleKeyPress}
            />
          </div>
          <button
            type="button"
            class="btn btn-primary my-5 w-100 "
            onClick={() => {
              login(inputAuth.account, inputAuth.password)
            }}
            onKeyDown={(e) => {
              console.log(e)
              if (e.key === 'Enter') {
                login(inputAuth.account, inputAuth.password)
                console.log(e.key)
              }
            }}
            ref={loginButtonRef}
          >
            登入
          </button>
        </form>

        <div className="row mb-2 col-sm-8 offset-sm-2">
          <div className={`mb-3 ${styles['hr-sect']} `}>快速登入</div>
          <div className="col-sm-12 text-start">
            <div className="d-flex justify-content-center my-3">
              <button type="button" className="mx-3 border-0 bg-transparent">
                <LineLogo />
              </button>
              <button
                type="button"
                className="mx-3 border-0 bg-transparent"
                onClick={() => {
                  loginGoogleRedirect()
                  console.log('click')
                }}
              >
                <GoogleLogo />
              </button>
              <button type="button" className="mx-3 border-0 bg-transparent">
                <FacebookLogo />
              </button>
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
