import React, { FC, useState } from 'react'
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
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

// ts 自定义类型
type PropTypes = {
  id: string
  title: string
  isPublished: boolean
  isStar?: boolean
  answerCount?: number
  createdAt?: string
}

const QuestionCard: FC<PropTypes> = props => {
  const { id, title, isPublished, isStar, answerCount, createdAt } = props

  // 路由跳转
  const nav = useNavigate()

  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) // 更新 state
        message.success('已更新')
      },
    }
  )

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(async () => await duplicateQuestionService(id), {
    manual: true,
    onSuccess(result) {
      message.success('复制成功')
      nav(`/question/edit/${result.id}`) // 跳转到问卷编辑页
    },
  })

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(id, { isDeleted: true }),
    {
      manual: true,
      onSuccess(result) {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    }
  )

  // 已经删除的问卷不要再渲染卡片了
  if (isDeletedState) return null

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
                {isStarState ? <StarFilled style={{ color: 'rgb(252, 248, 5)' }} /> : <StarOutlined />}
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
                icon={isStarState ? <StarFilled style={{ color: 'rgb(252, 248, 5)' }} /> : <StarOutlined />}
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取星' : '标星'}
              </Button>

              <Popconfirm title="确定复制该问卷？" okText="确定" cancelText="取消" onConfirm={duplicate}>
                <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                  复制
                </Button>
              </Popconfirm>

              <Popconfirm title="确定删除该问卷吗？" okText="确定" cancelText="取消" onConfirm={deleteQuestion}>
                <Button type="text" size="small" icon={<DeleteOutlined />} disabled={deleteLoading}>
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
