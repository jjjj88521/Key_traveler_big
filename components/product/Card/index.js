import React, { useState } from 'react'
import styles from './card.module.scss'
import Link from 'next/link'
import { useAllPdLike } from '@/context/useAllPdLike'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { addProductLike, deleteProductLike } from '@/libs/productFetcher'
import { Progress } from 'antd'
import useMobile from '@/hooks/useMobile'

export default function Card({
  title,
  brand,
  price,
  image,
  stock,
  link,
  id,
  cate,
  current_people = 0,
  target_people = 0,
  created_time,
}) {
  const router = useRouter()
  const { allPdLike } = useAllPdLike()
  const [isLiked, setIsLiked] = useState(allPdLike[cate].includes(id))
  // 切換收藏
  const handleToggleLike = async () => {
    try {
      const response = isLiked
        ? await deleteProductLike(cate, id)
        : await addProductLike(cate, id)

      console.log(response)

      if (response.code === '200') {
        setIsLiked(!isLiked)
        const successMessage = response.message
        Swal.fire({
          icon: 'success',
          title: successMessage,
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('發生錯誤')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '請先登入',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // 存入登入前的頁面，登入成功就跳轉回來
        localStorage.setItem('redirect', router.asPath)
        router.push('/user/login')
      })
    }
  }

  const createdDate = new Date(created_time)
  const isNew = createdDate >= new Date('2023-10-01')
  return (
    <>
      <div
        className={`card h-100 border border-1 ${styles['card']} overflow-hidden`}
      >
        <div className={`card-img-top position-relative ${styles.cardImg}`}>
          <Link href={link}>
            <img
              src={image}
              // className={`${styles.cardImg} card-img-top`}
              className={`object-fit-cover w-100 h-100`}
              alt="Product"
            />
          </Link>
          <button
            className={
              'position-absolute top-0 start-0 p-2 btn d-sm-none d-block'
            }
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleToggleLike()
            }}
          >
            <span className={`${isLiked ? 'text-danger' : 'text-white'} fs-1`}>
              <i
                className={`fa-solid fa-heart ps-2`}
                style={isLiked ? {} : { webkitTextStroke: '2px #000' }}
              ></i>
            </span>
          </button>
        </div>

        {/* 待完成，判斷是否為新品(ribbon) */}
        {stock === 0 ? (
          <div className={styles['outofstock']}></div>
        ) : isNew ? (
          <div className={styles['ribbon']}></div>
        ) : (
          <div></div>
        )}
        <div className="card-body w-100 position-relative bg-secondary-subtle py-4 vstack gap-2">
          <Link href={link}>
            <h5 className={`${styles['card-title-name']} card-title fw-bold`}>
              {title}
            </h5>
            <h6 className="card-title text-black-50">{brand}</h6>
            <h5 className="card-title">$ {price}</h5>
            {cate === 'gb' && (
              <Progress
                percent={(current_people / target_people) * 100}
                size="small"
                format={() => `${current_people}人`}
              />
            )}
          </Link>
          {/* <button
            className={`d-sm-none d-block border border-2 border-primary rounded-circle ${styles['cartBtn']}`}
          >
            <i
              className="fa-solid fa-cart-shopping fa-lg"
              style={{ color: '#F1D6AB' }}
            ></i>
          </button> */}
        </div>
        <div className={`d-flex flex-column gap-3 ${styles['info']}`}>
          {/* 加入購物車先註解，後續再補上功能 */}
          {/* <button
            className={`${styles['infoBtn1']} ${
              stock === 0 ? styles['invalidButton'] : ''
            }`}
            disabled={stock === 0} //根據是否缺貨
          >
            加入購物車
          </button> */}
          <button className={styles['infoBtn2']} onClick={handleToggleLike}>
            <span className={`${isLiked ? 'text-danger' : ''}`}>
              <i
                className={`${
                  isLiked ? 'fa-solid' : 'fa-regular'
                } fa-heart pe-2`}
              ></i>
              Like
            </span>
          </button>
          <Link className={styles['infoBtn3']} href={link}>
            <i className="fa-solid fa-angles-right"></i> Learn More
          </Link>
        </div>
      </div>
    </>
  )
}
