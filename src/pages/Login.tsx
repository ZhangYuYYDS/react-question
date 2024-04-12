import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()

  function clickHandle() {
    console.log('back home page')
    nav('/')
  }

  return (
    <div>
      <p>Login页面~~~~</p>
      <button onClick={clickHandle}>返回home页面</button>
      <Link to="/register">注册</Link>
    </div>
  )
}

export default Login
