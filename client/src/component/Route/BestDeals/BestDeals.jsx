import React, { useEffect, useState } from "react";
import "./BestDeal.css"

import styles from "../../../styles/style";
import ProductCart from "../ProductCart/ProductCart.jsx"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backend_URL } from "../../../serverUrl";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
function BestDeals() {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  
  let box = document.querySelector(".p_container");
  const btnprev = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width/2;
  }
  const btnnext = () => {
     let width = box.clientWidth;
     box.scrollLeft = box.scrollLeft + width/2;
  }

const maxPrice = 600; // Set your desired max price value

const handelClick = () => {
  const queryParams = new URLSearchParams({
    maxPrice: maxPrice.toString(),
  });

  const url = `/products/search?${queryParams}`;
  navigate(url);
};

  return (
    <div>
      <div
        className={`${styles.section}  my-3 rounded-sm bg-white h-[390px] py-[10px] px-[20px] relative group overflow-hidden`}
      >
        <div className="flex pb-4">
          <h2 className="text-[21px]  font-semibold text-slate-600">
            Deals Under 500 <span className=" font-medium">৳</span>
          </h2>
          <div
            className="text-[15px] pl-6 hover:underline hover:text-red-500 cursor-pointer text-[#007185]"
            onClick={handelClick}
          >
            See more
          </div>
        </div>
        <button
          onClick={btnprev}
          className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] left-0 shadow-2xl hidden group-hover:block transition duration-1000"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          onClick={btnnext}
          className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] right-0 shadow-2xl hidden group-hover:block transition duration-1000 "
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <div className="flex gap-[7px]    over overflow-x-scroll  p_container custom-scrollbar">
          {data?.map((p, i) => {
            return (
              <div className="min-w-[250px] pb-4">
                <Link to={`${`/product/${p._id}`} `}>
                  <div className="  bg-gray-200 p-4 h-[200px] w-[240px">
                    <img
                      src={`${backend_URL}upload/${p && p.images[0]}`}
                      alt=""
                      className="w-[100%] h-[100%] mx-auto"
                    />
                  </div>
                </Link>
                <div className="flex items-center pt-1 gap-2">
                  <div className=" bg-[#CC0C39] rounded-sm px-[2px] pt-[1px] font-semibold h-[24px] w-[56px] text-white text-[13px]">
                    {(p.originalPrice === 0
                      ? 0
                      : ((p.originalPrice - p.discountPrice) /
                          p.originalPrice) *
                        100
                    ).toFixed(0)}
                    % off
                  </div>
                  <div className="text-[#CC0C39] font-bold text-[12px]   ">
                    Deal
                  </div>
                </div>
                <div className="flex">
                  <h5
                    className={`text-[17px] text-[#0F1111] text-sm py-1 font-semibold `}
                  >
                    {p.originalPrice === 0 ? p.originalPrice : p.discountPrice}
                    <span className="  font-medium"> ৳</span>
                  </h5>
                  {p.discountPrice && (
                    <div className=" flex">
                      <h5 className="pl-2 text-[12px] leading-[18px] text-[#565959]  ">
                        {" "}
                        Daily Price:{" "}
                      </h5>
                      <h4
                        className={`pl-1 text-[12px] leading-[18px] text-[#565959] line-through`}
                      >
                        {p.originalPrice ? p.originalPrice + " ৳" : null}
                      </h4>
                    </div>
                  )}
                </div>
                <Link to={`${`/product/${p._id}`}`}>
                  <h5 className="pb-1 font-[500] text-[14px] leading-[19px]  hover:text-red-500">
                    {p.name.length > 20 ? p.name.slice(0, 45) + "..." : p.name}
                  </h5>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
