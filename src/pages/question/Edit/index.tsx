import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

// 获取动态参数
const edit: FC = () => {
  // 获取动态路由中的动态参数
  const { id = '' } = useParams()
  return <div>edit页面~~~~~~{id}</div>
}

export default edit
