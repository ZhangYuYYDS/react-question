import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <div>mainLayout header</div>

      <div>
        <Outlet /> {/* 子路由出口 */}
      </div>

      <div>mainLayout footer</div>
    </>
  )
}

export default MainLayout
