import React from "react";
import styles from "../../../styles/style";
import { brandingData } from "../../../staticData/data";


function Feature() {
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
                    <p className="rounded-full h-2 w-2"> {i.icon}</p>
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
    </div>
  );
}

export default Feature;
