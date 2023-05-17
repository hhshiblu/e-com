import React from "react";
import styles from "../../../styles/style";
import { brandingData, categoriesData } from "../../../staticData/data";
import { useNavigate } from "react-router-dom";

function Cetagoris() {
  const navigate = useNavigate();
  const SubmitHendel = (i) => {
    navigate(`/all-products?category=${i.title}`);
  };
  return (
    <div>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding   justify-between my-12 w-full m-auto text-center  p-4 grid grid-cols-2 lg:grid-cols-4 gap-[40px] ">
          {brandingData &&
            brandingData.map((i, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center px-3  shadow-md bg-white rounded-[30px] "
                >
                  <div className="rounded-full">
                    <span className="rounded-full h-2 w-2"> {i.icon}</span>
                  </div>
                  <div className="px-3">
                    <h3 className="font-bold text-left text-sm md:text-base">
                      {i.title}
                    </h3>
                  
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* catagory */}

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="cetagoris"
      >
        <div className={`${styles.heading}`}>
          <h1>Categoris</h1>
        </div>
        <div className="grid grid-cols-3 gap-[5px] md:grid-cols-4 md:gap-[10px] lg:grid-cols-5 lg:gap-[10px] xl:grid-cols-7 xl:gap-[10px]">
          {categoriesData &&
            categoriesData.map((i, index) => {
              
              return (
                <div  
                  key={index}
                  className="w-full overflow-hidden hover:shadow-blue-100 hover:md:shadow-md bg-gray-100    md:shadow-2xl cursor-pointer  flex items-center flex-col justify-between"
                  onClick={()=>SubmitHendel(i)}
                >
                 
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-[70px] object-cover mt-2 transform hover:scale-110 transition duration-300"
                  />
                   <h5 className=" text-[16px] px-2 mb-2 ">{i.title}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Cetagoris;
