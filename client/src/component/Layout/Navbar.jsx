import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../staticData/data.js";
import styles from "../../styles/style";
const Navbar = ({active}) => {
  
  return (
    <>
      <div className={`${styles.normalFlex}`}>
        {navItems &&
          navItems.map((i, index) => {
            return (
              <div className="flex" key={index}>
                <Link
                  to={i.url}
                  className={`${
                    active === index + 1 ? "text-black" : "text-amber-800"
                  } px-6 items-center cursor-pointer`}
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
