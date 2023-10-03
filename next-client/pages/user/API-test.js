import React from 'react'
import { useEffect, useState } from 'react'

export default function ApiTest() {
  const [data, setData] = useState('')
  useEffect(() => {
    fetch('http://localhost:3005/api/users')
      .then((response) => response.json())
      .then((value) => setData(value))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  return (
    <>
      <h1>Test</h1>

      {console.log(data)}
    </>
  )
}
