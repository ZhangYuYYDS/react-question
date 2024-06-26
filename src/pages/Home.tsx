import React, { FC, useEffect } from 'react'
import { List_PathNAME } from '../router'
import axios from 'axios'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'

const { Title, Paragraph } = Typography

// 主页面
const Home = () => {
  const nav = useNavigate()

  function clickHandler() {
    console.log('to login page')
    // 使用第三方库实现
    nav(List_PathNAME)
  }

  useEffect(() => {
    // 3001是后端给的端口号，和3000不在同一域名下，涉及到跨域问题
    // 这里需要配置代理，才能正常访问
    axios.get('/api/test').then(res => console.log('axios data', res.data))
  })

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 88 份，收到答卷 99 份</Paragraph>
        <div>
          <Button type="primary" size="large" onClick={clickHandler}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
