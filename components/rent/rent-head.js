import React, { useEffect, useRef, useState } from 'react'
import GallerySwiper from '@/components/common/gallery-swiper'
import {
  Item,
  StyleSelect,
} from '@/components/common/style-select/style-select'
import useStyleSelect from '@/hooks/useStyleSelect'
import PdNumInput from '@/components/product/product-head/pd-number-input'
import {
  PdInfoBox,
  PdName,
  PdBrand,
  PdPrice,
} from '@/components/product/product-head/pd-info-box'
import {
  AddCartBtn,
  BuyBtn,
  LikeBtn,
  OutOfStockBtn,
} from '@/components/product/product-head/pd-btns'

import dayjs from 'dayjs'
import { DatePicker, Select } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useProductData } from '@/context/useProduct'
import useMobile from '@/hooks/useMobile'
import { addProductLike, deleteProductLike } from '@/libs/productFetcher'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function RentHead() {
  const router = useRouter()
  const [isMobile] = useMobile()
  const { productData, isLiked, setIsLiked } = useProductData()
  const { id, name, brand, price, stock } = productData
  const images = productData.images ? JSON.parse(productData.images) : []
  const style_select = productData.style_select
    ? JSON.parse(productData.style_select)
    : {}
  // 使用樣式選擇 hook
  const initStyleSelect = style_select
    ? Object.keys(style_select).map((key) => ({
        key,
        value: style_select[key][0], // 預設為第一個
      }))
    : []
  const [selectedStyles, handleStyleSelect] = useStyleSelect(initStyleSelect)

  useEffect(() => {
    console.log(selectedStyles)
  }, [selectedStyles])

  // 選擇日期不能選擇今天以前的日期
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day')
  }

  // 點選日期框時，視窗滾動
  const rangePickerRef = useRef(null)
  const handleDateFocus = () => {
    if (rangePickerRef.current) {
      window.scrollTo({
        top:
          rangePickerRef.current.getBoundingClientRect().top +
          window.scrollY -
          110,
        behavior: 'smooth',
      })
    }
  }
  const [cartRItem, setCartRItem] = useState({
    id: id,
    check: false,
    img: '/images/' + images[0],
    brand: brand,
    name: name,
    price: price,
    startDate: '',
    endDate: '',
    quantity: 1,
    spec: style_select,
    specData: selectedStyles.reduce((obj, item) => {
      obj[item.key] = item.value
      return obj
    }, {}),
  })

  useEffect(() => {
    localStorage.setItem('cartRItem', JSON.stringify(cartRItem))
  }, [])
  useEffect(() => {
    const resultObject = selectedStyles.reduce((obj, item) => {
      obj[item.key] = item.value
      return obj
    }, {})
    setCartRItem({ ...cartRItem, specData: resultObject })
    const newStyleSelect = { ...cartRItem, specData: resultObject }
    localStorage.setItem('cartRItem', JSON.stringify(newStyleSelect))
  }, [selectedStyles])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const setDate = (value, datestring) => {
    setStartDate(datestring[0])
    setEndDate(datestring[1])
  }
  useEffect(() => {
    setCartRItem((cartRItem) => ({
      ...cartRItem,
      startDate: startDate,
    }))
  }, [startDate])

  useEffect(() => {
    setCartRItem((cartRItem) => ({
      ...cartRItem,
      endDate: endDate,
    }))
  }, [endDate])
  useEffect(() => {
    localStorage.setItem('cartRItem', JSON.stringify(cartRItem))
  }, [cartRItem])

  // 收藏商品
  const handleToggleLike = async () => {
    try {
      const response = isLiked
        ? await deleteProductLike('gb', productData.id)
        : await addProductLike('gb', productData.id)

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
    <section className="">
      <div className="container">
        <div className="row px-sm-5 px-0 py-sm-5 py-3">
          {/* 左邊圖片 */}
          <div className="col-sm-7 col-12 left-info px-sm-5">
            <div className="position-sticky" style={{ top: '100px' }}>
              <GallerySwiper images={images} path="/images/product/" />
            </div>
          </div>
          {/* 右側商品文字內容 */}
          <div className="col-sm-5 col-12 right-info vstack gap-5">
            {/* 商品名稱、品牌、價格、評論數量 */}
            <PdInfoBox>
              <PdBrand brand={brand} />
              <PdName name={name} />
              <PdPrice price={`${price} / 日`} />
            </PdInfoBox>
            {/* 產品樣式選擇 */}
            {style_select &&
              Object.keys(style_select).map((key, index) =>
                isMobile ? (
                  <div
                    key={key}
                    className="d-flex align-items-center flex-column"
                  >
                    <h5 className="text-secondary">{key}</h5>
                    <Select
                      className="w-100"
                      defaultValue={selectedStyles[index].value}
                      options={style_select[key].map((item, index) => ({
                        key: index,
                        label: item,
                        value: item,
                      }))}
                      onSelect={(value) => handleStyleSelect(key, value)}
                      size={'large'}
                    />
                  </div>
                ) : (
                  <StyleSelect
                    key={key}
                    title={key}
                    onSelect={handleStyleSelect}
                    selectedValue={selectedStyles[index].value}
                  >
                    {style_select[key].map((value, index) => (
                      <Item key={index}>{value}</Item>
                    ))}
                  </StyleSelect>
                )
              )}
            {/* 數量選擇，輸入框，有加減數量按鈕 */}
            {/* <PdNumInput /> */}
            {stock !== 0 && (
              <div
                className="d-flex justify-content-center flex-column gap-3"
                ref={rangePickerRef}
              >
                <h5 className="text-secondary d-flex justify-content-center d-sm-block">
                  選擇日期
                </h5>
                <DatePicker.RangePicker
                  disabledDate={disabledDate}
                  size="large"
                  placeholder={['開始日期', '結束日期']}
                  separator={<CaretRightOutlined className="text-secondary" />}
                  onFocus={handleDateFocus}
                  placement="bottomleft"
                  className="w-100"
                  onChange={(date, dateString) => {
                    setDate(date, dateString)
                  }}
                />
              </div>
            )}

            {/* 加入購物車按鈕、直接購買按鈕，各一半 */}
            <div className="hstack gap-3">
              {stock !== 0 ? (
                <>
                  <AddCartBtn type={'rent'} />
                  <BuyBtn type={'rent'} />
                </>
              ) : (
                <OutOfStockBtn />
              )}
            </div>
            {/* 喜歡按鈕 */}
            <div className="d-flex justify-content-center">
              <LikeBtn isLiked={isLiked} onToggleLike={handleToggleLike} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
