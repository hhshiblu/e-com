import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import AProductCard from "../ProductCart/AProductCard";
function CateUnderP() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.filter((product) => {
      if (product.discountPrice) {
        return product.discountPrice <= 800 && product.category==="phone";
      } else {
        return product.originalPrice <= 800 && product.category === "phone";
      }
    });
    const firstFive = sortedData && sortedData.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);


  let box1 = document.querySelector(".scrollx");
  const btnprev = () => {
    let width = box1.clientWidth;
    box1.scrollLeft = box1.scrollLeft - width / 3;
  };
  const btnnext = () => {
    let width = box1.clientWidth;
    box1.scrollLeft = box1.scrollLeft + width / 3;
  };

  const maxPrice = 800; // Set your desired max price value

  const handelClick = () => {
    const queryParams = new URLSearchParams({
      maxPrice: maxPrice.toString(),
      category:"phone"
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
          <h2 className="text-[16px]  sm:text-[18px] md:text-[20px] font-semibold text-slate-600">
            Toy Vehicles & Playsets Under 800{" "}
            <span className=" font-medium">৳</span>
          </h2>
          <div
            className="text-[13px] pl-3 sm:text-[14px] sm:pl-6   hover:underline hover:text-red-500 cursor-pointer text-[#007185]"
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
        <div className="flex gap-[7px]     overflow-x-scroll  scrollx custom-scrollbar">
          {data?.map((p, i) => {
            return <AProductCard p={p} key={i}/>;
          })}
      
    
        </div>
      </div>
    </div>
  );
}

export default CateUnderP;

