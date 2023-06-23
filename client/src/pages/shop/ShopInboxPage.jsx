import React from 'react'
// import DashboardMessages from "../../component/seller/DashboardMessages.jsx";
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader';
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar';
import DashBoardMessage from "../../component/Seller/DashBoardMessage.jsx"

const ShopInboxPage = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSideBar active={8} />
      </div>
      <DashBoardMessage/>
    </div>
  </div>
  )
}

export default ShopInboxPage