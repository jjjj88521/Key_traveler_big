import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!error.response) {
      console.log('網路錯誤')
    }
    return Promise.reject(error)
  }
)

export default instance
