import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Flex } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'

const ManageLayout: FC = () => {
  const nav = useNavigate()

  // pathname就是路由的path，比如/manage/list
  const { pathname } = useLocation()

  // 选中的button的样式
  const activeButtonStyle = { border: '1px solid #1890ff', boxShadow: '0 0 4px #1890ff' }

  return (
    <div className={styles.container}>
      {/* 左部分：主要用于放一些选项 */}
      <div className={styles.left}>
        <Flex gap="small" vertical>
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            style={pathname.startsWith('/manage/list') ? activeButtonStyle : {}}
            type="default"
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list')
            }}
          >
            我的问卷
          </Button>
          <Button
            style={pathname.startsWith('/manage/star') ? activeButtonStyle : {}}
            type="default"
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star')
            }}
          >
            星标问卷
          </Button>
          <Button
            style={pathname.startsWith('/manage/trash') ? activeButtonStyle : {}}
            type="default"
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/trash')
            }}
          >
            回收站
          </Button>
        </Flex>
      </div>

      {/* 右部分：主要用于放问卷卡片 */}
      <div className={styles.right}>
        <Outlet /> {/* 子路由出口 */}
      </div>
    </div>
  )
}

export default ManageLayout
