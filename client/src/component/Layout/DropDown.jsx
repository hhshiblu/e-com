import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";

function DropDown({ catagoriesData, setDropdown, dropDown }) {
  const navigate = useNavigate();

  const SubmitHandler = (i) => {
    navigate(`/all-products?category=${i.title}`);
    setDropdown(false);
    window.location.reload(true);
  };
  return (
    <div className=" pb-4 w-[270px] bg-[#fff] absolute z-30   rounded-b-md shadow-sm ">
      {catagoriesData &&
        catagoriesData.map((i, index) => {
          return (
            <div
              key={index}
              className={`${styles.normalFlex} `}
              onClick={() => SubmitHandler(i)}
            >
              <h3 className=" cursor-pointer select-none m-2 text-cyan-950">
                {i.title}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default DropDown;
