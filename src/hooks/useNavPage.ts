import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { isLoginOrRegister, isNoNeedUserInfo, List_PathNAME, Login_PathNAME } from '../router/index'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    // 已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(List_PathNAME)
      }
      return
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(Login_PathNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
