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
        <div className="row">
          <div className="col-12 col-sm-8 order-1 order-sm-0">
            <ProfileForm />
          </div>
          <div className="col-12 col-sm-4 order-0 order-sm-1">
            <UserAvatar />
          </div>
        </div>
      </UserLayout>
    </>
  )
}
