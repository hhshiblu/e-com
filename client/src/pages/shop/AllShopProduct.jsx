import React from 'react'
// import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
// import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
import  AllProduct  from '../../component/Seller/AllProduct.jsx'
function AllShopProduct() {
  return (
    <div>
      {/* <DashBoardHeader/>
      <div className="flex  justify-between w-full">
        <div className='w-[80px] 800px:w-[330px]'>
        <DashBoardSideBar active={3}/>
        </div> */}
        

        {/* <div className='w-full flex justify-center'> */}
            <AllProduct/>

        {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default AllShopProduct
