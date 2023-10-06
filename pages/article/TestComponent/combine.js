import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Divider, Space, Tag } from 'antd'
import art_list_style from '@/styles/article/art_list_style.module.scss'
import Test from './test'
import Search from './search'
import Side from '../side'

export default function Combine() {
  return (
    <>
      <Search />
      <Side />
      <Test />
    </>
  )
}
