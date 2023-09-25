import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { pathsLocaleMap } from '@/configs'
import { MyBreadcrumbList, MyBreadcrumbItem } from './my-breadcrumb'
import { HomeFilled } from '@ant-design/icons'

export default function MyBreadcrumb() {
  // 獲取目前路徑
  const router = useRouter()
  const { isReady, asPath } = router
  const pathname = asPath.split('?')[0]

  // 要放到連結的 path 陣列
  const paths = pathname.split('/')

  // 將路徑分割成陣列，並解碼中文字符
  const pathsDecoded = pathname
    .split('/')
    .map((path) => decodeURIComponent(path))

  return (
    <div className="bg-dark" style={{ height: '60px' }}>
      <div className="container h-100 d-flex align-items-center">
        <MyBreadcrumbList>
          {pathsDecoded.map((path, index) => {
            if (index === 0) {
              return (
                <MyBreadcrumbItem
                  key={index}
                  path={`/`}
                  title={<HomeFilled />}
                />
              )
            } else if (index === pathsDecoded.length - 1) {
              return (
                <MyBreadcrumbItem key={index} title={path} lastItem={true} />
              )
            } else {
              return (
                <MyBreadcrumbItem
                  key={index}
                  path={paths.slice(0, index + 1).join('/')}
                  title={path}
                />
              )
            }
          })}
        </MyBreadcrumbList>
      </div>
    </div>
  )
}
