import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'

import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'

const useLoadQuestionData = () => {
  // useParams用于从当前 URL 的路由参数中获取数据
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax 加载
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      // 获取问卷的信息
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true, // 手动触发
    }
  )

  // 根据获取的data，设置redux store
  useEffect(() => {
    if (!data) return
    // 设置redux store
    const { title = '', componentList = [] } = data

    // 获取默认的 selectedId
    // 就是如果选中id之后,如果不指定一个默认的id,刷新后就没有指定的id了,也就是没有默认选中的组件了
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 将 componentList 存储到redux store中
    dispatch(resetComponents({ componentList, selectedId }))
  }, [data])

  // 判断id变化，执行Ajax加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  // 为什么不返回data，因为data已经在redux store中存储了
  return { loading, error }
}

export default useLoadQuestionData
