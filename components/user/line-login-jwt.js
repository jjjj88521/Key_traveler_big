import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import LineLogo from '@/components/icons/line-logo'

export default function LineLoginJWT() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()

  // 解析jwt access token
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  // 處理登出
  const lineLogout = async () => {
    if (!auth.isAuth) return
    if (!auth.userData.line_uid) return

    const line_uid = auth.userData.line_uid

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/line-login/logout?line_uid=${line_uid}`,
      {
        withCredentials: true, // 注意: 必要的
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuth({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  // 處理line登入後，要向伺服器進行登入動作
  const callbackLineLogin = async (cUrl) => {
    const res = await axios.get(cUrl, {
      withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
    })

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuth({
        isAuth: true,
        userData: parseJwt(res.data.accessToken), // jwt use
      })
    } else {
      console.log('login fail or not from login page')
    }
  }

  // 處理登入
  const goLineLogin = () => {
    // 向後端(express/node)伺服器要求line登入的網址
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/line-login/login', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.url)
        // 重定向到line 登入頁
        if (res.data.url) window.location.href = res.data.url
      })
  }

  // 從line登入畫面後回調到本頁面用
  useEffect(() => {
    // 水合作用(hydration)保護，以免得不到window全域物件
    if (router.isReady) {
      // 判斷是否有query.code(網址上沒有code是進登入頁的時候)
      if (!router.query.code) return

      const qs = new URLSearchParams({
        ...router.query,
      }).toString()

      const cbUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/line-login/callback?${qs}`

      // 發送至後端伺服器得到line會員資料
      callbackLineLogin(cbUrl)
    }
    // eslint-disable-next-line
  }, [router.isReady, router.query])

  return (
    <>
      <h1>Line登入頁面(+回調頁)</h1>

      <p>會員狀態:{auth.isAuth ? '已登入' : '未登入'}</p>
      <p>會員資料:{JSON.stringify(auth.userData)}</p>
      <hr />
      <button onClick={goLineLogin}>
        <LineLogo /> 登入
      </button>
      <br />
      <button onClick={lineLogout}>LINE 登出(logout)</button>
    </>
  )
}
