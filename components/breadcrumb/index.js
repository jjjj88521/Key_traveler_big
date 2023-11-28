import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { pathsLocaleMap } from '@/configs'
import { MyBreadcrumbList, MyBreadcrumbItem } from './my-breadcrumb'
import { HomeFilled } from '@ant-design/icons'
import { useProductData } from '@/context/useProduct'
import useLoading from '@/hooks/useLoading'

export default function MyBreadcrumb() {
  // 獲取目前路徑
  const router = useRouter()
  const { isReady, asPath } = router
  const pathname = asPath.split('?')[0]
  const { productData } = useProductData()
  // const [isLoading, setIsLoading] = useLoading(productData.id)

  // 如果有 pid，獲取商品資訊
  const [productName, setProductName] = useState(null)
  useEffect(() => {
    if (productData) {
      setProductName(productData.name)
    }
  }, [productData])

  // 將路徑分割成陣列，並解碼中文字符
  const pathsDecoded = pathname
    .split('/')
    .map((path) => decodeURIComponent(path))

  return (
    <div className="bg-dark my-breadcrumb" style={{ height: '60px' }}>
      <div className="container h-100 d-flex align-items-center">
        <MyBreadcrumbList>
          {pathsDecoded.map((path, index) => {
            const currentPath = pathsDecoded.slice(0, index + 1).join('/')
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
            if (
              productName &&
              (asPath.startsWith('/product') ||
                asPath.startsWith('/groupbuy') ||
                asPath.startsWith('/rent')) &&
              index === pathsDecoded.length - 1
            ) {
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
