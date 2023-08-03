import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../staticData/data.js";
import styles from "../../styles/style";
const Navbar = () => {
  
  return (
    <>
      <div className={`${styles.normalFlex}`}>
        {navItems &&
          navItems.map((i, index) => {
            return (
              <div className="flex" key={index}>
                <Link
                  to={i.url}
                  className={` text-white px-6 items-center cursor-pointer font-[400] text-[15px] hover:border-[1px]  pt-[9px] pb-[6px] rounded-md`}
                >
                  {i.title}
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Navbar;
