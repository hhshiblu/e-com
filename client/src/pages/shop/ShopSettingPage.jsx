import React from 'react'
import Header from '../../component/Layout/Header'
import Footer from '../../component/Layout/Footer'
import ShopSetting from "../../component/Seller/ShopSetting.jsx"
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'

function ShopSettingPage() {
  return (
    <div>
      <DashBoardHeader/>
      <div className="flex  justify-between w-full">
        <div className='w-[80px] 800px:w-[330px]'>
        <DashBoardSideBar active={3}/>
        </div>
        

        <div className='w-full flex justify-center'>
            <ShopSetting/>

        </div>
      </div>
    </div>
  )
}

export default ShopSettingPage
