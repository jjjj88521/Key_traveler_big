import { Button, Result } from 'antd'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column gap-5"
      style={{ height: '580px' }}
    >
      <img src="/images/方logo.svg" className="w-25" />
      <h1 className="text-center text-secondary">404 - 找不到頁面</h1>
      <Button
        type="primary"
        onClick={() => {
          router.push('/')
        }}
      >
        Back Home
      </Button>
    </div>
  )
}
