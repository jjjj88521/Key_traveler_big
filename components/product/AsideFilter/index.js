import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function AsideFilter({ setFilterProduct }) {
  // 各選項的state
  const [keyword, setKeyword] = useState('')
  const [catIds, setCatIds] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 10, max: 30000 }) //數字物件

  // 排序(前面為排序欄位，後面參數asc為從小到大，desc為從大到小排序)
  const [orderby, setOrderby] = useState('id,asc')

  // 分頁用
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(10)

  // 最後得到的項目
  const [itemTotal, setItemTotal] = useState(0)
  const [items, setItems] = useState([])

  const getProductsQs = async (params, toFirstPage = false) => {
    // 跳至第一頁
    // 當重新過濾或重置選項，因重新載入資料需要跳至第一頁
    if (toFirstPage) {
      setPage(1)
    }

    // 用URLSearchParams產生查詢字串
    const searchParams = new URLSearchParams(params)
    const url = `http://localhost:3005/api/products/qs?${searchParams.toString()}`
    const res = await axios.get(url)

    if (Array.isArray(res.data.data)) {
      // 設定獲取頁數總合
      setItemTotal(res.data.total)
      // 設定獲取項目
      setItems(res.data)
      //   console.log('res.data這是啥', res.data)
      setFilterProduct(items)
    }
  }
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const { page, keyword, cat_ids, orderby, perpage, price_range } =
        router.query

      //   console.log(router.query)

      // 設定回所有狀態(注意資料類型，所有從查詢字串來都是字串類型)
      setPage(Number(page) || 1)
      setKeyword(keyword || '')
      setCatIds(cat_ids ? cat_ids.split(',').map((v) => Number(v)) : [])
      setOrderby(orderby || 'id,asc')
      setPerpage(Number(perpage) || 10)
      setPriceRange(
        price_range
          ? {
              min: Number(price_range.split(',')[0]),
              max: Number(price_range.split(',')[1]),
            }
          : {
              min: 10,
              max: 30000,
            }
      )

      // 載入指示動畫
      //   setLoading(true)
      // 載入資料
      getProductsQs(router.query)
    }

    // 下面省略eslint多餘檢查
    // eslint-disable-next-line
  }, [router.query])

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
            <i className="fa-solid fa-dollar-sign"></i> 價錢範圍
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <input
              type="number"
              className="col-5"
              min="0"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange({ ...priceRange, min: Number(e.target.value) })
              }}
            ></input>
            <div className="col-2 fs-4 d-flex justify-content-center">~</div>
            <input
              type="number"
              className="col-5"
              min="0"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange({ ...priceRange, max: Number(e.target.value) })
              }}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '60%', margin: 'auto' }}
            onClick={() => {
              const params = {
                page: 1, // 跳至第一頁
                keyword,
                cat_ids: catIds.join(','),
                orderby,
                perpage,
                price_range: Object.values(priceRange).join(','),
              }

              router.push({
                pathname: router.pathname,
                query: params,
              })
              getProductsQs(params)
              console.log(priceRange)
            }}
          >
            套用
          </button>
        </div>
      </div>
    </>
  )
}
