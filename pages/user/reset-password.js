import UserLayout from '@/components/layout/user-layout'
import ResetPassword from '@/components/user/reset-password-form'
import LoadingPage from '@/components/common/loadingPage'
import useLoading from '@/hooks/useLoading'
export default function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useLoading(1)
  return (
    <UserLayout title="修改密碼">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="row pb-5 gap-sm-0 gap-3">
          <div className="col-sm-7 col-12">
            <ResetPassword />
          </div>
          <div className="waring-message col-sm-5 col-12">
            <p>溫馨提示:</p>
            <ol className="vstack gap-3">
              <li className="">
                密碼長度要求:
                <ul>
                  <li>您的新密碼至少需要有 8 個字符</li>
                  <li>密碼至少包含一個大寫字母、小寫字母和數字</li>
                </ul>
              </li>
              <li>
                避免使用常見密碼：
                <ul>
                  <li>
                    請勿使用常見的密碼，如 &apos;password&apos; 或
                    &apos;123456&apos;。
                  </li>
                  <li>選擇一個不容易猜測的密碼，以確保您的帳戶安全</li>
                </ul>
              </li>
              <li>
                不要重複使用密碼：
                <ul>
                  <li>請勿將此密碼用於其他帳戶，以防止資料外洩風險。</li>
                </ul>
              </li>
              <li>
                確認新密碼：
                <ul>
                  <li>請確認您的新密碼，以確保兩次輸入一致。</li>
                </ul>
              </li>
              <li>
                提醒定期更新密碼：
                <ul>
                  <li>為保護您的帳戶，請定期更換密碼。建議每 3 個月一次。</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      )}
    </UserLayout>
  )
}
