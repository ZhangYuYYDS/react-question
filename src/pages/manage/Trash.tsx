import React, { FC, useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
import type { TableProps } from 'antd'
import { Typography, Empty, Space, Table, Tag, Button, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import styles from './Common.module.scss'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'

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

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  // 记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([])
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionsService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      refresh()
      setSelectedIds([])
    },
  })

  const del = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后无法找回',
      okText: '确认',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }

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

  const tableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" size="small" disabled={selectedIds.length === 0 ? true : false} onClick={recover}>
            恢复
          </Button>
          <Button danger size="small" disabled={selectedIds.length === 0 ? true : false} onClick={del}>
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
            setSelectedIds(selectedRowIds as string[])
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
      <div className={styles['footer']}>
        <ListPage total={total} />
      </div>
    </>
  )
}
export default Trash
