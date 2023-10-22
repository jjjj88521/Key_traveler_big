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
  //判斷大頭貼是從google 來的還是從資料庫來的
  let picture = ''
  if (auth.user.avatar === null && auth.user.photo_url === null) {
    console.log('SSSS')
    console.log(picture)
    picture = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU`
  } else if (auth.user.photo_url) {
    picture = auth.user.photo_url
  } else {
    picture = `http://localhost:3005/${auth.user.avatar}.jpg`
  }
  //判斷大頭貼是從google 來的還是從資料庫來的
  const [fileList, setFileList] = useState([])
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
    // 当 auth.user.avatar 发生变化时，更新 fileList
    if (auth.user.avatar || auth.user.avatar !== '') {
      setFileList([
        {
          uid: '1',
          name: 'file-1.jpg',
          status: 'done',
          url: `${picture}`,
        },
      ])
    } else {
      setFileList([])
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
      <div className="flex-sm-column d-flex justify-content-sm-start justify-content-evenly">
        <div className="align-self-center ">
          {' '}
          <ImgCrop rotationSlider cropShape="round" className="">
            <Upload
              name="avatar"
              action="http://localhost:3005/api/users/upload"
              method="post"
              listType="picture-circle"
              withCredentials={true}
              fileList={fileList}
              onChange={onChange}
              maxCount={1}
              onRemove={() => {
                setData({
                  ...auth.user,
                  avatar: '',
                })
              }}
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
          className="btn btn-primary py-sm-1 mt-sm-3 d-sm-block d-none"
        >
          上傳
        </button>
        <div className="text-group align-self-center my-3">
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
            className="btn btn-primary py-sm-1 mt-sm-3 d-sm-none d-block mb-3"
          >
            上傳
          </button>
          <p className="mb-0 align-self-start text-black-50">檔案大小1MB</p>
          <p className=" align-self-start text-black-50">檔案限制: JPEG</p>
        </div>
      </div>
    </>
  )
}

export default UploadAvatar
