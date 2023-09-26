import styles from '@/styles/user/member.module.css'
import Link from 'next/link'
import UserSideBar from './user-side-bar'
import UserSideBarMobile from './user-side-bar-mobile'
export default function ForgetPasswordForm() {
  return (
    <main className={`container`}>
      <h2 className="mb-sm-5 mb-4 fw-bolder">重設密碼</h2>
      <div className="row mb-5">
        <div className="col-sm-3 col-12 px-0 mx-0">
          <div className="d-sm-block d-none">
            <UserSideBar />
          </div>
          <div className="d-sm-none d-block mb-4">
            <UserSideBarMobile className="col-10 w-100" />
          </div>
        </div>
        <div className="col-sm-4 offset-sm-1 col-12">
          {' '}
          <p className={`text-center mb-3 ${styles['text-note']}`}>
            輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
          </p>
          <form>
            <div className="row mb-3">
              <div className="col-sm-12">
                <input
                  type="email"
                  className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
                  placeholder="電子郵件地址"
                />
              </div>
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入有效的註冊會員電子郵件地址。
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${styles['form-control']} ${styles['invalid']} `}
                    placeholder="電子郵件驗證碼"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    取得驗証碼
                  </button>
                </div>
              </div>
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入驗証碼。
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-12">
                <input
                  type="password"
                  className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
                  placeholder="密碼"
                />
              </div>
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入新密碼。
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <input
                  type="password"
                  className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
                  placeholder="確認密碼"
                />
              </div>
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入確認密碼。
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary col-sm-6 offset-sm-6 col-12 text-white"
            >
              確定
            </button>

            <div className="row mt-2 text-sm-end text-center">
              <p className={`${styles['notice']}`}>
                還不是會員？
                <Link href="/member/register">加入我們</Link>。
              </p>
            </div>
          </form>
        </div>{' '}
        <div className="waring-message col-sm-3 offset-sm-1 col-12">
          <p>溫馨提示:</p>
          <ol>
            <li>
              密碼長度要求:
              <ul>
                <li>您的新密碼至少需要有 6 個字符</li>
              </ul>
            </li>
            <li>
              避免使用常見密碼：
              <ul>
                <li>請勿使用常見的密碼，如 'password' 或 '123456'。</li>
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
    </main>
  )
}
