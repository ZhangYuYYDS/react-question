import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import type { UserStateType } from './userReducer'

export type StateType = {
  user: UserStateType
}
export default configureStore({
  reducer: {
    user: userReducer,

    // 分模块，扩展：问卷的信息
  },
})
