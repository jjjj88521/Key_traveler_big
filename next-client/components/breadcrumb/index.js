import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { pathsLocaleMap } from '@/configs'
import { MyBreadcrumbList, MyBreadcrumbItem } from './my-breadcrumb'
import { HomeFilled } from '@ant-design/icons'
import axios from 'axios'

export default function MyBreadcrumb() {
  // 獲取目前路徑
  const router = useRouter()
  const { isReady, asPath } = router
  const pathname = asPath.split('?')[0]

  // 如果有 pid，獲取商品資訊
  const [productName, setProductName] = useState(null)
  useEffect(() => {
    if (isReady) {
      const { pid } = router.query
      if (pathname.includes('/product/')) {
        fetchProductInfo(pid)
      }
    }
    async function fetchProductInfo(pid) {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/products/${pid}`
        )
        const productData = response.data // 假設API返回商品信息的數據
        setProductName(productData.name)
      } catch (error) {
        console.error('獲取商品信息時出錯:', error)
      }
    }

    // 只有在pathname中包含'/product/'時才發送商品信息請求
  }, [isReady, pathname, router.query])

  // 要放到連結的 path 陣列
  // const paths = pathname.split('/')

  // 將路徑分割成陣列，並解碼中文字符
  const pathsDecoded = pathname
    .split('/')
    .map((path) => decodeURIComponent(path))

  return (
    <div className="bg-dark" style={{ height: '60px' }}>
      <div className="container h-100 d-flex align-items-center">
        <MyBreadcrumbList>
          {pathsDecoded.map((path, index) => {
            const currentPath = pathsDecoded.slice(0, index + 1).join('/')
            {
              /* console.log(currentPath) */
            }
            const matchingPath = pathsLocaleMap.find(
              (path) => path.path === currentPath
            )
            const isLastBreadcrumb = index === pathsDecoded.length - 1
            // 有匹配的路徑
            if (matchingPath) {
              return (
                <MyBreadcrumbItem
                  key={index}
                  path={matchingPath.path}
                  title={matchingPath.name}
                  lastItem={isLastBreadcrumb}
                />
              )
            }
            // 第一個顯示房子圖案
            if (index === 0) {
              return (
                <MyBreadcrumbItem
                  key={index}
                  path={`/`}
                  title={<HomeFilled />}
                />
              )
            }
            // 將商品名稱加進麵包屑
            if (productName && index === pathsDecoded.length - 1) {
              return (
                <MyBreadcrumbItem
                  key={index}
                  path={pathsDecoded.slice(0, index + 1).join('/')}
                  title={productName}
                  lastItem={isLastBreadcrumb}
                />
              )
            }
            // 沒有匹配的路由就路由是甚麼就顯示甚麼
            return (
              <MyBreadcrumbItem
                key={index}
                path={pathsDecoded.slice(0, index + 1).join('/')}
                title={path}
                lastItem={isLastBreadcrumb}
              />
            )
          })}
        </MyBreadcrumbList>
      </div>
    </div>
  )
}
