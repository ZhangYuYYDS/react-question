import React from 'react'
import type { FC } from 'react'
import './List1.css'
import QuestionCard from './components/QuestionCard'

const List1: FC = () => {
  // 问卷列表数据
  const questionList = [
    { id: '1', title: '问卷1', isPublished: true },
    { id: '2', title: '问卷2', isPublished: false },
  ]

  return (
    <div className="App">
      <h1 className="title">问卷列表页1</h1>

      {/* 问卷列表1 */}
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return <QuestionCard key={id} id={id} title={title} isPublished={isPublished} />
        })}
      </div>
    </div>
  )
}

export default List1
