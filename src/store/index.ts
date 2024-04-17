import { configureStore } from '@reduxjs/toolkit'
import type { UserStateType } from './userReducer'
import type { ComponentsStateType } from './componentsReducer/index'

import userReducer from './userReducer'
import componentsReducer from './componentsReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}
export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,

    // 分模块，扩展：问卷的信息
  },
})
