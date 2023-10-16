import React from 'react'

export default function GbDescription() {
  return (
    <div className="p-sm-5 p-3 bg-white lh-lg">
      <h6 className="lh-lg">
        歡迎您參加鍵之旅人的團購活動。為了確保您對團購過程有清晰的了解，請仔細閱讀以下團購規則：
      </h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td className="col-3 text-center text-primary">團購日期</td>
            <td>
              您可以在團購的開始日期至結束日期之間提交訂單。請確保您的訂單在指定日期內完成以參與團購。
            </td>
          </tr>
          <tr>
            <td className="col-3 text-center text-primary">達標人數</td>
            <td>
              我們的團購活動需要達到一定的最低參加人數才能成功。如果在結束日期後我們未達到這個最低人數，團購將無法成功。在這種情況下，我們將退還您的訂單金額。
            </td>
          </tr>
          <tr>
            <td className="col-3 text-center text-primary">到貨日期</td>
            <td>
              如果團購成功，我們將按照預定的時間表安排商品的運送或提取。請注意，到貨日期可能需要一些時間，請您耐心等待。
            </td>
          </tr>
          <tr>
            <td className="col-3 text-center text-primary">付款方式</td>
            <td>
              我們接受多種付款方式，以確保您的支付選擇多元。請根據您的喜好選擇最適合的支付方式。
            </td>
          </tr>
          <tr>
            <td className="col-3 text-center text-primary">客戶支援</td>
            <td>
              如果您在團購過程中遇到任何問題或需要協助，請隨時聯繫我們的客戶服務團隊。我們將樂意為您提供支援。
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        感謝您參加我們的團購活動。我們期待為您提供高品質的商品和卓越的購物體驗。請遵守以上規則，以確保您能順利參與團購，並為我們的成功團購活動做出貢獻。
        如果您有任何疑問或需要進一步資訊，請不要猶豫，隨時聯繫我們。謝謝您的支持。
      </p>
    </div>
  )
}
