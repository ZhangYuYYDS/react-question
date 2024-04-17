import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditCanvas from '../Edit/EditCanvas'
import { changeSelectedId } from '../../../store/componentsReducer'
import styles from './index.module.scss'

// 获取动态参数
const edit: FC = () => {
  // loading 是表示是否在加载数据
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {/* 左侧组件库 */}
          <div className={styles.left}>left</div>

          {/* 画布 */}
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>

          {/* 右侧设置区 */}
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default edit
