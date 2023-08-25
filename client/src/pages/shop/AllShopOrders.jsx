// import React from 'react'
// import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
// import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar'
// import AllOrders from "../../component/Seller/AllOrders.jsx"
// function AllShopOrders() {
//   return (
//     <div>
//     <DashBoardHeader/>
//     <div className="flex  justify-between w-full">
//       <div className='w-[80px] 800px:w-[330px]'>
//       <DashBoardSideBar active={2}/>
//       </div>
      

//       <div className='w-full flex justify-center'>
//           <AllOrders/>

//       </div>
//     </div>
//   </div>
//   )
// }

// export default AllShopOrders

import React from 'react'
 import AllOrders from "../../component/Seller/AllOrders.jsx";
function AllShopOrders() {
  return (
    <div><AllOrders/></div>
  )
}

export default AllShopOrders