import { useState, useEffect } from 'react'

// 异步获取信息
function getInfo(): Promise<string> {
  return new Promise(resolve => {
    // 模拟异步请求
    setTimeout(() => {
      resolve(Date.now().toString())
    }, 1500)
  })
}

const useGetInfo = () => {
  const [info, setInfo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getInfo().then(data => {
      setLoading(false)
      setInfo(data)
    })
  }, [])

  return { info, loading }
}

export default useGetInfo
