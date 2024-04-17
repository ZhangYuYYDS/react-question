import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import {
  ComponentInfoType,
  changeSelectedId,
  // moveComponent,
} from '../../../store/componentsReducer'
// import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
// import SortableContainer from '../../../components/DragSortable/SortableContainer'
// import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'

type PropsType = {
  loading: boolean
}

/**
 * @description 根据type动态获取相应的组件
 * @param c 服务端componentList中的某个组件
 * @returns Component 获取到的组件
 */
function genComponent(c: ComponentInfoType) {
  const { type, props } = c // 每个组件的信息，是从 redux store 获取的（服务端获取）

  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  // 解构出component属性
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const dispatch = useDispatch()

  // 如果还在loading的话就渲染spin
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // 获取画布中的组件列表信息
  const { componentList, selectedId } = useGetComponentInfo()

  // 点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    // 为什么要阻止冒泡？因为在父组件中有个点击事件，点击时会将id清空
    // 如果有事件冒泡的话,就算点击的是子组件,也会冒泡到父组件,会将id清空
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
  }

  //   // 绑定快捷键
  //   useBindCanvasKeyPress()

  //   // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  //   const componentListWithId = componentList.map(c => {
  //     return { ...c, id: c.fe_id }
  //   })

  //   // 拖拽排序结束
  //   function handleDragEnd(oldIndex: number, newIndex: number) {
  //     dispatch(moveComponent({ oldIndex, newIndex }))
  //   }

  return (
    // <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
    //   <div className={styles.canvas}>
    //     {componentList
    //       .filter(c => !c.isHidden)
    //       .map(c => {
    //         const { fe_id, isLocked } = c

    //         return (
    //           <SortableItem key={fe_id} id={fe_id}>
    //             <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
    //               <div className={styles.component}>{genComponent(c)}</div>
    //             </div>
    //           </SortableItem>
    //         )
    //       })}
    //     {/* <div className={styles['component-wrapper']}>
    //     <div className={styles.component}>
    //       <QuestionTitle />
    //     </div>
    //   </div>
    //   <div className={styles['component-wrapper']}>
    //     <div className={styles.component}>
    //       <QuestionInput />
    //     </div>
    //   </div> */}
    //   </div>
    // </SortableContainer>

    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c

        // 拼接 class name
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassName = styles.selected
        // const lockedClassName = styles.locked
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
          // [lockedClassName]: isLocked,
        })
        return (
          <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
