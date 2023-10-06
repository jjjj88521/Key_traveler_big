import LoginForm from '@/components/user/login-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  )
}
