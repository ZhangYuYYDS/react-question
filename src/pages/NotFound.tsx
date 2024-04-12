import React, { FC } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { List_PathNAME } from '../router'

const NotFound: FC = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(List_PathNAME)
          }}
        >
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
