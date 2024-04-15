import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  return (
    <>
      <p>Question layout</p>
      <div>{!waitingUserData && <Outlet />}</div>
    </>
  )
}

export default QuestionLayout
