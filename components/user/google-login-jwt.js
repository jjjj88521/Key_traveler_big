import useFirebase from '@/hooks/use-firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, isLoading } from '@/redux/reducers/auth'
import GoogleLogo from '@/components/icons/google-logo'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { Button } from 'antd'
import request from '@/utils/request'
import { googleLoginAsync } from '@/redux/actions/auth'

export default function GoogleLoginJWT() {
  const router = useRouter()
  const { loginGoogle } = useFirebase()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const callbackGoogleLogin = async (providerData) => {
    // console.log(providerData)

    // dispatch(isLoading(true))
    // // 發送 post 請求
    // const res = await request.post('/api/google-login/jwt', providerData)

    // if (res.data.message === 'success') {
    //   dispatch(isLoading(false))
    //   dispatch(setUser(parseJwt(res.data.token)))
    //   Swal.fire({
    //     icon: 'success',
    //     title: '登入成功',
    //     text: '即將回到首頁',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   }).then(() => {
    //     router.push('/')
    //   })
    // }
    dispatch(googleLoginAsync(providerData))
  }

  return (
    <>
      {/* <h1>google-login測試頁(jwt)</h1>
      <p>會員狀態:{auth.isAuth ? '已登入' : '未登入'}</p> */}
      {/* <button
        onClick={() => loginGoogle(callbackGoogleLogin)}
        style={{ background: 'white' }}
        className="p-2 border rounded px-5"
      >
        <GoogleLogo /> google登入
      </button> */}
      <Button
        onClick={() => loginGoogle(callbackGoogleLogin)}
        className="px-5"
        icon={<GoogleLogo size="1rem" />}
        loading={auth.isLoading}
        size="large"
      >
        Google 登入
      </Button>
      {/* <br />
      <button onClick={logout}>登出</button>
      <br /> */}
      {/* <button
        onClick={async () => {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/auth-jwt/check-login',
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        向伺服器檢查登入狀態
      </button> */}
      {/* <hr />
      <Link href="/user-test/jwt">會員測試頁(jwt)</Link>
      <br />
      <Link href="/user-test/login-status-jwt">登入狀態頁(未登入無法觀看)</Link> */}
    </>
  )
}
