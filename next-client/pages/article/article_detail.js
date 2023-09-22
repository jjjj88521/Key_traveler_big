import Link from 'next/link'
import React from 'react'

export default function ArticleDetail() {
  return (
    <>
      <div className="container mb-5">
        123
        <div className="row">
          {/* 左側欄 */}
          <div className="col-8 border border-5 border-primary position-relative">
            <i
              class="fa-regular fa-heart fa-2xl position-absolute "
              style={{ top: '20px', right: '10px' }}
            ></i>
            <h2 className="fw-bolder mt-4">資料庫DB-article-title</h2>
            <h5 className="text-secondary mb-5">by.user_id + 發佈時間</h5>
            <p>
              內文 舉例:親愛的用戶們，
              我們非常興奮地宣布，我們的全新鍵盤賣場現已正式上線！無論您是電競愛好者、專業打字者還是追求個性化的用戶，我們將為您提供最優質的鍵盤選擇，以滿足您對極致打字體驗的追求。
              在我們的鍵盤賣場中，您將發現各種類型的鍵盤，包括機械鍵盤、薄膜鍵盤和靜音鍵盤等等。無論您喜歡什麼類型的鍵盤，我們都有合適的選擇，以滿足您的需求。
              我們與頂尖品牌合作，為您提供最優質的產品。您可以找到知名品牌如Cherry、Razer、Corsair和Logitech等等。這些品牌以卓越的品質和出色的性能聞名於世，為您提供最佳的打字體驗。
              此外，我們還提供各種不同的配件和個性化選項，以讓您的鍵盤獨一無二。您可以選擇各種款式的鍵帽、背光效果和線材，定制您的打字工具，展現您的獨特風格。
              我們的鍵盤賣場致力於提供卓越的購物體驗和優質的客戶服務。我們的團隊將竭誠為您提供專業建議和協助，以確保您選擇到最適合您的鍵盤。
              別再猶豫了！立即訪問我們的鍵盤賣場，探索各種精選鍵盤和令人驚嘆的配件。我們保證您將獲得一個超越預期的打字體驗。
              期待為您提供最佳的鍵盤選擇！
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <img
                src={
                  'https://www.inpad.com.tw/data/news/cover/1694604979854924778.jpg'
                }
                className="ArticleImg"
                alt="..."
              />
            </p>
          </div>
          {/* 右側欄 */}
          <div className="col-4"></div>
        </div>
      </div>
    </>
  )
}
