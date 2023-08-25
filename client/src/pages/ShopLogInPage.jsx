import React, { useEffect } from 'react'
import ShopLogIn from '../component/Seller/ShopLogIn'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShopLogInPage() {
  const navigate=useNavigate();
  const {isSeller,isloading}=useSelector(state=>state.seller)

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/seller_DashBoard`);
    }
  }, [isloading, isSeller, navigate]);
  return (
    <div>
      <ShopLogIn/>
    </div>
  )
}

export default ShopLogInPage
