import React, { useEffect } from 'react'
import ShopCreate from "../component/Seller/ShopCreate.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function ShopCreatePage() {
  const navigate=useNavigate();
  const {isSeller,seller}=useSelector(state=>state.seller)

  useEffect(() => {
if(isSeller===true){
  navigate(`/shop/${seller._id}`)
}
  },[]);
  return (
    <div>
      <ShopCreate/>
    </div>
  )
}

export default ShopCreatePage
