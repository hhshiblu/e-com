import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import styles from "../../../styles/style";
import { backend_URL } from "../../../serverUrl";
function ProductCart({ data, isEvent }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white hover:shadow-lg">
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
          <h5 className="text-[#0C134F] pb-0.5 text-sm sm:text-md">
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
          <h5 className="pb-3 font-[600] text-[14px] sm:text-[17px] hover:text-red-500">
            {data.name.length > 15?(data.name.slice(0, 15)+"..."):(data.name)}
          </h5>
        </Link>
        <div className=" flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
            <span className=" font-semibold"> ৳</span>{" "}
          </h5>
          <h4 className={`${styles.price}`}>
            {data.originalPrice ? data.originalPrice +"৳" : null}
          </h4>
        </div>

        <div className="flex items-center">
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <AiFillStar
            size={15}
            color="#F6BA00"
            className="mr-1 cursor-pointer"
          />
          <div className="ml-3 text-gray-500"></div>
          <span>({data.sold_out})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
