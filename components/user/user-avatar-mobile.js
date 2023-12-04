import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSelector } from 'react-redux'
import UploadAvatar from './upload-avatar'
export default function UserAvatarMobile() {
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
      <UploadAvatar />
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
        </div>
      </div>

      {/* 修改前 */}
      {/* <div className="avatar col-12  d-sm-none d-block">
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
      </div> */}
    </>
  )
}
