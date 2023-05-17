import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const ProtectSellerRoute = ({ children }) => {
  const {  isSeller,isloading} = useSelector((state) => state.seller);
    if(isloading===false){
      if (!isSeller) {
        return <Navigate to={`/`} replace />;
      }
      
      return children;
    }
  };

export default ProtectSellerRoute
