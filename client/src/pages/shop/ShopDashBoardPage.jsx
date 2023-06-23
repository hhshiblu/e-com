import React from 'react'
import DashBoardHeader from "../../component/Seller/Layout/DashBoardHeader.jsx"
import DashBoardSideBar from "../../component/Seller/Layout/DashBoardSideBar.jsx"
import DashboardHero from "../../component/Seller/DashboardHero.jsx"
function ShopDashBoardPage() {
  return (
    <div>
       <DashBoardHeader />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashBoardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>
    </div>
  )
}

export default ShopDashBoardPage
