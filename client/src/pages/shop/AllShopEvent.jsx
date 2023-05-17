import React from 'react'
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
import AllEvent from "../../component/Seller/AllEvent.jsx"
function AllShopEvent() {
  return (
    <div>
        <DashBoardHeader/>
      <div className="flex  justify-between w-full">
        <div className='w-[80px] 800px:w-[330px]'>
        <DashBoardSideBar active={5}/>
        </div>
        

        <div className='w-full flex justify-center'>
            <AllEvent/>

        </div>
      </div>   
    </div>
  )
}

export default AllShopEvent
