import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown, Space, Badge, Drawer, Menu, Button, Tooltip } from 'antd'
import style from '@/styles/default-layout/_default-layout.module.scss'
// import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync } from '@/redux/actions/user'

// 導航欄位
const navItems = [
  {
    name: '商品',
    link: '/product',
    children: [
      {
        name: '全部商品',
        link: '/product',
      },
      {
        name: '鍵盤套件',
        link: '/product/1',
      },
      {
        name: '軸體',
        link: '/product/2',
      },
      {
        name: '鍵帽',
        link: '/product/3',
      },
      {
        name: '成品鍵盤',
        link: '/product/4',
      },
      {
        name: '鍵盤零件 & 工具',
        link: '/product/5',
      },
    ],
  },
  {
    name: '團購專區',
    link: '/groupbuy',
  },
  {
    name: '租用鍵盤',
    link: '/rent',
  },
  {
    name: '文章區',
    link: '/article',
    children: [
      {
        name: '全部文章',
        link: '/article/cate/0',
      },
      {
        name: '公告',
        link: '/article/cate/1',
      },
      {
        name: '開箱文',
        link: '/article/cate/2',
      },
      {
        name: '組裝教學',
        link: '/article/cate/3',
      },
      {
        name: '活動',
        link: '/article/cate/4',
      },
    ],
  },
]

export default function Navbar() {
  const { totalItemsP: pdTotalItems } = useCart()
  const { totalItemsG: gbTotalItems } = useGroupCart()
  const { totalItemsR: rTotalItems } = useRentCart()
  const router = useRouter()
  // === 手機版滑入選單 ===
  const [open, setOpen] = useState(false)
  const showMobileMenu = () => {
    setOpen(true)
  }
  const hideMobileMenu = () => {
    setOpen(false)
    setOpenKeys([])
  }

  // antd drawer items
  const mobileItems = navItems.map((item) => {
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
  })

  // 只展開點開的選單，其他關閉
  const rootSubmenuKeys = ['tmp-0', 'tmp-1', 'tmp-2', 'tmp-3']
  const [openKeys, setOpenKeys] = useState([])
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  // 判斷是否登入，登入後顯示登出按鈕
  // const { auth, logout } = useAuth()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    localStorage.setItem('redirect', router.asPath)
    // logout()
    dispatch(logoutAsync())
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
                          className="ant-dropdown-link text-decoration-none text-primary"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Space>{item.name}</Space>
                        </Link>
                      </Dropdown>
                    ) : (
                      <Link
                        href={item.link}
                        className="text-decoration-none text-primary"
                      >
                        <Space>{item.name}</Space>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="col d-sm-flex d-none align-items-center justify-content-end gap-5">
              {/* 會員中心 */}
              <div className="text-primary fs-5">
                <Tooltip
                  title={user.isAuth ? '會員中心' : '登入/註冊'}
                  color="#DC9329"
                >
                  <Link
                    href={`${user.isAuth ? '/user/profile' : '/user/login'}`}
                    onClick={() => {
                      localStorage.setItem('redirect', router.asPath)
                    }}
                  >
                    <i className="fa-regular fa-user"></i>
                  </Link>
                </Tooltip>
              </div>
              {/* 喜歡商品 */}
              <div className="text-primary fs-5">
                <Tooltip title="收藏商品" color="#DC9329">
                  <Link href="/user/product-like">
                    <i className="fa-regular fa-heart"></i>
                  </Link>
                </Tooltip>
              </div>
              {/* 購物車按鈕 */}
              <div className="align-items-center d-flex">
                <Tooltip title="購物車" color="#DC9329">
                  <Link href="/cart">
                    {user.isAuth ? (
                      <Badge
                        count={pdTotalItems + gbTotalItems + rTotalItems}
                        color="#DC9329"
                        showZero
                      >
                        <i className="fa-solid fa-cart-shopping text-primary fs-5"></i>
                      </Badge>
                    ) : (
                      <Badge count={0} color="#DC9329" showZero>
                        <i className="fa-solid fa-cart-shopping text-primary fs-5"></i>
                      </Badge>
                    )}
                  </Link>
                </Tooltip>
              </div>
              {/* 登出按鈕，只有登入才會出現 */}
              {user.isAuth ? (
                <div className="text-primary">
                  <Tooltip title="登出" color="#DC9329">
                    <button
                      className="btn border-0 text-primary"
                      onClick={handleLogout}
                    >
                      <i class="fa-solid fa-right-from-bracket fs-5"></i>
                    </button>
                  </Tooltip>
                </div>
              ) : null}
            </div>
            {/* 手機版選單按鈕 */}
            <div className="col d-sm-none d-block">
              <div className="d-flex align-items-center justify-content-end h-100">
                <button class="btn border-0" onClick={showMobileMenu}>
                  <i className="fa-solid fa-bars text-primary fs-3 cursor-pointer"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Drawer open={open} onClose={hideMobileMenu} width={300}>
        <div className="d-flex flex-column justify-content-between h-100">
          <Menu
            type="primary"
            className="px-0"
            mode="inline"
            style={{ height: '80%', borderRight: 0 }}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={mobileItems}
          />
          {user.isAuth ? (
            <Button type="primary" danger onClick={handleLogout} block>
              登出
            </Button>
          ) : (
            <Button type="primary" block>
              <Link
                href={'/user/login'}
                onClick={() => {
                  localStorage.setItem('redirect', router.asPath)
                  hideMobileMenu()
                }}
              >
                登入 / 註冊
              </Link>
            </Button>
          )}
        </div>
      </Drawer>
    </>
  )
}
