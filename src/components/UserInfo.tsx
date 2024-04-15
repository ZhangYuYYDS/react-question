import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Login_PathNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  // const { data } = useRequest(getUserInfoService) // ajax
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user 数据
    removeToken() // 清除 token 的存储
    message.success('退出成功')
    nav(Login_PathNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={Login_PathNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
