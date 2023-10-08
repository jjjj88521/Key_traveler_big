import React from 'react'
import ProfileForm from '@/components/user/profile-form'
import UserDropdown from '@/components/user/user-dropdown'
import UserAvatar from '@/components/user/user-avatar'
import UserAvatarMobile from '@/components/user/user-avatar-mobile'
import UserLayout from '@/components/layout/user-layout'

export default function Profile() {
  return (
    <>
      <UserLayout title={'個人資料'}>
        {/* 手機板的avator */}
        <UserAvatarMobile />
        <div className="d-flex">
          {/* form表單 */}
          <ProfileForm />
          {/* 電腦版的avator */}
          <UserAvatar />
        </div>
      </UserLayout>
    </>
  )
}
