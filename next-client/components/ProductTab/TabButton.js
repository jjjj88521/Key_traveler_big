import { useTransition } from 'react'
import styles from './tab.module.css'

export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition()
  if (isActive) {
    return (
      <button
        disabled
        className={`fs-4 p-3 ${styles['tabBtn']}`}
        style={{ color: 'black', fontWeight: 'bold' }}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick()
        })
      }}
      className={`fs-4 p-3 ${styles['tabBtn']}`}
    >
      {children}
    </button>
  )
}
