/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  //   baseURL: 'https://api.github.com',
  timeout: 5000,
  //   headers: {
  //     'X-Custom-Header': 'foobar',
  //   },
})

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
