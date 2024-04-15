/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'
import { error } from 'console'

const instance = axios.create({
  timeout: 5000,
})

// request拦截：每次请求都带上token
instance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// response拦截器
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, msg, data = {} } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
