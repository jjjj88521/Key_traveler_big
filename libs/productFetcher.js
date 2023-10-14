// 商品相關的 api fetch 函式
import axios from 'axios'

// 取得單一商品
const fetchProduct = async (pid) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/products/${pid}`
    )
    if (response.status !== 200) {
      throw new Error('發生錯誤')
    }
    return response.data
  } catch (error) {
    // 處理其他錯誤
    console.error('發生錯誤:', error)
  }
}

// 取得單一團購商品
const fetchGB = async (pid) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/groupbuy/${pid}`
    )
    if (response.status !== 200) {
      throw new Error('發生錯誤')
    }
    return response.data
  } catch (error) {
    // 處理其他錯誤
    console.error('發生錯誤:', error)
  }
}

// 取得該商品的你可能會喜歡的商品
const fetchMaybeLike = async (pid) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/products/${pid}/maybe-like`
    )
    if (response.status !== 200) {
      throw new Error('發生錯誤')
    }
    // console.log(response)
    return response.data
  } catch (error) {
    // 處理其他錯誤
    console.error('發生錯誤:', error)
  }
}

// 取得單一商品評論資料
const fetchProductComment = async (pid, ...qs) => {
  const [star, page] = qs
  const url = `http://localhost:3005/api/comment/product/${pid}`
  try {
    const response = await axios.get(url, { params: { page, star } })
    if (response.status !== 200) {
      throw new Error('發生錯誤')
    }
    const commentData = response.data // 假設API返回商品信息的數據
    return commentData
  } catch (error) {
    // 處理其他錯誤
    console.error('發生錯誤:', error)
  }
}

// 取得該商品的評論數量資料
const fetchPdCommentCount = async (pid) => {
  const url = `http://localhost:3005/api/comment/product/${pid}/count`
  try {
    const response = await axios.get(url)
    if (response.status !== 200) {
      throw new Error('發生錯誤')
    }
    return response.data
  } catch (error) {
    console.error('發生錯誤:', error)
  }
}

// 取得該商品是否已被收藏
const fetchProductLike = async (cate, pid) => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/product-like/${cate}/${pid}`,
      {
        withCredentials: true, // 跨域獲取cookie
      }
    )
    if (response.status === 200) {
      return response.data.is_favorite
    }
  } catch (error) {
    console.log(error)
  }
}

// 收藏商品
const addProductLike = async (cate, pid) => {
  try {
    const response = await axios.post(
      `http://localhost:3005/api/product-like/${cate}/${pid}`,
      {},
      {
        withCredentials: true,
      }
    )
    if (response.data.code === '200') {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

// 取消收藏商品
const deleteProductLike = async (cate, pid) => {
  try {
    const response = await axios.delete(
      `http://localhost:3005/api/product-like/${cate}/${pid}`,
      {
        withCredentials: true,
      }
    )
    if (response.data.code === '200') {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * @param {number} currentPage
 * @param {string} cate
 * @param {array} orderby
 * @returns {object}
 */
// 用戶獲取所有收藏的商品
const fetchProductLikeList = async (currentPage, cate, orderby) => {
  const queryParams = {
    page: currentPage,
    ...(cate ? { cate } : {}), // 如果 cate 存在，則新增 cate 到物件中
    ...(orderby ? { orderby: orderby.join(',') } : {}), // 如果 orderby 存在，則新增 orderby 到物件中
  }
  try {
    const response = await axios.get(
      `http://localhost:3005/api/product-like/like-list`,
      {
        params: queryParams,
        withCredentials: true, // 跨域獲取cookie
      }
    )
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  fetchProduct,
  fetchGB,
  fetchProductComment,
  fetchProductLike,
  addProductLike,
  deleteProductLike,
  fetchProductLikeList,
  fetchPdCommentCount,
  fetchMaybeLike,
}
