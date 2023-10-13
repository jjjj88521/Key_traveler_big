import { useState, useRef } from 'react'
import Image from 'next/image'
import UploadAvatar from '../upload-avatar'
export default function UserAvatar() {
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

  const fileInputRef = useRef(null)

  return (
    <>
      {' '}
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
          {/* <div className="avatar-img ">
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
          </div> */}
          {/* <button
            type="button"
            className="btn btn-primary text-white my-4"
            onClick={() => {
              fileInputRef.current.click()
            }}
          > */}
          {/* 選擇圖片  */}
          <div>
            <UploadAvatar />
          </div>
          {/* <input
              type="file"
              ref={fileInputRef}
              className="d-none"
              onChange={(e) => {
                handleFileSelect(e)
                console.log(e.target.files[0])
              }}
            /> */}
          {/* </button> */}
          <p className="ps-3 mb-0 align-self-start text-black-50">
            檔案大小1MB
          </p>
          <p className="ps-3 align-self-start text-black-50">檔案限制: JPEG</p>
        </div>
      </div>
    </>
  )
}
