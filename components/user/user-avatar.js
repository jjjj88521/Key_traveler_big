import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import UploadAvatar from './upload-avatar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useLoading from '@/hooks/useLoading'

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

  const auth = useSelector((state) => state.auth)
  //判斷VIP等級 S
  const [vipGrade, setVipGrade] = useState(0)
  const vipGradeAPi = async () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/${auth.user.id}`
      )
      .then((res) => {
        console.log('成功獲取VIP等級')
        console.log(res.data.user.vip)
        console.log(res)
        if (res.data.user.vip) {
          setVipGrade(res.data.user.vip)
        } else {
          setVipGrade(0)
        }
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

  return (
    <>
      <div className="avatar">
        <div className="d-flex flex-column align-items-center">
          <h4>會員等級</h4>
          <p>
            {vipText()}
            <Image
              src={`/images/vip-${vipGrade}.svg`}
              alt="logo"
              width={25}
              height={12.5}
            />
          </p>
          <UploadAvatar />
        </div>
      </div>
    </>
  )
}
