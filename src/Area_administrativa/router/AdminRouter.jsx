import React from 'react'
import SideBar from '../Components/SideBar'
import { Outlet } from '@tanstack/react-router'
const AdminRouter = () => {
  return (

    <>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>

    </>

  )
}

export default AdminRouter