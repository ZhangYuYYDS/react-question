import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { produce } from 'immer'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import styles from './Common.module.scss'
import { Typography, Spin, Empty } from 'antd'

import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'

const { Title } = Typography

const List: FC = () => {
  // 设置页面标题
  useTitle('问卷星-我的问卷')

  // 获取（查询）问卷列表数据
  const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1) // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length // 有没有更多的、为加载完成的数据

  const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: keyword || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) // 累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  // 触发加载的函数：优化体验，防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() // 真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  // 触发条件一：当页面加载时，或者URL参数变化时
  useEffect(() => {
    tryLoadMore() // 加载第一页，初始化
  }, [searchParams, haveMoreData])

  // 触发条件二：当页面滚动时
  useEffect(() => {
    if (!haveMoreData || loading) return
    window.addEventListener('scroll', tryLoadMore)

    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件
    }
  }, [searchParams])

  // LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])

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
        {list.length > 0 &&
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
      <div className={styles['footer']}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
