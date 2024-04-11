import React, { useState } from 'react'
import type { FC } from 'react'
import QuestionCard from './components/QuestionCard'

const List2: FC = () => {
  // state是不可变数据，setState是修改state的唯一方式
  const [questionList, setQuestionList] = useState([
    { id: '1', title: '问卷1', isPublished: true },
    { id: '2', title: '问卷2', isPublished: false },
  ])

  const add = () => {
    console.log('add')
    const randowId = Math.random().toString().slice(-3)
    setQuestionList([...questionList, { id: `${randowId}`, title: `问卷${randowId}`, isPublished: true }])
  }

  // 删除问卷
  const deleteQuestion = (id: string) => {
    console.log('del')
    setQuestionList(questionList.filter(question => question.id !== id))
  }

  // 发布问卷
  const publishQuestion = (id: string) => {
    console.log('publish')
    setQuestionList(questionList.map(question => (question.id === id ? { ...question, isPublished: true } : question)))
  }

  return (
    <div>
      <h1>问卷列表页2</h1>

      {/* 问卷列表1 */}
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            />
          )
        })}
      </div>

      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </div>
  )
}

export default List2
