import UserSideBar from '@/components/user/user-side-bar'
import UserSideBarMobile from '@/components/user/user-side-bar-mobile'

export default function UserDropdown() {
  return (
    <>
      <div className="col-sm-2 col-12 px-0 mx-0">
        <div className="d-sm-block d-none">
          <UserSideBar />
        </div>
        <div className="d-sm-none d-flex mb-4 justify-content-center">
          <UserSideBarMobile className="col-10 w-100" />
        </div>
      </div>
    </>
  )
}
