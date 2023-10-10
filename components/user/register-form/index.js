import { DatePicker } from 'antd'
import style from '@/styles/user/register.module.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
const disabledDate = (current) => {
  return current && current > new Date()
}
export default function RegisterForm({
  handleErrMessage,
  handleSetStepState,
  handleSetformData,
  errMesage,
  setErrMesage,
  setformData,
  setStepState,
  formData,
  stepState,
  stepStateArray,
  birthday,
}) {
  const router = useRouter()
  const createUser = (user) => {
    // 新增會員資料
    axios
      .post('http://localhost:3005/api/users/', user)
      .then((response) => {
        if (response.data.message === 'success') {
          console.log('新增成功')
        } else {
          console.log('新增失敗')
          console.log(response)
          Swal.fire({
            icon: 'error',
            title: '註冊失敗',
            text: '帳號或Email已存在',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
      .catch((error) => {
        console.error('新增失敗:', error)
        console.log('新增發生錯誤')
      })
  }
  return (
    <>
      <form action="" className="mb-5 col-md-7 col-sm-12">
        <label htmlFor="name" className="form-label">
          姓名
        </label>

        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入姓名'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else if (
              0 < e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入姓名'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else if (
              0 < e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
            //處理名子
            let fullName = e.target.value
            let splitName = fullName.split('')
            let last_name = splitName[0]

            let first_name = ''
            for (let i = 1; i < splitName.length; i++) {
              first_name = first_name + splitName[i]
            }
            console.log(last_name)
            console.log(first_name)
            setformData({
              ...formData,
              last_name: last_name,
              first_name: first_name,
            })
          }}
        />
        {/*  */}
        <p className={'text-danger'}>{errMesage.name}</p>
        <br />
        <label htmlFor="account" className="form-label">
          帳號
        </label>
        <input
          type="text"
          id="account"
          name="account"
          className="form-control"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入帳號'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else if (e.target.value.length < 4) {
              let mes = '請填入4位以上字元'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else if (
              4 <= e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字元以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入帳號'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else if (e.target.value.length < 4) {
              let mes = '請填入4位以上字元'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else if (
              4 <= e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字元以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.account}</p>
        <br />
        <label htmlFor="address" className="form-label">
          地址
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入地址'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入地址'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.address}</p>
        <br />
        <label htmlFor="gender" className="form-label">
          性別
        </label>
        <select
          type="text"
          id="gender"
          name="gender"
          className="form-select"
          onChange={(e) => {
            console.log(e.target.value)
            if (e.target.value !== '1' && e.target.value !== '0') {
              let mes = '請選擇性別'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            }
          }}
          onBlur={(e) => {
            console.log(e.target.value)
            if (e.target.value !== '1' && e.target.value !== '0') {
              let mes = '請選擇性別'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            }
          }}
        >
          <option value="" className="">
            請選擇
          </option>
          <option value="1">男</option>
          <option value="0">女</option>
        </select>
        <p className={'text-danger'}>{errMesage.gender}</p>
        <br />
        <label htmlFor="phone" className="form-label">
          手機
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="form-control"
          onChange={(e) => {
            let phoneReg = /^09\d{8}$/
            if (phoneReg.test(e.target.value)) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else {
              let mes = '請輸入正確格式的手機號碼'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            let phoneReg = /^09\d{8}$/
            if (phoneReg.test(e.target.value)) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else {
              let mes = '請輸入正確格式的手機號碼'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.phone}</p>
        <br />
        <label htmlFor="birthday" className="form-label">
          生日
        </label>
        <br />
        <DatePicker
          id="birthday"
          name="birthday"
          disabledDate={disabledDate}
          placeholder="選擇日期"
          onChange={(date, dateString) => {
            if (dateString) {
              let mes = ''
              setErrMesage({ ...errMesage, birthday: mes })
              setformData({ ...formData, birthday: dateString })
              setStepState({ ...stepState, birthday: stepStateArray[2] })
            } else {
              let mes = '請填入日期'
              setErrMesage(birthday, mes)
              setStepState({ ...stepState, birthday: stepStateArray[1] })
            }
            ;<p className={'text-danger'}>{errMesage.birthday}</p>
          }}
          // onBlur={(date, dateString) => {
          //   if (dateString) {
          //     let mes = ''
          //     setErrMesage({ ...errMesage, [birthday]: mes })
          //     setformData({ ...formData, [birthday]: dateString })
          //     setStepState({ ...stepState, birthday: stepStateArray[2] })
          //   } else {
          //     let mes = '請填入日期'
          //     setErrMesage(birthday, mes)
          //     setStepState({ ...stepState, birthday: stepStateArray[3] })
          //   }
          //   ;<p className={'text-danger'}>{errMesage.birthday}</p>
          // }}
          className="form-control"
        />
        <p className={'text-danger'}>{}</p>
        <br />

        <label htmlFor="email" className="form-label">
          電子信箱
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="form-control"
          onChange={(e) => {
            const emailReg = /@.*\.com/
            if (emailReg.test(e.target.value)) {
              console.log(emailReg.test(e.target.value))
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length === 0) {
              let mes = '請輸入Email '
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else {
              let mes = '請輸入正確格式的Email'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            const emailReg = /@.*\.com/
            if (emailReg.test(e.target.value)) {
              console.log(emailReg.test(e.target.value))
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length === 0) {
              let mes = '請輸入Email '
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else {
              let mes = '請輸入正確格式的Email'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.email}</p>
        <br />
        <label htmlFor="password" className="form-label">
          設定密碼
        </label>
        <input
          type="text"
          id="password"
          name="password"
          className="form-control"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入密碼'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else if (e.target.value.length < 4) {
              let mes = '請填入4位以上字元'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            } else if (
              4 <= e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字元以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            if (e.target.value.length === 0) {
              let mes = '請填入密碼'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else if (e.target.value.length < 4) {
              let mes = '請填入4位以上字元'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            } else if (
              4 <= e.target.value.length &&
              e.target.value.length < 16
            ) {
              let mes = ' '
              handleErrMessage(e, mes)
              handleSetformData(e, mes)

              handleSetStepState(e, 2)
            } else if (e.target.value.length > 16) {
              let mes = '請輸入16個字元以內'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.password}</p>
        <br />
        <label htmlFor="confirmPassword" className="form-label">
          確認密碼
        </label>
        <input
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
          onChange={(e) => {
            if (e.target.value === formData.password) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else {
              let mes = '密碼不一致'
              handleErrMessage(e, mes)
              handleSetStepState(e, 1)
            }
          }}
          onBlur={(e) => {
            if (e.target.value === formData.password) {
              let mes = ''
              handleErrMessage(e, mes)
              handleSetformData(e, mes)
              handleSetStepState(e, 2)
            } else {
              let mes = '密碼不一致'
              handleErrMessage(e, mes)
              handleSetStepState(e, 3)
            }
          }}
        />
        <p className={'text-danger'}>{errMesage.confirmPassword}</p>

        <div className="button-group row justify-content-evenly mt-5  ">
          <button
            className={`${style['none-user']} btn btn-primary col-3 text-white`}
          >
            重填
          </button>
          <button
            type="button"
            className="btn btn-primary col-sm-3 col-10 text-white "
            onClick={() => {
              console.log(formData)
              // delete formData.confirmPassword
              // console.log(formData)
              // createUser(formData)
              if (
                stepState.name === 'finish' &&
                stepState.account === 'finish' &&
                stepState.address === 'finish' &&
                stepState.gender === 'finish' &&
                stepState.phone === 'finish' &&
                stepState.birthday === 'finish' &&
                stepState.email === 'finish' &&
                stepState.password === 'finish' &&
                stepState.confirmPassword === 'finish'
              ) {
                // console.log(formData)
                delete formData.confirmPassword
                console.log(formData)
                createUser(formData)
                console.log('OK')
                Swal.fire({
                  icon: 'success',
                  title: '註冊成功，請重新登入',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  router.push('/user/login')
                })
              } else {
                console.log('falil')
              }
            }}
          >
            送出
          </button>
        </div>
      </form>
    </>
  )
}
