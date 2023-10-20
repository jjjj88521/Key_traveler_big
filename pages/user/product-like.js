import React, { useEffect, useState } from 'react'
import UserLayout from '@/components/layout/user-layout'
import PaginationComponent from '@/components/common/PaginationComponent'
import {
  ProductLikeContainer,
  ProductLikeItem,
} from '@/components/user/product-like'
import LoadingPage from '@/components/common/loadingPage'
import useLoading from '@/hooks/useLoading'
import Swal from 'sweetalert2'
import { deleteProductLike, fetchProductLikeList } from '@/libs/productFetcher'
import { Dropdown, Radio, Space, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import useMobile from '@/hooks/useMobile'

export default function ProductLike() {
  const [isMobile] = useMobile()
  const [productLikeList, setProductLikeList] = useState({
    cate: null,
    page: 1,
    total: 0,
    orderBy: 'idAsc',
    products: [],
  })

  const [total, setTotal] = useState(0)
  // 篩選條件
  const [filterState, setFilterState] = useState({
    currentPage: 1,
    pdCate: 'all',
    orderBy: 'id,asc',
  })
  // isLoading hooks 用來判斷是否載入完成，裡面放條件式，當條件式為 true 時，會將 isLoading 狀態改為 false
  const [isLoading, setIsLoading] = useLoading(productLikeList.products)

  const getProductLikeList = async (currentPage, pdCate, orderBy) => {
    try {
      await fetchProductLikeList(
        currentPage,
        pdCate === 'all' ? null : pdCate,
        orderBy
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
    getProductLikeList(1)
  }, [])

  const handlePageChange = (page) => {
    setFilterState({ ...filterState, currentPage: page })
    getProductLikeList(page, filterState.pdCate, filterState.orderBy)
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
          await getProductLikeList(
            filterState.currentPage,
            filterState.pdCate,
            filterState.orderBy
          ).then(() => {
            if (productLikeList.products.length === 1) {
              handlePageChange(filterState.currentPage - 1)
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
  const handlePdCateChange = (e) => {
    const newPdCate = e.target.value
    setFilterState({ pdCate: newPdCate, currentPage: 1, orderBy: 'id,asc' })
    setIsLoading(true)
    getProductLikeList(1, newPdCate, 'id,asc')
  }

  // 排序選單
  const dropdownnItems = [
    {
      key: 1,
      label: '預設排序',
    },
    {
      key: 2,
      label: '價錢由高至低',
    },
    {
      key: 3,
      label: '價錢由低至高',
    },
  ]
  const handleChangeOrderby = ({ key }) => {
    // console.log(typeof key)
    let newOrderBy = 'id,asc'
    if (key === '1') {
      newOrderBy = 'id,asc'
    } else if (key === '2') {
      newOrderBy = 'price,desc'
    } else if (key === '3') {
      newOrderBy = 'price,asc'
    }
    setFilterState({ ...filterState, orderBy: newOrderBy })
    setIsLoading(true)
    getProductLikeList(1, filterState.pdCate, newOrderBy)
  }

  return (
    <UserLayout title={'收藏商品'}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Radio.Group
          onChange={handlePdCateChange}
          value={filterState.pdCate}
          size={`${isMobile ? 'small' : 'default'}`}
        >
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="pd">一般商品</Radio.Button>
          <Radio.Button value="gb">團購</Radio.Button>
          <Radio.Button value="rt">租用</Radio.Button>
        </Radio.Group>
        <Dropdown
          menu={{
            items: dropdownnItems,
            onClick: handleChangeOrderby,
          }}
          trigger={['click']}
        >
          <Typography.Link>
            <Space className="fs-6 text-dark fw-bold">
              {filterState.orderBy === 'id,asc' && <span>預設排序</span>}
              {filterState.orderBy === 'price,desc' && (
                <span>價錢由高至低</span>
              )}
              {filterState.orderBy === 'price,asc' && <span>價錢由低至高</span>}
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>
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
              let link
              switch (pd_cate) {
                case '一般':
                  link = `/product/${category_1}/${category_2}/${id}`
                  break
                case '團購':
                  link = `/groupbuy/${id}`
                  break
                case '租用':
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
                  image={`/images/product/${images[0]}`}
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
