import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'

import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant/index'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

const useLoadQuestionListData = (opt: Partial<OptionType>) => {
  const { isStar = false, isDeleted = false } = opt

  // 解析并获取url参数
  const [searchParams] = useSearchParams()

  const { loading, data, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { loading, data, error, refresh }
}

export default useLoadQuestionListData
