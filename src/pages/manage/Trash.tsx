import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import type { TableProps } from 'antd'
import { Typography, Empty, Space, Table, Tag, Button, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import styles from './Common.module.scss'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography
const { confirm } = Modal

interface DataType {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Trash: FC = () => {
  useTitle('问卷星-回收站')

  const { loading, data = {} } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 记录选中的id
  const [selectedRowIds, setSelectedRowKeys] = useState<React.Key[]>([])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="geekblue">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '是否收藏',
      dataIndex: 'isStar',
      render: (isStar: boolean) => {
        return isStar ? <Tag color="green">已收藏</Tag> : <Tag>未收藏</Tag>
      },
    },
    {
      title: '回答数',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const del = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后无法找回',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('delete~~~')
      },
      onCancel: () => {
        console.log('cancel~~~~~')
      },
    })
  }

  const tableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" size="small" disabled={selectedRowIds.length === 0 ? true : false}>
            恢复
          </Button>
          <Button danger size="small" onClick={del} disabled={selectedRowIds.length === 0 ? true : false}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          // selectedRowKeys选中的id，selectedRows选中的行信息
          onChange: (selectedRowIds: React.Key[], selectedRows: DataType[]) => {
            setSelectedRowKeys(selectedRowIds)
          },
        }}
      />
    </>
  )

  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      {/* main：questionCard部分 */}
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无问卷" />}
        {!loading && list.length > 0 && tableElement}
      </div>

      {/* footer */}
      <div className={styles['footer']}>分页</div>

      {/* <div>
        <button onClick={add}>新增问卷</button>
      </div> */}
    </>
  )
}
export default Trash
