import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { List_PathNAME, Home_PathNAME } from '../router/index'

const { Title } = Typography

const Login: FC = () => {
  const { username } = useGetUserInfo()
  const [pathname, setPathname] = useState(Home_PathNAME)

  useEffect(() => {
    if (username) {
      setPathname(List_PathNAME)
    }
  }, [username])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷星</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Login
