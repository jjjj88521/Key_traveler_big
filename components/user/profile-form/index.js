import React from 'react'
import { DatePicker } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import Swal from 'sweetalert2'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
import styles from '@/styles/user/member.module.css'
const disabledDate = (current) => {
  return current && current > new Date()
}
const customInputStyle = {
  color: '#000',
  fontWeight: 'bold',
}

export default function ProfileForm() {
  const { auth, setAuth } = useAuth()
  useEffect(() => {
    setformData({ ...auth.user })
  }, [])
  // 更新會員資料
  const updateUser = (userId, user) => {
    // 更新會員資料
    axios
      .put('http://localhost:3005/api/users/update', user)
      .then((response) => {
        if (response.data.message === 'success') {
          console.log(response)
          console.log('成功更新1')
        } else {
          console.log('更新失敗1')
          console.log(response)
        }
      })
      .catch((error) => {
        console.error('更新失敗:', error)
        console.log('更新發生錯誤')
      })
  }

  // 重新整理後驗證登入狀態
  // useEffect(() => {
  //   if (localStorage.getItem('loginToken')) {
  //     console.log(jwtDecode(localStorage.getItem('loginToken')))
  //     const data = jwtDecode(localStorage.getItem('loginToken'))
  //     setAuth({ ...data })
  //     setformData({ ...data })
  //     console.log(auth)
  //   } else {
  //     Router.push('/user/login')
  //   }
  // }, [])
  //宣告儲存會員資料
  const [formData, setformData] = useState({ ...auth.user })

  //宣告會員填寫狀態
  const [error, setError] = useState('')
  const [errMesage, setErrMesage] = useState({
    name: '',
    account: '',
    address: '',
    gender: '',
    phone: '',
    birthday: '',
    email: '',
  })

  function handleErrMessage(e, mes) {
    setErrMesage({ ...errMesage, [e.target.name]: mes })
  }
  function handleSetformData(e, mes) {
    setformData({
      isAuth: auth.isAuth,
      user: { ...auth.user, [e.target.name]: e.target.value },
    })
  }
  const [isLoading, setIsLoading] = useLoading(auth.isAuth)
  return (
    <>
      <form action="" className="w-100">
        <label htmlFor="name" className="col-form-label ">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          defaultValue={auth.user.name}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入姓名'
              handleErrMessage(e, mes)
            } else if (
              0 < e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字以內'
              handleErrMessage(e, mes)
            }
          }}
        />
        {/*性別理論上不會隨意更改  */}
        <label htmlFor="gender" className="col-form-label mt-3">
          性別
        </label>
        <select
          type="text"
          id="gender"
          name="gender"
          className="form-select"
          defaultValue={formData.gender}
          // onChange={(e) => {
          //   handleSetformData(e)
          // }}
          // disabled={false}
          // style={{
          //   backgroundColor: '#FFF', // 设置背景颜色
          //   color: '#CCC', // 设置文字颜色
          //   // border: '1px solid #ccc', // 设置边框样式
          //   cursor: 'not-allowed', // 设置光标样式为禁止符号
          // }}
        >
          <option value="1">男</option>
          <option value="0">女</option>
        </select>

        <label htmlFor="address" className="col-form-label mt-3">
          地址
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          defaultValue={auth.user.address}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入地址'
              handleErrMessage(e, mes)
            } else {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            }
          }}
        />

        <label htmlFor="phone" className="col-form-label mt-3">
          手機
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="form-control"
          defaultValue={auth.user.phone}
          onChange={(e) => {
            let phoneReg = /^09\d{8}$/
            if (phoneReg.test(e.target.value)) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
            } else {
              let mes = '請輸入正確格式的手機號碼'
              handleErrMessage(e, mes)
            }
          }}
        />

        {/* 生日理論上不能改 */}
        <div className="birthday mt-3">
          <label htmlFor="birthday" className="col-form-label">
            生日
          </label>
          <br />
          <DatePicker
            id="birthday"
            name="birthday"
            disabledDate={disabledDate}
            placeholder={auth.user.birthday}
            className={`form-control `}
            // defaultValue={auth.user.birthday}
            // disabled=false
            // style={customInputStyle}
            // style={{ fontWeight: 700 }}
            onChange={(date, dateString) => {
              setformData({
                isAuth: auth.isAuth,
                user: { ...auth.user, birthday: dateString },
              })
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary text-white col-sm-5 col-12 offset-sm-7 mt-5"
          onClick={() => {
            if (errMesage.name !== '') {
              setError(errMesage.name)
            } else if (errMesage.address !== '') {
              setError(errMesage.address)
              errMesage.address
            } else if (errMesage.phone !== '') {
              setError(errMesage.phone)
              errMesage.phone
            }

            // console.log(formData.user)
            delete formData.exp
            delete formData.iat
            console.log('123123123')
            console.log(formData)
            console.log(auth)
            let id = formData.user.id
            console.log('AAA')
            console.log(id)
            updateUser(id, formData.user)
            if (id) {
              Swal.fire({
                icon: 'success',
                title: '修改成功',
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }}
        >
          儲存
        </button>

        <p className="text-end mt-3">{error}</p>
      </form>
    </>
  )
}
