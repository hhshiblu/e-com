import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {  RxPerson } from "react-icons/rx";

import Header from "./Header";
import Footer from "./Footer";
import "./DashBoard.css"
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { AiOutlineLogin, AiOutlineMenuFold } from "react-icons/ai";
import { server } from "../../serverUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const DashBoard = () => {
  const navigate = useNavigate();
   const { user } = useSelector((state) => state.user);
  const [filterShow, setFilterShow] = useState(true);
  const logoutHandler = () => {
    axios
      .get(`${server}/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div>
      <Header />
      <div className="bg-slate-200 ">
        <div className="w-[100%] py- bg-[#c3c3c3] h-[40px] mx-auto">
          <div className="flex">
            <h3 className="bg-[#D61355] text-white   px-[60px] h-[40px]  font-semibold text-[23px] ">
              {user?.name}
            </h3>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center pt-1 px-3 pl-[20px] text-[20px] text-white"
            >
              <AiOutlineMenuFold size={30} color="black" />
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
                  <Link to="/account/profile">
                    <span className="text-xl">
                      <RxPerson />
                    </span>
                  </Link>

                  <Link to="/account/profile" className="block pl-4">
                    Profile
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <Link to="all-orders">
                    <span className="text-xl">
                      <HiOutlineShoppingBag />
                    </span>
                  </Link>
                  <Link to="all-orders" className="block pl-4">
                    Orders
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <Link to="refund-orders">
                    <span className="text-xl">
                      <HiOutlineReceiptRefund />
                    </span>
                  </Link>
                  <Link to="refund-orders" className="block pl-4">
                    Refunds
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <Link to="Tract-order">
                    <span className="text-xl">
                      <MdOutlineTrackChanges />
                    </span>
                  </Link>

                  {/* {!filterShow && ( */}
                  <Link to="Tract-order" className="block pl-4">
                    Tract_order
                  </Link>
                  {/* )}{" "} */}
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <Link to="address">
                    <span className="text-xl">
                      <TbAddressBook />
                    </span>
                  </Link>

                  <Link to="address" className="block pl-4">
                    Address
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2 pl-1">
                  <Link to="chat">
                    <span className="text-xl">
                      <TbAddressBook />
                    </span>
                  </Link>

                  <Link to="chat" className="block pl-4">
                    Chat
                  </Link>
                </li>
                <li
                  className="flex justify-start items-center gap-2 py-2 pl-1"
                  onClick={logoutHandler}
                >
                  <span className="text-xl">
                    <AiOutlineLogin />
                  </span>

                  <h1 className="block pl-4">Log_out</h1>
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
