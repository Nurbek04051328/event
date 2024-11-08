import router from '@/router'
import axios from 'axios'
import cookies from 'vue-cookies'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = cookies.get('dashboard-token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.code.status == 401) {
      router.push({ name: 'signIn' })
    }
    return Promise.reject(error)
  }
)

export default apiClient
