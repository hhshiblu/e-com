import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData } from "../../staticData/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiFillDashboard,
} from "react-icons/ai";
import { GrDashboard } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/style";
import DropDown from "./DropDown.jsx";
import { useSelector } from "react-redux";
import { backend_URL } from "../../serverUrl";
import WishProduct from "../WishProduct/WishProduct.jsx";
const Search = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [activemenu, setActiveMenu] = useState("nav_menu");
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { isSeller } = useSelector((state) => state.seller);
  const [dropDown, setDropdown] = useState(false);
  const [openWishCart, setOpenWishCart] = useState(false);

  // const filterCart = cart?.filter((item) => item.user === user?._id);
  // console.log(filterCart);
  // const cartLength=filterCart?.length > 0 ? filterCart[0]?.cartItems?.length : 0;

  // const handelSearch = (e) => {
  //   const Item = e.target.value;
  //   setSearchItem(Item);

  //   const filterItem =
  //     productData &&
  //     productData.filter((product) =>
  //       product.name.toLowerCase().includes(Item.toLowerCase())
  //     );

  //   setSearchData(filterItem);
  // };

  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    const catagoris = document.querySelector(".catagoris");

    if (search) {
      if (window.matchMedia("(max-width: 768px)").matches) {
        search.classList.toggle("active", window.scrollY > 70);
        // catagoris.classList.toggle("active", window.scrollY > 100);
      } else {
        search.classList.remove("active");
        // catagoris.classList.remove("active");
      }

      if (window.matchMedia("(min-width: 768px)").matches) {
        search.classList.toggle("activebigSceen", window.scrollY > 100);
        // catagoris.classList.toggle("activeBigScreen", window.scrollY > 100);
      } else {
        search.classList.remove("activebigSceen");
        // catagoris.classList.remove("activeBigScreen");
      }
    }
  });

  return (
    <>
      <div
        className={` search  shadow-md font-300 sticky bg-white pt-0 md:pt-1`}
      >
        <div className=" grid md:grid-cols-4 gap-0  pb-2 md:pt-1 ">
          <div className="flex pb-2 justify-between mx-8 md:mx-auto ">
            <div className=" hidden md:block">
              <Link to="/">EShoop</Link>
            </div>
          </div>

          <div className="mx-8 md:col-start-2 md:col-span-2 relative    ">
            <input
              type="text"
              placeholder="search any item.."
              value={searchItem}
              // onChange={handelSearch}
              className="h-[40px] w-full px-2 border-[2px] border-[#3957db] rounded-md"
            />
            <button
              type="submit"
              className="text-white bg-[#050320] absolute right-0 h-[40px] w-[100px] rounded-r-md font-[600]  text "
            >
              Search
            </button>
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
            {/* <div className={`${styles.normalFlex} mx-1`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                // onClick={() => setOpenWishCart(true)}
              >
                <AiOutlineHeart size={30} color="#000000" />
                <span className=" absolute right-0 top-0 rounded-full bg-[#FC4F00] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                  0
                </span>
              </div>
            </div> */}
            <div className={`${styles.normalFlex} mx-1`}>
              <Link to="/all-cart-products">
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineShoppingCart size={30} color="#000000" />
                  <span className=" absolute right-0 top-0 rounded-full bg-[#0F044C] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
              </Link>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[20px]">
                {isAuthenticated ? (
                  <div className=" bg-[#0d092b]  rounded-full h-[30px] w-[30px]">
                    <p className=" text-center text-white   font-[600] flex justify-center items-center">
                      {user.name.slice(0, 1)}
                    </p>
                  </div>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="#000000" />
                  </Link>
                )}
              </div>
            </div>

            {/* add Cart Component */}
            {openWishCart ? (
              <WishProduct setOpenWishCart={setOpenWishCart} />
            ) : null}
          </div>
        </div>
        {/* <header className="bg-[#] mt-1"> */}
        <div className="hidden catagory md:flex justify-between h-[35px] lg:grid  lg:grid-cols-5  lg:mt-2 ">
          <div
            className="pl-10 mt-1 md:col-span-1 relative  text-black text-sm md:text-base duration-300 cursor-pointer catagoris"
            onClick={() => setDropdown(!dropDown)}
          >
            <div>
              <BiMenuAltLeft size={25} className="absolute  left-2" />
              <h3 className="  font-[700]"> All Catagogies </h3>

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

          <div className="mt-1">
            <Link
              to={`${isSeller ? "/dashboard" : "/become-seller"}`}
              className="mr-8  text-[#d31616] font-semibold border border-red-200 p-1 rounded-md bg-gray-200 "
            >
              {" "}
              {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
            </Link>
          </div>
        </div>

        {/* ----------------------------------phn menu--------------------------------- */}

        <div class="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[55px] mx-auto z-50">
          <div class="flex">
            <div
              class="grow rounded-tr-[30px] "
              // style="width:calc(50% - 35px)"
            >
              <div class="flex justify-around">
                <button
                  type="button"
                  class="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                >
                  <BiCategoryAlt className="text-white " size={18} />
                  <p class="mt-[1px] text-xs text-white font-[700] ">
                    Category
                  </p>
                </button>
                <button
                  type="button"
                  class="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                >
                  {isAuthenticated ? (
                    <div className="  rounded-full h-[20px] w-[20px]">
                      <Link to="/profile">
                        <p className=" text-center text-white   font-[600] flex justify-center items-center">
                          {user.name.slice(0, 1)}..
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="#000000" />
                    </Link>
                  )}
                  <p class="mt-[1px] text-xs text-white font-[700] ">Account</p>
                </button>
                <button
                  type="button"
                  class="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-10px]"
                >
                  <AiOutlineShoppingCart className="text-white " size={18} />
                </button>
                <Link to={`${isSeller ? "/dashboard" : "/become-seller"}`}>
                <button
                  type="button"
                  class="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px]"
                >
                  
                    <AiFillDashboard className="text-white " size={18} />
                    <p class="mt-[1px] text-xs text-white font-[700] ">
                    {isSeller ? "Dashboard" : "Shop"}{" "}
                    </p>
                  
                </button>
                </Link>
                <button
                  type="button"
                  class="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-8px] "
                >
                  {" "}
                  <Link to="/all-cart-products" className="relative">
                    <AiOutlineShoppingCart className="text-white  relative" size={18} />
                    <span className=" absolute right-[-7px] top-[-4px] rounded-full bg-[#0F044C] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] loading-tight text-center">
                    {cart && cart.length}
                  </span>
                    <p class="mt-[1px] text-xs text-white font-[700] ">Cart</p>
                  </Link>
                </button>
              </div>
            </div>
            {/* <div class="flex-none w-[70px] rounded-bl-full rounded-br-full moon-box-shadow mb-[2px]"></div> */}
            {/* <div
              class="bg-[#2E4F4F] grow rounded-tl-[30px]"
              // style="width:calc(50% - 35px)"
            >
              {/* <div class="flex justify-around"> 
                <a href="/print-documents">
                  <button type="button" class="text-center px-3 py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mx-auto"
                    >
                      <polyline points="6 9 6 2 18 2 18 9"></polyline>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                      <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    <p class="text-[11px] mt-[2px] text-white">Printer</p>
                  </button>
                </a>
                <button type="button" class="text-center px-3 py-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mx-auto"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <p class="absolute text-[11px] top-[3px] -right-[2px] pt-[3px] text-white bg-primary w-[22px] h-[22px] grid place-items-center rounded-full">
                    1{" "}
                  </p>
                  <p class="text-[11px] mt-[2px]">Cart</p>
                </button>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* ///////////////////////////////search */}
    </>
  );
};

export default Search;
