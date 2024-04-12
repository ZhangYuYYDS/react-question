import React, { FC } from 'react'
import styles from './UserInfo.module.scss'
import { Link } from 'react-router-dom'
import { Login_PathNAME } from '../router'

const UserInfo: FC = () => {
  // 对于已经登陆的用户显示什么还没做处理
  return (
    <>
      <Link to={Login_PathNAME}>登录</Link>
    </>
  )
}

export default UserInfo
