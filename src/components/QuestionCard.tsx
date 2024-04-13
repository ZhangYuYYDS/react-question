import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames'
import styles from './QuestionCard.module.scss'
import type { PopconfirmProps } from 'antd'
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd'
import {
  EditOutlined,
  StarOutlined,
  DeleteOutlined,
  LineChartOutlined,
  CopyOutlined,
  StarFilled,
} from '@ant-design/icons'

// ts 自定义类型
type PropTypes = {
  id: string
  title: string
  isPublished: boolean
  isStar?: boolean
  answerCount?: number
  createdAt?: string
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}

const QuestionCard: FC<PropTypes> = props => {
  const { id, title, isPublished, isStar, answerCount, createdAt, deleteQuestion, publishQuestion } = props

  // 路由跳转
  const nav = useNavigate()

  // 编辑问卷
  // const edit = (id: string) => {
  //   console.log(`编辑问卷${id}`)
  // }

  /**
   * ! 删除问卷
   * * 删除问卷需要用到父组件里面的questionList数据
   * - 父函数中有一个del函数，负责删除问卷
   * - 子组件只需要拿到del函数并调用即可
   */
  // const del = (id: string) => {
  //   console.log(`delete question ${id}`)
  //   deleteQuestion && deleteQuestion(id)
  // }

  /**
   * ! 发布问卷
   * * 发布问卷需要用到父组件里面的questionList数据
   * - 父函数中有一个pub函数，负责修改questionList中的isPublished属性
   * - 子组件只需要拿到pub函数并调用即可
   */
  // const pub = (id: string) => {
  //   console.log(`publish question ${id}`)
  //   publishQuestion && publishQuestion(id)
  // }

  const duplicateConfirm: PopconfirmProps['onConfirm'] = e => {
    console.log(e)
    message.success('已复制')
  }

  const deleteConfirm: PopconfirmProps['onConfirm'] = e => {
    console.log(e)
    message.success('已删除')
  }

  // 简单处理，适用于一些简单的逻辑
  // let itemClassName = 'list-item'
  // isPublished && (itemClassName += ' published')

  // 使用classnames库处理，可以处理一些复杂逻辑
  const itemClassName = classNames(styles['list-item'], {
    // published: isPublished,
    [styles['published']]: isPublished,
  })

  return (
    <>
      {/* 一个问卷卡片 */}
      <div className={styles['container']}>
        {/* 上部分 */}
        <div className={styles['title']}>
          <div className={styles['left']}>
            <Link to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}>
              <Space>
                {title}
                {isStar ? <StarFilled style={{ color: 'rgb(252, 248, 5)' }} /> : <StarOutlined />}
              </Space>
            </Link>
          </div>

          <div className={styles['right']}>
            <Space>
              {isPublished ? <Tag color="geekblue">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷:{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>

        {/* 分割线 */}
        <Divider style={{ margin: '12px 0' }}></Divider>
        {/* 下部分 */}
        <div className={styles['button-container']}>
          <div className={styles['left']}>
            <Space>
              <Button type="text" size="small" icon={<EditOutlined />} onClick={() => nav(`/question/edit/${id}`)}>
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined />}
                disabled={!isPublished}
                onClick={() => nav(`/question/stat/${id}`)}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles['right']}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={isStar ? <StarFilled style={{ color: 'rgb(252, 248, 5)' }} /> : <StarOutlined />}
              >
                {isStar ? '取星' : '标星'}
              </Button>

              <Popconfirm title="确定复制该问卷吗？" onConfirm={duplicateConfirm} okText="确定" cancelText="取消">
                <Button type="text" size="small" icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popconfirm>

              <Popconfirm title="确定删除该问卷吗？" onConfirm={deleteConfirm} okText="确定" cancelText="取消">
                <Button type="text" size="small" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
      </div>

      {/* &nbsp; */}
      {/* <button
        onClick={() => {
          edit(id)
        }}
      >
        编辑问卷
      </button>
      &nbsp;
      <button
        onClick={() => {
          pub(id)
        }}
      >
        发布问卷
      </button>
      &nbsp;
      <button
        onClick={() => {
          del(id)
        }}
      >
        删除问卷
      </button> */}
    </>
  )
}

export default QuestionCard
