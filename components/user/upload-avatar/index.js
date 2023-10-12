import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'
import { Upload } from 'antd'
import axios from 'axios'
const UploadAvatar = () => {
  const [fileList, setFileList] = useState([])

  const onChange = ({ fileList: newFileList }) => {
    // 限制只保留一个文件
    setFileList(newFileList.slice(-1))
    console.log(newFileList)
    uploadApi()
  }
  const uploadApi = async () => {
    const formData = new FormData()
    formData.append('avatar', fileList[0])

    try {
      await axios.post('http://localhost:3005/api/users/upload2', formData, {
        withCredentials: true, // 如果需要在axios请求中包括Cookies
        headers: {
          'Content-Type': 'multipart/form-data', // 必须设置为'multipart/form-data'
        },
      })
      console.log('上传成功')
      console.log(formData)
    } catch (error) {
      console.error('上传失败', error)
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
    <ImgCrop rotationSlider shape="round">
      <Upload
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
