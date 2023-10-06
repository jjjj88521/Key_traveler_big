import { useState, useRef } from 'react'
import Image from 'next/image'
export default function UserAvatarMobile() {
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
              src={
                previewUrl ||
                'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'
              }
              alt="https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg"
              width={75}
              height={75}
              className="rounded-circle border border-primary"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              fileInputRef.current.click()
            }}
            className="btn btn-primary text-white my-4"
          >
            選擇圖片
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
          <div className="text-group">
            <p className="fs-6 text-black-50 mb-0">檔案大小1MB</p>
            <p className="fs-6 text-black-50 mb-0">檔案限制: JPEG, PNG</p>
          </div>
        </div>
      </div>
    </>
  )
}
