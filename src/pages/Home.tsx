import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const nav = useNavigate()

  function clickHandler() {
    console.log('to login page')
    // 使用第三方库实现
    nav('/login')
  }

  return (
    <div>
      <p>home页面~~~~~~</p>
      <button onClick={clickHandler}>跳转到登陆页面</button>
    </div>
  )
}

export default Home
