import React from 'react'

import WithdrawMoney from "../../component/Seller/WithdrawMoney.jsx";
import DashBoardHeader from '../../component/Seller/Layout/DashBoardHeader';
import DashBoardSideBar from '../../component/Seller/Layout/DashBoardSideBar';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage