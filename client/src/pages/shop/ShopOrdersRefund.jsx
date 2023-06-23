import React from 'react'
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import AllRefundOrders from "../../component/Seller/Layout/AllRefundOrders.jsx"
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
function ShopOrdersRefund() {
  return (
    <div>
      <DashBoardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
           <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopOrdersRefund
