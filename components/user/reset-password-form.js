import { useState } from 'react'
import styles from '@/styles/user/member.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import request from '@/utils/request'
import { logoutAsync } from '@/redux/actions/auth'
import { Button, Form, Input, Space } from 'antd'

export default function ResetPassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  // 按下按鈕倒數六十秒後才能按
  const [sendBtnState, setSendBtnState] = useState({
    disabled: false,
    countDown: 60,
  })
  // 忘記密碼應該要獨立開來，不能跟本來的混再一起寫
  // 寄送 otp
  const sendOTP = (email) => {
    request
      .post('/api/reset-password/otp', { email })
      .then((response) => {
        if (response.data.code === '200') {
          Swal.fire({
            icon: 'success',
            title: '驗證信已經出',
            text: '驗證信已經寄送成功，請至信箱收取驗證碼',
            showConfirmButton: false,
            timer: 1500,
          })
          setSendBtnState({
            ...sendBtnState,
            disabled: true,
          })

          // 倒數
          let timer = 60
          const interval = setInterval(() => {
            timer--
            setSendBtnState({
              disabled: true,
              countDown: timer,
            })
            if (timer === 0) {
              clearInterval(interval)
              setSendBtnState({
                ...sendBtnState,
                disabled: false,
                countDown: 60,
              })
            }
          }, 1000)
        } else {
          throw new Error('寄送失敗')
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '寄送失敗，請確認信箱是否正確',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }
  // 重設密碼 api
  const resetPasswordDb = (resetPassword) => {
    request
      .post('/api/reset-password/reset', resetPassword)
      .then((response) => {
        if (response.data.code === '200') {
          Swal.fire({
            icon: 'success',
            title: '密碼修改成功',
            text: '請重新登入',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            dispatch(logoutAsync())
          })
        } else {
          throw new Error('請檢查驗證碼是否正確')
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '密碼修改失敗',
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return (
    <div className="container">
      <div className="row">
        <p
          className={`text-center mb-3 ${styles['text-note']} col-12 offset-0`}
        >
          輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
        </p>
        <Form
          name="resetPassword"
          onFinish={(e) => {
            Swal.fire({
              title: '確定要重設密碼嗎',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '確定',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                resetPasswordDb({
                  email: e.email,
                  token: e.token,
                  password: e.password,
                })
              }
            })
          }}
        >
          <Form.Item
            hasFeedback
            validateDebounce={300}
            name={'email'}
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入正確的電子郵件' },
            ]}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          >
            <Input placeholder={'電子郵件'} />
          </Form.Item>
          <Form.Item
            validateDebounce={300}
            name={'token'}
            rules={[{ required: true, message: '請輸入驗證碼' }]}
          >
            <Space.Compact block>
              <Input placeholder={'驗證碼'} maxLength={6} />
              <Button
                onClick={() => {
                  sendOTP(email)
                }}
              >
                發送驗證碼
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            hasFeedback
            validateDebounce={300}
            name={'password'}
            rules={[
              { required: true, message: '請輸入密碼' },
              {
                min: 8,
                max: 20,
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: '密碼至少包含一個大寫字母、小寫字母和數字',
              },
            ]} //密碼至少包含一個大寫字母、小寫字母和數字
          >
            <Input placeholder={'密碼'} type="password" />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateDebounce={300}
            name={'rePassword'}
            rules={[
              { required: true, message: '請輸入確認密碼' },
              // 檢查確認密碼是否一致
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密碼不一致'))
                },
              }),
            ]}
            dependencies={['password']}
          >
            <Input placeholder={'確認密碼'} type="password" />
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'} block>
              確定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
