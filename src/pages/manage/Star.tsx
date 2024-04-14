import React, { FC } from 'react'
import { produce } from 'immer'
import styles from './Common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'

import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷星-星标问卷')

  const { loading, data = {} } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无问卷" />}
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
      <div className={styles['footer']}>分页</div>
    </>
  )
}

export default Star
