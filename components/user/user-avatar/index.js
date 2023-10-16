import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import UploadAvatar from '../upload-avatar'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
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
  const { auth, setAuth } = useAuth()
  //判斷VIP等級 S
  const [vipGrade, setVipGrade] = useState(0)
  const vipGradeAPi = async () => {
    axios
      .get(`http://localhost:3005/api/users/${auth.user.id}`)
      .then((res) => {
        console.log('成功獲取VIP等級')
        console.log(res.data.user.vip)
        console.log(res)

        setVipGrade(res.data.user.vip)
      })
      .catch(() => {
        console.log('獲取失敗')
      })
  }
  const vipText = () => {
    return vipGrade == 0 ? '一般會員' : vipGrade == 1 ? '高級會員' : 'VIP會員'
  }
  useEffect(() => {
    vipGradeAPi()
    vipText()
  }, [])
  //判斷VIP等級 E
  return (
    <>
      {' '}
      <div className="avatar col-3 offset-1 d-sm-block d-none">
        <div className="d-flex flex-column align-items-center">
          {' '}
          <h4>會員等級</h4>
          <p>
            {vipText()}
            <Image
              src={`/images/vip-${auth.user.vip}.svg`}
              alt="logo"
              width={25}
              height={12.5}
            />
          </p>
          <UploadAvatar />
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
        </div>
      </div>
    </>
  )
}
