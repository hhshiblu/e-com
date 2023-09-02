import React, { useEffect, useState } from "react";
import "./BestDeal.css";
import styles from "../../../styles/style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import AProductCard from "../ProductCart/AProductCard";
import ProductCart from "../../Loader/ProductCart";
function BestDeals() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { allProducts,isloading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.filter((product) => {
      if (product.discountPrice) {
        return product.discountPrice <= 500;
      } else {
        return product.originalPrice <= 500;
      }
    });
    const firstFive = sortedData && sortedData.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);

  let box = document.querySelector(".scroll_x");
  const btnprev = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width / 2;
  };
  const btnnext = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width / 2;
  };

  const maxPrice = 500; // Set your desired max price value

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
        className={`${styles.section}  my-3 rounded-sm bg-white h-[390px] py-[10px] px-[20px] relative group overflow-hidden `}
      >
        {isloading ? (
<ProductCart/>
        ) : (
          <div>
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
              className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] left-0 shadow-2xl hidden group-hover:block transition duration-1000 "
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button
              onClick={btnnext}
              className="bg-[#FFFFFF] border py-6 px-2 text-[30px] absolute top-[34%] right-0 shadow-2xl hidden group-hover:block transition duration-1000 "
            >
              <MdOutlineKeyboardArrowRight />
            </button>
            <div className="flex px-3 gap-[7px] scroll_x overflow-x-auto custom-scrollbar">
              {data?.map((p, i) => (
                <AProductCard p={p} isloading={isloading} key={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BestDeals;
