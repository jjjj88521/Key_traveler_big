import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown, Space, Badge, Drawer, Menu } from 'antd'
import style from '@/styles/default-layout/_header.module.scss'

export default function Navbar() {
  // 導航欄位假資料
  const navItems = [
    {
      name: 'Shop',
      link: '/product',
      children: [
        {
          name: '全部商品',
          link: '/product',
        },
        {
          name: '鍵盤套件',
          link: '/product/category/1',
        },
        {
          name: '軸體',
          link: '/product/category/2',
        },
        {
          name: '鍵帽',
          link: '/product/category/3',
        },
        {
          name: '成品鍵盤',
          link: '/product/category/4',
        },
        {
          name: '鍵盤零件 & 工具',
          link: '/product/category/5',
        },
      ],
    },
    {
      name: 'Group buy',
      link: '/groupbuy',
      children: [
        {
          name: '全部商品',
          link: '/groupbuy/category/0',
        },
        {
          name: '團購中',
          link: '/groupbuy/category/1',
        },
        {
          name: '即將開團',
          link: '/groupbuy/category/2',
        },
        {
          name: '團購結束',
          link: '/groupbuy/category/3',
        },
      ],
    },
    {
      name: 'Rent',
      link: '/rent',
    },
    {
      name: 'Article',
      link: '/article',
      children: [
        {
          name: '全部文章',
          link: '/article/category/0',
        },
        {
          name: '公告',
          link: '/article/category/1',
        },
        {
          name: '開箱文',
          link: '/article/category/2',
        },
        {
          name: '組裝教學',
          link: '/article/category/3',
        },
        {
          name: '活動',
          link: '/article/category/4',
        },
      ],
    },
  ]

  // 手機版滑入選單
  const [open, setOpen] = useState(false)
  const showMobileMenu = () => {
    setOpen(true)
  }
  const hideMobileMenu = () => {
    setOpen(false)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg h-100">
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
              {navItems.map((item, index) => {
                return (
                  <div className="col" key={index}>
                    {item.children ? (
                      <Dropdown
                        menu={{
                          items: item.children.map((child) => {
                            return {
                              label: (
                                <Link
                                  rel="noopener noreferrer"
                                  href={child.link}
                                  className="text-decoration-none"
                                >
                                  {child.name}
                                </Link>
                              ),
                              key: child.name,
                            }
                          }),
                        }}
                        placement="bottom"
                      >
                        <Link
                          href={'#'}
                          className="ant-dropdown-link text-decoration-none"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Space>{item.name}</Space>
                        </Link>
                      </Dropdown>
                    ) : (
                      <Link href={item.link} className="text-decoration-none">
                        <Space>{item.name}</Space>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="col d-sm-flex d-none align-items-center justify-content-end">
              {/* 會員中心 */}
              <div className="text-primary fs-5">
                <i className="fa-regular fa-user"></i>
              </div>
              {/* 喜歡商品 */}
              <div className="text-primary ps-5 fs-5">
                <i className="fa-regular fa-heart"></i>
              </div>
              {/* 購物車按鈕 */}
              <div className="">
                <Badge count={2} color="#DC9329">
                  <i className="fa-solid fa-cart-shopping text-primary ps-5 fs-5"></i>
                </Badge>
              </div>
            </div>
            {/* 手機版選單按鈕 */}
            <div className="col d-sm-none d-block">
              <div className="d-flex align-items-center justify-content-end h-100">
                <div onClick={showMobileMenu}>
                  <i className="fa-solid fa-bars text-primary fs-3 cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Drawer open={open} onClose={hideMobileMenu} width={300}>
        <Menu
          type="primary"
          className="px-0"
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={navItems.map((item, index) => {
            return {
              label: item.children ? (
                <p className="mb-0 h6 text-primary">{item.name}</p>
              ) : (
                <Link
                  rel="noopener noreferrer"
                  href={item.link}
                  className="text-decoration-none h6 text-primary"
                  onClick={hideMobileMenu}
                >
                  {item.name}
                </Link>
              ),
              key: item.index,
              children: item.children
                ? item.children.map((child, index) => {
                    return {
                      label: (
                        <Link
                          rel="noopener noreferrer"
                          href={child.link}
                          className="text-decoration-none"
                          onClick={hideMobileMenu}
                        >
                          {child.name}
                        </Link>
                      ),
                      key: item.name + index,
                    }
                  })
                : null,
            }
          })}
        />
      </Drawer>
    </>
  )
}
