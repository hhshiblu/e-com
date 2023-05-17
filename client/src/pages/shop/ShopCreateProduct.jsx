import React from 'react'
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import ShopDashBoardPage from './ShopDashBoardPage'
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
import CreateProduct from "../../component/Seller/CreateProduct.jsx"
function ShopCreateProduct() {
  return (
    <div>
      <DashBoardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className='w-[80px] 800px:w-[330px]'>
        <DashBoardSideBar active={4}/>
        </div>
        

        <div className='w-full flex justify-center'>
            <CreateProduct/>

        </div>
      </div>
    </div>
  )
}

export default ShopCreateProduct
