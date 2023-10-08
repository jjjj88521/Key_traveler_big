import React from 'react'
import UserLayout from '@/components/layout/user-layout'
import PaginationComponent from '@/components/common/PaginationComponent'
import {
  ProductLikeContainer,
  ProductLikeItem,
} from '@/components/user/product-like'
export default function ProductLike() {
  return (
    <UserLayout title={'收藏商品'}>
      <ProductLikeContainer>
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
        <ProductLikeItem
          image={'/images/product/1681119535294098423.jpg'}
          name={
            'Meletrix Zoom75 x KITSUNE 聯名款 無線三模 熱插拔機械式鍵盤套件'
          }
          price={8590}
        />
      </ProductLikeContainer>
      <PaginationComponent
        totalItems={10}
        pageSize={5}
        onPageChange={() => {}}
      />
    </UserLayout>
  )
}
