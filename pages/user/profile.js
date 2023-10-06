import React from 'react'
import ProfileForm from '@/components/user/profile-form'
import UserDropdown from '@/components/user/user-dropdown'
import UserAvatar from '@/components/user/user-avatar'
import UserAvatarMobile from '@/components/user/user-avatar-mobile'

export default function Profile() {
  return (
    <>
      <div className="container">
        <h2 className="fw-bolder">個人檔案</h2>
        <div className="row my-sm-5 my-3">
          {/* 下拉選單 */}
          <UserDropdown />
          {/* 手機板的avator */}

          <UserAvatarMobile />

          {/* form表單 */}
          <ProfileForm />
          {/* 電腦版的avator */}
          <UserAvatar />
        </div>
      </div>
    </>
  )
}
