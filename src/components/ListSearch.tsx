import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input, Space } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // 从URL中获取关键字，并设置到input value中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  const handleSearch = (value: string) => {
    // 输入一些关键字后，尝试改变路由，这样刷新后内容还是在的
    nav({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <div>
      <Space>
        <Search
          placeholder="请输入关键字"
          enterButton
          allowClear
          value={value}
          onSearch={handleSearch}
          onChange={handleChange}
        />
      </Space>
    </div>
  )
}

export default ListSearch
