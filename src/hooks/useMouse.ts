import { useState, useEffect, useCallback } from 'react'

// 鼠标位置
function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mouseMoveHandler = useCallback((e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }, [])

  useEffect(() => {
    // 监听鼠标事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 组件销毁时，一定要解绑DOM事件，因为可能会出现组件内存泄露问题
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])
  return { x, y }
}

export default useMouse
