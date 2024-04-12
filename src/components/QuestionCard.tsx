import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './QuestionCard.module.scss'

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
            <a href="#">{title}</a>
          </div>

          <div className={styles['right']}>
            {isPublished ? <span>已发布</span> : <span>未发布</span>}
            &nbsp;
            <span>答卷:{answerCount}</span>
            &nbsp;
            <span>{createdAt}</span>
          </div>
        </div>
        {/* 下部分 */}
        <div className={styles['button-container']}>
          <div className={styles['left']}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles['right']}>
            <button>标星</button>
            <button>复制</button>
            <button>删除</button>
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
