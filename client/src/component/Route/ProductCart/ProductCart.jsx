import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import styles from "../../../styles/style";
function ProductCart({ data }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <div className="bg-white hover:shadow-lg">
      <div className="w-full h-auto mb- p-3 relative rounded-md  cursor-pointer ">
        <div className=" flex  justify-end m-auto"></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            alt={data.name}
            className="w-full pb-1 m-auto h-[160px] object-contain  transform hover:scale-110 transition duration-500"
          />
        </Link>
        <Link to="/">
          <h5 className="text-[#0C134F] pb-0.5 text-sm sm:text-md">{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h5 className="pb-3 font-[600] text-[14px] sm:text-[17px] hover:text-red-500">
            {data.name.length > 40 && data.name.slice(0, 40) + "..."}
          </h5>
        </Link>
        <div className=" flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.price === 0 ? data.price : data.discount_price}${" "}
          </h5>
          <h4 className={`${styles.price}`}>
            {data.price ? data.price + "$" : null}
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
          <span>({data.total_sell})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
