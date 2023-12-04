import React, { use, useEffect } from 'react'
import { Button, DatePicker, Form, Input, Select } from 'antd'
const { Option } = Select
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import request from '@/utils/request'
import dayjs from 'dayjs'
import { setUser } from '@/redux/reducers/auth'
import { useDispatch } from 'react-redux'
import addressData from '@/data/taiwan-district-zip-code.json'
import { isEqual } from 'lodash'

const disabledDate = (current) => {
  return current && current > dayjs().endOf('day')
}

export default function ProfileForm() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // 更新會員資料
  const updateUser = (user) => {
    request
      .put('/api/users/update', user)
      .then((response) => {
        if (response.data.message !== 'success') {
          throw new Error(response.data.message)
        }
        Swal.fire({
          icon: 'success',
          title: '更新成功',
          text: '會員資料已更新',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          dispatch(setUser(user))
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '更新失敗',
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  // 宣告儲存會員資料
  const [formData, setformData] = useState({})
  function handleSetformData(updatedValues) {
    // 解構出縣市、鄉鎮市區及詳細地址
    const { city, district, street } = parseAddress(formData.address)
    // 排除縣市、鄉鎮市區及詳細地址
    const {
      city: excludedCity,
      district: excludedDistrict,
      street: excludedStreet,
      ...rest
    } = updatedValues
    // 合併更新的值
    const updatedData = {
      ...formData,
      ...rest,
    }
    // 如果更新了縣市、鄉鎮市區或詳細地址，則合成新的地址
    if (
      'city' in updatedValues ||
      'district' in updatedValues ||
      'street' in updatedValues
    ) {
      updatedData.address = `${updatedValues.city || city}${
        updatedValues.district || district
      }${updatedValues.street || street}`
    }

    // 更新 formData
    setformData(updatedData)
  }

  // 地址狀態，分成縣市及鄉鎮市區
  // 切割字串，切成縣市、鄉鎮市區及詳細地址
  const parseAddress = (fullAddress) => {
    // 地址正規表達式
    const addressReg = /^(.+?[縣市]|.+?[市]|.+?[縣])(.+?[鄉鎮市區])(.+)$/
    const match = addressReg.exec(fullAddress)

    if (match) {
      const city = match[1]
      const district = match[2]
      const street = match[3]
      return { city, district, street }
    } else {
      return { city: '', district: '', street: '' }
    }
  }

  // 取得 form 實例
  const [form] = Form.useForm()
  useEffect(() => {
    // 動態設定表單預設值
    form.setFieldsValue({
      account: auth.user.account,
      email: auth.user.email,
      name: auth.user.name,
      gender: auth.user.gender,
      city: parseAddress(auth.user.address).city,
      district: parseAddress(auth.user.address).district,
      street: parseAddress(auth.user.address).street,
      phone: auth.user.phone,
      birthday: dayjs(auth.user.birthday),
    })
    setformData(auth.user)
  }, [auth])

  // 切換修改按鈕狀態
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="w-100"
        requiredMark={false}
        onValuesChange={handleSetformData}
        onFinish={() => {
          // 只有表單有更改時才更新會員資料
          if (!isEqual(formData, auth.user)) {
            delete formData.exp
            delete formData.iat
            updateUser(formData)
          }
        }}
      >
        <Form.Item name="account" label="帳號">
          <Input disabled />
        </Form.Item>
        <Form.Item name="email" label="信箱">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            {
              message: '請輸入姓名',
              required: true,
            },
          ]}
        >
          <Input disabled={!isEdit} />
        </Form.Item>
        <Form.Item label="性別" name="gender">
          <Select disabled={!isEdit}>
            <Option value={1}>男</Option>
            <Option value={0}>女</Option>
          </Select>
        </Form.Item>
        <Form.Item label="地址">
          <Form.Item name="city">
            <Select
              disabled={!isEdit}
              placeholder="請選擇縣市"
              onChange={() => {
                form.setFieldsValue({
                  district: addressData.find(
                    (item) => item.name === form.getFieldValue('city')
                  ).districts[0].name,
                })
              }}
              options={addressData.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item name="district">
            <Select
              disabled={!isEdit}
              placeholder="請選擇行政區"
              options={addressData
                .find((item) => item.name === form.getFieldValue('city'))
                ?.districts.map((item) => ({
                  value: item.name,
                  label: item.name,
                }))}
            ></Select>
          </Form.Item>
          <Form.Item name="street">
            <Input placeholder="請輸入詳細地址" disabled={!isEdit} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="手機"
          name="phone"
          rules={[
            { message: '請輸入手機', required: true },
            { pattern: /^09[0-9]{8}$/, message: '請輸入正確手機格式' },
          ]}
        >
          <Input maxLength={10} disabled={!isEdit} />
        </Form.Item>
        <Form.Item
          label="生日"
          name="birthday"
          rules={[{ message: '請輸入生日', required: true }]}
        >
          <DatePicker
            className="w-100"
            disabledDate={disabledDate}
            disabled={!isEdit}
          />
        </Form.Item>
        {isEdit ? (
          <Form.Item className="text-end">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setIsEdit(false)}
            >
              儲存
            </Button>
            <Button className="ms-2" onClick={() => setIsEdit(false)}>
              取消
            </Button>
          </Form.Item>
        ) : (
          <Form.Item className="text-end">
            <Button type="primary" onClick={() => setIsEdit(true)}>
              修改
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  )
}
