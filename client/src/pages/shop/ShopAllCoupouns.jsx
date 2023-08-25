import React from 'react'
// import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
// import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
import CouponCode from "../../component/Seller/CouponCode.jsx"
function ShopAllCoupouns() {
  return (
    <div>
    {/* <DashBoardHeader/>
    <div className="flex items-start justify-between w-full">
      <div className='w-[80px] 800px:w-[330px]'>
      <DashBoardSideBar active={9}/>
      </div>
      

      <div className='w-full flex items-start '> */}
          <CouponCode/>

      {/* </div>
    </div> */}
  </div>
  )
}

export default ShopAllCoupouns
