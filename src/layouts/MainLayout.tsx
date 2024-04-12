import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import styles from './MainLayout.module.scss'
import Login from '../components/Login'
import UserInfo from '../components/UserInfo'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Login />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet /> {/* 子路由出口 */}
      </Content>
      <Footer className={styles.footer}>问卷星 &copy; 2024 - present. Create by Yu</Footer>
    </Layout>
  )
}

export default MainLayout
