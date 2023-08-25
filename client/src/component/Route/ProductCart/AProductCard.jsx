import React from 'react'
import { Link } from 'react-router-dom';
import { backend_URL } from '../../../serverUrl';

function AProductCard({p}) {
  return (
    <div>
      <div className="min-w-[245px] pb-4 rounded-lg max-w[250px] ">
        <Link to={`${`/product/${p._id}`} `}>
          <div className="  bg-gray-200 p-4 h-[200px] w-[240px] rounded-md">
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
              : ((p.originalPrice - p.discountPrice) / p.originalPrice) * 100
            ).toFixed(0)}
            % off
          </div>
          <div className="text-[#CC0C39] font-bold text-[12px]   ">Deal</div>
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
            {p.name.length > 20 ? p.name.slice(0, 36) + "..." : p.name}
          </h5>
        </Link>
      </div>
    </div>
  );
}

export default AProductCard