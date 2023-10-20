import React, { useEffect, useState } from 'react'

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return [isMobile, setIsMobile]
}
