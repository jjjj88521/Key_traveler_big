import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { resolve } from 'styled-jsx/css'
export default function ApiTest() {
  const [data, setData] = useState('')
  // //有非同步、沒state=>不會無窮迴圈
  // new Promise((resolve, reject) => {
  //   axios
  //     .get('http://localhost:3005/api/users')
  //     .then((res) => {
  //       console.log(res)
  //       resolve()
  //       // setData(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // })
  // //有非同步、有state=>會無窮迴圈
  // new Promise((resolve, reject) => {
  //   axios
  //     .get('http://localhost:3005/api/users')
  //     .then((res) => {
  //       console.log(res)
  //       resolve()
  //       setData(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // })

  // //沒寫非同步、state=>不會無窮迴圈
  // axios
  //   .get('http://localhost:3005/api/users')
  //   .then((res) => {
  //     console.log(res)
  //     // setData(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //沒寫非同步、有寫state=>會無窮迴圈
  // axios
  //   .get('http://localhost:3005/api/users')
  //   .then((res) => {
  //     console.log(res)
  //     setData(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //沒寫非同步、有寫state、包effect=>不會無窮迴圈:解法
  useEffect(() => {
    axios
      .get('http://localhost:3005/api/users')
      .then((res) => {
        console.log(res)
        setData(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <h1>Test</h1>
    </>
  )
}
