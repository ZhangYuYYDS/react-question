import React, { FC, useState } from 'react'
import { produce } from 'immer'
import styles from './Common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'

import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const Star: FC = () => {
  const [questionList, setQuestionList] = useState([
    { _id: '1', title: '问卷1', isPublished: true, isStar: true, answerCount: 100, createdAt: '2023.3.16 18:00' },
    { _id: '2', title: '问卷2', isPublished: false, isStar: true, answerCount: 999, createdAt: '2024.4.12 13:14' },
  ])
  return (
    <>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      {/* main：questionCard部分 */}
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无问卷" />}
        {questionList.length > 0 &&
          questionList.map(question => {
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
                // deleteQuestion={deleteQuestion}
                // publishQuestion={publishQuestion}
              />
            )
          })}
      </div>

      {/* footer */}
      <div className={styles['footer']}>分页</div>

      {/* <div>
        <button onClick={add}>新增问卷</button>
      </div> */}
    </>
  )
}

export default Star
