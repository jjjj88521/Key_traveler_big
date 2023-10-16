import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Swal from 'sweetalert2'

const UploadAvatar = () => {
  const { auth, setAuth } = useAuth()
  const [data, setData] = useState(auth)
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

  const [fileList, setFileList] = useState([
    {
      uid: '1',
      name: 'file-1.jpg',
      status: 'done',
      url: `http://localhost:3005/${auth.user.avatar}`, // 之前上传的文件的URL
    },
  ])
  const uploadApi = async () => {
    if (fileList.length === 1) {
      // 仅当有文件时才执行上传
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('avatar', file.originFileObj)
      })

      await axios
        .post('http://localhost:3005/api/users/upload2', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('上傳圖片成功', response)
          // 上傳圖片
          console.log(response.data.filename)
          setData({
            ...auth.user,
            avatar: response.data.filename,
          })
        })
        .catch((error) => {
          console.error('上傳失敗', error)
        })
    }
  }
  const onPreview = async (file) => {
    let src = file.url || URL.createObjectURL(file.originFileObj)

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }

    const imgWindow = window.open(src)
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" alt="Preview" />`)
    }
  }

  useEffect(() => {
    console.log('AAAA')

    setFileList([
      {
        uid: '1',
        name: 'file-1.jpg',
        status: 'done',
        url: `http://localhost:3005/${auth.user.avatar}`, // 之前上传的文件的URL
      },
    ])
  }, [auth])
  useEffect(() => {
    // 当 auth.user.avatar 发生变化时，更新 fileList
    if (auth.user.avatar) {
      setFileList([
        {
          uid: '1',
          name: 'file-1.jpg',
          status: 'done',
          url: `http://localhost:3005/${auth.user.avatar}`,
        },
      ])
    }
  }, [auth.user.avatar])

  const onChange = ({ fileList }) => {
    console.log(123)
    // 限制只保留一个文件
    setFileList(fileList.slice(-1))

    console.log(data)
    console.log(auth)
  }
  useEffect(() => {
    updateUser(auth.user.id, data)
  }, [data])

  return (
    <>
      {/* d-flex flex-sm-column gap-3 justify-content-center */}
      <div className="align-self-center">
        {' '}
        <ImgCrop rotationSlider cropShape="round" className="">
          <Upload
            name="avatar"
            action="http://localhost:3005/api/users/upload"
            method="post"
            listType="picture-circle"
            thumbUrl={'http://localhost:3005/4d689ecd80f51e8ddc9fcda8b6eef8e3'}
            withCredentials={true}
            fileList={fileList}
            onChange={onChange}
            maxCount={1}
            // onRemove={() => {
            //   // setData({
            //   //   ...auth.user,
            //   //   avatar: '',
            //   // })
            // }}
            beforeUpload={(file) => {
              // 清除之前的文件，只保留当前上传的文件
              setFileList([file])
              return false // 阻止默认上传行为
            }}
            onPreview={onPreview}
          >
            {fileList.length === 1 ? null : '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>

      <button
        onClick={() => {
          uploadApi()
          Swal.fire({
            icon: 'success',
            title: '圖片上傳成功',
            showConfirmButton: false,
            timer: 1500,
          })
        }}
        className="btn btn-primary py-1 mt-3 "
      >
        上傳
      </button>
      <div className="text-group align-self-center my-3">
        <p className="ps-3 mb-0 align-self-start text-black-50">檔案大小1MB</p>
        <p className="ps-3 align-self-start text-black-50">檔案限制: JPEG</p>
      </div>
    </>
  )
}

export default UploadAvatar
