import React from 'react'
import AdminHeader from '../../component/admin/layOut/AdminHeader'
import AdminSideBar from '../../component/admin/layOut/AdminSideBar'
import AllSellers from "../../component/admin/AllSellers.jsx"
const AdminDashboardSellers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSellers
