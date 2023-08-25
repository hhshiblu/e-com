import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { backend_URL } from "../../../serverUrl";

function HomeSlider() {
  const { banars } = useSelector((state) => state.banar);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      effect={"fade"}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Autoplay, Pagination]}
      className="mySwiper"
    >
      {banars &&
        banars
          .filter((item) => item.role === 1)
          .map((item, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="w-full flex relative">
                <Link to={`${item.urlbanarproduct}`}>
                  <img
                    src={`${backend_URL}upload/${item.avatar && item.avatar}`}
                    alt=""
                    className="w-full flex justify-center items-center object-contain cursor-pointer"
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

export default HomeSlider;
