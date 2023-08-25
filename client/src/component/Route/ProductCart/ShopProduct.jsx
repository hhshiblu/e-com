import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";

import { backend_URL } from "../../../serverUrl";
import "./Card.css";
import Rating from "../../ProductDetails/Rating";
function ShopProduct({ products }) {
  return (
    <div>
      {" "}
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="text-2xl py-8 text-slate-600">Shop Products</h2>
          <div>
            <Swiper
              breakpoints={{
                1280: {
                  slidesPerView: 5,
                },
                960: {
                  slidesPerView: 4,
                },
                560: {
                  slidesPerView: 3,
                },
                360: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Autoplay, Pagination]}
              className="mySwiper "
            >
              {products?.map((p, i) => {
                return (
                  <SwiperSlide>
                    <div className="bg-[#ffffff] hover:shadow-lg rounded-md">
                      <div className="w-full h-auto mb- p-3 relative rounded-md  cursor-pointer ">
                        <Link to={`/product/${p._id}`}>
                          <div className="relative ">
                            <img
                              src={`${backend_URL}upload/${p && p.images[0]}`}
                              alt=""
                              className="w-[100%] h-[120px] mx-auto"
                            />
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {" "}
                              {(p.originalPrice === 0
                                ? 0
                                : ((p.originalPrice - p.discountPrice) /
                                    p.originalPrice) *
                                  100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                        </Link>

                        <Link to={`${`/product/${p._id}`}`}>
                          <h5 className="pb-1 font-[500] text-sm   hover:text-red-500">
                            {p.name.length > 20
                              ? p.name.slice(0, 20) + "..."
                              : p.name}
                          </h5>
                        </Link>

                        {/* <div className="flex ">
                          <h5 className={`${styles.productDiscountPrice}`}>
                            {p.originalPrice === 0
                              ? p.originalPrice
                              : p.discountPrice}
                            <span className=" font-semibold"> ৳</span>
                          </h5>
                          <h4
                            className={`font-[500] text-sm text-[#f1331e] pl-4  line-through`}
                          >
                            {p.originalPrice ? p.originalPrice + " ৳" : null}
                          </h4>
                        </div> */}

                        <div className="flex items-center">
                          <Rating rating={p?.ratings} />
                          <div className="ml-3 text-gray-500"></div>
                          <span>({p?.sold_out})</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShopProduct;
