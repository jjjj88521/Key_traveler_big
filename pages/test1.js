import React, { useState } from 'react'
import ProfileForm from '@/components/user/profile-form'
import UserDropdown from '@/components/user/user-dropdown'
import UserAvatar from '@/components/user/user-avatar'
import UserAvatarMobile from '@/components/user/user-avatar-mobile'
import UserLayout from '@/components/layout/user-layout'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
  const { auth, setAuth } = useAuth()
  const id = auth.user.id
  console.log(id)
  const [data, setData] = useState({})
  const getList = async () => {
    // 设置API的URL
    const apiUrl = 'http://localhost:3005/api/test1' // 将API的URL替换为实际的URL
    const userId = { userId: id }
    console.log(userId)
    // 发出GET请求
    await axios
      .post(apiUrl, userId)
      .then((res) => {
        console.log('成功获取数据：', res.data)
        setData(res.data)
        // 在这里处理从API返回的数据
      })
      .catch((error) => {
        console.error('获取数据时出错：', error)
        // 在这里处理错误
      })
  }

  return (
    <>
      <button
        onClick={() => {
          getList()
        }}
      >
        123
      </button>
    </>
  )
}
