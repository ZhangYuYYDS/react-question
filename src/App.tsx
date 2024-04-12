import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'

function App() {
  // 列表页
  return (
    // fragment
    <RouterProvider router={routerConfig}></RouterProvider>
  )
}
export default App
