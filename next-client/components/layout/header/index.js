import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
//  引入 _header.module.scss
import style from './_header.module.scss'
// 引入 antd 下拉式選單
import { Dropdown, Space, Tag } from 'antd'

export default function Header() {
  // // 滑鼠移入，文字改成中文效果
  // const [isHover, setIsHover] = useState(false)

  // const handleMouseEnter = () => {
  //   setIsHover(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsHover(false)
  // }

  // const flipClass = isHover ? style['flip'] : ''

  // 商品分類假資料
  const shopCate = [
    {
      name: '鍵盤套件',
      c1_id: 1,
    },
    {
      name: '軸體',
      c1_id: 2,
    },
    {
      name: '鍵帽',
      c1_id: 3,
    },
    {
      name: '成品鍵盤',
      c1_id: 4,
    },
    {
      name: '鍵盤零件 & 工具',
      c1_id: 5,
    },
  ]

  const items = [
    {
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="/product"
          className="text-decoration-none"
        >
          全部商品
        </Link>
      ),
      key: '0',
    },
    // {
    //   label: (
    //     <Link
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="/product"
    //       className="text-decoration-none"
    //     >
    //       鍵盤套件
    //     </Link>
    //   ),
    //   key: '1',
    // },
    // {
    //   label: (
    //     <Link
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="/product"
    //       className="text-decoration-none"
    //     >
    //       軸體
    //     </Link>
    //   ),
    //   key: '2',
    // },
    // {
    //   label: (
    //     <Link
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="/product"
    //       className="text-decoration-none"
    //     >
    //       鍵帽
    //     </Link>
    //   ),
    //   key: '3',
    // },
    // {
    //   label: (
    //     <Link
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="/product"
    //       className="text-decoration-none"
    //     >
    //       成品鍵盤
    //     </Link>
    //   ),
    //   key: '4',
    // },
    // {
    //   label: (
    //     <Link
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       href="/product"
    //       className="text-decoration-none"
    //     >
    //       鍵盤工具 & 零件
    //     </Link>
    //   ),
    //   key: '5',
    // },
  ]

  // 將商品分類假資料轉成 antd 下拉式選單，插入到 items
  // items = shopCate.map((item) => [
  //   ...items,
  //   {
  //     label: (
  //       <Link
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="/product"
  //         className="text-decoration-none"
  //       >
  //         {item.name}
  //       </Link>
  //     ),
  //     key: item.c1_id,
  //   },
  // ])

  return (
    <>
      <header style={{ backgroundColor: '#171717', height: '100px' }}>
        <div className="container h-100 d-flex align-items-center">
          <div className="row w-100">
            <div className="col">
              <div className="d-flex align-items-center">
                <Link href="/">
                  <Image
                    src="/images/header-logo-desktop.png"
                    width={200}
                    height={40}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-5 row align-items-center text-center">
              <div className="col">
                <Link
                  href="/product"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  <div className={`${style['nav-text']}`}>
                    <div className={`${style['inner-content ']}`}>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottom"
                      >
                        <a
                          className="ant-dropdown-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Space>Shop</Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col text-nowrap">
                <Link
                  href="/groupBuy"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Group buy
                </Link>
              </div>
              <div className="col">
                <Link
                  href="/rent"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Rent
                </Link>
              </div>
              <div className="col">
                <Link
                  href="/article"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Article
                </Link>
              </div>
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              <div className="text-primary">
                <i class="fa-regular fa-user"></i>
              </div>
              <div className="text-primary ps-5">
                <i class="fa-regular fa-heart"></i>
              </div>
              <div className="text-primary ps-5">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
