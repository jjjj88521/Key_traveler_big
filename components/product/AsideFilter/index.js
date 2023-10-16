import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AsideFilter() {
  // 各選項的state
  const [keyword, setKeyword] = useState('')
  const [catIds, setCatIds] = useState([]) // 數字陣列
  const [tags, setTags] = useState([]) // 數字陣列
  const [colors, setColors] = useState([]) // 數字陣列
  const [sizes, setSizes] = useState([]) // 數字陣列
  const [priceRange, setPriceRange] = useState({ min: 1500, max: 10000 }) //數字物件

  // 排序(前面為排序欄位，後面參數asc為從小到大，desc為從大到小排序)
  const [orderby, setOrderby] = useState('id,asc')

  // 分頁用
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(10)

  // 最後得到的項目
  const [itemTotal, setItemTotal] = useState(0)
  const [items, setItems] = useState([])

  // 載入指示動畫用
  const [loading, setLoading] = useState(false)

  const getProductsQs = async (params, toFirstPage = false) => {
    // 跳至第一頁
    // 當重新過濾或重置選項，因重新載入資料需要跳至第一頁
    if (toFirstPage) {
      setPage(1)
    }

    // 要送至伺服器的query string參數
    // const params = {
    //   page: toFirstPage ? 1 : page, // 跳至第一頁
    //   keyword,
    //   cat_ids: catIds.join(','),
    //   tags,
    //   colors,
    //   sizes,
    //   orderby,
    //   perpage,
    //   price_range: Object.values(priceRange).join(','),
    // }

    // 用URLSearchParams產生查詢字串
    const searchParams = new URLSearchParams(params)
    const url = `http://localhost:3005/api/products/qs?${searchParams.toString()}`

    const res = await axios.get(url)

    if (Array.isArray(res.data.data)) {
      // 設定獲取頁數總合
      setItemTotal(res.data.total)
      // 設定獲取項目
      setItems(res.data.data)
    }
  }

  return (
    <>
      <div className="p-4 pt-0">
        <div className="mb-2 fs-5">
          <i className="fa-solid fa-filter"></i> 條件篩選
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            有貨
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            品牌
          </div>
          <hr className="opacity-75"></hr>
          <div className="mb-2 fs-5">
            <i className="fa-solid fa-dollar-sign"></i> 價錢篩選
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <input type="number" className="col-5" min="0"></input>
            <div className="col-2 fs-4 d-flex justify-content-center">~</div>
            <input type="number" className="col-5" min="0"></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '60%', margin: 'auto' }}
          >
            套用
          </button>
        </div>
      </div>
    </>
  )
}
