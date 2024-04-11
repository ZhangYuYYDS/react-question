import React, { useState, FC } from 'react'
import QuestionCard from './components/QuestionCard'
import { produce } from 'immer'

const List2: FC = () => {
  // state是不可变数据，setState是修改state的唯一方式
  const [questionList, setQuestionList] = useState([
    { id: '1', title: '问卷1', isPublished: true },
    { id: '2', title: '问卷2', isPublished: false },
  ])

  // 新增问卷
  const add = () => {
    console.log('add')
    const randowId = Math.random().toString().slice(-3)
    // immer的方式
    setQuestionList(
      produce(draft => {
        draft.push({ id: `${randowId}`, title: `问卷${randowId}`, isPublished: true })
      })
    )

    // setQuestionList([...questionList, { id: `${randowId}`, title: `问卷${randowId}`, isPublished: true }])
  }

  // 删除问卷
  const deleteQuestion = (id: string) => {
    // immer的方式
    const index = questionList.findIndex(question => question.id === id)
    setQuestionList(
      produce(draft => {
        draft.splice(index, 1)
      })
    )

    // setQuestionList(questionList.filter(question => question.id !== id))
  }

  // 发布问卷
  const publishQuestion = (id: string) => {
    // immer的方式
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(question => question.id === id)
        draft[index].isPublished = true
      })
    )
    // setQuestionList(questionList.map(question => (question.id === id ? { ...question, isPublished: true } : question)))
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
