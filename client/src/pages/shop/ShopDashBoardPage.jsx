import React from 'react'
import DashBoardHeader from "../../component/Seller/Layout/DashBoardHeader.jsx"
import DashBoardSideBar from "../../component/Seller/Layout/DashBoardSideBar.jsx"
function ShopDashBoardPage() {
  return (
    <div>
      <DashBoardHeader/>
      <div className="flex items-center justify-between w-full">
        <DashBoardSideBar active={1}/>
      </div>
    </div>
  )
}

export default ShopDashBoardPage
