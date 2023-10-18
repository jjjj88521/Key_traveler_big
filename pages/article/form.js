import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { async } from '@firebase/util'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function ArtForm() {
  // 狀態
  const [cateSelect, setCateSelect] = useState('')
  //   console.log(cateSelect)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dataObj = {
    title: title,
    content: content,
    cateSelect: cateSelect,
  }
  console.log(dataObj)

  const handleAddForm = async () => {
    await axios
      .post(`http://localhost:3005/api/article/1123`, dataObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        if (response.data.code !== '200') {
          throw new Error('添加失敗')
        }
        Swal.fire({
          icon: 'success',
          title: '添加評論成功',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: '請先登入在評論',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  // 設定路由
  const { auth } = useAuth()
  const router = useRouter()
  const { isReady, query } = router
  const detail_id = query.detail_id
  console.log(router.query.detail_id)

  //   const { RangePicker } = DatePicker
  const { TextArea } = Input

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  //   const [componentDisabled, setComponentDisabled] = useState(true)
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleFormValuesChange = (changedValues, allValues) => {
    console.log('Changed values:', changedValues)
    console.log('All values:', allValues)
  }
  return (
    <>
      {/* <div className="" style={{ background: 'red', height: '100%' }}>
        2222
      </div> */}
      <div className="container  mb-5  mt-sm-5 mt-3">
        <div className="d-flex justify-content-center">
          {/* 左側欄 */}
          <div className="" style={{ width: 600 }}>
            <div
              className=" border border-1 border-light"
              style={{
                padding: '35px 30px',
                boxShadow: '0 0 0 5px #171717',
              }}
            >
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 600,
                  //   background: 'gray',
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={handleFormValuesChange}
                autoComplete="off"
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: '分類欄位為必填!',
                    },
                  ]}
                  label="文章分類"
                >
                  <Select
                    onChange={(value) => {
                      setCateSelect(value)
                      console.log('Selected category:', value)
                    }}
                    value={cateSelect}
                  >
                    <Select.Option value="開箱文">開箱文</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: '標題欄位為必填!',
                    },
                  ]}
                  label="標題"
                >
                  <Input
                    placeholder="請輸入文章標題"
                    showCount
                    maxLength={30}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      console.log(e.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="內容"
                  style={{}}
                  rules={[
                    {
                      required: true,
                      message: '內容欄位為必填!',
                    },
                  ]}
                >
                  <TextArea
                    rows={20}
                    showCount
                    maxLength={1000}
                    onChange={(e) => {
                      setContent(e.target.value)
                      console.log(e.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="插入圖片"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action="/article/form"
                    listType="picture-card"
                    name="avatar"
                    method="post"
                    withCredentials={true}
                    //   fileList={fileList}
                    //   onChange={onChange}
                    // maxCount={1}
                  >
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        上傳處
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                {/* <Form.Item label="Button">
                  <Button>發佈</Button>
                </Form.Item> */}
                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-primary "
                    type="submit"
                    onClick={handleAddForm}
                  >
                    發佈
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
