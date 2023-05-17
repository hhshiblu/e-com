import React from 'react'
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import CreateEvent from "../../component/Seller/CreateEvent.jsx"
function ShopCreateEvent() {
  return (
    <div>
      <DashBoardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className='w-[80px] 800px:w-[330px]'>
        <DashBoardSideBar active={6}/>
        </div>
        

        <div className='w-full flex justify-center'>
            <CreateEvent/>

        </div>
      </div>
    </div>
  )
}

export default ShopCreateEvent
