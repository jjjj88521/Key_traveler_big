import LoginForm from '@/components/user/login-form'
import axios from 'axios'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import UserLayout from '@/components/layout/user-layout'

export default function Login() {
  return (
    <UserLayout title={'登入'} isLoginPage={true}>
      <LoginForm />
    </UserLayout>
  )
}
