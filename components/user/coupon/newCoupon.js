import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import ListCardForCoupon from '../List-Card'
import { addCoupon } from '@/redux/actions/coupon'

export default function NewCoupon({ changePage }) {
  // const { auth, coupon, addCoupon } = useAuth()
  // redux
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { coupon } = useSelector((state) => state.coupon)
  const [testc, setTestC] = useState([{}])
  console.log(coupon)
  const getCode = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/api/coupon/getcouponcode',
        {
          withCredentials: true,
        }
      )
      console.log('優惠券data')
      console.log(response.data.coupon)
      const testData = response.data.coupon
      if (response.data.message === 'authorized') {
        // setCoupon(response.data.rows)
        // setCoupon(response.data.coupon)

        const test2 = testData.filter(
          (item1) => !coupon.some((item2) => item1.couponId === item2.couponId)
        )
        console.log(test2)
        await setTestC(test2)
        console.log('here')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCode()
  }, [])
  useEffect(() => {
    if (auth.isAuth) {
      getCode()
    }
  }, [auth])
  const getbtn = (code) => {
    console.log(`${code}`)
  }
  const handleAddCoupon = async () => {
    // console.log(typeof testc)
    // console.log(testc)
    Swal.fire({
      title: '請選擇優惠碼',
      html: `
    ${testc
      .map(
        (item, index) =>
          `<div class="d-flex align-items-center justify-content-evenly mt-2">
              <div style="width: 150px">${item.coupon_code}</div>
              <div><button class="btn btn-primary btn-get-coupon" data-index="${
                index + 1
              }" data-code="${item.coupon_code}">領取</button></div>
            </div>`
      )
      .join('')}
  `,
      showLoaderOnConfirm: true,
      showConfirmButton: false,
    })
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn.btn-primary.btn-get-coupon')) {
        const index = e.target.getAttribute('data-index')
        const code = e.target.getAttribute('data-code')
        // addCoupon(code, auth.user.id)
        dispatch(addCoupon(code))
        getbtn(code)
      }
    })
    // Swal.fire({
    //   title: '請輸入優惠碼',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off',
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: '新增',
    //   cancelButtonText: '取消',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (inputCode) => {
    //     return addCoupon(inputCode, auth.user.id)
    //   },
    //   allowOutsideClick: false,
    // })
  }
  const showData = () => {
    Swal.fire({
      title: '請輸入優惠碼',
      html: `
    ${testc.map((item) => `<div>${item.coupon_code}</div>`).join('')}
    <input id="couponInput" class="swal2-input" autocapitalize="off">
  `,
      showCancelButton: true,
      confirmButtonText: '新增',
      cancelButtonText: '取消',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const inputCode = document.getElementById('couponInput').value
        // return addCoupon(inputCode, auth.user.id)
      },
      allowOutsideClick: false,
    })
  }
  // useEffect(() => {
  //   showData()
  // }, [testc])

  return (
    <>
      <button
        className="btn btn-link text-decoration-none text-primary"
        type="button"
        onClick={async (e) => {
          e.preventDefault()
          await handleAddCoupon()
          // showData()
        }}
        style={{ cursor: 'pointer' }}
      >
        新增優惠券
      </button>
    </>
  )
}
