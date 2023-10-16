import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

const catOptions = [
  {
    id: 1,
    name: '衣服',
  },
  {
    id: 2,
    name: '鞋子',
  },
  {
    id: 3,
    name: '配件',
  },
  {
    id: 4,
    name: '帽子',
  },
  {
    id: 5,
    name: '其它',
  },
]

const tagOptions = [
  {
    id: 1,
    name: '男性',
  },
  {
    id: 2,
    name: '女性',
  },
  {
    id: 3,
    name: '中性',
  },
  {
    id: 4,
    name: '兒童',
  },
]

const colorOptions = [
  {
    id: 1,
    name: '黑',
  },
  {
    id: 2,
    name: '白',
  },
  {
    id: 3,
    name: '紅',
  },
  {
    id: 4,
    name: '綠',
  },
  {
    id: 5,
    name: '黃',
  },
]

const sizeOptions = [
  {
    id: 1,
    name: 'S',
  },
  {
    id: 2,
    name: 'M',
  },
  {
    id: 3,
    name: 'L',
  },
  {
    id: 4,
    name: 'XL',
  },
]

export default function List() {
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

  // json回傳
  // {
  //   total: 100,
  //   perpage: 10,
  //   page: 1,
  //   data:[
  //     {id:123, name:'',...},
  //     {id:123, name:'',...}
  //   ]
  // }
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

  // list-query?page=1&keyword=xxxx&cat_ids=1,2&sizes=1,2&tags=3,4&colors=1,2,3&orderby=id,asc&perpage=10&price_range=1500,10000
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // 從router.query得到所有查詢字串參數
      const {
        page,
        keyword,
        cat_ids,
        sizes,
        tags,
        colors,
        orderby,
        perpage,
        price_range,
      } = router.query

      console.log(router.query)

      // 設定回所有狀態(注意資料類型，所有從查詢字串來都是字串類型)
      setPage(Number(page) || 1)
      setKeyword(keyword || '')
      setCatIds(cat_ids ? cat_ids.split(',').map((v) => Number(v)) : [])
      setSizes(sizes ? sizes.split(',').map((v) => Number(v)) : [])
      setTags(tags ? tags.split(',').map((v) => Number(v)) : [])
      setColors(colors ? colors.split(',').map((v) => Number(v)) : [])
      setOrderby(orderby || 'id,asc')
      setPerpage(Number(perpage) || 10)
      setPriceRange(
        price_range
          ? {
              min: Number(price_range.split(',')[0]),
              max: Number(price_range.split(',')[1]),
            }
          : {
              min: 1500,
              max: 10000,
            }
      )

      // 載入指示動畫
      setLoading(true)
      // 載入資料
      getProductsQs(router.query)
    }

    // 下面省略eslint多餘檢查
    // eslint-disable-next-line
  }, [router.query])

  // 載入指示動畫用: 於0.8s後，自動關閉載入指示動畫
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 800)
    }
  }, [loading])

  // 分頁呈現
  const pagination = (itemTotal, page, perpage) => {
    // 計算總頁數
    let pageTotal = itemTotal ? Math.ceil(itemTotal / perpage) : 0

    // 計算起啟頁(因為每10頁呈現一次…為了防止頁數過多時的排版)
    let startPage =
      page % 10
        ? Math.floor(page / 10) * 10 + 1
        : Math.floor((page - 1) / 10) * 10 + 1

    // 沒頁數時的呈現
    if (!pageTotal) return <></>

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link
              className="page-link"
              href={{
                pathname: router.pathname,

                query: {
                  ...router.query,
                  page: page - 1 ? page - 1 : 1,
                },
              }}
              aria-label="Previous"
              // onClick={() => {
              //   setPage(page - 1 ? page - 1 : 1)
              // }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">前</span>
            </Link>
          </li>
          {Array(10)
            .fill(1)
            .map((v, i) => {
              const pageIndex = startPage + i
              return (
                <li
                  key={i + 1}
                  className={`page-item ${pageIndex === page ? 'active' : ''}`}
                >
                  <Link
                    className={`page-link ${
                      pageIndex > pageTotal ? 'disabled' : ''
                    }`}
                    href={{
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        page: pageIndex,
                      },
                    }}
                    // onClick={() => {
                    //   if (pageIndex > pageTotal) return

                    //   setPage(pageIndex)
                    // }}
                  >
                    {pageIndex}
                  </Link>
                </li>
              )
            })}
          <li className="page-item">
            <Link
              className="page-link"
              href={{
                pathname: router.pathname,

                query: {
                  ...router.query,
                  page: page + 1,
                },
              }}
              aria-label="Next"
              // onClick={() => {
              //   if (page + 1 > pageTotal) return

              //   setPage(page + 1)
              // }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">後</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  // 載入指示動畫
  const loader = (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )

  // 呈現資料+分頁操作區域
  const displayList = (
    <>
      <ul>
        {items.map((v) => {
          return (
            <li key={v.id}>
              {v.name}(cat_id:{v.cat_id})(price: {v.price})(tag: {v.tag}
              )(color: {v.color})(size: {v.size})
            </li>
          )
        })}
      </ul>
      <div>{pagination(itemTotal, page, perpage)}</div>
    </>
  )

  return (
    <>
      <h1>商品測試頁</h1>
      <div>
        <label>
          每頁多少項目:
          <select
            value={perpage}
            onChange={(e) => {
              setPerpage(Number(e.target.value))
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          關鍵字:
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
          />
        </label>
      </div>
      <div>
        商品分類(1個):
        {catOptions.map((v) => {
          return (
            <label key={v.id} className="mx-1">
              <input
                type="checkbox"
                value={v.id}
                checked={catIds.includes(v.id)}
                onChange={(e) => {
                  // 注意，要轉數字，為了保持數字陣列
                  const targetValue = Number(e.target.value)
                  if (catIds.includes(targetValue)) {
                    setCatIds(catIds.filter((v2) => v2 !== targetValue))
                  } else {
                    setCatIds([...catIds, targetValue])
                  }
                }}
              />
              {v.name}({v.id})
            </label>
          )
        })}
      </div>
      <div>
        標籤(1至多個):
        {tagOptions.map((v) => {
          return (
            <label key={v.id} className="mx-1">
              <input
                type="checkbox"
                value={v.id}
                checked={tags.includes(v.id)}
                onChange={(e) => {
                  // 注意，要轉數字，為了保持數字陣列
                  const targetValue = Number(e.target.value)
                  if (tags.includes(targetValue)) {
                    setTags(tags.filter((v2) => v2 !== targetValue))
                  } else {
                    setTags([...tags, targetValue])
                  }
                }}
              />
              {v.name}({v.id})
            </label>
          )
        })}
      </div>
      <div>
        顏色(1至多個):
        {colorOptions.map((v) => {
          return (
            <label key={v.id} className="mx-1">
              <input
                type="checkbox"
                value={v.id}
                checked={colors.includes(v.id)}
                onChange={(e) => {
                  // 注意，要轉數字，為了保持數字陣列
                  const targetValue = Number(e.target.value)
                  if (colors.includes(targetValue)) {
                    setColors(colors.filter((v2) => v2 !== targetValue))
                  } else {
                    setColors([...colors, targetValue])
                  }
                }}
              />
              {v.name}({v.id})
            </label>
          )
        })}
      </div>
      <div>
        尺寸(1至多個):
        {sizeOptions.map((v) => {
          return (
            <label key={v.id} className="mx-1">
              <input
                type="checkbox"
                value={v.id}
                checked={sizes.includes(v.id)}
                onChange={(e) => {
                  // 注意，要轉數字，為了保持數字陣列
                  const targetValue = Number(e.target.value)

                  if (sizes.includes(targetValue)) {
                    setSizes(sizes.filter((v2) => v2 !== targetValue))
                  } else {
                    setSizes([...sizes, targetValue])
                  }
                }}
              />
              {v.name}({v.id})
            </label>
          )
        })}
      </div>
      <div>
        排序:
        <select
          value={orderby}
          onChange={(e) => {
            setOrderby(e.target.value)
          }}
        >
          <option value="id,asc">預設排序(id由小至大)</option>
          <option value="id,desc">ID排序(id由大至小)</option>
          <option value="price,asc">價格排序(price由低至高)</option>
          <option value="price,desc">價格排序(price由高至低)</option>
        </select>
      </div>
      <div>
        價格(1500~10000)
        <label>
          從:{' '}
          <input
            type="number"
            placeholder="1500"
            value={priceRange.min ? priceRange.min : ''}
            onChange={(e) => {
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }}
          />
        </label>
        <label>
          到:{' '}
          <input
            type="number"
            placeholder="10000"
            value={priceRange.max ? priceRange.max : ''}
            onChange={(e) => {
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }}
          />
        </label>
      </div>
      <div>
        <button
          onClick={() => {
            setLoading(true)
            //getProductsQs(true)

            const params = {
              page: 1, // 跳至第一頁
              keyword,
              cat_ids: catIds.join(','),
              tags: tags.join(','),
              colors: colors.join(','),
              sizes: sizes.join(','),
              orderby,
              perpage,
              price_range: Object.values(priceRange).join(','),
            }

            router.push({
              pathname: router.pathname,
              query: params,
            })

            // 以下的語法是要產生對應路由(next用的)，目前用不上
            // const searchParams = new URLSearchParams(params)
            // const url = `${router.pathname}?${searchParams.toString()}`
          }}
        >
          從伺服器載入資料
        </button>
      </div>
      <div>
        項目數量(itemTotal):{itemTotal}/ 目前頁碼(page):{page}{' '}
        /每頁多少項目(perpage):
        {perpage} / 總頁數(pageTotal):
        {Math.ceil(itemTotal / perpage)}
      </div>
      <hr />
      {loading ? loader : displayList}
    </>
  )
}
