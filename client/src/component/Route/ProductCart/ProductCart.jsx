import React from "react";
import { Link } from "react-router-dom";

import styles from "../../../styles/style";
import { backend_URL } from "../../../serverUrl";
import Rating from "../../ProductDetails/Rating";
function ProductCart({ data, isEvent }) {
  return (
    <div className="bg-white hover:shadow-lg rounded-md">
      <div className="w-full h-auto mb- p-3 relative rounded-md  cursor-pointer ">
        <div className=" flex  justify-end m-auto"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${backend_URL}upload/${data.images && data.images[0]}`}
            alt={data.name}
            className="w-full pb-1 m-auto h-[160px] object-contain  transform hover:scale-110 transition duration-500"
          />
        </Link>
        <Link to={`/shop/view/${data?.seller._id}`}>
          <h5 className="text-[#0C134F] pb-0.5 text-xs font-[500]">
            {data.seller.name}
          </h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h5 className="pb-3 font-[500] text-sm md:text-lg  hover:text-red-500">
            {data.name.length > 20 ? data.name.slice(0, 35) + "..." : data.name}
          </h5>
        </Link>
        <div className=" flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
            <span className=" font-semibold"> ৳</span>
          </h5>
          <h4 className={`${styles.price} text-gray-600`}>
            {data.originalPrice ? data.originalPrice + "৳" : null}
          </h4>
        </div>

        <div className="flex items-center">
          <Rating rating={data?.ratings} />
          <div className="ml-3 text-gray-500"></div>
          <span>({data?.sold_out})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
