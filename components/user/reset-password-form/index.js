import { useState } from 'react'
import styles from '@/styles/user/member.module.css'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import UserLayout from '@/components/layout/user-layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'

export default function ResetPassword() {
  const router = useRouter()
  const [email, setEmail] = useState({ email: '' })
  const [resetPassword, setResetPassword] = useState({
    email: '',
    token: '',
    password: '',
  })
  const [checkPassword, setCheckPassword] = useState('')
  // 忘記密碼應該要獨立開來，不能跟本來的混再一起寫
  //  const { auth, setAuth } = useAuth()
  //   const [userData, setUserData] = useState({ ...auth.user })
  //測試用寄送
  // const sendMail = (userId, user) => {
  //   // 更新會員資料
  //   axios
  //     .get('http://localhost:3005/api/email/send')
  //     .then((response) => {
  //       if (response.data.message === 'success') {
  //         console.log('成功更新')
  //       } else {
  //         console.log('更新失敗')
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('更新失敗:', error)
  //       console.log('更新發生錯誤')
  //     })
  // }
  // 寄送otp
  const sendOTP = () => {
    axios
      .post('http://localhost:3005/api/reset-password/otp', email)
      .then((response) => {
        if (response.data.code === '200') {
          console.log('成功寄送')
          setResetPassword({ ...resetPassword, email: email.email })
          Swal.fire({
            icon: 'success',
            title: '驗證信已經出',
            text: '驗證信已經寄送成功，請至信箱收取驗證碼',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          console.log('寄送失敗1')
        }
      })
      .catch((error) => {
        console.error('寄送失敗:', error)
        console.log('寄送發生錯誤2')
      })
  }
  // 重設密碼
  const resetPasswordDb = (resetPassword) => {
    axios
      .post('http://localhost:3005/api/reset-password/reset', resetPassword)
      .then((response) => {
        if (response.data.code === '200') {
          console.log('更新成功1')
        } else {
          console.log('更新失敗1')
          Swal.fire({
            icon: 'error',
            title: '驗證碼不一致',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
      .catch((error) => {
        console.error('更新失敗２:', error)
        console.log('更新失敗2')
      })
  }

  //登出
  const { auth, setAuth } = useAuth()
  const logout = async () => {
    await axios
      .post(
        'http://localhost:3005/api/auth-jwt/logout',
        {},
        {
          withCredentials: true, // save cookie in browser
        }
      )
      .then((res) => {
        localStorage.removeItem('loginToken')
        setAuth({
          isAuth: false,
          user: {
            id: 0,
            name: '',
            account: '',
            gender: '',
            address: '',
            phone: '',
            birthday: '',
            email: '',
            password: '',
            confirmPassword: '',
            cardNumber: '',
            cardName: '',
            expiry: '',
          },
        })
      })
  }
  return (
    <div className="container">
      <div className="row">
        <p
          className={`text-center mb-3 ${styles['text-note']}   col-12 offset-0`}
        >
          輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
        </p>
        <form className="  col-12 offset-0">
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="email"
                name="email"
                className={`form-control`}
                placeholder="電子郵件地址"
                onChange={(e) => {
                  console.log(e.target.value)
                  setEmail({ email: e.target.value })
                  setResetPassword({
                    ...resetPassword,
                    email: e.target.value,
                  })
                  console.log(resetPassword)
                }}
                onblur={(e) => {
                  console.log(e.target.value)
                  setEmail({ email: e.target.value })
                  setResetPassword({
                    ...resetPassword,
                    email: e.target.value,
                  })
                }}
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入有效的註冊會員電子郵件地址。
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control `}
                  placeholder="電子郵件驗證碼"
                  onChange={(e) => {
                    setResetPassword({
                      ...resetPassword,
                      token: e.target.value,
                    })
                  }}
                  onBlur={(e) => {
                    setResetPassword({
                      ...resetPassword,
                      token: e.target.value,
                    })
                  }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={(e) => {
                    console.log(email)
                    sendOTP(email)
                  }}
                >
                  取得驗証碼
                </button>
              </div>
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入驗証碼。
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                className={`form-control w-100 ${styles['form-control']} `}
                placeholder="密碼"
                onChange={(e) => {
                  setResetPassword({
                    ...resetPassword,
                    password: e.target.value,
                  })
                }}
                onBlur={(e) => {
                  setResetPassword({
                    ...resetPassword,
                    password: e.target.value,
                  })
                }}
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入新密碼。
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                className={`form-control w-100 ${styles['form-control']}  `}
                placeholder="確認密碼"
                onChange={(e) => {
                  setCheckPassword({
                    passwordConfirm: e.target.value,
                  })
                }}
                onBlur={(e) => {
                  setCheckPassword({
                    passwordConfirm: e.target.value,
                  })
                }}
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入確認密碼。
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary col-sm-6 offset-sm-6 col-12 text-white"
            onClick={() => {
              console.log(resetPassword.password)
              console.log(checkPassword)
              if (
                resetPassword.password !== '' &&
                resetPassword.password === checkPassword.passwordConfirm
              ) {
                console.log(resetPassword)
                resetPasswordDb(resetPassword)
                Swal.fire({
                  icon: 'success',
                  title: '密碼更新成功，請重新登入',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  logout()
                  router.push('/user/login')
                })
              } else if (resetPassword.password === '') {
                Swal.fire({
                  icon: 'error',
                  title: '請輸入密碼',
                  showConfirmButton: false,
                  timer: 1500,
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '密碼不一致,請重新輸入',
                  showConfirmButton: false,
                  timer: 1500,
                })
                console.log('密碼不一致')
              }
            }}
          >
            確定
          </button>
          {/* 忘記密碼不會加入會員 */}
          {/* <div className="row mt-2 text-sm-end text-center">
              <p className={`${styles['notice']}`}>
                還不是會員？
                <Link href="/user/register">加入我們</Link>。
              </p>
            </div> */}
        </form>
      </div>
    </div>
  )
}
