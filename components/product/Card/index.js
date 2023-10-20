import React, { useState } from 'react'
import styles from './card.module.scss'
import Link from 'next/link'
import { useAllPdLike } from '@/context/useAllPdLike'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { addProductLike, deleteProductLike } from '@/libs/productFetcher'

export default function Card({
  title,
  brand,
  price,
  image,
  stock,
  link,
  id,
  cate,
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
  return (
    <>
      <div
        className={`card h-100 border border-1 ${styles['card']} overflow-hidden`}
      >
        <div className={`card-img-top ${styles.cardImg}`}>
          <img
            src={image}
            // className={`${styles.cardImg} card-img-top`}
            className={`object-fit-cover w-100 h-100`}
            alt="Product"
          />
        </div>

        {/* 待完成，判斷是否為新品(ribbon) */}
        {stock === 0 ? (
          <div className={styles['outofstock']}></div>
        ) : (
          <div className={styles['ribbon']}></div>
        )}
        <div className="card-body w-100 position-relative bg-secondary-subtle py-4 vstack gap-2">
          <h5 className={`${styles['card-title-name']} card-title fw-bold`}>
            {title}
          </h5>
          <h6 className="card-title text-black-50">{brand}</h6>
          <h5 className="card-title">$ {price}</h5>
          <button
            className={`d-sm-none d-block border border-2 border-primary rounded-circle ${styles['cartBtn']}`}
          >
            <i
              className="fa-solid fa-cart-shopping fa-xl"
              style={{ color: '#F1D6AB' }}
            ></i>
          </button>
        </div>
        <div className={`d-flex flex-column gap-3 ${styles['info']}`}>
          <button
            className={`${styles['infoBtn1']} ${
              stock === 0 ? styles['invalidButton'] : ''
            }`}
            disabled={stock === 0} //根據是否缺貨
          >
            加入購物車
          </button>
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
