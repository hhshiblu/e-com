import React from 'react'
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader'
import Footer from '../../component/Layout/Footer'
import OrderDetails from "../../component/Seller/OrderDetails.jsx"
function ShopOrderDetailsPage() {
  return (
    <div>
       <DashBoardHeader/>
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default ShopOrderDetailsPage
