import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import {  FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { backend_URL } from "../../../serverUrl";
import { RiCouponLine } from "react-icons/ri";



const DashBoardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[60px] bg-[#D61355] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="pl-8">
        <Link to="/">
          <img src="/img/logo_title.svg" alt="" className="h-full w-[100px]" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <RiCouponLine
              color="#FFFFFF"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to="/seller_DashBoard/all-Events"
            className="800px:block hidden"
          >
            <MdOutlineLocalOffer
              color="#FFFFFF"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to="/seller_DashBoard/all-Products"
            className="800px:block hidden"
          >
            <FiShoppingBag
              color="#FFFFFF"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link
            to="/seller_DashBoard/all-orders"
            className="800px:block hidden"
          >
            <AiOutlineUnorderedList
              color="#FFFFFF"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>

          <Link to={`/shop/${seller?._id}`}>
            <img
              src={`${backend_URL}upload/${seller?.avatar}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
