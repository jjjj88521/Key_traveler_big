import React from 'react'
import { useRouter } from 'next/router'

export default function ProductCate1() {
  const router = useRouter()
  const { c1_name } = router.query
  console.log(c1_name)
  return <div>ProductCate1</div>
}
