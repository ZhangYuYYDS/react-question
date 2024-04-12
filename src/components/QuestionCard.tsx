import React, { FC } from 'react'
import classNames from 'classnames'
// import './QuestionCard.css'
import styles from './QuestionCard.module.scss'

// ts 自定义类型
type PropTypes = {
  id: string
  title: string
  isPublished: boolean
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}

const QuestionCard: FC<PropTypes> = props => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props
  // 编辑问卷
  const edit = (id: string) => {
    console.log(`编辑问卷${id}`)
  }

  /**
   * ! 删除问卷
   * * 删除问卷需要用到父组件里面的questionList数据
   * - 父函数中有一个del函数，负责删除问卷
   * - 子组件只需要拿到del函数并调用即可
   */
  const del = (id: string) => {
    console.log(`delete question ${id}`)
    deleteQuestion && deleteQuestion(id)
  }

  /**
   * ! 发布问卷
   * * 发布问卷需要用到父组件里面的questionList数据
   * - 父函数中有一个pub函数，负责修改questionList中的isPublished属性
   * - 子组件只需要拿到pub函数并调用即可
   */
  const pub = (id: string) => {
    console.log(`publish question ${id}`)
    publishQuestion && publishQuestion(id)
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
    <div key={id} className={itemClassName}>
      <strong> {title}</strong>
      &nbsp;
      {isPublished ? (
        <span className={styles['published-span']}>已发布</span>
      ) : (
        <span className={styles['no-published-span']}>未发布</span>
      )}
      &nbsp;
      <button
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
      </button>
    </div>
  )
}

export default QuestionCard
