import React from 'react'
import Image from 'next/image'
import UserSideBar from './user-side-bar'
import UserSideBarMobile from './user-side-bar-mobile'
import dayjs from 'dayjs'
import { DatePicker, Space } from 'antd'
import { useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
const disabledDate = (current) => {
  return current && current > new Date()
}

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)

    // 預覽選定的圖片
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const { auth, setAuth } = useAuth()
  const fakeUserData = [
    {
      name: 'AAA',
      account: 'admin',
      gender: '0',
      address: 'CCC',
      phone: '0912345678',
      birthday: '1993-09-28',
      email: 'DDD@DD.D',
      password: '12345',
      confirmPassword: '12345',
    },
  ]
  //宣告儲存會員資料
  const [formData, setformData] = useState({ ...auth })
  //宣告會員填寫狀態
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
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
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container">
        <h2 className="fw-bolder">個人檔案</h2>
        <div className="row my-sm-5 my-3">
          {/* 下拉選單 */}
          <div className="col-sm-3 col-12 px-0 mx-0">
            <div className="d-sm-block d-none">
              <UserSideBar />
            </div>
            <div className="d-sm-none d-block mb-4">
              <UserSideBarMobile className="col-10 w-100" />
            </div>
          </div>

          {/* 手機板的avator */}
          <div className="avatar col-12  d-sm-none d-block">
            <p>
              一般會員
              <Image
                src="/images/only-logo.svg"
                alt="logo"
                width={25}
                height={12.5}
              />
            </p>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="avatar-img ">
                <Image
                  src="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                  alt=""
                  width={75}
                  height={75}
                  className="rounded-circle border border-primary"
                />
              </div>
              <button className="btn btn-primary text-white my-4">
                選擇圖片
              </button>
              <div className="text-group">
                <p className="fs-6 text-black-50 mb-0">檔案大小1MB</p>
                <p className="fs-6 text-black-50 mb-0">檔案限制: JPEG, PNG</p>
              </div>
            </div>
          </div>
          {/* form表單 */}
          <form action="" className="col-12 col-sm-4 offset-sm-1 ">
            <label htmlFor="name" className="col-form-label ">
              姓名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              defaultValue={fakeUserData[0].name}
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

            <label htmlFor="gender" className="col-form-label mt-3">
              性別
            </label>
            <select
              type="text"
              id="gender"
              name="gender"
              className="form-select"
              defaultValue={fakeUserData[0].gender}
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
              defaultValue={fakeUserData[0].address}
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
              defaultValue={fakeUserData[0].phone}
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

            <div className="birthday mt-3">
              <label htmlFor="birthday" className="col-form-label">
                生日
              </label>
              <br />
              <DatePicker
                id="birthday"
                name="birthday"
                disabledDate={disabledDate}
                placeholder="選擇日期"
                className="form-control"
                defaultValue={dayjs(fakeUserData[0].birthday, 'YYYY-MM-DD')}
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

                console.log(error)
              }}
            >
              儲存
            </button>

            <p className="text-end mt-3">{error}</p>
          </form>
          {/* 電腦版的avator */}

          <div className="avatar col-3 offset-1 d-sm-block d-none">
            <div className="d-flex flex-column align-items-center">
              {' '}
              <h4>會員等級</h4>
              <p>
                一般會員
                <Image
                  src="/images/only-logo.svg"
                  alt="logo"
                  width={25}
                  height={12.5}
                />
              </p>
              <div className="avatar-img ">
                <Image
                  src={
                    previewUrl ||
                    'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'
                  }
                  alt="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
                  width={150}
                  height={150}
                  className="rounded-circle border border-primary"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary text-white my-4"
                onClick={() => {
                  fileInputRef.current.click()
                }}
              >
                選擇圖片{' '}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={(e) => {
                    handleFileSelect(e)
                    console.log(e.target.files[0])
                  }}
                />
              </button>
              <p className="ps-3 mb-0 align-self-start text-black-50">
                檔案大小1MB
              </p>
              <p className="ps-3 align-self-start text-black-50">
                檔案限制: JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
