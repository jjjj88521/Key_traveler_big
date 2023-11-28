import React, { useState, useRef } from 'react'
import styles from '@/styles/user/member.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleLoginJWT from '../google-login-jwt'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '@/redux/actions/auth'
import { Button, Form, Input } from 'antd'

export default function LoginForm() {
  // redux
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const handleLogin = (values) => {
    dispatch(loginAsync(values))
  }

  return (
    <>
      <div className={`container ${styles['bg-image']}`}>
        <div className="logo pb-3 text-center">
          <Image
            src="/images/header-logo-desktop.png"
            width={250}
            height={46}
            alt="logo"
            className=""
          />
        </div>
        <Form
          name="basic"
          onFinish={handleLogin}
          className={`${styles['w-sm-50']} w-100 mx-auto py-3`}
        >
          <Form.Item
            label="帳號"
            name="account"
            rules={[{ required: true, message: '請輸入帳號' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              className="w-100 my-3"
              htmlType="submit"
              loading={auth.isLoading}
            >
              登入
            </Button>
          </Form.Item>
        </Form>

        <div className="row mb-2 col-sm-8 offset-sm-2">
          <div className={`mb-3 ${styles['hr-sect']} `}>快速登入</div>
          <div className="col-sm-12 text-center">
            {/* <div className="d-flex justify-content-center my-3"> */}
            <GoogleLoginJWT />
            {/* </div> */}
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
