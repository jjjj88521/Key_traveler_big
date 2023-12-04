import React from 'react'
import styles from './banner.module.css'

export default function Banner({ title, image }) {
  return (
    <div className={styles.banner}>
      <div className="w-100 h-100 p-4 p-sm-0">
        <img
          className={`w-100 h-100 object-fit-cover ${styles.rounded}`}
          src={image}
          alt="banner"
        />
      </div>
      <h1 className={`text-primary ${styles['display1']}`}>{title}</h1>
    </div>
  )
}
