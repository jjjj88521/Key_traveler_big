import { useState } from 'react'
// import { Modal } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'

// 商品範例
import data from '@/data/product/fake-products.json'

import { useSecondCart } from '@/hooks/useSecondCart'
import { useThirdCart } from '@/hooks/useThirdCart'
export default function ProductList() {
  // 跳轉使用
  const router = useRouter()
  // 對話盒使用
  const [show, setShow] = useState(false)
  // 對話盒中的商品名稱
  const [productName, setProductName] = useState('')

  const { addItem, removeItem, minusOne, plusOne } = useCart()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = (name) => {
    setProductName('產品：' + name + '已成功加入購物車')
    handleShow()
  }

  // const messageModal = (
  //   <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
  //     <Modal.Header closeButton>
  //       <Modal.Title>加入購物車訊息</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>{productName} </Modal.Body>
  //     <Modal.Footer>
  //       <button variant="secondary" onClick={handleClose}>
  //         繼續購物
  //       </button>
  //       <button
  //         variant="primary"
  //         onClick={() => {
  //           // 導向購物車頁面
  //           router.push('/cart-test')
  //         }}
  //       >
  //         前往購物車結帳
  //       </button>
  //     </Modal.Footer>
  //   </Modal>
  // )

  const display = (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {data.products.map((v, i) => {
        return (
          <div className="col" key={i}>
            <div className="card">
              <Image
                src={v.img}
                width={100}
                height={100}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p>{v.brand}</p>
                <h5 className="card-title">{v.name}</h5>
                <p className="card-text">
                  這裡只是放一些商品的描述說明。這裡只是放一些商品的描述說明。
                </p>
                <p className="card-text text-danger">NTD {v.price}元</p>
              </div>
              <div className="card-footer">
                {Object.keys(v.spec).map((key) => (
                  <select
                    key={key}
                    className="form-select form-select-sm mb-1"
                    style={{ width: 140 }}
                  >
                    {v.spec[key].map((option, optionIndex) => (
                      <option key={optionIndex}>{option}</option>
                    ))}
                  </select>
                ))}
                <span className="input-group-text p-0">
                  <button className="btn" type="button" onClick={() => {}}>
                    -
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control text-center"
                  value={v.quantity}
                />
                <span className="input-group-text p-0">
                  <button className="btn" type="button" onClick={() => {}}>
                    +
                  </button>
                </span>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    // 商品原本無數量屬性(quantity)，要先加上
                    const item = { ...v, quantity: 1 }
                    console.log(item)
                    // 注意: 重覆加入會自動+1產品數量
                    addItem(item)
                    // 呈現跳出對話盒
                    showModal(v.name)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <>
      <h1>商品列表頁範例</h1>
      <p>
        <Link href="/cart">購物車範例</Link>
      </p>
      {/* {messageModal} */}
      {display}
    </>
  )
}
