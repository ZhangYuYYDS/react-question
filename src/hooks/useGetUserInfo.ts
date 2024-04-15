import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
  const userInfo = useSelector<StateType>((state: StateType) => state.user) as UserStateType
  const { username, nickname } = userInfo
  return { username, nickname }
}

export default useGetUserInfo
