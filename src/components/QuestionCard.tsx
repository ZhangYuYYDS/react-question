import React, { FC } from 'react'
import './QuesttionCard.css'

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

  return (
    <div key={id} className="list-item">
      <strong> {title}</strong>
      &nbsp;
      {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span style={{ color: 'red' }}>未发布</span>}
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
