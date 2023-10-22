import { useCart } from '@/hooks/useCart'
import { useGroupCart } from '@/hooks/useGroupCart'
import { useRentCart } from '@/hooks/useRentCart'
import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

const addToCart = (type, addPItem, addGItem, addRItem) => {
  const data =
    type === 'product'
      ? localStorage.getItem('cartPItem')
      : type === 'groupBuy'
      ? localStorage.getItem('cartGItem')
      : localStorage.getItem('cartRItem')

  if (type === 'product') {
    const addPCart = async (pData) => {
      const newPData = JSON.parse(pData)

      try {
        const response = await axios.post(
          'http://localhost:3005/api/cart/addproduct',
          newPData,
          {
            withCredentials: true, // save cookie in browser
          }
        )
        if (response.data.code !== '200') {
          if (response.data.code === '201') {
            return Swal.fire({
              icon: 'success',
              title: '購物車已有同規格之商品',
              text: '數量+' + response.data.quantity,
              showConfirmButton: false,
              timer: 1500,
            })
          }
        } else {
          return Swal.fire({
            icon: 'success',
            title: '新增購物車成功',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    addPCart(data)
    return addPItem(JSON.parse(data))
    // console.log(JSON.parse(data))
  } else if (type === 'groupBuy') {
    const addGCart = async (gData) => {
      const newGData = JSON.parse(gData)

      try {
        const response = await axios.post(
          'http://localhost:3005/api/cart/addgroupbuy',
          newGData,
          {
            withCredentials: true, // save cookie in browser
          }
        )
        if (response.data.code !== '200') {
          if (response.data.code === '201') {
            return Swal.fire({
              icon: 'success',
              title: '購物車已有同規格之商品',
              text: '數量+' + response.data.quantity,
              showConfirmButton: false,
              timer: 1500,
            })
          }
        } else {
          return Swal.fire({
            icon: 'success',
            title: '新增購物車成功',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    addGCart(data)
    return addGItem(JSON.parse(data))
  } else if (type === 'rent') {
    const addRCart = async (rData) => {
      const newRData = JSON.parse(rData)
      if (newRData.startDate === '' || newRData.endDate === '') {
        return Swal.fire({
          icon: 'error',
          title: '新增購物車失敗',
          text: '請填入日期',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      try {
        const response = await axios.post(
          'http://localhost:3005/api/cart/addrent',
          newRData,
          {
            withCredentials: true, // save cookie in browser
          }
        )
        if (response.data.code !== '200') {
          if (response.data.code === '201') {
            return Swal.fire({
              icon: 'success',
              title: '購物車已有同規格之商品',
              text: '日期已更新',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        } else {
          addRItem(JSON.parse(data))
          return Swal.fire({
            icon: 'success',
            title: '新增購物車成功',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    return addRCart(data)
  } else {
    return Swal.fire({
      icon: 'error',
      title: '頁面錯誤',
    })
  }
}

const AddCartBtn = ({ type }) => {
  const { addItem: addPItem } = useCart()
  const { addItem: addRItem } = useRentCart()
  const { addItem: addGItem } = useGroupCart()
  const router = useRouter()
  const { auth } = useAuth()
  const { getCartData } = useCart()
  const { getCartData: getRentCartData } = useRentCart()
  const { getCartData: getGroupCartData } = useGroupCart()

  const handleAddToCart = () => {
    if (!auth.isAuth) {
      Swal.fire({
        icon: 'error',
        title: '請先登入',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push('/user/login')
      })
      return
    }
    addToCart(type, addPItem, addGItem, addRItem)
  }

  return (
    <>
      <button
        className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold hstack gap-3 justify-content-center"
        onClick={async () => {
          await handleAddToCart()
          // router.reload()
          getCartData()
          getRentCartData()
          getGroupCartData()
        }}
      >
        <i className="fa-solid fa-cart-plus"></i>
        加入購物車
      </button>
    </>
  )
}

const BuyBtn = ({ type }) => {
  const { addItem: addPItem } = useCart()
  const { addItem: addGItem } = useRentCart()
  const { addItem: addRItem } = useGroupCart()
  const router = useRouter()
  const { auth } = useAuth()

  const handleAddToBuy = async () => {
    await addToCart(type, addPItem, addGItem, addRItem)
    localStorage.setItem('BuyBtnType', type)
  }
  const toLink = () => {
    router.push('/cart')
  }

  return (
    <button
      className="btn btn-outline-primary w-50 py-3 rounded-4 fw-semibold"
      onClick={() => {
        if (!auth.isAuth) {
          Swal.fire({
            icon: 'error',
            title: '請先登入',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            router.push('/user/login')
          })
          return
        }
        handleAddToBuy()
        setTimeout(() => {
          toLink()
        }, 2500)
      }}
    >
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
