import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import UserLayout from '@/components/layout/user-layout'
import PaginationComponent from '@/components/common/PaginationComponent'
import {
  ProductLikeContainer,
  ProductLikeItem,
} from '@/components/user/product-like'
import axios from 'axios'
import LoadingPage from '@/components/common/loadingPage'
import useLoading from '@/hooks/useLoading'
import Swal from 'sweetalert2'
import { deleteProductLike, fetchProductLikeList } from '@/libs/productFetcher'
import { Radio } from 'antd'

export default function ProductLike() {
  const [productLikeList, setProductLikeList] = useState([])
  const [total, setTotal] = useState(0)
  // 存當前頁數
  const [currentPage, setCurrentPage] = useState(1)
  // isLoading hooks 用來判斷是否載入完成，裡面放條件式，當條件式為 true 時，會將 isLoading 狀態改為 false
  const [isLoading, setIsLoading] = useLoading(productLikeList.products)
  const router = useRouter()

  const getProductLikeList = async (currentPage, cate) => {
    try {
      await fetchProductLikeList(
        currentPage,
        cate === 'all' ? null : cate
      ).then((response) => {
        setProductLikeList(response)
        setTotal(response.total)
        return response.products
      })
      // .then((products) => {
      //   if (products.length === 0) {
      //     handlePageChange(currentPage - 1)
      //   }
      // })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProductLikeList(currentPage)
  }, [])

  const handlePageChange = (page) => {
    getProductLikeList(page, pdCate)
    setCurrentPage(page)
    setIsLoading(true)
  }

  const deleteLike = async (pid) => {
    try {
      const response = await deleteProductLike('pd', pid)
      if (response.code === '200') {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          await getProductLikeList(currentPage, pdCate).then(() => {
            if (productLikeList.products.length === 1) {
              handlePageChange(currentPage - 1)
            }
          })
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: '移除收藏失敗',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  const handleDeleteLike = (pid) => {
    Swal.fire({
      title: '確定要移除收藏嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteLike(pid)
      }
    })
  }

  // 切換篩選
  const [pdCate, setPdCate] = useState('all')
  const handlePdCateChange = (e) => {
    setPdCate(e.target.value)
    setIsLoading(true)
    // setCurrentPage(1)
    getProductLikeList(1, e.target.value)
  }

  return (
    <UserLayout title={'收藏商品'}>
      <Radio.Group
        onChange={handlePdCateChange}
        value={pdCate}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="all">全部</Radio.Button>
        <Radio.Button value="pd">一般商品</Radio.Button>
        <Radio.Button value="gb">團購</Radio.Button>
        <Radio.Button value="rt">租用</Radio.Button>
      </Radio.Group>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h5>共 {total} 個收藏商品</h5>
          <ProductLikeContainer>
            {productLikeList.products.map((product, index) => {
              let { id, images, name, price, category_1, category_2, pd_cate } =
                product
              images = JSON.parse(images)
              let imageSrc
              let link
              switch (pd_cate) {
                case '一般':
                  imageSrc = `/images/product/${images[0]}`
                  link = `/product/${category_1}/${category_2}/${id}`
                  break
                case '團購':
                  imageSrc = `/images/groupbuy/${images[0]}`
                  link = `/groupbuy/${id}`
                  break
                case '租用':
                  imageSrc = `/images/rent/${images[0]}`
                  link = `/rent/${id}`
                  break
                default:
                  break
              }
              return (
                <ProductLikeItem
                  key={index}
                  handleDeleteLike={handleDeleteLike}
                  pid={id}
                  image={imageSrc}
                  name={name}
                  link={link}
                  price={price}
                  pd_cate={pd_cate}
                />
              )
            })}
          </ProductLikeContainer>
          <PaginationComponent
            totalItems={total}
            pageSize={5}
            onPageChange={handlePageChange}
            currentPage={Number(productLikeList.page)}
          />
        </>
      )}
    </UserLayout>
  )
}
