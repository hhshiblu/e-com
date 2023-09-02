import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { BsChat, BsHeart } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { BiLogInCircle } from "react-icons/bi";
import Header from "./Header";
import Footer from "./Footer";
import "./DashBoard.css"
const DashBoard = () => {
  const [filterShow, setFilterShow] = useState(true);

  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-5">
        <div className="w-[90%] mx-auto pt-5 ">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-indigo-500 text-white"
            >
              <TfiLock />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto">
          <div className="py-5 flex md-lg:w-[90%] mx-auto">
            <div
              className={` animation_sidebar rounded-md z-50 h-[70vh] bg-white overflow-hidden${
                filterShow ? " fold " : " lg_flod"
              }  ml-4  `}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link to="/account/profile" className="block pl-4">
                    Profile
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link to="all-orders" className="block pl-4">
                    Orders
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link to="refund-orders" className="block pl-4">
                    Refunds
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  {/* {!filterShow && ( */}
                    <Link to="Tract-order" className="block pl-4">
                      Tract_order
                    </Link>
                  {/* )}{" "} */}
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                  <Link to="address" className="block pl-4">
                    Address
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <span className="text-xl">
                    <RxDashboard />
                  </span>
                 
                    <Link to="log-out" className="block pl-4">
                      Log_out
                    </Link>
              
                </li>
              </ul>
            </div>
            <div className="w-[100%] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
