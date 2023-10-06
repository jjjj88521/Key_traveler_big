// import { useState } from 'react'
//  引入 _header.module.scss
import style from '@/styles/default-layout/_default-layout.module.scss'
import Navbar from './navbar'
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

export default function Header() {
  // // 滑鼠移入，文字改成中文效果
  // const [isHover, setIsHover] = useState(false)

  // const handleMouseEnter = () => {
  //   setIsHover(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsHover(false)
  // }

  // const flipClass = isHover ? style['flip'] : ''

  // 偵測視窗滾動，下滑 header 上移隱藏，上滑 header下移顯示
  const headerRef = useRef(null)
  const [prevScrollY, setPrevScrollY] = useState(0)
  // const animeHide = anime({
  //   targets: headerRef.current,
  //   translateY: [0, -100],
  //   easing: 'easeInOutQuad',
  //   duration: 1000,
  // })

  // const animeShow = anime({
  //   targets: headerRef.current,
  //   translateY: [-100, 0],
  //   easing: 'easeInOutQuad',
  //   duration: 1000,
  // })
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (prevScrollY > currentScrollY) {
        headerRef.current.classList.remove(style['up'])
        headerRef.current.classList.add(style['down'])
      } else {
        headerRef.current.classList.remove(style['down'])
        headerRef.current.classList.add(style['up'])
      }
      setPrevScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  return (
    <>
      <header className={`${style['header']}`} ref={headerRef}>
        <Navbar />
      </header>
    </>
  )
}
