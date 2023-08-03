import React from "react";
import styles from "../../../styles/style";
import { brandingData, categoriesData } from "../../../staticData/data";
import { useNavigate } from "react-router-dom";

function Cetagoris() {
  const navigate = useNavigate();
  const SubmitHendel = (i) => {
    navigate(`/products/all-products?category=${i.title}`);
  };
  return (
    <div>
     

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
                  className="w-full overflow-hidden hover:shadow-blue-100  bg-gray-100 rounded-md  cursor-pointer  flex items-center flex-col justify-between"
                  onClick={()=>SubmitHendel(i)}
                >
                 
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-[70px] h-[70px] rounded-full object-cover mt-2 transform hover:scale-110 transition duration-300"
                  />
                   <h5 className=" text-sm px-2 mb-2 ">{i.title}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Cetagoris;
