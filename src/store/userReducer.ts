import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = {
  username: '',
  nickname: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    // 登录时设置username，nickname到redux store
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload
    },
    // 清除username，nickname
    logoutReducer: (state: UserStateType) => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
