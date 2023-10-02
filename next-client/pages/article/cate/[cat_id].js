import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ArticleFilter() {
  const router = useRouter()
  const { isReady } = router
  useEffect(() => {
    const { cat_id } = router.query
    console.log(cat_id)
  }, [isReady, router.query])
  return <div>articleFilter</div>
}
