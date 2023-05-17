
import React, { useRef, useState } from 'react';
import {Link} from "react-router-dom"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/pagination';




// import required modules
import {EffectFade,Autoplay, Pagination } from 'swiper';
function HomeSlider() {
  return (
    <>
    <Swiper
    
      spaceBetween={30}
      centeredSlides={true}
      effect={"fade"}
      autoplay={{
        delay: 9500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
     
      modules={[EffectFade,Autoplay, Pagination]}
    
      className="mySwiper "
    >
 <SwiperSlide>
          <Link to="/fkj">
      
            <img
              src="https://media.e-valy.com/cms/banners/d231c027-2169-41c9-823b-33cfd59a6ae4"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link to="/fkj">
            {" "}
            <img
              src="https://media.e-valy.com/cms/banners/ba1869d7-036e-4dfc-9de3-573b626770fd"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/fkj">
            {" "}
            <img
              src="https://media.e-valy.com/cms/banners/8b2ce30f-59a0-4321-8713-2a02b3765fd1"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/fkj">
            {" "}
            <img
              src="https://media.e-valy.com/cms/banners/1fd9a0e7-a7d4-46bc-ac68-f702daf81ec7"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/fkj">
            {" "}
            <img
              src="https://media.e-valy.com/cms/banners/3aab8cea-de92-4752-b1fe-567604891680"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/fkj">
            {" "}
            <img
              src="https://media.e-valy.com/cms/banners/1fd9a0e7-a7d4-46bc-ac68-f702daf81ec7"
              alt=""
              className="w-full  flex justify-center items-center object-contain  "
              loading="lazy"
             
            />
          </Link>{" "}
        </SwiperSlide>
     
    </Swiper>
  </>
  )
}

export default HomeSlider
