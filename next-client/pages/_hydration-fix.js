import React from 'react'

export default function HydrationFix({ children }) {
  // 解決水和作用的錯誤
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }
  return <>{children}</>
}
