import React from 'react'
import ProfileForm from '@/components/user/profile-form'
import UserAvatar from '@/components/user/user-avatar'
import UserAvatarMobile from '@/components/user/user-avatar-mobile'
import UserLayout from '@/components/layout/user-layout'
import useLoading from '@/hooks/useLoading'
import LoadingPage from '@/components/common/loadingPage'
export default function Profile() {
  const [isLoading, setIsLoading] = useLoading(1)
  return (
    <>
      <UserLayout title={'個人資料'}>
        {/* 手機板 */}
        <div className=" d-block d-sm-none">
          <UserAvatarMobile />
          <ProfileForm />
        </div>
        {/* 電腦版 */}
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="d-sm-flex d-none">
            {/* form表單 */}
            <ProfileForm />
            {/* 電腦版的avator */}
            <UserAvatar />
          </div>
        )}
      </UserLayout>
    </>
  )
}
