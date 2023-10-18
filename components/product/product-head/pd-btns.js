import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/router'

const AddCartBtn = ({ type }) => {
  const { addItem: addPItem } = useCart()
  const { addItem: addGItem } = useRentCart()
  const { addItem: addRItem } = useGroupCart()

  // 獲取目前路徑
  const router = useRouter()
  const { isReady, asPath } = router
  const pathname = asPath.split('?')[0]
  console.log(pathname)

  const addToCart = () => {
    const data =
      type === 'product'
        ? localStorage.getItem('cartPItem')
        : type === 'groupBuy'
        ? localStorage.getItem('cartGItem')
        : localStorage.getItem('cartRItem')

    if (type === 'product') {
      const addPCart = async (pData) => {
        const newPData = JSON.parse(pData)
        // const dataTostring = JSON.stringify(newPData.specData)
        // console.log(dataTostring)
        // console.log(typeof dataTostring)
        console.log(newPData.specData)
        // newPData.specData = JSON.stringify(newPData.specData)
        // console.log(typeof newPData.specData)

        try {
          const response = await axios.post(
            'http://localhost:3005/api/cart/addproduct',
            newPData,
            {
              withCredentials: true, // save cookie in browser
            }
          )
          console.log(response.data)
          if (response.data.code !== '200') {
            console.log('HERE')
            if (response.data.code === '201') {
              return Swal.fire({
                icon: 'success',
                title: '購物車已有該商品',
                text: '數量+' + response.data.quantity,
              })
            }
          } else {
            return Swal.fire({
              icon: 'success',
              title: '新增購物車成功',
              showConfirmButton: false,
              timer: 2500,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
      addPCart(data)
      return addPItem(JSON.parse(data))
      // console.log(JSON.parse(data))
    }
    return data ? JSON.parse(data) : []
  }
  return (
    <>
      <button
        className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold hstack gap-3 justify-content-center"
        onClick={addToCart}
      >
        <i className="fa-solid fa-cart-plus"></i>
        加入購物車
      </button>
    </>
  )
}

const BuyBtn = () => {
  return (
    <button className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold">
      直接購買
    </button>
  )
}

const LikeBtn = ({ isLiked = false, onToggleLike }) => {
  // const [liked, setLiked] = useState(isLiked)
  const handleToggleLike = () => {
    onToggleLike()
  }
  return (
    <button
      className={`h4 bg-transparent border-0`}
      onClick={() => {
        handleToggleLike()
      }}
    >
      <span className={`${isLiked ? 'text-danger' : ''}`}>
        <i
          className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart pe-2`}
        ></i>
        Like
      </span>
    </button>
  )
}

const OutOfStockBtn = () => {
  return (
    <button
      className="btn btn-secondary w-100 py-3 rounded-4 fw-semibold disabled"
      disabled
    >
      缺貨
    </button>
  )
}

const EndGbBtn = () => {
  return (
    <button
      className="btn btn-secondary w-100 py-3 rounded-4 fw-semibold"
      disabled
    >
      團購結束，請等待下次開團
    </button>
  )
}

const WaitingStartGbBtn = () => {
  return (
    <button
      className="btn btn-success w-100 py-3 rounded-4 fw-semibold"
      disabled
    >
      等待開團
    </button>
  )
}

export {
  AddCartBtn,
  BuyBtn,
  LikeBtn,
  OutOfStockBtn,
  EndGbBtn,
  WaitingStartGbBtn,
}
