import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import axios from 'axios'

const UploadAvatar = () => {
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    uploadApi()
  }, [fileList])
  // 在上传成功后清空文件列表
  // const clearFileList = () => {
  //   setFileList([])
  // }

  const onChange = ({ fileList: newFileList }) => {
    // 限制只保留一个文件
    setFileList(newFileList.slice(-1))
    uploadApi()
  }

  const uploadApi = async () => {
    if (fileList.length === 1) {
      // 仅当有文件时才执行上传
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('avatar', file.originFileObj)
      })

      axios
        .post('http://localhost:3005/api/users/upload2', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('上传成功', response)
          // 清空文件列表
        })
        .catch((error) => {
          console.error('上传失败', error)
        })
    }
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotationSlider cropShape="round">
      <Upload
        name="avatar"
        action="http://localhost:3005/api/users/upload"
        method="post"
        listType="picture-circle"
        withCredentials={true}
        fileList={fileList}
        onChange={onChange}
        maxCount={1}
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
  )
}

export default UploadAvatar
