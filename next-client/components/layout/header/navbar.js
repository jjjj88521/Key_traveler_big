import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown, Space, Badge } from 'antd'
import style from './_header.module.scss'

export default function Navbar() {
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

  let items = [
    {
      label: (
        <Link
          rel="noopener noreferrer"
          href="/product"
          className="text-decoration-none"
        >
          全部商品
        </Link>
      ),
      key: '0',
    },
  ]

  // 將商品分類假資料轉成 antd 下拉式選單，插入到 items
  shopCate.forEach((item) => {
    items.push({
      label: (
        <Link
          rel="noopener noreferrer"
          href={`/product/category/${item.c1_id}`}
          className="text-decoration-none"
        >
          {item.name}
        </Link>
      ),
      key: item.c1_id,
    })
  })
  return (
    <nav class="navbar navbar-expand-lg h-100">
      <div className="container h-100 d-flex align-items-center">
        <div className="row w-100 mx-0">
          <div className="col">
            <div
              className={`d-flex align-items-center ${style['header-logo']}`}
            >
              <Link href="/" className="position-relative h-100 w-100">
                <Image
                  src="/images/header-logo-desktop.png"
                  alt="Logo"
                  fill={true}
                  sizes="(max-width: 576px) 100vw, 150px"
                />
              </Link>
            </div>
          </div>
          <div className="col-5 row align-items-center text-center d-sm-flex d-none">
            <div className="col">
              <div className={`fw-semibold`}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                >
                  <Link
                    href="#"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>Shop</Space>
                  </Link>
                </Dropdown>
              </div>
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
          <div className="col d-sm-flex d-none align-items-center justify-content-end">
            <div className="text-primary fs-5">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-primary ps-5 fs-5">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="">
              <Badge count={2} color="#DC9329">
                <i className="fa-solid fa-cart-shopping text-primary ps-5 fs-5"></i>
              </Badge>
            </div>
          </div>
          <div className="col d-sm-none d-block">
            <div className="d-flex align-items-center justify-content-end h-100">
              <i className="fa-solid fa-bars text-primary fs-3"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
