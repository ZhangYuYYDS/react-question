/**
 * description: 获取画布中的组件列表数据
 */
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  // 获取redux中的components
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType
  const { componentList = [], selectedId = '' } = components

  return { componentList, selectedId }
}

export default useGetComponentInfo
