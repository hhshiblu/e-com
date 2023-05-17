import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { productData, categoriesData } from "../../staticData/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/style";
import DropDown from "./DropDown.jsx";
import { useSelector } from "react-redux";
import { backend_URL } from "../../serverUrl";
import WishProduct  from "../WishProduct/WishProduct.jsx";
const Search = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [activemenu, setActiveMenu] = useState("nav_menu");
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
 
  const [dropDown, setDropdown] = useState(false);
  const [openWishCart, setOpenWishCart] = useState(false);

  const handelSearch = (e) => {
    const Item = e.target.value;
    setSearchItem(Item);

    const filterItem =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(Item.toLowerCase())
      );

    setSearchData(filterItem);
  };
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    const catagoris = document.querySelector(".catagoris");

    if (window.matchMedia("(max-width: 768px)").matches) {
      search.classList.toggle("active", window.scrollY > 100);
      catagoris.classList.toggle("active", window.scrollY > 100);
    } else {
      search.classList.remove("active");
      catagoris.classList.remove("active");
    }

    if (window.matchMedia("(min-width: 768px)").matches) {
      search.classList.toggle("activebigSceen", window.scrollY > 100);
      catagoris.classList.toggle("activeBigScreen", window.scrollY > 100);
    } else {
      search.classList.remove("activebigSceen");
      catagoris.classList.remove("activeBigScreen");
    }
  });

  const ToggleMenu = () => {
    setDropdown(!dropDown);
    console.log(dropDown);
    if (activemenu === "nav_menu") {
      setActiveMenu("nav_menu nav_phone");
    } else {
      setActiveMenu("nav_menu");
    }
  };

  return (
    <>
      <div className={`  search`}>
        <div className=" grid md:grid-cols-4 gap-0    pt-3">
          <div className="flex pb-2 justify-between mx-8 md:mx-auto ">
            <div className="mt-auto">
              <Link to="/">EShoop</Link>
            </div>

            <div className="flex md:hidden ">
            
              <div className={`${styles.normalFlex} `}>
                <Link to="/all-cart-products ">
                  <div className="relative cursor-pointer mx-[20px]">
                    <AiOutlineShoppingCart size={30} color="#000000" />
                    <span className=" absolute right-0 top-0 rounded-full bg-[#FC4F00] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                      0
                    </span>
                  </div>
                </Link>
              </div>
              <div className={`${styles.normalFlex}`}>
                <div className="relative cursor-pointer ">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_URL}upload/${user.avatar}`}
                        alt=""
                        className="h-[30px] w-[30px] rounded-full"
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="#000000" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-8  md:col-start-2 md:col-span-2 relative    ">
            <input
              type="text"
              placeholder="search any item.."
              value={searchItem}
              onChange={handelSearch}
              className="h-[40px] w-full px-2 border-[2px] border-[#3957db]  rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchItem && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh bg-slate-50 shadow-sm z-[9] p-4">
                {searchData &&
                  searchData.map((d, index) => {
                    const data = d.name;
                    const Product_name = data.replace("/s+g", "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <h1>{d.name}</h1>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="hidden  md:flex  mx-auto  ">
            <div className={`${styles.normalFlex} mx-1`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishCart(true)}
              >
                <AiOutlineHeart size={30} color="#000000" />
                <span className=" absolute right-0 top-0 rounded-full bg-[#FC4F00] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex} mx-1`}>
              <Link to="/all-cart-products">
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart size={30} color="#000000" />
                  <span className=" absolute right-0 top-0 rounded-full bg-[#FC4F00] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                    0
                  </span>
                </div>
              </Link>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[20px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_URL}upload/${user.avatar}`}
                      alt=""
                      className="h-[30px] w-[30px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="#000000" />
                  </Link>
                )}
              </div>
            </div>

            {/* add Cart Component */}
            {openWishCart ? <WishProduct setOpenWishCart={setOpenWishCart} /> : null}
          </div>
        </div>
      </div>
      {/* ///////////////////////////////search */}

      <header className=" ">
        <div className=" flex  h-[6vh] md:grid  md:grid-cols-4 lg:grid-cols-5  lg:mt-2">
          <div
            className="pl-10 mt-1 md:col-span-1 relative md:bg-[#d5c2c2]   text-black text-sm md:text-base duration-300 cursor-pointer catagoris"
            onClick={() => setDropdown(!dropDown)}
          >
            <div>
              <BiMenuAltLeft size={25} className="absolute  left-2" />
              <h3> All Catagogies </h3>

              {dropDown ? (
                <div>
                  <DropDown
                    catagoriesData={categoriesData}
                    setDropdown={setDropdown}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={`hidden  lg:block col-start-2 col-span-4 md:col-start-2 md:col-span-3  mx-auto`}
          >
            <Navbar active={activeHeading} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Search;
