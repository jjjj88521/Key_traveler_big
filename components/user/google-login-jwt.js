import useFirebase from '@/hooks/use-firebase'
import { useSelector, useDispatch } from 'react-redux'
import GoogleLogo from '@/components/icons/google-logo'
import { Button } from 'antd'
import { googleLoginAsync } from '@/redux/actions/auth'

export default function GoogleLoginJWT() {
  const { loginGoogle } = useFirebase()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const callbackGoogleLogin = (providerData) => {
    dispatch(googleLoginAsync(providerData))
  }

  return (
    <>
      <Button
        onClick={() => loginGoogle(callbackGoogleLogin)}
        className="px-5"
        icon={<GoogleLogo size="1rem" />}
        loading={auth.isLoading}
        size="large"
      >
        Google 登入
      </Button>
    </>
  )
}
