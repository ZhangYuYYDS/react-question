import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'

import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

const useLoadQuestionListData = (opt: Partial<OptionType>) => {
  const { isStar = false, isDeleted = false } = opt

  // 解析并获取url参数
  const [searchParams] = useSearchParams()

  const { loading, data, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const data = await getQuestionListService({ keyword, isStar, isDeleted })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { loading, data, error }
}

export default useLoadQuestionListData
