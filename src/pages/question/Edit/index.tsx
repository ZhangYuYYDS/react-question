import React, { FC, useEffect, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

// 获取动态参数
const edit: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default edit
