import React, { FC, useState, useEffect } from 'react'
import QuestionCard from './components/QuestionCard'
import { produce } from 'immer'

/**
 * - 组件是一个函数（执行返回 JSX 片段），组件初次渲染执行这个函数
 * - 任何 state 更新，都会触发组件的更新（也就是重新执行函数）
 */
const List2: FC = () => {
  /**
   * * ⭐useEffect参数说明⭐
   * - 第一个参数是回调函数，当组件渲染完毕后，会执行这个回调函数
   *     - return一个函数时，当组件卸载时，会执行这个函数
   * - 第二个参数是依赖项，依赖项发生变化，会触发回调函数的执行
   * - 如果没有依赖项，那么回调函数会默认在组件渲染完毕后执行
   *
   * ? 组件的生命周期：创建、更新、销毁
   */
  useEffect(() => {
    console.log('加载一个ajax网络请求')
  }, [])

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
