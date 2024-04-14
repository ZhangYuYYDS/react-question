import React, { FC, useState } from 'react'
import { produce } from 'immer'
import styles from './Common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
import { useRequest } from 'ahooks'

import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'

const { Title } = Typography

/**
 * - 组件是一个函数（执行返回 JSX 片段），组件初次渲染执行这个函数
 * - 任何 state 更新，都会触发组件的更新（也就是重新执行函数）
 */
const List: FC = () => {
  // 设置页面标题
  useTitle('问卷星-我的问卷')
  // 解析并获取url参数
  const [searchParams] = useSearchParams()
  console.log('keyword', searchParams.get('keyword'))

  // state是不可变数据，setState是修改state的唯一方式
  const { loading, data = {} } = useRequest(getQuestionListService)
  const { list = [], total = 0 } = data

  return (
    <>
      {/* 头部 */}
      <div className={styles['header']}>
        <div className={styles['left']}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles['right']}>
          <ListSearch />
        </div>
      </div>

      {/* main：questionCard部分 */}
      <div className={styles['content']}>
        {/* 加载中 */}
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((question: any) => {
            const { _id: id, title, isPublished, isStar, answerCount, createdAt } = question
            return (
              <QuestionCard
                key={id}
                id={id}
                title={title}
                isPublished={isPublished}
                isStar={isStar}
                answerCount={answerCount}
                createdAt={createdAt}
              />
            )
          })}
      </div>

      {/* footer */}
      <div className={styles['footer']}>footer ...上划加载更多</div>

      {/* <div>
        <button onClick={add}>新增问卷</button>
      </div> */}
    </>
  )
}

export default List
