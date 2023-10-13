const userSideBarLinks = [
  {
    name: '個人檔案',
    children: [
      {
        name: '個人資料',
        link: '/user/profile',
      },
      {
        name: '信用卡',
        link: '/user/credit-card-profile',
      },
      {
        name: '修改密碼',
        link: '/user/reset-password',
      },
    ],
  },
  {
    name: '歷史訂單',
    children: [
      {
        name: '一般商品',
        link: '/user/order/1',
      },
      {
        name: '團購商品',
        link: '/user/order/2',
      },
      {
        name: '租用商品',
        link: '/user/order/3',
      },
    ],
  },
  {
    name: '我的優惠券',
    children: [
      {
        name: '優惠券列表',
        link: '/user/coupon',
      },
      {
        name: '歷史優惠券',
        link: '/user/coupon/history',
      },
    ],
  },
  {
    name: '我的收藏',
    children: [
      {
        name: '商品收藏',
        link: '/user/product-like',
      },
      {
        name: '文章收藏',
        link: '/user/article-like',
      },
    ],
  },
  {
    name: '歷史評價',
    children: [
      {
        name: '商品評價',
        link: '/user/comments',
      },
    ],
  },
]

export default userSideBarLinks
