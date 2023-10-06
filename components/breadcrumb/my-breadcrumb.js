import React from 'react'
import Link from 'next/link'
import { RightOutlined } from '@ant-design/icons'
import style from './_breadcrumb.module.scss'

export function MyBreadcrumbList({ children }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className={`${style['breadcrumb-list']} mb-0`}>{children}</ol>
    </nav>
  )
}

export function MyBreadcrumbItem({ path, title, lastItem = false }) {
  return (
    <li
      className={`${style['breadcrumb-item']} ${
        lastItem ? style['active'] : ''
      }`}
    >
      <div className={`${style['breadcrumb-text']}`}>
        {lastItem ? title : <Link href={path}>{title}</Link>}
      </div>
      <span className={`${style['breadcrumb-separator']}`}>
        <RightOutlined />
      </span>
    </li>
  )
}
