import React, { FC } from 'react'
import { Spin } from 'antd'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const stat: FC = () => {
  const { loading } = useLoadQuestionData()

  // 如果还在loading的话就渲染spin
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <p>Edit page</p>
    </div>
  )
}

export default stat
