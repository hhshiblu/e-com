import React from 'react'

import ShopInfo from "../../component/Seller/ShopInfo.jsx";
import ShopProfileData from "../../component/Seller/ShopProfileData.jsx";
import styles from '../../styles/style';
import Header from '../../component/Layout/Header.jsx';

const ShopViewPage = () => {
  return (
    <div>
      <Header />
     
      <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className="w-full py-10 ">
          <div className="block bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll  top-10 left-0 z-10">
            <ShopInfo isOwner={false} />
          </div>
          <div className="block rounded-[4px] mx-auto">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopViewPage