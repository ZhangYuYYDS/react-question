import React from 'react'
import { BrowserRouter as Router, Route, createBrowserRouter } from 'react-router-dom'

// 将所有的页面引入进来
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'
import MainLayout from '../layouts/MainLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import ManageLayout from '../layouts/ManageLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },

  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router

// ---------------------------分割线
export const Login_PathNAME = '/login'
export const Register_PathNAME = '/register'
export const Home_PathNAME = '/'
export const Manage_PathNAME = '/manage'
export const List_PathNAME = '/manage/list'
export const Star_PathNAME = '/manage/star'
export const Trash_PathNAME = '/manage/trash'
// export const Edit_PathNAME = `/question/edit/${id}`
// export const Stat_PathNAME = '/question/stat/:id'

// ---------------------------分割线
