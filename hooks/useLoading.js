import LoadingPage from '@/components/common/loadingPage'
import { useState, useEffect } from 'react'

export default function useLoading(data) {
  // data 為條件式，當 data 為 true 會將 loading 狀態改為 false
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  return [isLoading, setIsLoading]
}
