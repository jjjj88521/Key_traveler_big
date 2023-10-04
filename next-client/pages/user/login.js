import LoginForm from '@/components/user/login-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

export default function Login() {
  //戳登入的API
  // const [loginData, setLoginData] = useState('')
  // useEffect(() => {
  //   axios
  //     .post('http://localhost:3005/api/auth-jwt/login', {
  //       account: 'admin',
  //       password: '12345',
  //     })
  //     .then((res) => {
  //       setLoginData(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  // console.log(loginData.accessToken)
  // const token = loginData.accessToken
  // let initData = jwtDecode(token)
  // console.log(initData)

  //取得localStorege
  let localData = localStorage.getItem('reactReviewLoginToken')
  console.log(localData)
  return (
    <>
      <LoginForm />
    </>
  )
}
